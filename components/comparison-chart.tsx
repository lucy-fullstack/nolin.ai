"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"

export function ComparisonChart() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])
  
  const features = [
    { name: t("comparison_feature1"), nolin: true, others: false },
    { name: t("comparison_feature2"), nolin: true, others: false },
    { name: t("comparison_feature3"), nolin: true, others: false },
    { name: t("comparison_feature4"), nolin: true, others: { value: t("limited"), partial: true } },
    { name: t("comparison_feature5"), nolin: true, others: true },
    { name: t("comparison_feature6"), nolin: true, others: true },
    { name: t("comparison_feature7"), nolin: true, others: true },
    { name: t("comparison_feature8"), nolin: true, others: { value: t("limited"), partial: true } },
    { name: t("comparison_feature9"), nolin: true, others: { value: t("limited"), partial: true } },
  ]

  return (
    <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-[90rem] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl font-bold mb-2">{t("comparison_title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            {t("comparison_subtitle")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-xl overflow-hidden border shadow-lg mx-auto max-w-[95%] md:max-w-4xl lg:max-w-5xl"
        >
          {/* Table header */}
          <div className="grid grid-cols-3">
            <div className="p-2 md:p-4 bg-muted/30">
              <div className="h-12 md:h-16"></div>
            </div>
            <div className="p-2 md:p-4 bg-primary/5 border-b border-l">
              <div className="h-12 md:h-16 flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm md:text-lg text-primary mb-0.5">nolin.ai</h3>
                <div className="text-[10px] md:text-xs text-muted-foreground text-center">{t("notion_to_linkedin")}</div>
              </div>
            </div>
            <div className="p-2 md:p-4 bg-muted/10 border-b border-l">
              <div className="h-12 md:h-16 flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm md:text-lg mb-0.5">
                  {t("other_tools")}
                </h3>
                <div className="text-[10px] md:text-xs text-muted-foreground text-center">{t("traditional_schedulers")}</div>
              </div>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, i) => (
            <div key={i} className="grid grid-cols-3 border-b last:border-b-0">
              <div className="p-2 md:p-4 bg-muted/30 flex items-center">
                <div className="font-medium text-[11px] sm:text-xs md:text-sm">{feature.name}</div>
              </div>
              <div className="p-2 md:p-4 bg-primary/5 border-l flex items-center justify-center">
                <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
              </div>
              <div className="p-2 md:p-4 bg-muted/10 border-l flex items-center justify-center">
                {typeof feature.others === "boolean" ? (
                  feature.others ? (
                    <Check className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
                  )
                ) : (
                  <div className="text-[10px] md:text-xs text-amber-600">{feature.others.value}</div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
