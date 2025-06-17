"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center max-w-3xl min-h-[70vh] py-20 text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-primary text-3xl">✱</span>
        </div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">
        Something went wrong!
      </h2>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        We've encountered an unexpected error. You can try refreshing the page or return home.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={() => reset()} 
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Try Again
        </Button>
        
        <Button asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  )
} 