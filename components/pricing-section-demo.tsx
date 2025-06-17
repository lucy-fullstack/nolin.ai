"use client"

import { Linkedin, Calendar, Gift } from "lucide-react"
import { PricingSection } from "@/components/ui/pricing-section"

const nolinTiers = [
  {
    name: "Creator",
    price: {
      monthly: 19,
      yearly: 190,
    },
    description: "Perfect for individual LinkedIn creators and ghostwriters",
    ctaText: "Join Waitlist – 1 Month Free",
    ctaSubtext: "No credit card required",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/30 blur-2xl rounded-full" />
        <Linkedin className="w-7 h-7 relative z-10 text-primary animate-[float_3s_ease-in-out_infinite]" />
      </div>
    ),
    features: [
      {
        name: "Schedule from Notion",
        description: "Publish content directly from your Notion workspace",
        included: true,
      },
      {
        name: "1 LinkedIn Account",
        description: "Connect and manage one LinkedIn profile or page",
        included: true,
      },
      {
        name: "Basic Analytics",
        description: "Track essential engagement metrics",
        included: true,
      },
      {
        name: "Content Calendar",
        description: "Visual calendar to plan your content",
        included: true,
      },
      {
        name: "Team Collaboration",
        description: "Work with multiple team members",
        included: false,
      },
    ],
  },
  {
    name: "Agency",
    price: {
      monthly: 49,
      yearly: 490,
    },
    description: "Ideal for agencies managing multiple LinkedIn accounts",
    ctaText: "Secure Your Free Month",
    ctaSubtext: "Limited early access",
    highlight: true,
    badge: "Most Popular",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/30 blur-2xl rounded-full" />
        <Calendar className="w-7 h-7 relative z-10 text-primary" />
      </div>
    ),
    features: [
      {
        name: "Schedule from Notion",
        description: "Publish content directly from your Notion workspace",
        included: true,
      },
      {
        name: "Unlimited LinkedIn Accounts",
        description: "Connect and manage multiple LinkedIn profiles and pages",
        included: true,
      },
      {
        name: "Advanced Analytics",
        description: "Comprehensive performance metrics and reports",
        included: true,
      },
      {
        name: "Content Calendar",
        description: "Visual calendar with team scheduling features",
        included: true,
      },
      {
        name: "Team Collaboration",
        description: "Unlimited team members with role-based permissions",
        included: true,
      },
    ],
  },
]

function PricingSectionDemo() {
  return <PricingSection tiers={nolinTiers} />
}

export { PricingSectionDemo }
