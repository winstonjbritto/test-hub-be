"use client"

import { useState } from "react"
import { Search, MapPin, Calendar, Church, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import Link from "next/link"

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("saint")

  const featuredChurches = [
    {
      id: "1",
      name: "St. Mary's Cathedral",
      location: "New York, NY",
      image: "/placeholder.svg?height=200&width=300",
      massTime: "8:00 AM",
      description: "Historic cathedral serving the community since 1879",
    },
    {
      id: "2",
      name: "Sacred Heart Church",
      location: "Los Angeles, CA",
      image: "/placeholder.svg?height=200&width=300",
      massTime: "10:30 AM",
      description: "Modern parish with vibrant community programs",
    },
    {
      id: "3",
      name: "St. Joseph's Parish",
      location: "Chicago, IL",
      image: "/placeholder.svg?height=200&width=300",
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Spiritual Home</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connect with Catholic churches worldwide. Discover masses, events, and community.
            </p>

            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saint">Saint</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="pincode">Pin Code</SelectItem>
                    <SelectItem value="diocese">Diocese</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder={`Search by ${searchType}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white text-black flex-1"
                />
                <Button onClick={handleSearch} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Churches */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Churches</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover vibrant Catholic communities near you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChurches.map((church) => (
              <Card key={church.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img
                    src={church.image || "/placeholder.svg"}
                    alt={church.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Church className="w-5 h-5" />
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
                    <span className="text-sm font-medium">Next Mass: {church.massTime}</span>
                    <Link href={`/churches/${church.id}`}>
                      <Button variant="outline" size="sm">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Access</h2>
            <p className="text-lg text-gray-600">Everything you need for your spiritual journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Liturgical Calendar</h3>
              <p className="text-gray-600">View upcoming holy days and celebrations</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Church className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Find Churches</h3>
              <p className="text-gray-600">Locate Catholic churches worldwide</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Daily Readings</h3>
              <p className="text-gray-600">Access today's scripture readings</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Connect with fellow Catholics</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">Get the latest updates on masses, events, and spiritual content</p>

          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white text-black" />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <CommonFooter />
    </div>
  )
}
