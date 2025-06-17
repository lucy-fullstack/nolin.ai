"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export function LanguageHtmlAttributes() {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return null
} 