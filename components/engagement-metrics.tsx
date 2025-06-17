"use client"

import { motion } from "framer-motion"
import {
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
} from "@/components/ui/chart"

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

export function EngagementMetricsChart() {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-muted-foreground">Monthly Overview</h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#3b82f6]"></div>
              <span className="text-xs text-muted-foreground">Impressions</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#10b981]"></div>
              <span className="text-xs text-muted-foreground">Likes</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#8b5cf6]"></div>
              <span className="text-xs text-muted-foreground">Comments</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="h-80 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            {/* Define gradients for area fills */}
            <defs>
              <linearGradient id="impressionsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="likesArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="commentsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Light gridlines */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 142, 160, 0.1)" vertical={false} />

            {/* X and Y axes */}
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              dy={10}
              tickFormatter={(value, index) => (index % 5 === 0 ? value : "")}
            />

            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} width={40} />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ padding: "4px 0" }}
              labelStyle={{ fontWeight: 600, marginBottom: "8px" }}
            />

            {/* Legend */}
            <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} />

            {/* Area fills under the lines */}
            <Area
              type="monotone"
              dataKey="impressions"
              fill="url(#impressionsArea)"
              stroke="none"
              fillOpacity={1}
              stackId="1"
            />

            <Area type="monotone" dataKey="likes" fill="url(#likesArea)" stroke="none" fillOpacity={1} stackId="2" />

            <Area
              type="monotone"
              dataKey="comments"
              fill="url(#commentsArea)"
              stroke="none"
              fillOpacity={1}
              stackId="3"
            />

            {/* Main lines with animations */}
            <Line
              type="monotone"
              dataKey="impressions"
              name="Impressions"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationEasing="ease-out"
            />

            <Line
              type="monotone"
              dataKey="likes"
              name="Likes"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={300}
            />

            <Line
              type="monotone"
              dataKey="comments"
              name="Comments"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
              animationEasing="ease-out"
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-muted/20 border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Peak Impressions</div>
          <div className="text-2xl font-semibold">5,850</div>
          <div className="text-xs text-muted-foreground mt-1">April 19</div>
        </div>
        <div className="bg-muted/20 border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Highest Engagement</div>
          <div className="text-2xl font-semibold">18.2%</div>
          <div className="text-xs text-muted-foreground mt-1">April 15</div>
        </div>
        <div className="bg-muted/20 border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Growth Rate</div>
          <div className="text-2xl font-semibold">+24.6%</div>
          <div className="text-xs text-muted-foreground mt-1">Month over Month</div>
        </div>
      </div>
    </div>
  )
}
