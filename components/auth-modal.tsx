"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Loader2, Check, AlertCircle, Mail } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { NolinTextLogo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/contexts/language-context"

type AuthMode = "login" | "signup" | "forgot-password"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: AuthMode
  returnTo?: string
}

// Auth translations
const authTranslations = {
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

export function AuthModal({ isOpen, onClose, initialMode = "login", returnTo }: AuthModalProps) {
  const { language } = useLanguage()
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<"email_sent" | "signup_success" | null>(null)

  // Get app domain from env or default
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "https://app.nolin.ai"

  const at = (key: string): string => {
    return authTranslations[language]?.[key] || authTranslations.en[key] || key
  }

  // Reset form when mode changes
  useEffect(() => {
    setError(null)
    setSuccess(null)
  }, [mode])

  // Update mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

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

      // Redirect to app on successful login
      const redirectUrl = returnTo ? `${appDomain}${returnTo}` : appDomain
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
      setError(at("password_mismatch"))
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError(at("password_requirements"))
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo || "/")}`,
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

  const handleClose = () => {
    // Reset form state
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setFullName("")
    setError(null)
    setSuccess(null)
    setMode("login")
    onClose()
  }

  const renderSuccessState = () => {
    const isEmailSent = success === "email_sent"
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          {isEmailSent ? (
            <Mail className="h-7 w-7 text-primary" />
          ) : (
            <Check className="h-7 w-7 text-primary" />
          )}
        </div>
        <h3 className="text-xl font-bold">
          {at(isEmailSent ? "email_sent" : "signup_success")}
        </h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          {at(isEmailSent ? "email_sent_desc" : "signup_success_desc")}
        </p>
        <Button onClick={() => setMode("login")} variant="outline" className="mt-4">
          {at("back_to_login")}
        </Button>
      </div>
    )
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{at("email")}</Label>
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
          <Label htmlFor="password">{at("password")}</Label>
          <Button
            variant="link"
            className="p-0 h-auto text-sm"
            type="button"
            onClick={() => setMode("forgot-password")}
          >
            {at("forgot_password")}
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
            {at("logging_in")}
          </>
        ) : (
          <>
            {at("login")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        {at("no_account")}{" "}
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          type="button"
          onClick={() => setMode("signup")}
        >
          {at("signup")}
        </Button>
      </div>
    </form>
  )

  const renderSignupForm = () => (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">{at("full_name")}</Label>
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
        <Label htmlFor="signup-email">{at("email")}</Label>
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
        <Label htmlFor="signup-password">{at("password")}</Label>
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
        <Label htmlFor="confirm-password">{at("confirm_password")}</Label>
        <Input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <p className="text-xs text-muted-foreground">{at("password_requirements")}</p>
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
            {at("creating_account")}
          </>
        ) : (
          <>
            {at("signup")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        {at("privacy_agreement")}{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          {at("privacy_policy")}
        </Link>
        .
      </p>

      <div className="text-center text-sm text-muted-foreground">
        {at("have_account")}{" "}
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
          type="button"
          onClick={() => setMode("login")}
        >
          {at("login")}
        </Button>
      </div>
    </form>
  )

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">{at("email")}</Label>
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
            {at("sending")}
          </>
        ) : (
          <>
            {at("send_reset_link")}
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
          {at("back_to_login")}
        </Button>
      </div>
    </form>
  )

  const getTitle = () => {
    switch (mode) {
      case "signup":
        return at("signup_title")
      case "forgot-password":
        return at("forgot_password_title")
      default:
        return at("login_title")
    }
  }

  const getSubtitle = () => {
    switch (mode) {
      case "signup":
        return at("signup_subtitle")
      case "forgot-password":
        return at("forgot_password_subtitle")
      default:
        return at("login_subtitle")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[440px] p-0 gap-0 overflow-hidden">
        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={handleClose}
            asChild
          >
            <Link href="https://nolin.ai">
              <ArrowLeft className="h-4 w-4" />
              {at("back_to_site")}
            </Link>
          </Button>
        </div>

        <div className="p-8 pt-16">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <NolinTextLogo textClassName="text-2xl font-bold" domain="ai" />
          </div>

          {success ? (
            renderSuccessState()
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{getTitle()}</h2>
                <p className="text-muted-foreground mt-1">{getSubtitle()}</p>
              </div>

              {/* Form */}
              {mode === "login" && renderLoginForm()}
              {mode === "signup" && renderSignupForm()}
              {mode === "forgot-password" && renderForgotPasswordForm()}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
