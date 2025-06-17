// Define variables for rate limiting
const RATE_LIMIT_REQUESTS = 5 // Maximum requests allowed
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // Time window in milliseconds (1 minute)

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Simple in-memory rate limiter for development
 */
const inMemoryStore = new Map<string, { count: number, reset: number }>()

/**
 * Rate limit by IP address - simple in-memory implementation
 */
export async function rateLimit(ip: string): Promise<RateLimitResult> {
  const key = `ratelimit:${ip}`
  const now = Date.now()
  const resetTime = now + RATE_LIMIT_WINDOW_MS
  
  // Create new entry if it doesn't exist
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