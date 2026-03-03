import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | nolin.ai",
  description: "Sign in or create your nolin.ai account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth pages don't need the site header/footer
  return <>{children}</>
}
