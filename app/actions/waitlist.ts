'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { validateEmail, validateName, sanitizeInput, isBot } from '@/utils/validators'
import { headers } from 'next/headers'
import { rateLimit } from '@/utils/rate-limiter-simple'

interface WaitlistFormData {
  email: string
  name: string
  company?: string
  role?: string
  newsletter: boolean
  website?: string // Honeypot field
}

export async function submitToWaitlist(formData: WaitlistFormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  try {
    // Get IP for rate limiting
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown-ip'
    
    // Apply rate limiting
    const rateLimitResult = await rateLimit(ip)
    if (!rateLimitResult.success) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return { 
        success: false, 
        error: 'Too many requests. Please try again later.'
      }
    }
    
    // Check honeypot field - if filled, likely a bot
    if (isBot(formData.website)) {
      console.log('Bot detected via honeypot field')
      // Return success to avoid bot detection
      // but don't actually save the data
      return { success: true }
    }
    
    // Extract and sanitize inputs
    const email = sanitizeInput(formData.email)
    const name = sanitizeInput(formData.name)
    const company = formData.company ? sanitizeInput(formData.company) : null
    const role = formData.role ? sanitizeInput(formData.role) : null
    const newsletter = Boolean(formData.newsletter)
    
    // Validate email and name
    const emailValidation = validateEmail(email)
    if (!emailValidation.valid) {
      console.log(`Email validation failed: ${emailValidation.reason}`)
      return { success: false, error: emailValidation.reason }
    }
    
    const nameValidation = validateName(name)
    if (!nameValidation.valid) {
      console.log(`Name validation failed: ${nameValidation.reason}`)
      return { success: false, error: nameValidation.reason }
    }
    
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
      .select()
    
    if (error) {
      console.error('Error submitting to waitlist:', error)
      
      // Handle specific error cases
      if (error.code === '23505') { // Unique constraint violation
        return { success: false, error: 'This email is already on the waitlist.' }
      }
      
      return { success: false, error: error.message }
    }
    
    // Revalidate the home page
    revalidatePath('/')
    
    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error in waitlist submission:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
} 