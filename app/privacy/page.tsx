import { Metadata } from "next"
import PrivacyContent from "./privacy-content.tsx"

export const metadata: Metadata = {
  title: {
    default: "Privacy Policy | nolin.ai",
    es: "Política de Privacidad | nolin.ai"
  },
  description: {
    default: "Privacy Policy for nolin.ai - Your social media management tool for Notion content.",
    es: "Política de Privacidad para nolin.ai - Tu herramienta de gestión de redes sociales para contenido de Notion."
  },
  alternates: {
    languages: {
      'en': '/privacy',
      'es': '/privacy'
    }
  }
}

export default function Privacy() {
  return (
    <PrivacyContent />
  )
} 