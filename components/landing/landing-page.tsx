"use client"

import { useState } from "react"
import { Search, MapPin, Church } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import Link from "next/link"
import { LandingNotification } from "@/components/landing/landing-notification"
import { EventNotification } from "@/components/landing/event-notification"

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("saint")

  const featuredChurches = [
    {
      id: "1",
      name: "St. Mary's Cathedral",
      location: "New York, NY",
      image: "/images/church-exterior.png",
      massTime: "8:00 AM",
      description: "Historic cathedral serving the community since 1879",
    },
    {
      id: "2",
      name: "Sacred Heart Church",
      location: "Los Angeles, CA",
      image: "/images/church-interior.png",
      massTime: "10:30 AM",
      description: "Modern parish with vibrant community programs",
    },
    {
      id: "3",
      name: "St. Joseph's Parish",
      location: "Chicago, IL",
      image: "/images/community-gathering.png",
      massTime: "9:15 AM",
      description: "Family-friendly parish with excellent youth programs",
    },
  ]

  const handleSearch = () => {
    // Implement search functionality
    console.log(`Searching for ${searchQuery} by ${searchType}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      {/* Enhanced Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/images/church-hero.png" alt="Catholic Church" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/70"></div>
        </div>

        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 rounded-lg"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl">Find Your Spiritual Home</h1>
            <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-lg">
              Connect with Catholic churches worldwide. Discover masses, events, and community.
            </p>

            {/* Search Section */}
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 max-w-3xl mx-auto shadow-2xl border border-white/30">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Search by</label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger className="bg-white text-black border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saint">Saint</SelectItem>
                        <SelectItem value="city">City</SelectItem>
                        <SelectItem value="pincode">Pin Code</SelectItem>
                        <SelectItem value="diocese">Diocese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Enter your search</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder={`Search by ${searchType}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white text-black border-gray-300 focus:border-purple-500 focus:ring-purple-500 flex-1"
                      />
                      <Button onClick={handleSearch} size="lg" className="bg-purple-600 hover:bg-purple-700 px-8">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Churches */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-900">Featured Churches</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover vibrant Catholic communities near you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChurches.map((church) => (
              <Card key={church.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-200">
                <div className="aspect-video bg-gray-200">
                  <img
                    src={church.image || "/placeholder.svg"}
                    alt={church.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Church className="w-5 h-5 text-purple-600" />
                    {church.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {church.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{church.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700">Next Mass: {church.massTime}</span>
                    <Link href={`/churches/${church.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 text-purple-700"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-900">Quick Access</h2>
            <p className="text-lg text-purple-700">Everything you need for your spiritual journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-white">
              <div className="mb-4 h-40 flex items-center justify-center">
                <img src="/images/stained-glass.png" alt="Liturgical Calendar" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Liturgical Calendar</h3>
              <p className="text-purple-700">View upcoming holy days and celebrations</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-white">
              <div className="mb-4 h-40 flex items-center justify-center">
                <img src="/images/church-exterior.png" alt="Find Churches" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Find Churches</h3>
              <p className="text-purple-700">Locate Catholic churches worldwide</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-white">
              <div className="mb-4 h-40 flex items-center justify-center">
                <img src="/images/prayer-hands.png" alt="Daily Readings" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Daily Readings</h3>
              <p className="text-purple-700">Access today's scripture readings</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer border-purple-200 bg-white">
              <div className="mb-4 h-40 flex items-center justify-center">
                <img src="/images/community-gathering.png" alt="Community" className="h-full object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-900">Community</h3>
              <p className="text-purple-700">Connect with fellow Catholics</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 relative">
        <div className="absolute inset-0">
          <img src="/images/church-interior.png" alt="Church Interior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-purple-900/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stay Connected</h2>
          <p className="text-xl mb-8 text-white/90">Get the latest updates on masses, events, and spiritual content</p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white text-black" />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <CommonFooter />

      {/* Landing Page Notification */}
      <LandingNotification
        id="welcome-may-2024"
        title="Welcome to Catholic Church Portal"
        message="Discover local parishes, mass times, and connect with your Catholic community. New features are being added regularly!"
        type="info"
      />

      <EventNotification
        id="pentecost-2024"
        title="Pentecost Sunday"
        date="May 19, 2024"
        description="Join us for special Pentecost celebrations at parishes throughout the diocese. Find mass times and special events."
        linkText="Find a Mass"
        linkHref="/masses"
      />
    </div>
  )
}
