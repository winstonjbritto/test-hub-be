"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
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

// SSO Icons (using simple SVGs for better compatibility)
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<string | null>(null)

  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully signed in.",
        })

        // Redirect based on user role - will be handled by auth provider
        router.push("/")
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
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

  const handleSSOLogin = async (provider: string) => {
    setSsoLoading(provider)

    try {
      // Simulate SSO authentication - replace with actual SSO implementation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful SSO login
      const mockSSOUser = {
        id: `sso_${provider}_${Date.now()}`,
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        role: "end_user" as const,
        isActive: true,
        isApproved: true,
        avatar: `/placeholder.svg?height=40&width=40&text=${provider.charAt(0).toUpperCase()}`,
      }

      // Store user data (in real implementation, this would come from SSO provider)
      localStorage.setItem("user", JSON.stringify(mockSSOUser))

      toast({
        title: "Welcome!",
        description: `Successfully signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}.`,
      })

      router.push("/")
    } catch (error) {
      toast({
        title: "SSO Error",
        description: `Failed to sign in with ${provider}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setSsoLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/church-interior.png"
          alt="Church Interior"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <Card className="w-full max-w-md relative z-10 border-purple-200 shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <div className="flex justify-center mb-4">
            <CrossLogo className="w-16 h-16" />
          </div>
          <CardTitle className="text-2xl text-purple-900">Welcome Back</CardTitle>
          <CardDescription className="text-purple-700">Sign in to your Catholic Portal account</CardDescription>
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
        <CardContent className="p-6 space-y-6">
          {/* SSO Login Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-purple-800 mb-2">Quick Sign In Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                type="button"
                variant="outline"
                className="relative border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
                onClick={() => handleSSOLogin("google")}
                disabled={ssoLoading !== null}
              >
                {ssoLoading === "google" ? (
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                ) : (
                  <GoogleIcon />
                )}
                <span className="ml-2 hidden md:inline">Google</span>
                <span className="sr-only"> Sign in</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="relative border-blue-300 hover:bg-blue-50 hover:border-blue-400 text-blue-700 transition-all"
                onClick={() => handleSSOLogin("facebook")}
                disabled={ssoLoading !== null}
              >
                {ssoLoading === "facebook" ? (
                  <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  <FacebookIcon />
                )}
                <span className="ml-2 hidden md:inline">Facebook</span>
                <span className="sr-only"> Sign in</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="relative border-blue-600 hover:bg-blue-50 hover:border-blue-700 text-blue-700 transition-all"
                onClick={() => handleSSOLogin("linkedin")}
                disabled={ssoLoading !== null}
              >
                {ssoLoading === "linkedin" ? (
                  <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  <LinkedInIcon />
                )}
                <span className="ml-2 hidden md:inline">LinkedIn</span>
                <span className="sr-only"> Sign in</span>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-900 flex items-center">
                Email
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-purple-200 pl-10 focus:border-purple-400 transition-all"
                  required
                  aria-required="true"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-900 flex items-center">
                Password
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-purple-200 pl-10 focus:border-purple-400 transition-all"
                  required
                  aria-required="true"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-purple-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <Label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
              disabled={isLoading || ssoLoading !== null}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-purple-700">
            {"Don't have an account? "}
            <Link href="/auth/signup" className="text-purple-600 hover:text-purple-800 font-medium hover:underline">
              Sign up
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-purple-900">Demo Credentials</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-100"
                onClick={() => {
                  setEmail("user@example.com")
                  setPassword("password")
                }}
              >
                Auto-fill User
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <div
                className="p-2 bg-white rounded border border-purple-100 hover:border-purple-300 cursor-pointer transition-all"
                onClick={() => {
                  setEmail("superadmin@church.com")
                  setPassword("password")
                }}
              >
                <p className="font-semibold text-purple-900">Super Admin</p>
                <p className="text-purple-700 truncate">superadmin@church.com</p>
                <p className="text-purple-500">password</p>
              </div>
              <div
                className="p-2 bg-white rounded border border-purple-100 hover:border-purple-300 cursor-pointer transition-all"
                onClick={() => {
                  setEmail("admin@stmarys.com")
                  setPassword("password")
                }}
              >
                <p className="font-semibold text-purple-900">Church Admin</p>
                <p className="text-purple-700 truncate">admin@stmarys.com</p>
                <p className="text-purple-500">password</p>
              </div>
              <div
                className="p-2 bg-white rounded border border-purple-100 hover:border-purple-300 cursor-pointer transition-all"
                onClick={() => {
                  setEmail("user@example.com")
                  setPassword("password")
                }}
              >
                <p className="font-semibold text-purple-900">End User</p>
                <p className="text-purple-700 truncate">user@example.com</p>
                <p className="text-purple-500">password</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
