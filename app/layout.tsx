import type React from "react"
import "@/app/globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { LanguageProvider } from "@/contexts/language-context"
import { LanguageHtmlAttributes } from "@/components/language-html-attributes"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "nolin.ai | Schedule Social Media Content from Notion",
  description:
    "The first tool that lets content creators, ghostwriters, and agencies schedule and manage social media content directly from Notion.",
  generator: 'v0.dev',
  metadataBase: new URL('https://nolin.ai'),
  openGraph: {
    title: "nolin.ai | Schedule Social Media Content from Notion",
    description: "Schedule and publish content from Notion to social media platforms",
    url: 'https://nolin.ai',
    siteName: 'nolin.ai',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "nolin.ai | From Notion to Social Media",
    description: "Schedule and publish content from Notion to social media platforms",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, spaceGrotesk.variable)}>
        <LanguageProvider>
          <LanguageHtmlAttributes />
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex flex-col min-h-screen relative">
              <SiteHeader />
              <main className="flex-1 flex flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
