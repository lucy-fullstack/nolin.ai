"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"

// Add translations for these fields since they're not in language-context.tsx yet
const waitlistTranslations = {
  en: {
    "waitlist_success_title": "You're on the list!",
    "waitlist_success_message": "Thank you for joining our waitlist. We'll notify you when nolin.ai launches.",
    "email": "Email",
    "full_name": "Full Name",
    "company": "Company",
    "your_company": "Your company",
    "role": "Role",
    "select_role": "Select your role",
    "content_creator": "Content Creator",
    "ghostwriter": "Ghostwriter",
    "community_manager": "Community Manager",
    "agency_owner": "Agency Owner",
    "marketing_manager": "Marketing Manager",
    "other_role": "Another role",
    "newsletter_consent": "Keep me updated about nolin.ai news and special offers",
    "privacy_agreement": "By submitting, you agree to our",
  },
  es: {
    "waitlist_success_title": "¡Estás en la lista!",
    "waitlist_success_message": "Gracias por unirte a nuestra lista de espera. Te notificaremos cuando nolin.ai se lance.",
    "email": "Correo Electrónico",
    "full_name": "Nombre Completo",
    "company": "Empresa",
    "your_company": "Tu empresa",
    "role": "Cargo",
    "select_role": "Selecciona tu cargo",
    "content_creator": "Creador de Contenido",
    "ghostwriter": "Redactor",
    "community_manager": "Gestor de Comunidad",
    "agency_owner": "Propietario de Agencia",
    "marketing_manager": "Gerente de Marketing",
    "other_role": "Otro cargo",
    "newsletter_consent": "Mantenme informado sobre noticias y ofertas de nolin.ai",
    "privacy_agreement": "Al enviar, aceptas nuestra",
  }
}

export function WaitlistForm() {
  const { t, language } = useLanguage()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    role: "",
    newsletter: true,
  })

  const wt = (key: string): string => {
    return waitlistTranslations[language][key] || waitlistTranslations.en[key] || key
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, newsletter: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally send the data to your backend
    console.log("Form submitted:", formData)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  if (isSubmitted) {
    return (
      <div className="bg-card border rounded-lg p-8 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-2xl font-bold">{wt("waitlist_success_title")}</h3>
        <p className="text-muted-foreground">
          {wt("waitlist_success_message")}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              {wt("email")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">
              {wt("full_name")} <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">{wt("company")}</Label>
            <Input
              id="company"
              name="company"
              placeholder={wt("your_company")}
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">{wt("role")}</Label>
            <Select onValueChange={handleRoleChange} value={formData.role}>
              <SelectTrigger id="role" className="bg-white">
                <SelectValue placeholder={wt("select_role")} />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="content-creator" className="hover:bg-muted">{wt("content_creator")}</SelectItem>
                <SelectItem value="ghostwriter" className="hover:bg-muted">{wt("ghostwriter")}</SelectItem>
                <SelectItem value="community_manager" className="hover:bg-muted">{wt("community_manager")}</SelectItem>
                <SelectItem value="agency-owner" className="hover:bg-muted">{wt("agency_owner")}</SelectItem>
                <SelectItem value="marketing-manager" className="hover:bg-muted">{wt("marketing_manager")}</SelectItem>
                <SelectItem value="other" className="hover:bg-muted">{wt("other_role")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" checked={formData.newsletter} onCheckedChange={handleCheckboxChange} />
          <Label htmlFor="newsletter" className="text-sm font-normal">
            {wt("newsletter_consent")}
          </Label>
        </div>

        <Button type="submit" className="w-full" size="lg">
          {t("join_waitlist")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          {wt("privacy_agreement")}{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            {t("privacy_policy")}
          </Link>
          .
        </p>
      </form>
    </div>
  )
}
