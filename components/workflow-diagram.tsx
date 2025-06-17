"use client"

import { motion } from "framer-motion"
import { Check, Clock, FileText, Linkedin, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { ReactNode } from "react"

export function WorkflowDiagram() {
  const { t } = useLanguage()
  
  const steps = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: t("workflow_step1_title"),
      description: t("workflow_step1_desc"),
      delay: 0.1,
    },
    {
      icon: <Linkedin className="h-6 w-6 text-primary" />,
      title: t("workflow_step2_title"),
      description: (<><span>{t("workflow_step2_desc")}</span></>),
      delay: 0.3,
    },
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: t("workflow_step3_title"),
      description: t("workflow_step3_desc"),
      delay: 0.5,
    },
  ]

  return (
    <div className="py-12 w-full max-w-5xl mx-auto">
      <div className="relative">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center items-center w-full max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: step.delay }}
              className="flex flex-col items-center text-center z-10 w-full"
            >
              {/* Icon with step number badge overlay */}
              <div className="relative bg-card border shadow-lg rounded-full p-4 mb-4 flex items-center justify-center">
                {/* Small step number badge in top-left, overlapping edge */}
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: step.delay + 0.2 }}
                  className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-bold shadow-md border-2 border-white select-none z-10"
                  style={{ boxShadow: '0 2px 8px 0 rgba(30,64,175,0.10)' }}
                >
                  {index + 1}
                </motion.span>
                {step.icon}
              </div>
              <h4 className="font-bold mb-1 text-base md:text-lg">{step.title}</h4>
              <p className="text-sm text-muted-foreground max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
