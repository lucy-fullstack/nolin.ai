"use client"
import { motion } from "framer-motion"
import { FileText, Linkedin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotionLinkedInFlowProps {
  className?: string
  circleText?: string
  badgeTexts?: {
    first: string
    second: string
    third: string
    fourth: string
  }
  buttonTexts?: {
    first: string
    second: string
  }
  title?: string
  lightColor?: string
  animateLines?: boolean
  fixAnimationTiming?: boolean
  synchronizeFlowPaths?: boolean
  improvePathConnections?: boolean
  enhanceParticleEffect?: boolean
}

const NotionLinkedInFlow = ({
  className,
  circleText = "nolin.ai",
  badgeTexts = {
    first: "CREATE",
    second: "SCHEDULE",
    third: "PUBLISH",
    fourth: "ANALYZE",
  },
  buttonTexts = {
    first: "Notion",
    second: "LinkedIn",
  },
  title = "Schedule LinkedIn posts directly from Notion",
  lightColor = "hsl(var(--primary))",
  animateLines = false,
  fixAnimationTiming = false,
  synchronizeFlowPaths = false,
  improvePathConnections = false,
  enhanceParticleEffect = false,
}: NotionLinkedInFlowProps) => {
  return (
    <div className={cn("relative flex h-[350px] w-full max-w-[600px] flex-col items-center", className)}>
      {/* SVG Paths  */}
      <svg className="h-full sm:w-full text-primary/70" width="100%" height="100%" viewBox="0 0 220 100">
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth={improvePathConnections ? "1.5" : "1.2"}
          strokeDasharray={animateLines ? "100 100" : "0 0"}
          pathLength="100"
        >
          <motion.path
            d={improvePathConnections 
              ? "M 31 10 v 15 q 0 5 5 5 h 64 q 5 0 5 5 v 10"
              : "M 31 10 v 15 q 0 5 5 5 h 64 q 5 0 5 5 v 10"
            }
            initial={animateLines ? { strokeDashoffset: 100 } : { strokeDashoffset: 0 }}
            animate={animateLines ? { strokeDashoffset: 0 } : {}}
            transition={{ 
              duration: fixAnimationTiming ? 1.8 : 1.5, 
              ease: "easeInOut",
              delay: synchronizeFlowPaths ? 0.1 : 0
            }}
          />
          <motion.path
            d={improvePathConnections 
              ? "M 80 10 v 10 q 0 5 5 5 h 15 q 5 0 5 5 v 10"
              : "M 80 10 v 10 q 0 5 5 5 h 15 q 5 0 5 5 v 10"
            }
            initial={animateLines ? { strokeDashoffset: 100 } : { strokeDashoffset: 0 }}
            animate={animateLines ? { strokeDashoffset: 0 } : {}}
            transition={{ 
              duration: fixAnimationTiming ? 1.6 : 1.5, 
              delay: synchronizeFlowPaths ? 0.4 : 0.3, 
              ease: "easeInOut" 
            }}
          />
          <motion.path
            d={improvePathConnections 
              ? "M 132 10 v 10 q 0 5 -5 5 h -17 q -5 0 -5 5 v 10"
              : "M 132 10 v 10 q 0 5 -5 5 h -17 q -5 0 -5 5 v 10"
            }
            initial={animateLines ? { strokeDashoffset: 100 } : { strokeDashoffset: 0 }}
            animate={animateLines ? { strokeDashoffset: 0 } : {}}
            transition={{ 
              duration: fixAnimationTiming ? 1.6 : 1.5, 
              delay: synchronizeFlowPaths ? 0.7 : 0.6, 
              ease: "easeInOut" 
            }}
          />
          <motion.path
            d={improvePathConnections 
              ? "M 184 10 v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10"
              : "M 184 10 v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10"
            }
            initial={animateLines ? { strokeDashoffset: 100 } : { strokeDashoffset: 0 }}
            animate={animateLines ? { strokeDashoffset: 0 } : {}}
            transition={{ 
              duration: fixAnimationTiming ? 1.8 : 1.5, 
              delay: synchronizeFlowPaths ? 1.0 : 0.9, 
              ease: "easeInOut" 
            }}
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <motion.circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r={enhanceParticleEffect ? "14" : "12"}
            fill="url(#db-blue-grad)"
            initial={animateLines ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: fixAnimationTiming ? 1.0 : 0.8, 
              delay: synchronizeFlowPaths ? 1.3 : 1.2 
            }}
          />
        </g>
        <g mask="url(#db-mask-2)">
          <motion.circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r={enhanceParticleEffect ? "14" : "12"}
            fill="url(#db-blue-grad)"
            initial={animateLines ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: fixAnimationTiming ? 1.0 : 0.8, 
              delay: synchronizeFlowPaths ? 1.6 : 1.5 
            }}
          />
        </g>
        <g mask="url(#db-mask-3)">
          <motion.circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r={enhanceParticleEffect ? "14" : "12"}
            fill="url(#db-blue-grad)"
            initial={animateLines ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: fixAnimationTiming ? 1.0 : 0.8, 
              delay: synchronizeFlowPaths ? 1.9 : 1.8 
            }}
          />
        </g>
        <g mask="url(#db-mask-4)">
          <motion.circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r={enhanceParticleEffect ? "14" : "12"}
            fill="url(#db-blue-grad)"
            initial={animateLines ? { opacity: 0 } : { opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: fixAnimationTiming ? 1.0 : 0.8, 
              delay: synchronizeFlowPaths ? 2.2 : 2.1 
            }}
          />
        </g>

        {/* Add synchronized particle animations if enhanced effect is enabled */}
        {enhanceParticleEffect && (
          <>
            <motion.circle
              r="2"
              fill={lightColor}
              filter="blur(2px)"
              style={{ offsetPath: "path('M 31 10 v 15 q 0 5 5 5 h 64 q 5 0 5 5 v 10')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0] 
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
            <motion.circle
              r="2"
              fill={lightColor}
              filter="blur(2px)"
              style={{ offsetPath: "path('M 80 10 v 10 q 0 5 5 5 h 15 q 5 0 5 5 v 10')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0] 
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <motion.circle
              r="2"
              fill={lightColor}
              filter="blur(2px)"
              style={{ offsetPath: "path('M 132 10 v 10 q 0 5 -5 5 h -17 q -5 0 -5 5 v 10')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0] 
              }}
              transition={{
                duration: 2.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            />
            <motion.circle
              r="2"
              fill={lightColor}
              filter="blur(2px)"
              style={{ offsetPath: "path('M 184 10 v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0] 
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.1
              }}
            />
          </>
        )}
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* First Button */}
          <g>
            <rect fill="#18181B" x="10" y="5" width="42" height="10" rx="5"></rect>
            <NotionIcon x="14" y="7.5"></NotionIcon>
            <text x="24" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.first}
            </text>
          </g>
          {/* Second Button */}
          <g>
            <rect fill="#18181B" x="56" y="5" width="48" height="10" rx="5"></rect>
            <CalendarIcon x="60" y="7.5"></CalendarIcon>
            <text x="70" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.second}
            </text>
          </g>
          {/* Third Button */}
          <g>
            <rect fill="#18181B" x="108" y="5" width="48" height="10" rx="5"></rect>
            <LinkedInIcon x="112" y="7.5"></LinkedInIcon>
            <text x="122" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.third}
            </text>
          </g>
          {/* Fourth Button */}
          <g>
            <rect fill="#18181B" x="160" y="5" width="48" height="10" rx="5"></rect>
            <AnalyticsIcon x="164" y="7.5"></AnalyticsIcon>
            <text x="175" y="12" fill="white" stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts?.fourth}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 - Create in Notion */}
          <mask id="db-mask-1">
            <path d="M 31 10 v 15 q 0 5 5 5 h 64 q 5 0 5 5 v 10" strokeWidth="1" stroke="white" />
          </mask>
          {/* 2 - Schedule */}
          <mask id="db-mask-2">
            <path d="M 80 10 v 10 q 0 5 5 5 h 15 q 5 0 5 5 v 10" strokeWidth="1" stroke="white" />
          </mask>
          {/* 3 - Publish to LinkedIn */}
          <mask id="db-mask-3">
            <path d="M 132 10 v 10 q 0 5 -5 5 h -17 q -5 0 -5 5 v 10" strokeWidth="1" stroke="white" />
          </mask>
          {/* 4 - Analytics */}
          <mask id="db-mask-4">
            <path d="M 184 10 v 15 q 0 5 -5 5 h -65 q -5 0 -5 5 v 10" strokeWidth="1" stroke="white" />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-primary/10" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-[#101112] px-2 py-1 sm:-top-4 sm:py-1.5">
          <Clock className="size-3" />
          <span className="ml-2 text-[10px] text-white">{title}</span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t bg-[#141516] font-semibold text-xs text-white">
          {circleText}
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-[#101112] px-3 text-xs border flex items-center gap-2 text-white">
            <FileText className="size-4" />
            <span>{buttonTexts?.first}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-[#101112] px-3 text-xs sm:flex border items-center gap-2 text-white">
            <Linkedin className="size-4" />
            <span>{buttonTexts?.second}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-primary/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-primary/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-primary/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-primary/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
    </div>
  )
}

export default NotionLinkedInFlow

const NotionIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h12" />
    </svg>
  )
}

const LinkedInIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const CalendarIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

const AnalyticsIcon = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}
