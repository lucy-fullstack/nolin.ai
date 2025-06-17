"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip, LineChart, Line, BarChart, Bar, Cell } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TooltipProps } from "@/components/AreaChart"
import { EngagementMetricsChart } from "./engagement-metrics"
import { TimeSavedMetricsChart } from "./time-saved-metrics"
import { ContentPerformanceChart } from "./content-performance-metrics"
import { useLanguage } from "@/contexts/language-context"

export function AnalyticsGraph() {
  const [timeframe, setTimeframe] = useState("30d")
  const [datas, setDatas] = useState<TooltipProps | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

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

  // Sample data for engagement metrics - 30 day span
  const engagementData = [
    { date: "Mar 20", impressions: 1200, likes: 45, comments: 12 },
    { date: "Mar 21", impressions: 1350, likes: 52, comments: 15 },
    { date: "Mar 22", impressions: 1500, likes: 63, comments: 21 },
    { date: "Mar 23", impressions: 1420, likes: 58, comments: 18 },
    { date: "Mar 24", impressions: 1650, likes: 72, comments: 24 },
    { date: "Mar 25", impressions: 1800, likes: 85, comments: 28 },
    { date: "Mar 26", impressions: 2100, likes: 95, comments: 32 },
    { date: "Mar 27", impressions: 2300, likes: 105, comments: 38 },
    { date: "Mar 28", impressions: 2450, likes: 118, comments: 42 },
    { date: "Mar 29", impressions: 2600, likes: 125, comments: 45 },
    { date: "Mar 30", impressions: 2750, likes: 132, comments: 48 },
    { date: "Mar 31", impressions: 2900, likes: 140, comments: 52 },
    { date: "Apr 1", impressions: 3100, likes: 155, comments: 58 },
    { date: "Apr 2", impressions: 3300, likes: 165, comments: 62 },
    { date: "Apr 3", impressions: 3450, likes: 172, comments: 65 },
    { date: "Apr 4", impressions: 3600, likes: 180, comments: 68 },
    { date: "Apr 5", impressions: 3750, likes: 188, comments: 72 },
    { date: "Apr 6", impressions: 3900, likes: 195, comments: 76 },
    { date: "Apr 7", impressions: 4050, likes: 203, comments: 80 },
    { date: "Apr 8", impressions: 4200, likes: 210, comments: 84 },
    { date: "Apr 9", impressions: 4350, likes: 218, comments: 88 },
    { date: "Apr 10", impressions: 4500, likes: 225, comments: 92 },
    { date: "Apr 11", impressions: 4650, likes: 232, comments: 96 },
    { date: "Apr 12", impressions: 4800, likes: 240, comments: 100 },
    { date: "Apr 13", impressions: 4950, likes: 248, comments: 104 },
    { date: "Apr 14", impressions: 5100, likes: 255, comments: 108 },
    { date: "Apr 15", impressions: 5250, likes: 262, comments: 112 },
    { date: "Apr 16", impressions: 5400, likes: 270, comments: 116 },
    { date: "Apr 17", impressions: 5550, likes: 278, comments: 120 },
    { date: "Apr 18", impressions: 5700, likes: 285, comments: 124 },
    { date: "Apr 19", impressions: 5850, likes: 292, comments: 128 },
  ]

  // Sample data for revenue
  const revenueData = [
    { date: "Jan 23", revenue: 2340 },
    { date: "Feb 23", revenue: 3110 },
    { date: "Mar 23", revenue: 4643 },
    { date: "Apr 23", revenue: 4650 },
    { date: "May 23", revenue: 3980 },
    { date: "Jun 23", revenue: 4702 },
    { date: "Jul 23", revenue: 5990 },
    { date: "Aug 23", revenue: 5700 },
    { date: "Sep 23", revenue: 4250 },
    { date: "Oct 23", revenue: 4182 },
    { date: "Nov 23", revenue: 3812 },
    { date: "Dec 23", revenue: 4900 },
  ]

  // Sample data for time saved
  const timeSavedData = [
    { name: t("manual_process"), time: 120 },
    { name: t("with_nolin"), time: 15 },
  ]

  // Sample data for post performance
  const postPerformanceData = [
    { type: "Company News", engagement: 85 },
    { type: "Industry Insights", engagement: 92 },
    { type: "Product Updates", engagement: 78 },
    { type: "Thought Leadership", engagement: 95 },
    { type: "Team Highlights", engagement: 72 },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{t("analytics_title")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("analytics_subtitle")}
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Tabs defaultValue="engagement" className="w-full">
          <div className="flex flex-col justify-between items-start mb-6 gap-4">
            <TabsList className="w-full flex flex-col sm:flex-row h-auto p-1.5">
              <TabsTrigger 
                value="engagement" 
                className="flex-1 py-2 text-sm sm:text-base rounded-md mb-1 sm:mb-0 sm:mr-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t("engagement")}
              </TabsTrigger>
              <TabsTrigger 
                value="time-saved" 
                className="flex-1 py-2 text-sm sm:text-base rounded-md mb-1 sm:mb-0 sm:mx-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t("time_saved")}
              </TabsTrigger>
              <TabsTrigger 
                value="content-performance" 
                className="flex-1 py-2 text-sm sm:text-base rounded-md sm:ml-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {t("content_performance")}
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-sm text-muted-foreground">{t("timeframe")}</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="text-sm border rounded-md px-2 py-1"
              >
                <option value="7d">{t("days_7")}</option>
                <option value="30d">{t("days_30")}</option>
                <option value="90d">{t("days_90")}</option>
              </select>
            </div>
          </div>

          <TabsContent value="engagement" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>{t("engagement_metrics")}</CardTitle>
                <CardDescription>{t("engagement_metrics_desc")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <div className="overflow-x-auto pb-4 md:pb-0">
                  <motion.div
                    className="h-[300px] md:h-80 w-full relative"
                    style={{ minWidth: isMobile ? "100%" : "500px" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={engagementData} 
                        margin={{ 
                          top: 20, 
                          right: isMobile ? 10 : 30, 
                          left: isMobile ? 0 : 10, 
                          bottom: 10 
                        }}
                      >
                        <defs>
                          <linearGradient id="impressionsLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="likesLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="commentsLine" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 142, 160, 0.1)" vertical={false} />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: isMobile ? 8 : 10 }}
                          dy={10}
                          tickFormatter={(value, index) => (index % (isMobile ? 7 : 5) === 0 ? value : "")}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: isMobile ? 8 : 10 }} 
                          dx={-5} 
                          width={isMobile ? 25 : 40} 
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "var(--background)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            padding: isMobile ? "4px 6px" : "8px 10px",
                            fontSize: isMobile ? "12px" : "14px",
                          }}
                          itemStyle={{ padding: isMobile ? "2px 0" : "4px 0" }}
                          labelStyle={{ fontWeight: 600, marginBottom: isMobile ? "4px" : "8px", fontSize: isMobile ? "12px" : "14px" }}
                        />
                        <Legend 
                          verticalAlign="top" 
                          height={isMobile ? 24 : 36} 
                          iconType="circle" 
                          iconSize={isMobile ? 6 : 8}
                          wrapperStyle={{ fontSize: isMobile ? "10px" : "12px" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="impressions"
                          name={t("impressions")}
                          stroke="#3b82f6"
                          strokeWidth={isMobile ? 1.5 : 2.5}
                          dot={false}
                          activeDot={{ r: isMobile ? 4 : 6, strokeWidth: 0 }}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        />
                        <Line
                          type="monotone"
                          dataKey="likes"
                          name={t("likes")}
                          stroke="#10b981"
                          strokeWidth={isMobile ? 1.5 : 2.5}
                          dot={false}
                          activeDot={{ r: isMobile ? 4 : 6, strokeWidth: 0 }}
                          animationDuration={1500}
                          animationEasing="ease-out"
                          animationBegin={300}
                        />
                        <Line
                          type="monotone"
                          dataKey="comments"
                          name={t("comments")}
                          stroke="#8b5cf6"
                          strokeWidth={isMobile ? 1.5 : 2.5}
                          dot={false}
                          activeDot={{ r: isMobile ? 4 : 6, strokeWidth: 0 }}
                          animationDuration={1500}
                          animationEasing="ease-out"
                          animationBegin={600}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time-saved" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>{t("time_saved_with_nolin")}</CardTitle>
                <CardDescription>{t("time_per_post")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                <motion.div
                  className="h-[260px] md:h-64 w-full flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeSavedData}
                      layout="vertical"
                      barCategoryGap={32}
                      margin={{ 
                        top: 24, 
                        right: isMobile ? 16 : 32, 
                        left: isMobile ? 16 : 32, 
                        bottom: 24 
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 142, 160, 0.08)" horizontal vertical={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: isMobile ? 10 : 13 }} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        width={isMobile ? 90 : 120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: isMobile ? 12 : 15, fontWeight: 600 }}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(16,185,129,0.08)" }}
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          padding: isMobile ? "4px 6px" : "8px 10px",
                        }}
                        labelStyle={{ fontWeight: 600, fontSize: isMobile ? 12 : 14 }}
                        itemStyle={{ fontSize: isMobile ? 12 : 14 }}
                      />
                      <Bar
                        dataKey="time"
                        radius={[0, 8, 8, 0]}
                        isAnimationActive
                        animationDuration={1600}
                      >
                        {timeSavedData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#f87171" : "#22c55e"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Efficiency badge and summary */}
                <div className="mt-4 md:mt-6 flex flex-col items-center gap-2 px-4 pb-4 md:pb-0 md:px-0">
                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-xl md:text-3xl font-bold text-green-600">
                      {timeSavedData[0].time - timeSavedData[1].time} min
                    </span>
                    <span className="ml-1 text-sm md:text-base text-muted-foreground">{t("saved_per_post")}</span>
                  </div>
                  <span className="inline-block bg-green-100 text-green-700 text-xs md:text-sm font-semibold rounded-full px-2 md:px-3 py-1 shadow-sm">
                    {Math.round(((timeSavedData[0].time - timeSavedData[1].time) / timeSavedData[0].time) * 100)}% {t("faster_with_nolin")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content-performance" className="mt-0">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>{t("content_performance_type")}</CardTitle>
                <CardDescription>{t("engagement_by_category")}</CardDescription>
              </CardHeader>
              <CardContent className="p-0 md:p-6">
                {/* Insights summary */}
                {(() => {
                  const data = [
                    { type: t("text_post"), engagement: 78, color: "#3b82f6", icon: "📝" },
                    { type: t("carousel"), engagement: 92, color: "#10b981", icon: "📊" },
                    { type: t("video"), engagement: 85, color: "#f59e0b", icon: "🎥" },
                    { type: t("poll"), engagement: 72, color: "#8b5cf6", icon: "📊" },
                  ];
                  const best = data.reduce((a, b) => (a.engagement > b.engagement ? a : b));
                  const worst = data.reduce((a, b) => (a.engagement < b.engagement ? a : b));
                  const avg = Math.round(data.reduce((sum, d) => sum + d.engagement, 0) / data.length);
                  return (
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 text-center px-4 md:px-6">
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                        <div className="text-xs text-muted-foreground font-sans mb-1">{t("best_performing")}</div>
                        <div className="text-base md:text-lg font-bold font-sans flex items-center justify-center gap-1 md:gap-2">
                          <span className="text-xl md:text-2xl">{best.icon}</span> {best.type}
                          <span className="ml-1 md:ml-2 bg-green-100 text-green-700 text-xs font-semibold rounded-full px-1.5 md:px-2 py-0.5">{best.engagement}%</span>
                        </div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                        <div className="text-xs text-muted-foreground font-sans mb-1">{t("average_engagement")}</div>
                        <div className="text-base md:text-lg font-bold font-sans">{avg}%</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4">
                        <div className="text-xs text-muted-foreground font-sans mb-1">{t("lowest_performing")}</div>
                        <div className="text-base md:text-lg font-bold font-sans flex items-center justify-center gap-1 md:gap-2">
                          <span className="text-xl md:text-2xl">{worst.icon}</span> {worst.type}
                          <span className="ml-1 md:ml-2 bg-red-100 text-red-700 text-xs font-semibold rounded-full px-1.5 md:px-2 py-0.5">{worst.engagement}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div className="overflow-x-auto pb-4 md:pb-0">
                  <motion.div
                    className="h-[300px] md:h-80 w-full flex flex-col items-center justify-center"
                    style={{ minWidth: isMobile ? "100%" : "auto" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { type: t("text_post"), engagement: 78, color: "#3b82f6", icon: "📝" },
                          { type: t("carousel"), engagement: 92, color: "#10b981", icon: "📊" },
                          { type: t("video"), engagement: 85, color: "#f59e0b", icon: "🎥" },
                          { type: t("poll"), engagement: 72, color: "#8b5cf6", icon: "📊" },
                        ]}
                        layout="vertical"
                        margin={{ 
                          top: 24, 
                          right: isMobile ? 10 : 32, 
                          left: isMobile ? 10 : 32, 
                          bottom: 24 
                        }}
                        barCategoryGap={isMobile ? 16 : 28}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 142, 160, 0.08)" horizontal vertical={false} />
                        <XAxis 
                          type="number" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: isMobile ? 10 : 13, fontFamily: 'var(--font-sans)' }} 
                          domain={[0, 100]} 
                        />
                        <YAxis
                          dataKey="type"
                          type="category"
                          width={isMobile ? 80 : 120}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: isMobile ? 12 : 15, fontWeight: 600, fontFamily: 'var(--font-sans)' }}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(59,130,246,0.08)" }}
                          content={({ active, payload, label }) => {
                            if (!active || !payload || !payload.length) return null;
                            const d = payload[0].payload;
                            let insight = '';
                            if (d.type === t("carousel")) insight = t("insight_carousel");
                            else if (d.type === t("video")) insight = t("insight_video");
                            else if (d.type === t("text_post")) insight = t("insight_text");
                            else if (d.type === t("poll")) insight = t("insight_poll");
                            return (
                              <div className="rounded-lg border bg-background p-2 md:p-3 shadow-xl font-sans min-w-[160px] md:min-w-[180px]">
                                <div className="flex items-center gap-1 md:gap-2 mb-1">
                                  <span className="text-lg md:text-xl">{d.icon}</span>
                                  <span className="font-bold text-sm md:text-base">{d.type}</span>
                                </div>
                                <div className="text-base md:text-lg font-bold text-primary mb-0.5 md:mb-1">{d.engagement}% {t("engagement_percent")}</div>
                                <div className="text-xs text-muted-foreground">{insight}</div>
                              </div>
                            );
                          }}
                        />
                        <Bar dataKey="engagement" radius={[0, 12, 12, 0]} isAnimationActive animationDuration={1600}>
                          {[
                            { type: t("text_post"), engagement: 78, color: "#3b82f6" },
                            { type: t("carousel"), engagement: 92, color: "#10b981" },
                            { type: t("video"), engagement: 85, color: "#f59e0b" },
                            { type: t("poll"), engagement: 72, color: "#8b5cf6" },
                          ].map((entry, index, arr) => {
                            // Highlight the best performing bar
                            const isBest = entry.engagement === Math.max(...arr.map(d => d.engagement));
                            return (
                              <Cell key={`cell-${index}`} fill={entry.color} stroke={isBest ? '#22c55e' : undefined} strokeWidth={isBest ? 3 : 0} />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
