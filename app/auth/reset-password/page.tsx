"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Loader2, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { NolinTextLogo } from "@/components/logo"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/contexts/language-context"

const translations = {
  en: {
    "title": "Set new password",
    "subtitle": "Enter your new password below",
    "new_password": "New Password",
    "confirm_password": "Confirm Password",
    "update_password": "Update Password",
    "updating": "Updating...",
    "success_title": "Password updated!",
    "success_desc": "Your password has been successfully updated. You can now log in with your new password.",
    "go_to_login": "Go to Login",
    "password_mismatch": "Passwords do not match",
    "password_requirements": "Password must be at least 6 characters",
    "session_error": "Unable to verify your session. Please request a new password reset link.",
    "back_to_home": "Back to Home",
  },
  es: {
    "title": "Nueva contrasena",
    "subtitle": "Ingresa tu nueva contrasena",
    "new_password": "Nueva Contrasena",
    "confirm_password": "Confirmar Contrasena",
    "update_password": "Actualizar Contrasena",
    "updating": "Actualizando...",
    "success_title": "Contrasena actualizada!",
    "success_desc": "Tu contrasena ha sido actualizada exitosamente. Ahora puedes iniciar sesion con tu nueva contrasena.",
    "go_to_login": "Ir a Login",
    "password_mismatch": "Las contrasenas no coinciden",
    "password_requirements": "La contrasena debe tener al menos 6 caracteres",
    "session_error": "No se pudo verificar tu sesion. Por favor solicita un nuevo enlace de restablecimiento.",
    "back_to_home": "Volver al Inicio",
  }
}

export default function ResetPasswordPage() {
  const { language } = useLanguage()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [sessionValid, setSessionValid] = useState(true)

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  // Check for valid recovery session on mount
  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      
      // If no session or not a recovery session, show error
      if (!session) {
        setSessionValid(false)
      }
    }
    
    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!sessionValid) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <NolinTextLogo textClassName="text-2xl font-bold" domain="ai" />
            </div>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Session Expired</CardTitle>
                <CardDescription>
                  {t("session_error")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/">{t("back_to_home")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <NolinTextLogo textClassName="text-2xl font-bold" domain="ai" />
            </div>
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{t("success_title")}</CardTitle>
                <CardDescription>
                  {t("success_desc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/?auth=login">{t("go_to_login")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <NolinTextLogo textClassName="text-2xl font-bold" domain="ai" />
          </div>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("title")}</CardTitle>
              <CardDescription>{t("subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{t("new_password")}</Label>
                  <Input
                    id="password"
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
                      {t("updating")}
                    </>
                  ) : (
                    <>
                      {t("update_password")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
