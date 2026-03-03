import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const createClient = (cookieStore: ReturnType<typeof cookies>): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase environment variables - Supabase features will be disabled')
    return null
  }
  
  // Create a simple Supabase client without cookies for server-side usage
  return createSupabaseClient(supabaseUrl, supabaseKey)
} 
