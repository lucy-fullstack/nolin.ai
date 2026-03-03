"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Loader2, Check, AlertCircle, Mail } from "lucide-react"
import Link from "next/link"
import { NolinTextLogo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/contexts/language-context"

type AuthMode = "login" | "signup" | "forgot-password"

const translations = {
  en: {
    "login_title": "Welcome back",
    "login_subtitle": "Sign in to your nolin.ai account",
    "signup_title": "Create your account",
    "signup_subtitle": "Get started with nolin.ai for free",
    "forgot_password_title": "Reset your password",
    "forgot_password_subtitle": "We'll send you a link to reset your password",
    "email": "Email",
    "password": "Password",
    "confirm_password": "Confirm Password",
    "full_name": "Full Name",
    "login": "Log in",
    "signup": "Create account",
    "send_reset_link": "Send reset link",
    "logging_in": "Logging in...",
    "creating_account": "Creating account...",
    "sending": "Sending...",
    "forgot_password": "Forgot password?",
    "no_account": "Don't have an account?",
    "have_account": "Already have an account?",
    "back_to_login": "Back to login",
    "back_to_site": "Back to nolin.ai",
    "password_mismatch": "Passwords do not match",
    "password_requirements": "Password must be at least 6 characters",
    "email_sent": "Check your email",
    "email_sent_desc": "We've sent you a password reset link. Check your inbox.",
    "signup_success": "Account created!",
    "signup_success_desc": "Please check your email to verify your account before logging in.",
    "privacy_agreement": "By continuing, you agree to our",
    "privacy_policy": "Privacy Policy",
  },
  es: {
    "login_title": "Bienvenido de nuevo",
    "login_subtitle": "Inicia sesion en tu cuenta de nolin.ai",
    "signup_title": "Crea tu cuenta",
    "signup_subtitle": "Comienza con nolin.ai gratis",
    "forgot_password_title": "Restablecer contrasena",
    "forgot_password_subtitle": "Te enviaremos un enlace para restablecer tu contrasena",
    "email": "Correo electronico",
    "password": "Contrasena",
    "confirm_password": "Confirmar contrasena",
    "full_name": "Nombre completo",
    "login": "Iniciar sesion",
    "signup": "Crear cuenta",
    "send_reset_link": "Enviar enlace",
    "logging_in": "Iniciando sesion...",
    "creating_account": "Creando cuenta...",
    "sending": "Enviando...",
    "forgot_password": "Olvidaste tu contrasena?",
    "no_account": "No tienes cuenta?",
    "have_account": "Ya tienes cuenta?",
    "back_to_login": "Volver al login",
    "back_to_site": "Volver a nolin.ai",
    "password_mismatch": "Las contrasenas no coinciden",
    "password_requirements": "La contrasena debe tener al menos 6 caracteres",
    "email_sent": "Revisa tu correo",
    "email_sent_desc": "Te hemos enviado un enlace para restablecer tu contrasena.",
    "signup_success": "Cuenta creada!",
    "signup_success_desc": "Por favor revisa tu correo para verificar tu cuenta antes de iniciar sesion.",
    "privacy_agreement": "Al continuar, aceptas nuestra",
    "privacy_policy": "Politica de Privacidad",
  }
}

function AuthPageContent() {
  const { language } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const initialMode = (searchParams.get("mode") as AuthMode) || "login"
  const returnTo = searchParams.get("returnTo") || "/"
  
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<"email_sent" | "signup_success" | null>(null)

  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "https://app.nolin.ai"

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  useEffect(() => {
    setError(null)
    setSuccess(null)
  }, [mode])

  useEffect(() => {
    const newMode = searchParams.get("mode") as AuthMode
    if (newMode && ["login", "signup", "forgot-password"].includes(newMode)) {
      setMode(newMode)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      const redirectUrl = returnTo.startsWith("/") ? `${appDomain}${returnTo}` : appDomain
      window.location.href = redirectUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError(t("password_mismatch"))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(t("password_requirements"))
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      setSuccess("signup_success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setSuccess("email_sent")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const renderSuccessState = () => {
    const isEmailSent = success === "email_sent"
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              {isEmailSent ? (
                <Mail className="h-7 w-7 text-primary" />
              ) : (
                <Check className="h-7 w-7 text-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-xl">
            {t(isEmailSent ? "email_sent" : "signup_success")}
          </CardTitle>
          <CardDescription>
            {t(isEmailSent ? "email_sent_desc" : "signup_success_desc")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setMode("login")} variant="outline" className="w-full">
            {t("back_to_login")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getTitle = () => {
    switch (mode) {
      case "signup": return t("signup_title")
      case "forgot-password": return t("forgot_password_title")
      default: return t("login_title")
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case "signup": return t("signup_subtitle")
      case "forgot-password": return t("forgot_password_subtitle")
      default: return t("login_subtitle")
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Back button */}
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              asChild
            >
              <Link href="https://nolin.ai">
                <ArrowLeft className="h-4 w-4" />
                {t("back_to_site")}
              </Link>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <NolinTextLogo textClassName="text-2xl font-bold" domain="ai" />
          </div>

          {success ? (
            renderSuccessState()
          ) : (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{getTitle()}</CardTitle>
                <CardDescription>{getSubtitle()}</CardDescription>
              </CardHeader>
              <CardContent>
                {mode === "login" && (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{t("password")}</Label>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm"
                          type="button"
                          onClick={() => setMode("forgot-password")}
                        >
                          {t("forgot_password")}
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("logging_in")}
                        </>
                      ) : (
                        <>
                          {t("login")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      {t("no_account")}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                        onClick={() => setMode("signup")}
                      >
                        {t("signup")}
                      </Button>
                    </div>
                  </form>
                )}

                {mode === "signup" && (
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t("full_name")}</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t("email")}</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t("password")}</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                      />
                      <p className="text-xs text-muted-foreground">{t("password_requirements")}</p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("creating_account")}
                        </>
                      ) : (
                        <>
                          {t("signup")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      {t("privacy_agreement")}{" "}
                      <Link href="/privacy" className="underline hover:text-primary">
                        {t("privacy_policy")}
                      </Link>
                      .
                    </p>

                    <div className="text-center text-sm text-muted-foreground">
                      {t("have_account")}{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                        onClick={() => setMode("login")}
                      >
                        {t("login")}
                      </Button>
                    </div>
                  </form>
                )}

                {mode === "forgot-password" && (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">{t("email")}</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          {t("send_reset_link")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                        onClick={() => setMode("login")}
                      >
                        {t("back_to_login")}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
}
