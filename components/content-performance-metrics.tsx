"use client"

import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "@/components/ui/chart"
import { Eye, ThumbsUp, MessageSquare, Users } from "lucide-react"

// Sample data for post performance
const postPerformanceData = [
  { type: "Company News", engagement: 85, color: "#3b82f6" },
  { type: "Industry Insights", engagement: 92, color: "#10b981" },
  { type: "Product Updates", engagement: 78, color: "#f59e0b" },
  { type: "Thought Leadership", engagement: 95, color: "#8b5cf6" },
  { type: "Team Highlights", engagement: 72, color: "#ec4899" },
]

// Sample data for content metrics
const contentMetricsData = [
  { subject: "Impressions", A: 85, B: 90, fullMark: 100 },
  { subject: "Likes", A: 78, B: 85, fullMark: 100 },
  { subject: "Comments", A: 65, B: 75, fullMark: 100 },
  { subject: "Shares", A: 60, B: 70, fullMark: 100 },
  { subject: "Profile Visits", A: 72, B: 80, fullMark: 100 },
  { subject: "Follows", A: 55, B: 68, fullMark: 100 },
]

// Sample data for content distribution
const contentDistributionData = [
  { name: "Company News", value: 20, color: "#3b82f6" },
  { name: "Industry Insights", value: 30, color: "#10b981" },
  { name: "Product Updates", value: 15, color: "#f59e0b" },
  { name: "Thought Leadership", value: 25, color: "#8b5cf6" },
  { name: "Team Highlights", value: 10, color: "#ec4899" },
]

// Sample data for best performing times
const bestTimeData = [
  { day: "Mon", morning: 75, afternoon: 82, evening: 65 },
  { day: "Tue", morning: 80, afternoon: 85, evening: 70 },
  { day: "Wed", morning: 85, afternoon: 90, evening: 75 },
  { day: "Thu", morning: 82, afternoon: 88, evening: 72 },
  { day: "Fri", morning: 78, afternoon: 84, evening: 68 },
]

export function ContentPerformanceChart() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="h-80"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Content Type Performance</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={postPerformanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(142, 142, 160, 0.1)" />
              <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="engagement" radius={[4, 4, 0, 0]} animationDuration={1500}>
                {postPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="h-80"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Content Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contentDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                animationDuration={1500}
              >
                {contentDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="h-80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Content Metrics Comparison</h4>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={contentMetricsData}>
              <PolarGrid stroke="rgba(142, 142, 160, 0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Radar
                name="Last Month"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                animationDuration={1500}
              />
              <Radar
                name="This Month"
                dataKey="B"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                animationDuration={1500}
                animationBegin={300}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="h-80"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Best Performing Times</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bestTimeData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(142, 142, 160, 0.1)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar
                dataKey="morning"
                name="Morning"
                fill="#3b82f6"
                stackId="a"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="afternoon"
                name="Afternoon"
                fill="#10b981"
                stackId="a"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={300}
              />
              <Bar
                dataKey="evening"
                name="Evening"
                fill="#8b5cf6"
                stackId="a"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                animationBegin={600}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {[
          { icon: <Eye className="h-4 w-4" />, label: "Most Viewed", value: "Industry Insights" },
          { icon: <ThumbsUp className="h-4 w-4" />, label: "Most Liked", value: "Thought Leadership" },
          { icon: <MessageSquare className="h-4 w-4" />, label: "Most Comments", value: "Industry Insights" },
          { icon: <Users className="h-4 w-4" />, label: "Best Reach", value: "Thought Leadership" },
        ].map((stat, i) => (
          <div key={i} className="bg-muted/20 rounded-lg border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              {stat.icon}
              <span>{stat.label}</span>
            </div>
            <div className="font-medium">{stat.value}</div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
