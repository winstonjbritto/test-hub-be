"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, MapPin, Menu, X, Calendar } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"

// Custom Cross Logo Component
const CrossLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
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

export function CommonHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleSignOut = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl">
            <CrossLogo className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="text-purple-900 leading-tight">Catholic</span>
              <span className="text-purple-600 text-sm leading-tight">Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/churches" className="hover:text-purple-600 transition-colors">
              Churches
            </Link>
            <Link href="/masses" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Mass Times
            </Link>
            <Link href="/about" className="hover:text-purple-600 transition-colors">
              About
            </Link>
            <Link href="/blogs" className="hover:text-purple-600 transition-colors">
              Blogs
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <Select defaultValue="en">
              <SelectTrigger className="w-32">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Selector */}
            <Select defaultValue="global">
              <SelectTrigger className="w-40">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="outline">Profile</Button>
                </Link>
                <Link href={`/${user.role.replace("_", "-")}/dashboard`}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button onClick={handleSignOut} variant="ghost">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link href="/churches" className="hover:text-purple-600 transition-colors">
                Churches
              </Link>
              <Link href="/masses" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Mass Times
              </Link>
              <Link href="/about" className="hover:text-purple-600 transition-colors">
                About
              </Link>
              <Link href="/blogs" className="hover:text-purple-600 transition-colors">
                Blogs
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t">
                {user ? (
                  <>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full">
                        Profile
                      </Button>
                    </Link>
                    <Link href={`/${user.role.replace("_", "-")}/dashboard`}>
                      <Button variant="ghost" className="w-full">
                        Dashboard
                      </Button>
                    </Link>
                    <Button onClick={handleSignOut} variant="ghost" className="w-full">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin">
                      <Button variant="ghost" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
