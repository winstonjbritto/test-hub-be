"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Custom Cross Logo Component
const CrossLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 32 32" className="w-full h-full">
      {/* Outer circle background */}
      <circle
        cx="16"
        cy="16"
        r="15"
        className="text-purple-100"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Cross */}
      <g className="text-purple-600" fill="currentColor">
        {/* Vertical beam */}
        <rect x="14" y="6" width="4" height="20" rx="1" />
        {/* Horizontal beam */}
        <rect x="8" y="14" width="16" height="4" rx="1" />
      </g>

      {/* Inner glow effect */}
      <circle cx="16" cy="16" r="12" className="text-purple-50" fill="currentColor" opacity="0.3" />

      {/* Sacred heart accent */}
      <g className="text-gold-500" fill="currentColor">
        <circle cx="16" cy="16" r="2" opacity="0.8" />
      </g>
    </svg>
  </div>
)

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "If an account exists with this email, you will receive a password reset link.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <img src="/images/stained-glass.png" alt="Stained Glass" className="w-full h-full object-cover opacity-20" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-purple-200 shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <div className="flex justify-center mb-4">
            <CrossLogo className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl text-purple-900">Reset Your Password</CardTitle>
          <CardDescription className="text-purple-700">
            {!isSubmitted
              ? "Enter your email address and we'll send you a link to reset your password"
              : "Check your email for a link to reset your password"}
          </CardDescription>
          <div className="mt-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-900">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-purple-600 text-white hover:bg-purple-700 h-10 px-4 py-2 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800">
                  If an account exists with this email, you will receive a password reset link shortly.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
