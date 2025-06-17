// Define variables for rate limiting
const RATE_LIMIT_REQUESTS = 5 // Maximum requests allowed
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // Time window in milliseconds (1 minute)

// Try to import Redis if available
let Redis: any;
let redis: any = null;

try {
  // Dynamic import to avoid build errors if Redis is not installed
  Redis = require('@upstash/redis').Redis;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('Redis client initialized successfully');
  } else {
    console.warn('Redis environment variables not found. Using in-memory rate limiting fallback.');
  }
} catch (error) {
  console.warn('Failed to load Redis: Using in-memory rate limiting');
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Implements a simple in-memory rate limiter as fallback when Redis isn't available
 */
const inMemoryStore = new Map<string, { count: number, reset: number }>()

/**
 * Rate limit by IP address
 */
export async function rateLimit(ip: string): Promise<RateLimitResult> {
  const key = `ratelimit:${ip}`
  const now = Date.now()
  const resetTime = now + RATE_LIMIT_WINDOW_MS
  
  // If Redis is available, use it for rate limiting
  if (redis) {
    try {
      // Initialize rate limiting for this IP if it doesn't exist
      const exists = await redis.exists(key)
      if (!exists) {
        await redis.set(key, 0, { ex: Math.floor(RATE_LIMIT_WINDOW_MS / 1000) })
      }
      
      // Increment request count
      const count = await redis.incr(key)
      
      // Get TTL to calculate reset time
      const ttl = await redis.ttl(key)
      const reset = now + ttl * 1000
      
      return {
        success: count <= RATE_LIMIT_REQUESTS,
        limit: RATE_LIMIT_REQUESTS,
        remaining: Math.max(0, RATE_LIMIT_REQUESTS - count),
        reset
      }
    } catch (error) {
      console.error('Redis rate limiter error:', error)
      // Fallback to in-memory rate limiter
    }
  }
  
  // In-memory rate limiter fallback
  if (!inMemoryStore.has(key)) {
    inMemoryStore.set(key, {
      count: 1,
      reset: resetTime
    })
    
    // Set expiry for the in-memory rate limit
    setTimeout(() => {
      inMemoryStore.delete(key)
    }, RATE_LIMIT_WINDOW_MS)
    
    return {
      success: true,
      limit: RATE_LIMIT_REQUESTS,
      remaining: RATE_LIMIT_REQUESTS - 1,
      reset: resetTime
    }
  }
  
  const record = inMemoryStore.get(key)!
  
  // Reset if window expired
  if (now > record.reset) {
    record.count = 1
    record.reset = resetTime
    
    return {
      success: true,
      limit: RATE_LIMIT_REQUESTS,
      remaining: RATE_LIMIT_REQUESTS - 1,
      reset: resetTime
    }
  }
  
  // Increment count
  record.count++
  
  return {
    success: record.count <= RATE_LIMIT_REQUESTS,
    limit: RATE_LIMIT_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_REQUESTS - record.count),
    reset: record.reset
  }
} 