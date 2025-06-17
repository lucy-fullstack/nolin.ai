"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Gift } from "lucide-react"

interface Feature {
  name: string
  description: string
  included: boolean
}

interface PricingTier {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)

  const buttonStyles = {
    default: cn(
      "h-12 bg-white dark:bg-zinc-900",
      "hover:bg-zinc-50 dark:hover:bg-zinc-800",
      "text-zinc-900 dark:text-zinc-100",
      "border border-zinc-200 dark:border-zinc-800",
      "hover:border-zinc-300 dark:hover:border-zinc-700",
      "shadow-sm hover:shadow-md",
      "text-sm font-medium",
      "relative",
    ),
    highlight: cn(
      "h-12 bg-zinc-900 dark:bg-zinc-100",
      "hover:bg-zinc-800 dark:hover:bg-zinc-300",
      "text-white dark:text-zinc-900",
      "shadow-[0_1px_15px_rgba(0,0,0,0.1)]",
      "hover:shadow-[0_1px_20px_rgba(0,0,0,0.15)]",
      "font-semibold text-base",
      "relative",
    ),
  }

  const badgeStyles = cn(
    "px-4 py-1.5 text-sm font-medium",
    "bg-zinc-900 dark:bg-zinc-100",
    "text-white dark:text-zinc-900",
    "border-none shadow-lg",
  )

  const waitlistBannerStyles = cn(
    "bg-gradient-to-r from-zinc-100/70 to-zinc-50/90 dark:from-zinc-800/70 dark:to-zinc-900/90",
    "border border-zinc-200/70 dark:border-zinc-700/70",
    "rounded-lg p-4 max-w-lg mx-auto my-6",
    "flex items-center justify-center gap-3 text-center",
    "shadow-sm"
  )

  return (
    <section
      className={cn(
        "relative bg-background text-foreground",
        "py-12 px-4 md:py-24 lg:py-32",
        "overflow-hidden",
        className,
      )}
    >
      {/* Waitlist Banner */}
      <div className={waitlistBannerStyles}>
        <Gift className="h-5 w-5 text-zinc-900 dark:text-zinc-100 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium">
          Sign up for the waitlist to get 1 month for free once we launch
        </p>
      </div>
      
      {/* Rest of the pricing section content */}
    </section>
  )
}

export { PricingSection }
