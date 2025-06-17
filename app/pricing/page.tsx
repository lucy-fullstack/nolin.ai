import type { Metadata } from "next"
import { PricingSection } from "@/components/pricing-section"
import { translations } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: {
    default: "Pricing | nolin.ai",
    es: "Precios | nolin.ai"
  },
  description: {
    default: "Simple, transparent pricing for social media content creators and agencies. Join the waitlist today.",
    es: "Precios simples y transparentes para creadores de contenido y agencias en redes sociales. Únete a la lista de espera hoy."
  },
  alternates: {
    languages: {
      'en': '/pricing',
      'es': '/pricing'
    }
  }
}

export default function PricingPage() {
  return <PricingSection />
}
