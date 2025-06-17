"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Check, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitWaitlistForm } from "@/utils/api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    role: "",
    newsletter: true,
    // Honeypot field to catch bots
    website: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, newsletter: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await submitWaitlistForm({
        email: formData.email,
        name: formData.name,
        company: formData.company,
        role: formData.role,
        newsletter: formData.newsletter,
        website: formData.website, // Pass honeypot field to API
      })

      if (result.success) {
        setIsSubmitted(true)
      } else {
        setError(result.error || "Failed to submit. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Form submission error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    // Reset form if closed
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({
          email: "",
          name: "",
          company: "",
          role: "",
          newsletter: true,
          website: "",
        })
        setError(null)
      }, 300)
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join the nolin.ai Waitlist</DialogTitle>
          <DialogDescription>
            Be among the first to try nolin.ai and transform how you manage LinkedIn content
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">You're on the list!</h3>
            <p className="text-muted-foreground">
              Thank you for joining our waitlist. We'll notify you when nolin.ai launches.
            </p>
            <Button onClick={handleClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Your company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={handleRoleChange} value={formData.role}>
                  <SelectTrigger id="role" className="bg-white">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="content-creator" className="hover:bg-muted">Content Creator</SelectItem>
                    <SelectItem value="ghostwriter" className="hover:bg-muted">Ghostwriter</SelectItem>
                    <SelectItem value="community-manager" className="hover:bg-muted">Community Manager</SelectItem>
                    <SelectItem value="agency-owner" className="hover:bg-muted">Agency Owner</SelectItem>
                    <SelectItem value="marketing-manager" className="hover:bg-muted">Marketing Manager</SelectItem>
                    <SelectItem value="other" className="hover:bg-muted">Another role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Honeypot field - hidden from real users */}
            <div className="hidden" aria-hidden="true">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" checked={formData.newsletter} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="newsletter" className="text-sm font-normal">
                Keep me updated about nolin.ai news and special offers
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
