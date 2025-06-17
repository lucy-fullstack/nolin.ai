"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowRight, Check, Linkedin, ThumbsUp, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function IntegrationShowcase() {
  const controls = useAnimation()
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await controls.start("flow")
    }

    sequence()
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  const dataVariants = {
    hidden: { opacity: 0, y: 0 },
    flow: {
      opacity: [0, 1, 1, 0],
      y: [0, 0, 0, -30],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
      },
    },
  }

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1, ease: "easeInOut" } },
  }

  // Different path for mobile and desktop
  const svgPath = isMobile 
    ? "M50,10 C50,40 50,60 50,90" // Vertical path for mobile
    : "M10,50 C30,20 70,80 90,50" // Curved path for desktop

  return (
    <div className="w-full max-w-5xl mx-auto my-8 md:my-16 px-4">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-2">{t("integration_title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
          {t("integration_subtitle")}
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8"
        aria-label="Integration between Notion and social media platforms"
      >
        {/* Notion Side */}
        <div className="w-full md:flex-1 border rounded-xl p-4 md:p-6 bg-card shadow-lg md:max-w-md">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-md bg-[#F7FAFC] flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=40&width=40"
                width={40}
                height={40}
                alt="Notion logo"
                className="h-5 w-5 md:h-6 md:w-6"
              />
            </div>
            <div>
              <div className="font-bold text-sm md:text-base">Notion</div>
              <div className="text-xs text-muted-foreground">{t("content_creation_platform")}</div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="border rounded-md p-2 md:p-3">
              <div className="text-xs md:text-sm font-medium mb-1">{t("linkedin_content_database")}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("last_edited")}</span>
                <span>{t("post_count", { count: 25 })}</span>
              </div>
            </div>

            <div className="border rounded-md p-2 md:p-3 bg-muted/20">
              <div className="text-xs md:text-sm font-medium mb-1 md:mb-2">{t("thought_leadership_post")}</div>
              <div className="text-xs mb-2 md:mb-3">
                {t("post_preview")}
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>{t("ready_to_publish")}</span>
                </div>
                <div className="px-1.5 md:px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{t("scheduled_time")}</div>
              </div>
            </div>

            <div className="border rounded-md p-2 md:p-3">
              <div className="text-xs md:text-sm font-medium mb-1">{t("content_calendar")}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("next_weeks")}</span>
                <span>{t("scheduled_posts", { count: 8 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Animation - Reoriented for mobile */}
        <div className={`relative flex-shrink-0 ${isMobile ? 'h-24 w-full' : 'w-32 h-32'} my-2 md:my-0`}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" 
               style={{ transform: isMobile ? 'rotate(0deg)' : 'rotate(0deg)' }}>
            <motion.path
              d={svgPath}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="1"
              fill="transparent"
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>

          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={controls}
            variants={dataVariants}
            initial="hidden"
          >
            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md whitespace-nowrap">
              {t("content_data")}
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card rounded-full p-1.5 md:p-2 border shadow-md">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            </div>
          </div>
        </div>

        {/* LinkedIn Side */}
        <div className="w-full md:flex-1 border rounded-xl p-4 md:p-6 bg-card shadow-lg md:max-w-md">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-md bg-[#0077B5]/10 flex items-center justify-center">
              <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-[#0077B5]" />
            </div>
            <div>
              <div className="font-bold text-sm md:text-base">LinkedIn</div>
              <div className="text-xs text-muted-foreground">{t("publishing_platform")}</div>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="border rounded-md p-2 md:p-3">
              <div className="text-xs md:text-sm font-medium mb-1">{t("company_page")}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("followers", { count: 5280 })}</span>
                <span>{t("growth_rate")}</span>
              </div>
            </div>

            <div className="border rounded-md p-2 md:p-3 bg-muted/20">
              <div className="flex items-center gap-2 mb-1 md:mb-2">
                <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-muted/50"></div>
                <div>
                  <div className="text-xs md:text-sm font-medium">{t("your_company")}</div>
                  <div className="text-xs text-muted-foreground">{t("just_now")}</div>
                </div>
              </div>
              <div className="text-xs mb-2 md:mb-3">
                {t("post_preview")}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>0</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>0</span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-2 md:p-3">
              <div className="text-xs md:text-sm font-medium mb-1">{t("analytics")}</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("last_30_days")}</span>
                <span>{t("impressions", { count: "28.5k" })}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          {
            title: t("integration_feature_1_title"),
            description: t("integration_feature_1_desc"),
          },
          {
            title: t("integration_feature_2_title"),
            description: t("integration_feature_2_desc"),
          },
          {
            title: t("integration_feature_3_title"),
            description: t("integration_feature_3_desc"),
          },
        ].map((feature, index) => (
          <div key={index} className="border rounded-lg p-4 md:p-6 bg-card">
            <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
