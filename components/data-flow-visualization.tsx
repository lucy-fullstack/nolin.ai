"use client"

import type React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface PlatformCardProps {
  name: string
  logo: string
  className?: string
}

const PlatformCard: React.FC<PlatformCardProps> = ({ name, logo, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Card className="shadow-lg border border-primary/10 bg-card">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center overflow-hidden">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="object-contain"
                loading="eager"
                priority={true}
              />
            </div>
            <div>
              <h3 className="font-bold text-base">{name}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// SVG Filters for premium effects
const SvgFilters = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      {/* Premium glow filter for paths */}
      <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.5" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feComposite in="SourceGraphic" in2="glow" operator="over" />
      </filter>
      
      {/* Motion blur filter for particles */}
      <filter id="motionBlur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="blurAlpha" />
        <feBlend in="SourceGraphic" in2="blurAlpha" mode="normal" />
      </filter>
      
      {/* Elegant path glow */}
      <filter id="elegantPathGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feFlood floodColor="hsl(var(--primary))" floodOpacity="0.3" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="shadow" />
        <feComposite in="SourceGraphic" in2="shadow" operator="over" />
      </filter>
    </defs>
  </svg>
);

// Flow particle component
interface FlowParticleProps {
  pathD: string;
  delay?: number;
}

const FlowParticle: React.FC<FlowParticleProps> = ({ pathD, delay = 0 }) => {
  return (
    <motion.circle
      r={3}
      fill="hsl(var(--primary))"
      filter="url(#motionBlur)"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
      style={{
        offsetPath: `path("${pathD}")`,
        offsetDistance: "0%",
        animationTimingFunction: "linear",
        animationDuration: "3s",
        animationIterationCount: "infinite",
        animationName: "moveAlongPath",
      }}
    />
  );
};

export const DataFlowVisualization: React.FC = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* SVG Filters */}
      <SvgFilters />
      
      {/* Triangle Flow Visualization - Only visible on larger screens */}
      <div className="hidden sm:block relative aspect-square">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Triangle - 50% smaller */}
          <motion.path 
            d="M150 90 L225 210 L75 210 Z" 
            stroke="hsl(var(--muted))" 
            strokeWidth="1.5" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Animated Flow Paths with premium glow effect */}
          <motion.path
            d="M150 90 L75 210"
            stroke="hsl(var(--primary)/40)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            filter="url(#elegantPathGlow)"
          />
          
          <motion.path
            d="M150 90 L225 210"
            stroke="hsl(var(--primary)/40)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            filter="url(#elegantPathGlow)"
          />
          
          {/* Animated particles along paths */}
          <motion.circle
            cx="0"
            cy="0"
            r={3}
            fill="hsl(var(--primary))"
            filter="url(#motionBlur)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            style={{
              offsetPath: "path('M150 90 L75 210')",
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.circle
            cx="0"
            cy="0"
            r={3}
            fill="hsl(var(--primary))"
            filter="url(#motionBlur)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            style={{
              offsetPath: "path('M150 90 L225 210')",
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Second set of particles for more dynamic effect */}
          <motion.circle
            cx="0"
            cy="0"
            r={2}
            fill="hsl(var(--primary))"
            filter="url(#motionBlur)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 0.7, 0]
            }}
            style={{
              offsetPath: "path('M150 90 L75 210')",
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
          />
          
          <motion.circle
            cx="0"
            cy="0"
            r={2}
            fill="hsl(var(--primary))"
            filter="url(#motionBlur)"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 0.7, 0]
            }}
            style={{
              offsetPath: "path('M150 90 L225 210')",
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.7
            }}
          />
        </svg>
        
        {/* Platform Cards - Desktop with adjusted positions for smaller triangle */}
        <div className="absolute top-[65px] left-1/2 -translate-x-1/2 w-36 z-10">
          <PlatformCard 
            name="Notion" 
            logo="/images/notion-logo.png" 
          />
        </div>
        
        <div className="absolute bottom-[65px] left-[55px] w-32 z-10">
          <PlatformCard 
            name="LinkedIn" 
            logo="/images/linkedin-logo.png" 
          />
        </div>
        
        <div className="absolute bottom-[65px] right-[55px] w-32 z-10">
          <PlatformCard 
            name="X" 
            logo="/images/x-logo.png" 
          />
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 -z-10 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      </div>
      
      {/* Mobile Responsive Version - Zig-Zag Flow with more separation between cards */}
      <div className="block sm:hidden w-full pt-4 pb-8 relative">
        <div className="relative h-[300px]">
          {/* Zig-zag flow path with improved separation */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 300" preserveAspectRatio="xMidYMid meet" fill="none">
            {/* Zig-zag path with premium glow */}
            <motion.path
              d="M50 20 L20 110 L80 180 L50 280"
              stroke="hsl(var(--muted)/30)"
              strokeWidth="1"
              strokeDasharray="3 3"
              filter="url(#elegantPathGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            
            {/* Animated particles for zig-zag path with motion blur */}
            <motion.circle
              r="3"
              fill="hsl(var(--primary))"
              filter="url(#motionBlur)"
              style={{ offsetPath: "path('M50 20 L20 110 L80 180 L50 280')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.9, 0] 
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.circle
              r="2"
              fill="hsl(var(--primary))"
              filter="url(#motionBlur)"
              style={{ offsetPath: "path('M50 20 L20 110 L80 180 L50 280')" }}
              animate={{ 
                offsetDistance: ["0%", "100%"],
                opacity: [0, 0.8, 0] 
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            />
            
            {/* Enhanced glow effects along the path */}
            <motion.circle 
              cx="20" cy="110" r="10" 
              fill="hsl(var(--primary)/15)" 
              filter="blur(12px)"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            
            <motion.circle 
              cx="80" cy="180" r="10" 
              fill="hsl(var(--primary)/15)" 
              filter="blur(12px)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            />
          </svg>
          
          {/* Notion at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-32"
            >
              <PlatformCard 
                name="Notion" 
                logo="/images/notion-logo.png" 
              />
            </motion.div>
          </div>
          
          {/* LinkedIn at first turn - moved further up and left */}
          <div className="absolute top-[100px] left-[8px] z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-30"
            >
              <PlatformCard 
                name="LinkedIn" 
                logo="/images/linkedin-logo.png"
              />
            </motion.div>
          </div>
          
          {/* X at bottom - more separation from LinkedIn */}
          <div className="absolute bottom-0 right-1/2 translate-x-1/2 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-30"
            >
              <PlatformCard 
                name="X" 
                logo="/images/x-logo.png"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
