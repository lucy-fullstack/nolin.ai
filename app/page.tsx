"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Linkedin, Sparkles, Zap, Users } from "lucide-react"
import Link from "next/link"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { CardHoverEffect } from "@/components/card-hover-effect"
import { WaitlistForm } from "@/components/waitlist-form"
import { HeroImage } from "@/components/hero-image"
import { WorkflowDiagram } from "@/components/workflow-diagram"
import { DashboardMockup } from "@/components/dashboard-mockup"
import { AnalyticsGraph } from "@/components/analytics-graph"
import { IntegrationShowcase } from "@/components/integration-showcase"
import { ComparisonChart } from "@/components/comparison-chart"
import { PricingSectionDemo } from "@/components/pricing-section-demo"
import { NotionLinkedInFlowDemo } from "@/components/notion-linkedin-flow-demo"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {
  const { t } = useLanguage()
  
  // Translate the typewriter words
  const typewriterWords = [
    { text: "Notion" },
    { text: t("one_place") }, 
    { text: t("anywhere") }
  ]
  
  return (
    <>
      <section className="py-16 md:py-24 lg:py-32 container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side - Text */}
          <div className="lg:w-1/2 flex flex-col text-left space-y-6 md:space-y-8 mb-10 lg:mb-0">
            {/* Social Proof Banner */}
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 bg-muted/60 text-muted-foreground text-xs md:text-sm font-medium rounded-full px-4 py-1.5 shadow-sm border border-muted/40">
                <Users className="h-3.5 w-3.5 text-primary" />
                {t("social_banner")}
              </span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
                {t("hero_title")}
                <TypewriterEffect words={typewriterWords} />
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                {t("hero_subtitle")}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="gap-2 px-6 shadow-md">
                <Link href="#waitlist">
                  {t("join_waitlist")}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Link href="#features">{t("see_features")}</Link>
              </Button>
            </div>
          </div>
          
          {/* Right side - Hero Image */}
          <div className="lg:w-1/2">
            <HeroImage />
          </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">{t("features_title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("features_subtitle")}
              </p>
            </div>
            <CardHoverEffect
              items={[
                {
                  title: t("notion_integration"),
                  description: t("notion_integration_desc"),
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                },
                {
                  title: t("time_saving"),
                  description: t("time_saving_desc"),
                  icon: <Clock className="h-6 w-6 text-primary" />,
                },
                {
                  title: t("content_calendar"),
                  description: t("content_calendar_desc"),
                  icon: <Calendar className="h-6 w-6 text-primary" />,
                },
                {
                  title: t("agency_ready"),
                  description: t("agency_ready_desc"),
                  icon: <Linkedin className="h-6 w-6 text-primary" />,
                },
                {
                  title: t("lightning_fast"),
                  description: t("lightning_fast_desc"),
                  icon: <Zap className="h-6 w-6 text-primary" />,
                },
                {
                  title: t("analytics_dashboard"),
                  description: t("analytics_dashboard_desc"),
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                },
              ]}
            />
          </div>
        </section>

        {/* Integration Showcase */}
        <IntegrationShowcase />

        {/* Notion LinkedIn Flow */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">{t("how_it_works_title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("how_it_works_subtitle")}
              </p>
            </div>
            <NotionLinkedInFlowDemo />
          </div>
        </section>

        {/* Workflow Diagram */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold tracking-tighter">{t("process_title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("process_subtitle")}
              </p>
            </div>
            <WorkflowDiagram />
          </div>
        </section>

        {/* Dashboard Mockup */}
        <DashboardMockup />

        {/* Analytics Graph */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <AnalyticsGraph />
          </div>
        </section>

        {/* Comparison Chart */}
        <ComparisonChart />

        {/* Pricing Section */}
        <section id="pricing">
          <PricingSectionDemo />
        </section>

        <section id="waitlist" className="py-20 bg-primary/5">
          <div className="container max-w-4xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">{t("waitlist_title")}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t("waitlist_subtitle")}
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>
    </>
  )
}
