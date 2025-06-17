"use client"

import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Clock, CheckCircle, XCircle } from "lucide-react"

// Sample data for time saved
const timeSavedData = [
  { name: "Manual Process", time: 120, color: "#f87171" },
  { name: "With nolin.ai", time: 15, color: "#4ade80" },
]

// Sample data for time breakdown
const timeBreakdownData = [
  { name: "Content Creation", manual: 45, nolin: 45, difference: 0 },
  { name: "Formatting", manual: 15, nolin: 0, difference: 15 },
  { name: "Scheduling", manual: 10, nolin: 2, difference: 8 },
  { name: "Publishing", manual: 5, nolin: 0, difference: 5 },
  { name: "Analytics", manual: 45, nolin: 13, difference: 32 },
]

// Sample data for time saved per month
const monthlySavingsData = [
  { month: "Jan", hours: 42 },
  { month: "Feb", hours: 48 },
  { month: "Mar", hours: 56 },
  { month: "Apr", hours: 61 },
  { month: "May", hours: 67 },
  { month: "Jun", hours: 72 },
]

export function TimeSavedMetricsChart() {
  // Calculate total time saved
  const totalTimeSaved = timeSavedData[0].time - timeSavedData[1].time
  const percentageSaved = Math.round((totalTimeSaved / timeSavedData[0].time) * 100)

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
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Time Per Post (Minutes)</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeSavedData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="rgba(142, 142, 160, 0.1)"
              />
              <XAxis type="number" axisLine={false} tickLine={false} />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="time" radius={[0, 4, 4, 0]} animationDuration={1500}>
                {timeSavedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center items-center h-80"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Time Savings</h4>
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-4xl font-bold">{totalTimeSaved} min</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">saved per post</p>
          </div>

          <div className="w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Saved", value: percentageSaved, color: "#4ade80" },
                    { name: "Used", value: 100 - percentageSaved, color: "#e2e8f0" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  animationDuration={1500}
                >
                  {[
                    { name: "Saved", value: percentageSaved, color: "#4ade80" },
                    { name: "Used", value: 100 - percentageSaved, color: "#e2e8f0" },
                  ].map((entry, index) => (
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
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold">{percentageSaved}%</span>
              <p className="text-sm text-muted-foreground">time reduction</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 p-6 bg-muted/20 rounded-lg border"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h4 className="font-medium mb-4">Time Savings Breakdown (minutes per post)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {timeBreakdownData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.manual}</span>
                    <span className="text-xs text-muted-foreground">manual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.nolin}</span>
                    <span className="text-xs text-muted-foreground">nolin.ai</span>
                  </div>
                  <div className="w-16 flex items-center gap-1">
                    {item.difference > 0 ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">-{item.difference}</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">0</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">Monthly Time Saved (hours)</h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySavingsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(142, 142, 160, 0.1)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar
                  dataKey="hours"
                  fill="#4ade80"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
