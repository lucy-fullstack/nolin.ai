"use client"

import Link from "next/link"
import { NolinTextLogo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="border-t py-6 sm:py-8 mt-8 bg-background w-full">
      <div className="container px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center justify-center">
          <NolinTextLogo domain="ai" className="h-6" />
        </div>
        <p className="text-sm text-foreground/80 text-center font-medium my-3">
          {t("rights_reserved")}
        </p>
        <div className="flex gap-4 mb-2 md:mb-0">
          <Link 
            href="/privacy" 
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors underline underline-offset-4"
          >
            {t("privacy_policy")}
          </Link>
        </div>
      </div>
      <div className="container px-4 sm:px-6 flex flex-col items-center md:hidden mt-4 space-y-3 border-t pt-4">
        <p className="text-sm text-foreground/80 text-center font-medium">
          {t("rights_reserved")}
        </p>
        <Link 
          href="/privacy" 
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors underline underline-offset-4"
        >
          {t("privacy_policy")}
        </Link>
        <p className="text-xs text-muted-foreground/80 pt-2">
          © {new Date().getFullYear()} nolin.ai
        </p>
      </div>
    </footer>
  )
} 