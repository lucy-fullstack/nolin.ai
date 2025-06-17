import { Loader2 } from "lucide-react"

// Temp: Simplified loading component
export default function Loading() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 animate-spin">
          <span className="text-primary text-6xl absolute top-0 right-0">✱</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
