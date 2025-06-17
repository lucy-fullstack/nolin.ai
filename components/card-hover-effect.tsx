"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Auto slide for mobile
  useEffect(() => {
    // Only set up timer if on mobile
    if (isMobile) {
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      // Set new timer
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, 3000)
    }
    
    // Clear timer when component unmounts or when not mobile
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isMobile, items.length, currentIndex])
  
  // Handle previous/next navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }
  
  // Handle dot navigation
  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <>
      {/* Desktop layout - Grid */}
      {!isMobile && (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative group block p-6 h-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-primary/10 dark:bg-primary/20 block rounded-lg"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
              <div className="rounded-lg border bg-card p-6 h-full relative z-10">
                <div className="mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mobile layout - Card Slider */}
      {isMobile && (
        <div className="w-full mx-auto max-w-full" ref={containerRef}>
          {/* Card slider container with specific width */}
          <div className="relative w-[90%] mx-auto">
            {/* Card slider */}
            <div className="overflow-hidden">
              <div className="relative">
                {/* Slider container */}
                <div className="flex transition-transform duration-500 ease-in-out" 
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-full flex-shrink-0 flex-grow-0"
                    >
                      <div className="mx-auto rounded-lg border border-border/60 bg-card p-3 h-[140px] relative z-10 shadow-sm overflow-hidden">
                        <div className="mb-1.5 flex justify-center">
                          <div className="flex items-center justify-center size-6 rounded-full bg-primary/10">
                            <div className="h-3 w-3 text-primary">
                              {item.icon}
                            </div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm mb-1 text-center line-clamp-1">{item.title}</h4>
                        <p className="text-muted-foreground text-center text-xs line-clamp-3">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center z-20">
                <button 
                  onClick={handlePrev}
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-background/90 border shadow-sm backdrop-blur-sm text-foreground -ml-2.5"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center z-20">
                <button 
                  onClick={handleNext}
                  className="flex items-center justify-center w-5 h-5 rounded-full bg-background/90 border shadow-sm backdrop-blur-sm text-foreground -mr-2.5"
                  aria-label="Next card"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

              {/* Pagination dots */}
              <div className="mt-2 flex justify-center gap-1">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to card ${idx + 1}`}
                    className={`h-1.5 transition-all duration-300 ${
                      currentIndex === idx 
                        ? "w-3 bg-primary rounded-full" 
                        : "w-1.5 bg-primary/20 rounded-full"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
