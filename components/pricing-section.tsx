"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, User, Users, Building2, Gift } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { WaitlistModal } from "@/components/waitlist-modal"

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false)
  const { t, language } = useLanguage()

  const plans = [
    {
      name: "Individual",
      nameEs: "Individual",
      description: "Perfect for solo LinkedIn creators and ghostwriters",
      descriptionEs: "Perfecto para creadores de LinkedIn y ghostwriters individuales",
      price: {
        monthly: 12,
        yearly: 8,
      },
      features: [
        { en: "1 LinkedIn account", es: "1 cuenta de LinkedIn" },
        { en: "Unlimited scheduled posts", es: "Publicaciones programadas ilimitadas" },
        { en: "Basic analytics", es: "Análisis básicos" },
        { en: "Notion integration", es: "Integración con Notion" },
        { en: "Content calendar", es: "Calendario de contenido" },
      ],
      limitations: [
        { en: "Limited team features", es: "Funciones de equipo limitadas" },
        { en: "Basic support", es: "Soporte básico" }
      ],
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Team",
      nameEs: "Equipo",
      description: "Ideal for small teams managing multiple accounts",
      descriptionEs: "Ideal para equipos pequeños que gestionan múltiples cuentas",
      price: {
        monthly: 39,
        yearly: 29,
      },
      features: [
        { en: "5 LinkedIn accounts", es: "5 cuentas de LinkedIn" },
        { en: "Unlimited scheduled posts", es: "Publicaciones programadas ilimitadas" },
        { en: "Advanced analytics", es: "Análisis avanzados" },
        { en: "Notion integration", es: "Integración con Notion" },
        { en: "Content calendar", es: "Calendario de contenido" },
        { en: "Team collaboration", es: "Colaboración en equipo" },
        { en: "Approval workflows", es: "Flujos de aprobación" },
        { en: "Priority support", es: "Soporte prioritario" },
      ],
      limitations: [],
      icon: <Users className="h-5 w-5" />,
      popular: true,
    },
    {
      name: "Agency",
      nameEs: "Agencia",
      description: "For agencies managing multiple clients and accounts",
      descriptionEs: "Para agencias que gestionan múltiples clientes y cuentas",
      price: {
        monthly: 59,
        yearly: 39,
      },
      features: [
        { en: "Unlimited LinkedIn accounts", es: "Cuentas de LinkedIn ilimitadas" },
        { en: "Unlimited scheduled posts", es: "Publicaciones programadas ilimitadas" },
        { en: "Advanced analytics with custom reports", es: "Análisis avanzados con informes personalizados" },
        { en: "Notion integration", es: "Integración con Notion" },
        { en: "Content calendar", es: "Calendario de contenido" },
        { en: "Team collaboration", es: "Colaboración en equipo" },
        { en: "Approval workflows", es: "Flujos de aprobación" },
        { en: "Client access portal", es: "Portal de acceso para clientes" },
        { en: "White-label reports", es: "Informes de marca blanca" },
        { en: "API access", es: "Acceso a API" },
        { en: "Dedicated support", es: "Soporte dedicado" },
      ],
      limitations: [],
      icon: <Building2 className="h-5 w-5" />,
    },
  ]

  const includedFeatures = [
    { en: "Notion integration", es: "Integración con Notion" },
    { en: "Automated publishing", es: "Publicación automatizada" },
    { en: "Content calendar", es: "Calendario de contenido" },
    { en: "Basic analytics", es: "Análisis básicos" },
    { en: "SSL security", es: "Seguridad SSL" },
    { en: "99.9% uptime guarantee", es: "Garantía de 99.9% de tiempo de actividad" },
  ]

  // Helper function to get localized content
  const getLocalizedContent = (enContent: string, esContent: string) => {
    return language === "es" ? esContent : enContent;
  };

  // Helper function to get localized feature
  const getLocalizedFeature = (feature: { en: string, es: string }) => {
    return language === "es" ? feature.es : feature.en;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{t("pricing_title")}</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {t("pricing_subtitle")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Waitlist Announcement Banner */}
        <div className="relative py-3 -mt-4 mb-8">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 border border-primary/30 rounded-lg p-4 max-w-2xl mx-auto flex items-center justify-center gap-3 text-center shadow-sm"
            >
              <Gift className="h-5 w-5 text-primary flex-shrink-0" />
              <p className="text-sm md:text-base font-medium">
                {t("waitlist_free_month")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Pricing Toggle */}
        <section className="py-8">
          <div className="container">
            <div className="flex justify-center mb-12">
              <div className="bg-muted inline-flex items-center p-1 rounded-full">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {t("monthly")}
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isYearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  {t("yearly")} <span className="text-xs opacity-75">({t("save_percent")})</span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full flex flex-col ${
                      plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""
                    }`}
                  >
                    <CardHeader>
                      {plan.popular && (
                        <Badge className="w-fit mb-2" variant="default">
                          {t("most_popular")}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {plan.icon}
                        </div>
                        <CardTitle>{getLocalizedContent(plan.name, plan.nameEs)}</CardTitle>
                      </div>
                      <CardDescription>{getLocalizedContent(plan.description, plan.descriptionEs)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-6">
                        <span className="text-4xl font-bold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                        <span className="text-muted-foreground ml-2">/{isYearly ? t("mo_billed_yearly") : t("month")}</span>
                      </div>

                      <div className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{getLocalizedFeature(feature)}</span>
                          </div>
                        ))}

                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{getLocalizedFeature(limitation)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Button className="w-full" onClick={() => setIsWaitlistModalOpen(true)}>
                        {t("join_waitlist")}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center w-full">{t("no_credit_card")}</p>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Included in all plans */}
            <div className="mt-16 max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{t("included_all_plans")}</h2>
                <p className="text-muted-foreground">
                  {t("included_all_plans_desc")}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {includedFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{getLocalizedFeature(feature)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Early Access CTA */}
            <div className="mt-12 max-w-xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-primary/5 border border-primary/10 rounded-lg p-6 text-center"
              >
                <h3 className="text-xl font-bold mb-2">{t("early_access")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t("early_access_desc")}
                </p>
                <Button className="px-6" onClick={() => setIsWaitlistModalOpen(true)}>
                  {t("join_waitlist")}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("faq_title")}</h2>
              <p className="text-muted-foreground">
                {t("faq_more_questions")}{" "}
                <a href="mailto:hi@nolin.ai" className="text-primary hover:underline">
                  hi@nolin.ai
                </a>
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: { en: "How does the waitlist work?", es: "¿Cómo funciona la lista de espera?" },
                  answer: { 
                    en: "Join our waitlist now, and when we launch, you'll be among the first to know and try Nolin.", 
                    es: "Únete a nuestra lista de espera ahora, y cuando lancemos, serás de los primeros en saberlo y probar Nolin." 
                  }
                },
                {
                  question: { en: "Can I switch plans later?", es: "¿Puedo cambiar de plan más adelante?" },
                  answer: {
                    en: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                    es: "Sí, puedes actualizar o reducir tu plan en cualquier momento. Los cambios se reflejarán en tu próximo ciclo de facturación."
                  }
                },
                {
                  question: { en: "Is there a free trial?", es: "¿Hay una prueba gratuita?" },
                  answer: { 
                    en: "Details about our trial period will be announced when we launch. Join the waitlist to be the first to know.", 
                    es: "Los detalles sobre nuestro período de prueba se anunciarán cuando lancemos. Únete a la lista de espera para ser el primero en saberlo." 
                  }
                },
                {
                  question: { en: "When will Nolin launch?", es: "¿Cuándo se lanzará Nolin?" },
                  answer: {
                    en: "We're working hard to launch soon. Join the waitlist to be notified as soon as we're ready.",
                    es: "Estamos trabajando arduamente para lanzar pronto. Únete a la lista de espera para ser notificado tan pronto como estemos listos."
                  }
                },
                {
                  question: { en: "Can I cancel anytime?", es: "¿Puedo cancelar en cualquier momento?" },
                  answer: {
                    en: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                    es: "Sí, puedes cancelar tu suscripción en cualquier momento. Seguirás teniendo acceso hasta el final de tu período de facturación."
                  }
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-card border rounded-lg p-6"
                >
                  <h3 className="text-lg font-semibold mb-2">{language === "es" ? faq.question.es : faq.question.en}</h3>
                  <p className="text-muted-foreground">{language === "es" ? faq.answer.es : faq.answer.en}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)} />
    </div>
  )
}
