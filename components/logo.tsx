import React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function NolinLogo({ className, size = "md", ...props }: LogoProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <svg 
      viewBox="0 0 24 24" 
      className={cn(sizeMap[size], "text-primary", className)} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="6" className="fill-current opacity-10" />
      <path 
        d="M18.4 5.5h-3.8v13h2.6v-8.32h1.2V5.5Z" 
        className="fill-current"
      />
      <path 
        d="M9.4 5.5H5.6v13h2.6v-8.32h1.2V5.5Z" 
        className="fill-current"
      />
      <path 
        d="M13.8 9.5v9h-3.6v-9h3.6Z" 
        className="fill-current"
      />
    </svg>
  )
}

interface TextLogoProps {
  className?: string
  textClassName?: string
  logoSize?: "sm" | "md" | "lg"
  domain?: "so" | "ai"
}

export function NolinTextLogo({ 
  className, 
  textClassName, 
  logoSize = "sm", 
  domain = "ai" 
}: TextLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <NolinLogo size={logoSize} />
      <span className={cn("font-semibold", textClassName)}>
        nolin.{domain}
      </span>
    </div>
  )
} 