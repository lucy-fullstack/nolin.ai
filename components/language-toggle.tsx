"use client"

import * as React from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface LanguageOption {
  value: "en" | "es"
  label: string
  flag: string
}

const languages: LanguageOption[] = [
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "es", label: "Español", flag: "🇪🇸" },
]

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)
  
  const currentLanguage = languages.find(lang => lang.value === language)
  
  const toggleDropdown = () => setIsOpen(!isOpen)
  
  const changeLanguage = (lang: "en" | "es") => {
    setLanguage(lang)
    setIsOpen(false)
  }
  
  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest('[data-language-switcher="true"]')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div 
      className="relative"
      data-language-switcher="true"
    >
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center justify-center h-8 px-2 rounded-full border border-primary/20 bg-background hover:bg-primary/5 transition-colors"
        aria-label="Select language"
      >
        <span className="text-base mr-1">{currentLanguage?.flag}</span>
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 rounded-md border border-input bg-background shadow-md z-10">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => changeLanguage(lang.value)}
                className={cn(
                  "flex items-center w-full px-3 py-1.5 text-sm hover:bg-muted",
                  language === lang.value ? "bg-muted" : ""
                )}
              >
                <span className="text-base mr-2">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 