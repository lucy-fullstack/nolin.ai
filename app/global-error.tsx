"use client"

import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google"

// Load the Inter font
const inter = Inter({ subsets: ["latin"] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-500 text-3xl">✱</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Something went seriously wrong!</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We've encountered a critical error. Please try refreshing the page.
          </p>

          <Button 
            onClick={() => reset()} 
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
          >
            Try Again
          </Button>

          <div className="mt-8 text-sm text-gray-500">
            <p>If the problem persists, please contact our support team.</p>
          </div>
        </div>
      </body>
    </html>
  )
} 