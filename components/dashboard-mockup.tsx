"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Linkedin,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Check,
} from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { useEffect, useState } from "react"

// Official X logo component
const XIcon = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
  </svg>
);

export function DashboardMockup() {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  
  // Check if we're on mobile for responsive adjustments
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
  
  return (
    <div className="w-full max-w-5xl mx-auto my-12 md:my-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl overflow-hidden border shadow-xl bg-card"
      >
        {/* Dashboard Header */}
        <div className="bg-muted/30 border-b px-3 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <h2 className="font-bold text-base md:text-lg">{t("dashboard_title")}</h2>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="h-3.5 w-3.5 md:h-4 md:w-4 absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("search_content")}
                className="pl-7 md:pl-9 pr-3 md:pr-4 py-1.5 md:py-2 text-xs md:text-sm rounded-md border bg-background w-full md:w-64"
              />
            </div>
            <button className="p-1.5 md:p-2 rounded-md hover:bg-muted transition-colors">
              <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Sidebar - Hidden on mobile, shown on tablet/desktop */}
          <div className="hidden md:block md:col-span-3 border-r h-[500px] p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-sm">{t("scheduled_content")}</h3>
              <button className="p-1 rounded-md hover:bg-muted transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-md bg-primary/10 text-primary">
                <div className="h-6 w-6 rounded-md bg-white flex items-center justify-center">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{t("upcoming", { count: 12 })}</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-6 w-6 rounded-md bg-muted/50 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-sm">{t("published", { count: 45 })}</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-6 w-6 rounded-md bg-muted/50 flex items-center justify-center">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-sm">{t("weekly_schedule")}</span>
              </div>

              <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <div className="h-6 w-6 rounded-md bg-muted/50 flex items-center justify-center">
                  <svg
                    className="h-4 w-4"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h12" />
                  </svg>
                </div>
                <span className="text-sm">{t("notion_drafts")}</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium text-sm mb-4">{t("connected_accounts")}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-[#0077B5]/10 flex items-center justify-center">
                      <Linkedin className="h-3 w-3 text-[#0077B5]" />
                    </div>
                    <span className="text-sm">{t("company_page")}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t("active")}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-[#0077B5]/10 flex items-center justify-center">
                      <Linkedin className="h-3 w-3 text-[#0077B5]" />
                    </div>
                    <span className="text-sm">{t("personal_profile")}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t("active")}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-[#000000]/10 flex items-center justify-center">
                      <XIcon />
                    </div>
                    <span className="text-sm">{t("x_profile")}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {t("active")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Quick account selector for mobile */}
          <div className="md:hidden flex overflow-x-auto py-2 px-3 gap-2 border-b scrollbar-hide">
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
              <div className="h-5 w-5 rounded-md bg-white flex items-center justify-center">
                <Clock className="h-3 w-3" />
              </div>
              <span className="text-xs font-medium">{t("upcoming", { count: 12 })}</span>
            </div>
            
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50 whitespace-nowrap flex-shrink-0">
              <div className="h-5 w-5 rounded-md bg-[#0077B5]/10 flex items-center justify-center">
                <Linkedin className="h-2.5 w-2.5 text-[#0077B5]" />
              </div>
              <span className="text-xs">{t("company_page")}</span>
            </div>
            
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-md bg-muted/50 whitespace-nowrap flex-shrink-0">
              <div className="h-5 w-5 rounded-md bg-[#000000]/10 flex items-center justify-center">
                <XIcon />
              </div>
              <span className="text-xs">{t("x_profile")}</span>
            </div>
          </div>

          {/* Main Content - Full width on mobile */}
          <div className="col-span-1 md:col-span-9 p-3 md:p-6 overflow-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
              <div className="flex items-center gap-2 md:gap-3">
                <h3 className="font-bold text-base md:text-lg">{t("content_calendar")}</h3>
                <div className="flex items-center gap-0.5 md:gap-1 text-xs md:text-sm text-muted-foreground">
                  <span>{t("may_2024")}</span>
                  <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 md:gap-3">
                <button className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md border hover:bg-muted/50 transition-colors">
                  <Filter className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>{t("filter")}</span>
                </button>
                <button className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded-md border hover:bg-muted/50 transition-colors">
                  <Calendar className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>{t("month")}</span>
                  <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5 ml-0.5 md:ml-1" />
                </button>
                <button className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <Plus className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  <span>{t("new_post")}</span>
                </button>
              </div>
            </div>

            {/* Calendar Grid - Scrollable on mobile */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[460px] md:min-w-[500px]">
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {t("weekdays").split(",").map((day, i) => (
                    <div key={i} className="text-center text-xs md:text-sm font-medium text-muted-foreground py-1 md:py-2">
                      {isMobile ? day.charAt(0) : day}
                    </div>
                  ))}

                  {Array.from({ length: 35 }).map((_, i) => {
                    const hasPost = [2, 5, 9, 14, 18, 23, 27].includes(i)
                    const isToday = i === 16
                    const isPast = i < 16

                    return (
                      <div
                        key={i}
                        className={`border rounded-md p-1 md:p-2 h-16 md:h-24 ${isToday ? "border-primary/50 bg-primary/5" : ""} ${i < 3 ? "bg-muted/30 text-muted-foreground" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <span className={`text-xs md:text-sm ${isPast && !isToday ? "text-muted-foreground" : ""}`}>
                            {i < 3 ? 28 + i : i - 2}
                          </span>
                          {hasPost && (
                            <div className="flex">
                              <div className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${isPast ? "bg-green-500" : "bg-primary"}`}></div>
                            </div>
                          )}
                        </div>

                        {hasPost && (
                          <div
                            className={`mt-1 md:mt-2 p-1 md:p-1.5 text-[10px] md:text-xs rounded ${isPast ? "bg-green-100 text-green-800" : "bg-primary/10 text-primary"} flex items-center gap-0.5 md:gap-1`}
                          >
                            {isPast ? (
                              <>
                                <Check className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                <span className="truncate">{isMobile ? "Pub." : "Published"}</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
                                <span className="truncate">{isMobile ? "Sched." : "Scheduled"}</span>
                              </>
                            )}
                            <MoreHorizontal className="h-2.5 w-2.5 md:h-3 md:w-3 ml-auto" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
