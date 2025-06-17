"use client"

import { DataFlowVisualization } from "./data-flow-visualization"

export function HeroImage() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Enhanced background effect */}
      <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-b from-transparent to-muted/5 rounded-full opacity-70"></div>
      
      {/* Improved container for the visualization */}
      <div className="w-full max-w-lg mx-auto px-4">
        <DataFlowVisualization />
      </div>
    </div>
  )
}
