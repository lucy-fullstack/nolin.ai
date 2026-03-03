import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const returnTo = searchParams.get('returnTo') || '/'
  const next = searchParams.get('next') || returnTo
  
  // App domain for redirecting after auth
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://app.nolin.ai'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful auth - redirect to the app
      const redirectUrl = next.startsWith('/') ? `${appDomain}${next}` : appDomain
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Auth error - redirect to error page
  return NextResponse.redirect(`${origin}/auth/error`)
}
