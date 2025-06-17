"use client"

import type React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    dataKey: string
    payload: {
      [key: string]: number | string
    }
  }>
  label?: string
}

interface AreaChartProps {
  data: Array<{
    [key: string]: number | string
  }>
  index: string
  categories: string[]
  colors?: string[]
  startEndOnly?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  yAxisWidth?: number
  tooltipCallback?: (props: TooltipProps) => React.ReactNode
  className?: string
}

export function AreaChart({
  data,
  index,
  categories,
  colors = ["#0ea5e9", "#22c55e", "#ef4444", "#eab308"],
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  yAxisWidth = 40,
  tooltipCallback,
  className,
}: AreaChartProps) {
  const CustomTooltip = (props: TooltipProps) => {
    if (tooltipCallback) {
      return tooltipCallback(props) as React.ReactElement
    }

    const { active, payload } = props

    if (!active || !payload) {
      return null
    }

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          {payload.map((entry) => (
            <div key={entry.dataKey} className="flex flex-col">
              <span
                className="text-[0.70rem] uppercase text-muted-foreground"
                style={{
                  color: entry.color,
                }}
              >
                {entry.name}
              </span>
              <span className="font-bold text-muted-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          {showXAxis ? (
            <XAxis
              dataKey={index}
              tick={{ transform: "translate(0, 6)" }}
              ticks={startEndOnly ? [data[0][index], data[data.length - 1][index]] : undefined}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
              minTickGap={5}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                color: "var(--muted-foreground)",
              }}
            />
          ) : null}
          {showYAxis ? (
            <YAxis
              width={yAxisWidth}
              tickLine={false}
              axisLine={false}
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-sans)",
                color: "var(--muted-foreground)",
              }}
            />
          ) : null}
          <Tooltip content={<CustomTooltip />} />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                style: { fill: "var(--background)", opacity: 0.8 },
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
