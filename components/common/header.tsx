"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X, Calendar, ChevronDown, LogOut, User, Bell, Search, Chrome as Home, Church, Settings, BookOpen, MapPin, Loader as Loader2, Check } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"

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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<{ code: string; name: string; color: string; flag: string }>({
    code: "EN",
    name: "English",
    color: "bg-blue-500",
    flag: "🇺🇸",
  })
  const [currentLocation, setCurrentLocation] = useState<{
    country: string
    state: string
    city: string
    displayName: string
  }>({
    country: "",
    state: "",
    city: "",
    displayName: "Choose Location",
  })
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [locationStep, setLocationStep] = useState<"country" | "state" | "city">("country")
  const [locationSearch, setLocationSearch] = useState("")
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      // Escape to close search
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSearchOpen])

  const handleSignOut = () => {
    logout()
    setIsMenuOpen(false)
  }

  const handleLanguageChange = (code: string, name: string, color: string, flag: string) => {
    setCurrentLanguage({ code, name, color, flag })
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setIsSearching(true)
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false)
      }, 500)
    }
  }

  // Mock location data - in real app, this would come from an API
  const locationData = {
    countries: [
      { code: "US", name: "United States", flag: "🇺🇸" },
      { code: "CA", name: "Canada", flag: "🇨🇦" },
      { code: "IN", name: "India", flag: "🇮🇳" },
      { code: "PH", name: "Philippines", flag: "🇵🇭" },
      { code: "MX", name: "Mexico", flag: "🇲🇽" },
      { code: "BR", name: "Brazil", flag: "🇧🇷" },
      { code: "IT", name: "Italy", flag: "🇮🇹" },
      { code: "FR", name: "France", flag: "🇫🇷" },
      { code: "DE", name: "Germany", flag: "🇩🇪" },
      { code: "ES", name: "Spain", flag: "🇪🇸" },
    ],
    states: {
      US: [
        { code: "CA", name: "California" },
        { code: "NY", name: "New York" },
        { code: "TX", name: "Texas" },
        { code: "FL", name: "Florida" },
        { code: "IL", name: "Illinois" },
        { code: "PA", name: "Pennsylvania" },
        { code: "OH", name: "Ohio" },
        { code: "GA", name: "Georgia" },
        { code: "NC", name: "North Carolina" },
        { code: "MI", name: "Michigan" },
      ],
      IN: [
        { code: "TN", name: "Tamil Nadu" },
        { code: "KL", name: "Kerala" },
        { code: "KA", name: "Karnataka" },
        { code: "AP", name: "Andhra Pradesh" },
        { code: "MH", name: "Maharashtra" },
        { code: "WB", name: "West Bengal" },
        { code: "UP", name: "Uttar Pradesh" },
        { code: "RJ", name: "Rajasthan" },
        { code: "MP", name: "Madhya Pradesh" },
        { code: "GJ", name: "Gujarat" },
      ],
      CA: [
        { code: "ON", name: "Ontario" },
        { code: "QC", name: "Quebec" },
        { code: "BC", name: "British Columbia" },
        { code: "AB", name: "Alberta" },
        { code: "MB", name: "Manitoba" },
        { code: "SK", name: "Saskatchewan" },
        { code: "NS", name: "Nova Scotia" },
        { code: "NB", name: "New Brunswick" },
        { code: "NL", name: "Newfoundland and Labrador" },
        { code: "PE", name: "Prince Edward Island" },
      ],
    },
    cities: {
      "US-CA": [
        { code: "LA", name: "Los Angeles" },
        { code: "SF", name: "San Francisco" },
        { code: "SD", name: "San Diego" },
        { code: "SJ", name: "San Jose" },
        { code: "FR", name: "Fresno" },
        { code: "SAC", name: "Sacramento" },
        { code: "LB", name: "Long Beach" },
        { code: "OAK", name: "Oakland" },
        { code: "BK", name: "Bakersfield" },
        { code: "ANA", name: "Anaheim" },
      ],
      "IN-TN": [
        { code: "CHE", name: "Chennai" },
        { code: "COI", name: "Coimbatore" },
        { code: "MAD", name: "Madurai" },
        { code: "TIR", name: "Tiruchirapalli" },
        { code: "SAL", name: "Salem" },
        { code: "TIR2", name: "Tirunelveli" },
        { code: "ERO", name: "Erode" },
        { code: "VEL", name: "Vellore" },
        { code: "THA", name: "Thanjavur" },
        { code: "DIN", name: "Dindigul" },
      ],
      "CA-ON": [
        { code: "TOR", name: "Toronto" },
        { code: "OTT", name: "Ottawa" },
        { code: "HAM", name: "Hamilton" },
        { code: "LON", name: "London" },
        { code: "KIT", name: "Kitchener" },
        { code: "WIN", name: "Windsor" },
        { code: "SUD", name: "Sudbury" },
        { code: "THU", name: "Thunder Bay" },
        { code: "OSH", name: "Oshawa" },
        { code: "BAR", name: "Barrie" },
      ],
    },
  }

  const handleLocationSelect = async (type: "country" | "state" | "city", code: string, name: string) => {
    setIsLocationLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    if (type === "country") {
      setCurrentLocation((prev) => ({ ...prev, country: code }))
      setLocationStep("state")
      setLocationSearch("")
    } else if (type === "state") {
      setCurrentLocation((prev) => ({ ...prev, state: code }))
      setLocationStep("city")
      setLocationSearch("")
    } else if (type === "city") {
      const countryName = locationData.countries.find((c) => c.code === currentLocation.country)?.name || ""
      const stateName =
        locationData.states[currentLocation.country as keyof typeof locationData.states]?.find(
          (s) => s.code === currentLocation.state,
        )?.name || ""
      setCurrentLocation((prev) => ({
        ...prev,
        city: code,
        displayName: `${name}, ${stateName}, ${countryName}`,
      }))
      setIsLocationOpen(false)
      setLocationStep("country")
      setLocationSearch("")
    }

    setIsLocationLoading(false)
  }

  const resetLocationSelection = () => {
    setLocationStep("country")
    setLocationSearch("")
    setCurrentLocation({
      country: "",
      state: "",
      city: "",
      displayName: "Choose Location",
    })
  }

  const getFilteredLocations = () => {
    const search = locationSearch.toLowerCase()

    if (locationStep === "country") {
      return locationData.countries.filter((country) => country.name.toLowerCase().includes(search))
    } else if (locationStep === "state") {
      const states = locationData.states[currentLocation.country as keyof typeof locationData.states] || []
      return states.filter((state) => state.name.toLowerCase().includes(search))
    } else if (locationStep === "city") {
      const cities =
        locationData.cities[
          `${currentLocation.country}-${currentLocation.state}` as keyof typeof locationData.cities
        ] || []
      return cities.filter((city) => city.name.toLowerCase().includes(search))
    }

    return []
  }

  const getCurrentStepTitle = () => {
    if (locationStep === "country") return "Select Country"
    if (locationStep === "state") {
      const countryName = locationData.countries.find((c) => c.code === currentLocation.country)?.name
      return `Select State/Province in ${countryName}`
    }
    if (locationStep === "city") {
      const countryName = locationData.countries.find((c) => c.code === currentLocation.country)?.name
      const stateName = locationData.states[currentLocation.country as keyof typeof locationData.states]?.find(
        (s) => s.code === currentLocation.state,
      )?.name
      return `Select City in ${stateName}, ${countryName}`
    }
    return "Select Location"
  }

  // Mock notification count
  const notificationCount = 3

  // Check if the current path is a dashboard path
  const isDashboardPath =
    pathname?.includes("/dashboard") || pathname?.includes("/super-admin") || pathname?.includes("/church-admin")

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? "shadow-lg border-purple-100" : "shadow-sm border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl group">
            <div className="transition-transform duration-200 group-hover:scale-105">
              <CrossLogo className="w-10 h-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-purple-900 leading-tight transition-colors duration-200 group-hover:text-purple-700">
                Catholic
              </span>
              <span className="text-purple-600 text-sm leading-tight transition-colors duration-200 group-hover:text-purple-500">
                Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/churches", label: "Churches", icon: null },
              { href: "/saints", label: "Saints", icon: null },
              { href: "/about", label: "About", icon: null },
              { href: "/blogs", label: "Blogs", icon: null },
            ].map((item) => {
              const isActive =
                pathname === item.href || (item.href === "/resources" && pathname?.includes("/resources"))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-purple-700 bg-purple-50 shadow-sm"
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/50"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search Button with Enhanced Tooltip */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50 transition-all duration-200 hover:scale-105 relative"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search (Cmd+K)"
              >
                <Search className="w-5 h-5" />
                {isSearchOpen && <div className="absolute inset-0 rounded-full bg-purple-100 animate-pulse" />}
              </Button>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                Quick search
                <kbd className="ml-2 px-1.5 py-0.5 bg-gray-700 rounded text-xs">⌘K</kbd>
              </div>
            </div>

            {/* Enhanced Location Selector */}
            <div className="relative group">
              <DropdownMenu open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full hover:bg-purple-50 transition-all duration-200 flex items-center gap-2 pl-2 pr-3 max-w-52 hover:scale-105"
                    aria-label={`Current location: ${currentLocation.displayName}. Click to change location.`}
                  >
                    <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span className="text-sm truncate font-medium">{currentLocation.displayName}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl border-purple-100">
                  <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm text-purple-900">{getCurrentStepTitle()}</h3>
                      {locationStep !== "country" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (locationStep === "city") {
                              setLocationStep("state")
                            } else if (locationStep === "state") {
                              setLocationStep("country")
                              setCurrentLocation((prev) => ({ ...prev, country: "", state: "" }))
                            }
                            setLocationSearch("")
                          }}
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 transition-all duration-150"
                        >
                          ← Back
                        </Button>
                      )}
                    </div>

                    {/* Enhanced Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder={`Search ${locationStep}...`}
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 text-sm border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {isLocationLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                        <span className="ml-2 text-sm text-gray-600">Loading...</span>
                      </div>
                    ) : getFilteredLocations().length > 0 ? (
                      getFilteredLocations().map((location, index) => (
                        <button
                          key={location.code}
                          className="w-full cursor-pointer hover:bg-purple-50 flex items-center gap-3 px-4 py-3 text-left border-none bg-transparent transition-all duration-150 group"
                          onClick={() => handleLocationSelect(locationStep, location.code, location.name)}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {locationStep === "country" && "flag" in location && (
                              <span className="text-lg">{location.flag}</span>
                            )}
                            <MapPin className="w-4 h-4 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-150" />
                            <span className="flex-1 font-medium">{location.name}</span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500 text-sm">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        No {locationStep}s found matching "{locationSearch}"
                      </div>
                    )}
                  </div>

                  {currentLocation.displayName !== "Choose Location" && (
                    <div className="p-3 border-t bg-gray-50">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetLocationSelection}
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-150"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear Location
                      </Button>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg z-50">
                Choose your location
              </div>
            </div>

            <Separator orientation="vertical" className="h-6 bg-gray-300" />

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                {/* Enhanced Notifications */}
                <div className="relative group">
                  <Link href="/notifications">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-purple-50 transition-all duration-200 relative hover:scale-105"
                      aria-label={`${notificationCount} unread notifications`}
                    >
                      <Bell className="w-5 h-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse shadow-lg">
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                    {notificationCount > 0 ? `${notificationCount} new notifications` : "No new notifications"}
                  </div>
                </div>

                {/* Dashboard Button - Enhanced */}
                {/* Enhanced User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 pl-2 pr-3 hover:bg-purple-50 transition-all duration-200 rounded-full hover:scale-105"
                      aria-label="User menu"
                    >
                      <Avatar className="w-8 h-8 ring-2 ring-purple-100 transition-all duration-200 hover:ring-purple-200">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg?height=32&width=32&query=person"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-semibold">
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-left mr-1">
                        <span className="text-sm font-medium leading-none">{user.name?.split(" ")[0]}</span>
                        <span className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 shadow-xl border-purple-100">
                    <DropdownMenuLabel className="font-normal bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none text-purple-900">{user.name}</p>
                        <p className="text-xs leading-none text-purple-600">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                          <User className="w-4 h-4 mr-3 text-purple-600" />
                          <span>Profile</span>
                          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/dashboard">
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                          <Home className="w-4 h-4 mr-3 text-purple-600" />
                          <span>Dashboard</span>
                          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/masses">
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                          <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                          <span>Mass Times</span>
                          <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <Link href="/resources">
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                          <BookOpen className="w-4 h-4 mr-3 text-purple-600" />
                          <span>Resources</span>
                          <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between">
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 mr-3 text-purple-600" />
                              <span>Language</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-sm">{currentLanguage.flag}</span>
                              <span className="text-xs font-semibold text-purple-700">{currentLanguage.code}</span>
                              <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground" />
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left" align="start" className="w-48 shadow-lg border-purple-100">
                          <DropdownMenuLabel className="text-purple-900">Select Language</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {[
                            { code: "EN", name: "English", color: "bg-blue-500", flag: "🇺🇸" },
                            { code: "ES", name: "Spanish", color: "bg-yellow-500", flag: "🇪🇸" },
                            { code: "TA", name: "Tamil", color: "bg-green-500", flag: "🇮🇳" },
                            { code: "HI", name: "Hindi", color: "bg-orange-500", flag: "🇮🇳" },
                          ].map((lang) => (
                            <DropdownMenuItem
                              key={lang.code}
                              className="cursor-pointer hover:bg-purple-50 flex items-center gap-3 transition-colors duration-150"
                              onClick={() => handleLanguageChange(lang.code, lang.name, lang.color, lang.flag)}
                            >
                              <span className="text-lg">{lang.flag}</span>
                              <span className="flex-1">{lang.name}</span>
                              {currentLanguage.code === lang.code && <Check className="w-4 h-4 text-purple-600" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {user.role === "super_admin" && (
                        <Link href="/super-admin/dashboard">
                          <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                            <Settings className="w-4 h-4 mr-3 text-purple-600" />
                            <span>Admin Panel</span>
                            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      {user.role === "church_admin" && (
                        <Link href="/church-admin/dashboard">
                          <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                            <Church className="w-4 h-4 mr-3 text-purple-600" />
                            <span>Church Admin</span>
                            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </Link>
                      )}
                      <Link href="/notifications">
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                          <Bell className="w-4 h-4 mr-3 text-purple-600" />
                          <span>Notifications</span>
                          {notificationCount > 0 && (
                            <Badge className="ml-auto bg-red-500 text-white text-xs">{notificationCount}</Badge>
                          )}
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span>Sign Out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="relative group">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 pl-2 pr-3 hover:bg-purple-50 transition-all duration-200 rounded-full hover:scale-105"
                      aria-label="Guest menu"
                    >
                      <Avatar className="w-8 h-8 ring-2 ring-gray-200">
                        <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 shadow-xl border-purple-100">
                    <DropdownMenuLabel className="font-normal bg-gradient-to-r from-gray-50 to-blue-50">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">Welcome, Guest</p>
                        <p className="text-xs leading-none text-muted-foreground">Sign in to access all features</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/auth/signin">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <LogOut className="w-4 h-4 mr-3 text-purple-600 rotate-180" />
                        <span>Sign In</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/auth/signup">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <User className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Sign Up</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/masses">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Mass Times</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/resources">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <BookOpen className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Resources</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between">
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-3 text-purple-600" />
                            <span>Language</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{currentLanguage.flag}</span>
                            <span className="text-xs font-semibold text-purple-700">{currentLanguage.code}</span>
                            <ChevronDown className="w-3 h-3 ml-1 text-muted-foreground" />
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left" align="start" className="w-48 shadow-lg border-purple-100">
                        <DropdownMenuLabel className="text-purple-900">Select Language</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {[
                          { code: "EN", name: "English", color: "bg-blue-500", flag: "🇺🇸" },
                          { code: "ES", name: "Spanish", color: "bg-yellow-500", flag: "🇪🇸" },
                          { code: "TA", name: "Tamil", color: "bg-green-500", flag: "🇮🇳" },
                          { code: "HI", name: "Hindi", color: "bg-orange-500", flag: "🇮🇳" },
                        ].map((lang) => (
                          <DropdownMenuItem
                            key={lang.code}
                            className="cursor-pointer hover:bg-purple-50 flex items-center gap-3 transition-colors duration-150"
                            onClick={() => handleLanguageChange(lang.code, lang.name, lang.color, lang.flag)}
                          >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="flex-1">{lang.name}</span>
                            {currentLanguage.code === lang.code && <Check className="w-4 h-4 text-purple-600" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenuSeparator />
                    <Link href="/churches">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <Church className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Browse Churches</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/masses">
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-50 transition-colors duration-150">
                        <Calendar className="w-4 h-4 mr-3 text-purple-600" />
                        <span>Find Mass Times</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                  Sign in or sign up
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-purple-50 transition-all duration-200 hover:scale-105"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Enhanced Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-purple-100 animate-in fade-in slide-in-from-top-5 duration-300 bg-gradient-to-r from-purple-50/50 to-blue-50/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <Input
                ref={searchInputRef}
                type="search"
                placeholder="Search for churches, masses, blogs, prayers..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 pr-12 py-3 w-full text-lg border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl shadow-sm"
                autoFocus
              />
              {isSearching && (
                <Loader2 className="absolute right-12 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5 animate-spin" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-purple-100"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            {searchQuery && (
              <div className="mt-3 text-sm text-purple-600">
                {isSearching ? "Searching..." : `Press Enter to search for "${searchQuery}"`}
              </div>
            )}
          </div>
        )}

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in slide-in-from-right duration-300 bg-gradient-to-b from-white to-purple-50/30">
            <nav className="flex flex-col gap-2">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-3 w-full border-purple-200 focus:border-purple-400 rounded-lg"
                />
              </div>

              {/* Enhanced Mobile Controls */}
              <div className="space-y-3 mb-4">
                {/* Language Selector for Mobile */}
                <div className="flex items-center justify-between px-3 py-3 border border-purple-100 rounded-lg bg-white/50">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Language</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{currentLanguage.flag}</span>
                    <select
                      className="bg-transparent border-none text-sm font-medium focus:outline-none text-purple-700"
                      value={currentLanguage.code}
                      onChange={(e) => {
                        const value = e.target.value
                        const languages = {
                          EN: { name: "English", color: "bg-blue-500", flag: "🇺🇸" },
                          ES: { name: "Spanish", color: "bg-yellow-500", flag: "🇪🇸" },
                          TA: { name: "Tamil", color: "bg-green-500", flag: "🇮🇳" },
                          HI: { name: "Hindi", color: "bg-orange-500", flag: "🇮🇳" },
                        }
                        const lang = languages[value as keyof typeof languages]
                        if (lang) handleLanguageChange(value, lang.name, lang.color, lang.flag)
                      }}
                    >
                      <option value="EN">English</option>
                      <option value="ES">Spanish</option>
                      <option value="TA">Tamil</option>
                      <option value="HI">Hindi</option>
                    </select>
                  </div>
                </div>

                {/* Location Selector for Mobile */}
                <div className="flex items-center justify-between px-3 py-3 border border-purple-100 rounded-lg bg-white/50">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Location</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsLocationOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                  >
                    {currentLocation.displayName === "Choose Location"
                      ? "Choose"
                      : currentLocation.displayName.length > 15
                        ? currentLocation.displayName.substring(0, 15) + "..."
                        : currentLocation.displayName}
                  </Button>
                </div>
              </div>

              {/* Enhanced Navigation Links */}
              <div className="space-y-1">
                {[
                  { href: "/churches", label: "Churches", icon: Church },
                  { href: "/saints", label: "Saints", icon: User },
                  { href: "/about", label: "About", icon: User },
                  { href: "/blogs", label: "Blogs", icon: BookOpen },
                ].map((item) => {
                  const isActive = pathname === item.href || (item.href === "/resources" && pathname?.includes("/resources"))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "text-purple-700 bg-purple-100 font-medium shadow-sm"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              <Separator className="my-4" />

              {/* Enhanced User Section */}
              <div className="space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4 px-3 py-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <Avatar className="w-10 h-10 ring-2 ring-purple-200">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg?height=40&width=40&query=person"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 font-semibold">
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-purple-900">{user.name}</div>
                        <div className="text-sm text-purple-600 capitalize">{user.role.replace("_", " ")}</div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {[
                        { href: "/profile", label: "Profile", icon: User },
                        { href: "/notifications", label: "Notifications", icon: Bell, badge: notificationCount },
                        ...(user.role === "super_admin"
                          ? [{ href: "/super-admin/dashboard", label: "Admin Panel", icon: Settings }]
                          : []),
                        ...(user.role === "church_admin"
                          ? [{ href: "/church-admin/dashboard", label: "Church Admin", icon: Church }]
                          : []),
                      ].map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
                          <Button
                            variant="outline"
                            className="w-full flex justify-start gap-3 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                            {item.badge && item.badge > 0 && (
                              <Badge className="ml-auto bg-red-500 text-white text-xs">{item.badge}</Badge>
                            )}
                          </Button>
                        </Link>
                      ))}
                    </div>
                    <Link href="/masses" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full flex justify-start gap-3 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                      >
                        <Calendar className="w-4 h-4" />
                        Mass Times
                      </Button>
                    </Link>
                    <Link href="/resources" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full flex justify-start gap-3 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                      >
                        <BookOpen className="w-4 h-4" />
                        Resources
                      </Button>
                    </Link>

                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 justify-start gap-3 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4 px-3 py-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <Avatar className="w-10 h-10 ring-2 ring-gray-200">
                        <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-semibold text-gray-700">Welcome, Guest</div>
                    </div>

                    <div className="space-y-2">
                      <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full flex justify-start gap-3 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4 rotate-180" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex justify-start gap-3 transition-all duration-200">
                          <User className="w-4 h-4" />
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Enhanced Mobile Location Modal */}
        {isLocationOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center md:hidden animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-purple-900">{getCurrentStepTitle()}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLocationOpen(false)}
                    className="text-gray-500 hover:text-gray-700 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {locationStep !== "country" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (locationStep === "city") {
                        setLocationStep("state")
                      } else if (locationStep === "state") {
                        setLocationStep("country")
                        setCurrentLocation((prev) => ({ ...prev, country: "", state: "" }))
                      }
                      setLocationSearch("")
                    }}
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-100 mb-4 transition-all duration-150"
                  >
                    ← Back
                  </Button>
                )}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={`Search ${locationStep}...`}
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 text-sm border-purple-200 focus:border-purple-400 rounded-lg"
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {isLocationLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                    <span className="ml-3 text-gray-600">Loading locations...</span>
                  </div>
                ) : getFilteredLocations().length > 0 ? (
                  getFilteredLocations().map((location) => (
                    <button
                      key={location.code}
                      className="w-full cursor-pointer hover:bg-purple-50 flex items-center gap-4 px-6 py-4 text-left border-none bg-transparent transition-all duration-150 group"
                      onClick={() => {
                        handleLocationSelect(locationStep, location.code, location.name)
                        setIsLocationOpen(false)
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {locationStep === "country" && "flag" in location && (
                          <span className="text-2xl">{location.flag}</span>
                        )}
                        <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-150" />
                        <span className="flex-1 font-medium text-gray-900">{location.name}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">
                      No {locationStep}s found matching "{locationSearch}"
                    </p>
                  </div>
                )}
              </div>
              {currentLocation.displayName !== "Choose Location" && (
                <div className="p-4 border-t bg-gray-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      resetLocationSelection()
                      setIsLocationOpen(false)
                    }}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-150 rounded-lg"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear Location
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
