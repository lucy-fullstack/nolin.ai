import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/utils/rate-limiter-simple'
import { validateEmail, validateName, sanitizeInput, isBot } from '@/utils/validators'

export async function POST(request: NextRequest) {
  try {
    console.log('=== WAITLIST SUBMISSION STARTED ===')
    
    // Extract IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown-ip'
    
    // Check for CSRF token
    const csrfToken = request.headers.get('X-CSRF-Protection')
    if (!csrfToken || csrfToken !== '1') {
      console.log('CSRF token missing or invalid')
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 403 }
      )
    }
    
    // Apply rate limiting
    const rateLimitResult = await rateLimit(ip)
    if (!rateLimitResult.success) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString()
          }
        }
      )
    }
    
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const body = await request.json()
    console.log('Request body:', body)
    
    // Check honeypot field - if filled, likely a bot
    if (isBot(body.website)) {
      console.log('Bot detected via honeypot field')
      // Return success to avoid bot detection
      // but don't actually save the data
      return NextResponse.json(
        { success: true, message: 'Successfully joined waitlist' },
        { status: 200 }
      )
    }
    
    // Extract and sanitize inputs
    const email = sanitizeInput(body.email)
    const name = sanitizeInput(body.name)
    const company = body.company ? sanitizeInput(body.company) : null
    const role = body.role ? sanitizeInput(body.role) : null
    const newsletter = Boolean(body.newsletter)
    
    // Validate email and name
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      console.log(`Email validation failed: ${emailValidation.reason}`)
      return NextResponse.json(
        { success: false, error: emailValidation.reason },
        { status: 400 }
      )
    }
    
    const nameValidation = validateName(name)
    if (!nameValidation.valid) {
      console.log(`Name validation failed: ${nameValidation.reason}`)
      return NextResponse.json(
        { success: false, error: nameValidation.reason },
        { status: 400 }
      )
    }
    
    console.log('Attempting to insert into Supabase waitlist table...')
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email,
        name,
        company,
        role,
        newsletter,
        created_at: new Date().toISOString()
      }])
    
    if (error) {
      console.error('Supabase error:', error)
      
      // Handle specific error cases
      if (error.code === '23505') { // Unique constraint violation
        console.log('Email already exists in waitlist:', email)
        return NextResponse.json(
          { success: false, error: 'This email is already on the waitlist.' },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to save to database: ' + error.message },
        { status: 500 }
      )
    }
    
    console.log('Successfully added to waitlist:', { email, name })
    return NextResponse.json(
      { success: true, message: 'Successfully joined waitlist' },
      { status: 201 }
    )
  } catch (err) {
    console.error('Unexpected error in waitlist API route:', err)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred: ' + (err instanceof Error ? err.message : String(err)) },
      { status: 500 }
    )
  }
} 