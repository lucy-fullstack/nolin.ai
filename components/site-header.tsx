"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NolinTextLogo } from "@/components/logo"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export function SiteHeader() {
  const pathname = usePathname()
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "https://app.nolin.ai"

  // Check auth state on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  const useCases = [
    { 
      key: "linkedin_creators", 
      href: "/use-cases/linkedin-creators" 
    },
    { 
      key: "ghostwriters", 
      href: "/use-cases/ghostwriters" 
    },
    { 
      key: "community_managers", 
      href: "/use-cases/community-managers" 
    },
    { 
      key: "agencies", 
      href: "/use-cases/agencies" 
    },
  ]

  const navItems = [
    {
      key: "use_cases",
      href: "#",
      isDropdown: true,
      isActive: useCases.some((useCase) => pathname === useCase.href),
    },
    { 
      key: "pricing", 
      href: "/pricing", 
      isActive: pathname === "/pricing" 
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <NolinTextLogo textClassName="text-xl font-bold tracking-tight" domain="ai" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.isDropdown ? (
              <div key={item.key} className="relative">
                <button
                  onClick={() => setIsUseCasesOpen(!isUseCasesOpen)}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors",
                    item.isActive ? "text-primary" : "hover:text-primary",
                  )}
                >
                  {t(item.key)}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <AnimatePresence>
                  {isUseCasesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-background shadow-lg"
                      onMouseLeave={() => setIsUseCasesOpen(false)}
                    >
                      <div className="p-2">
                        {useCases.map((useCase) => (
                          <Link
                            key={useCase.key}
                            href={useCase.href}
                            className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                            onClick={() => setIsUseCasesOpen(false)}
                          >
                            {t(useCase.key)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  item.isActive ? "text-primary" : "hover:text-primary",
                )}
              >
                {t(item.key)}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop Auth Buttons and Language Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle />
          {isLoading ? (
            <div className="h-9 w-24 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <>
              <Button size="sm" asChild>
                <a href={appDomain}>
                  {t("dashboard")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="sm" variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" asChild>
                <Link href="/auth?mode=login">
                  {t("login")}
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth?mode=signup">
                  {t("get_started")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-50 border-b bg-background md:hidden"
            >
              <div className="container py-4 space-y-4">
                <div className="space-y-2">
                  <div className="font-medium">{t("use_cases")}</div>
                  {useCases.map((useCase) => (
                    <Link
                      key={useCase.key}
                      href={useCase.href}
                      className="block pl-4 py-2 text-sm hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t(useCase.key)}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/pricing"
                  className="block py-2 text-sm font-medium hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("pricing")}
                </Link>
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <div className="flex items-center">
                    <LanguageToggle />
                  </div>
                  {user ? (
                    <>
                      <Button
                        size="sm"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <a href={appDomain}>
                          {t("dashboard")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/auth?mode=login">
                          {t("login")}
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/auth?mode=signup">
                          {t("get_started")}
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
