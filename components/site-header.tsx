"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { WaitlistModal } from "@/components/waitlist-modal"
import { NolinTextLogo } from "@/components/logo"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/contexts/language-context"

export function SiteHeader() {
  const pathname = usePathname()
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const { t } = useLanguage()

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
    <>
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

          {/* Desktop Waitlist Button and Language Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <Button size="sm" onClick={() => setIsWaitlistModalOpen(true)}>
              <ArrowRight className="mr-2 h-4 w-4" />
              {t("join_waitlist")}
            </Button>
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
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setIsWaitlistModalOpen(true)
                      }}
                    >
                      {t("join_waitlist")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </>
  )
}
