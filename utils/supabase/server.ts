import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('[v0] Supabase config check:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    urlValue: supabaseUrl?.substring(0, 30) + '...',
  })
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(`Missing Supabase environment variables: URL=${!!supabaseUrl}, KEY=${!!supabaseKey}`)
  }
  
  // Create a simple Supabase client without cookies for server-side usage
  return createSupabaseClient(supabaseUrl, supabaseKey)
} 
