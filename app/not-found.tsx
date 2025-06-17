import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center max-w-3xl min-h-[70vh] py-20 text-center">
      <div className="relative">
        <h1 className="text-9xl font-bold text-primary/80">404</h1>
        
        <div className="absolute -top-10 left-0 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
          <span className="text-primary text-lg">✱</span>
          <span className="font-medium">Not Found!</span>
        </div>
        
        <div className="absolute top-4 right-0 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
          <span className="text-primary text-lg">✱</span>
          <span className="font-medium">Error</span>
        </div>
        
        <div className="absolute bottom-0 right-10">
          <span className="text-primary text-5xl animate-spin-slow">✱</span>
        </div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mt-10 mb-6 text-slate-800">
        Something went wrong!
      </h2>
      
      <p className="text-lg text-muted-foreground mb-8">
        We couldn't find the page you were looking for. The page might have been moved, 
        deleted, or never existed in the first place.
      </p>

      <Button asChild size="lg" className="gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Homepage
        </Link>
      </Button>
    </div>
  )
} 