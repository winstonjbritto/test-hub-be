"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Mock API call - replace with actual password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSubmitted(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now sign in with your new password.",
      })

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin")
      }, 3000)
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

  // Check if token is valid
  const isValidToken = token && token.length > 10

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CrossLogo className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            {isValidToken ? "Create a new password for your account" : "Invalid or expired reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isValidToken ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-800">
                  The password reset link is invalid or has expired. Please request a new one.
                </p>
              </div>
              <Link href="/auth/forgot-password">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Request New Reset Link</Button>
              </Link>
            </div>
          ) : !isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800">
                  Your password has been reset successfully. You will be redirected to the sign in page.
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
