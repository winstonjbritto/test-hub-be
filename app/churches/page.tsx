"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, Users, CalendarIcon, Phone } from "lucide-react"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function ChurchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [dioceseFilter, setDioceseFilter] = useState("all")

  const [selectedChurch, setSelectedChurch, any] = useState(null)
  const [showMassModal, setShowMassModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [radiusFilter, setRadiusFilter] = useState("10")
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "prompt">("prompt")
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  const churches = [
    {
      id: "1",
      name: "St. Mary's Cathedral",
      address: "123 Faith Street, New York, NY 10001",
      diocese: "Archdiocese of New York",
      pastor: "Father Michael Johnson",
      members: 1250,
      image: "/images/church-exterior.png",
      coordinates: { lat: 40.7128, lng: -74.006 }, // New York coordinates
      massSchedule: [
        {
          day: "Sunday",
          masses: [
            {
              time: "8:00 AM",
              language: "English",
              priest: "Father Michael Johnson",
              type: "Regular",
              description: "Traditional Sunday Mass",
            },
            {
              time: "10:30 AM",
              language: "English",
              priest: "Father Michael Johnson",
              type: "Family",
              description: "Family Mass with Children's Choir",
            },
            {
              time: "6:00 PM",
              language: "English",
              priest: "Deacon Robert Smith",
              type: "Evening",
              description: "Evening Prayer Service",
            },
          ],
        },
        {
          day: "Saturday",
          masses: [
            {
              time: "8:00 AM",
              language: "English",
              priest: "Father Michael Johnson",
              type: "Regular",
              description: "Morning Mass",
            },
            {
              time: "5:00 PM",
              language: "English",
              priest: "Father Michael Johnson",
              type: "Vigil",
              description: "Saturday Vigil Mass",
            },
          ],
        },
      ],
      nextMass: "Sunday 8:00 AM",
      phone: "(212) 555-0123",
      email: "info@stmarys.com",
      description: "Historic cathedral serving the community since 1879 with beautiful Gothic architecture.",
      upcomingEvents: ["Christmas Eve Mass", "New Year Service"],
    },
    {
      id: "2",
      name: "Sacred Heart Church",
      address: "456 Hope Avenue, Los Angeles, CA 90210",
      diocese: "Archdiocese of Los Angeles",
      pastor: "Sister Catherine Smith",
      members: 890,
      image: "/images/church-interior.png",
      coordinates: { lat: 34.0522, lng: -118.2437 }, // Los Angeles coordinates
      massSchedule: [
        {
          day: "Sunday",
          masses: [
            {
              time: "9:00 AM",
              language: "English",
              priest: "Sister Catherine Smith",
              type: "Regular",
              description: "Traditional Sunday Mass",
            },
            {
              time: "11:00 AM",
              language: "English",
              priest: "Sister Catherine Smith",
              type: "Family",
              description: "Family Mass with Children's Choir",
            },
          ],
        },
        {
          day: "Saturday",
          masses: [
            {
              time: "5:00 PM",
              language: "English",
              priest: "Sister Catherine Smith",
              type: "Vigil",
              description: "Saturday Vigil Mass",
            },
          ],
        },
      ],
      nextMass: "Saturday 5:00 PM",
      phone: "(323) 555-0456",
      email: "info@sacredheart.com",
      description: "Modern parish with vibrant community programs and youth activities.",
      upcomingEvents: ["Youth Group Meeting", "Bible Study"],
    },
    {
      id: "3",
      name: "St. Joseph's Parish",
      address: "789 Grace Road, Chicago, IL 60601",
      diocese: "Archdiocese of Chicago",
      pastor: "Father David Wilson",
      members: 650,
      image: "/images/stained-glass.png",
      coordinates: { lat: 41.8781, lng: -87.6298 }, // Chicago coordinates
      massSchedule: [
        {
          day: "Sunday",
          masses: [
            {
              time: "8:30 AM",
              language: "English",
              priest: "Father David Wilson",
              type: "Regular",
              description: "Traditional Sunday Mass",
            },
            {
              time: "10:00 AM",
              language: "English",
              priest: "Father David Wilson",
              type: "Family",
              description: "Family Mass with Children's Choir",
            },
          ],
        },
        {
          day: "Weekdays",
          masses: [
            {
              time: "6:30 AM",
              language: "English",
              priest: "Father David Wilson",
              type: "Regular",
              description: "Daily Mass",
            },
          ],
        },
      ],
      nextMass: "Sunday 8:30 AM",
      phone: "(312) 555-0789",
      email: "info@stjoseph.com",
      description: "Family-friendly parish with excellent youth programs and community outreach.",
      upcomingEvents: ["Family Day", "Charity Drive"],
    },
    {
      id: "4",
      name: "Holy Trinity Church",
      address: "321 Peace Lane, Boston, MA 02101",
      diocese: "Archdiocese of Boston",
      pastor: "Father Robert Brown",
      members: 1100,
      image: "/images/community-gathering.png",
      coordinates: { lat: 42.3601, lng: -71.0589 }, // Boston coordinates
      massSchedule: [
        {
          day: "Sunday",
          masses: [
            {
              time: "7:30 AM",
              language: "English",
              priest: "Father Robert Brown",
              type: "Regular",
              description: "Traditional Sunday Mass",
            },
            {
              time: "9:30 AM",
              language: "English",
              priest: "Father Robert Brown",
              type: "Family",
              description: "Family Mass with Children's Choir",
            },
            {
              time: "11:30 AM",
              language: "English",
              priest: "Father Robert Brown",
              type: "Regular",
              description: "Traditional Sunday Mass",
            },
          ],
        },
        {
          day: "Saturday",
          masses: [
            {
              time: "4:00 PM",
              language: "English",
              priest: "Father Robert Brown",
              type: "Vigil",
              description: "Saturday Vigil Mass",
            },
          ],
        },
      ],
      nextMass: "Saturday 4:00 PM",
      phone: "(617) 555-0321",
      email: "info@holytrinity.com",
      description: "Traditional parish with rich history and strong community bonds.",
      upcomingEvents: ["Advent Concert", "Christmas Bazaar"],
    },
  ]

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in kilometers
  }

  const getCurrentLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationPermission("denied")
          setIsGettingLocation(false)
        },
      )
    } else {
      setLocationPermission("denied")
      setIsGettingLocation(false)
    }
  }

  const filteredChurches = churches
    .filter((church) => {
      const matchesSearch =
        church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        church.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        church.pastor.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = locationFilter === "all" || church.address.includes(locationFilter)
      const matchesDiocese = dioceseFilter === "all" || church.diocese.includes(dioceseFilter)

      // Distance filtering
      let matchesRadius = true
      if (userLocation && radiusFilter !== "all") {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          church.coordinates.lat,
          church.coordinates.lng,
        )
        matchesRadius = distance <= Number.parseInt(radiusFilter)
      }

      return matchesSearch && matchesLocation && matchesDiocese && matchesRadius
    })
    .map((church) => {
      // Add distance to each church if user location is available
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          church.coordinates.lat,
          church.coordinates.lng,
        )
        return { ...church, distance: Math.round(distance * 10) / 10 }
      }
      return church
    })
    .sort((a, b) => {
      // Sort by distance if available
      if (a.distance && b.distance) {
        return a.distance - b.distance
      }
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      {/* Banner */}
      <div className="relative h-64">
        <img src="/images/church-hero.png" alt="Churches Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/70 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-white">Find Catholic Churches</h1>
            <p className="text-lg text-white/90 max-w-2xl">Discover Catholic communities and join in worship</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 border-purple-200 shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Search Churches</CardTitle>
            <CardDescription className="text-purple-700">Find churches by name, location, or pastor</CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-gradient-to-br from-white to-purple-50/30">
            <div className="space-y-6">
              {/* Main Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5" />
                <Input
                  placeholder="Search churches by name, location, or pastor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>

              {/* Filter Section */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-800">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="border-2 border-purple-200 rounded-lg hover:border-purple-300 transition-colors bg-white/80 backdrop-blur-sm">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                      <SelectItem value="Boston">Boston</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-800">Diocese</label>
                  <Select value={dioceseFilter} onValueChange={setDioceseFilter}>
                    <SelectTrigger className="border-2 border-purple-200 rounded-lg hover:border-purple-300 transition-colors bg-white/80 backdrop-blur-sm">
                      <SelectValue placeholder="All Dioceses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Dioceses</SelectItem>
                      <SelectItem value="New York">Archdiocese of New York</SelectItem>
                      <SelectItem value="Los Angeles">Archdiocese of Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Archdiocese of Chicago</SelectItem>
                      <SelectItem value="Boston">Archdiocese of Boston</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-800">Distance</label>
                  <div className="space-y-2">
                    <Select value={radiusFilter} onValueChange={setRadiusFilter} disabled={!userLocation}>
                      <SelectTrigger
                        className={`border-2 rounded-lg transition-colors bg-white/80 backdrop-blur-sm ${
                          userLocation ? "border-purple-200 hover:border-purple-300" : "border-gray-200 bg-gray-50/80"
                        }`}
                      >
                        <SelectValue placeholder="Any Distance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Distance</SelectItem>
                        <SelectItem value="5">Within 5 km</SelectItem>
                        <SelectItem value="10">Within 10 km</SelectItem>
                        <SelectItem value="25">Within 25 km</SelectItem>
                        <SelectItem value="50">Within 50 km</SelectItem>
                        <SelectItem value="100">Within 100 km</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className={`w-full text-xs rounded-lg border-2 transition-all duration-200 ${
                        userLocation
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {isGettingLocation ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          Getting...
                        </div>
                      ) : userLocation ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Location Set
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Get Location
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-purple-800">Actions</label>
                  <div className="space-y-2">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                      <Search className="w-4 h-4 mr-2" />
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchTerm("")
                        setLocationFilter("all")
                        setDioceseFilter("all")
                        setRadiusFilter("all")
                      }}
                      className="w-full text-xs border-2 border-gray-200 hover:bg-gray-50 rounded-lg"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                <p className="text-sm text-purple-700">
                  Found <span className="font-semibold text-purple-900">{filteredChurches.length}</span> churches
                  {userLocation && " sorted by distance"}
                </p>
                {userLocation && (
                  <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                    <MapPin className="w-3 h-3 mr-1" />
                    Location enabled
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Churches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChurches.map((church) => (
            <Card key={church.id} className="overflow-hidden hover:shadow-lg transition-shadow border-purple-200">
              <div className="aspect-video bg-gray-100">
                <img
                  src={church.image || "/placeholder.svg"}
                  alt={church.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-purple-900">{church.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-purple-600">
                  <MapPin className="w-4 h-4" />
                  {church.address}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-700">{church.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-purple-800">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>
                      <strong>Next Mass:</strong> {church.nextMass}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-800">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>{church.members} members</span>
                  </div>
                  {church.distance && (
                    <div className="flex items-center gap-2 text-sm text-purple-800">
                      <MapPin className="w-4 h-4 text-purple-600" />
                      <span>{church.distance} km away</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-800">Upcoming Events:</p>
                  <div className="flex flex-wrap gap-1">
                    {church.upcomingEvents.map((event, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-purple-600">
                  <Phone className="w-4 h-4" />
                  <span>{church.phone}</span>
                </div>

                <div className="flex gap-2">
                  <Link href={`/churches/${church.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50 text-purple-700">
                      View Details
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setSelectedChurch(church)
                      setShowMassModal(true)
                    }}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Mass Times
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChurches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-purple-700">No churches found matching your criteria.</p>
            <p className="text-sm text-purple-600 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Mass Times Modal */}
        <Dialog open={showMassModal} onOpenChange={setShowMassModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-purple-900">Mass Schedule</DialogTitle>
              <DialogDescription className="text-purple-700">{selectedChurch?.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Date Picker */}
              <div className="flex items-center gap-2 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CalendarIcon className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Select Date:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-auto justify-start text-left font-normal border-purple-200 hover:bg-purple-50"
                    >
                      {format(selectedDate, "PPP")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Mass Schedule for Selected Date */}
              <div className="space-y-3">
                <h4 className="font-medium text-purple-900 text-lg">
                  Mass Schedule for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </h4>

                {selectedChurch?.massSchedule.map((schedule: any, index: number) => {
                  const selectedDayName = format(selectedDate, "EEEE")
                  if (schedule.day !== selectedDayName) return null

                  return (
                    <div key={index} className="space-y-3">
                      <div className="grid gap-3">
                        {schedule.masses.map((mass: any, massIndex: number) => (
                          <div
                            key={massIndex}
                            className="p-3 border border-purple-200 rounded-lg bg-white hover:bg-purple-50/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant="outline"
                                    className="border-purple-200 text-purple-700 bg-purple-50 font-medium"
                                  >
                                    {mass.time}
                                  </Badge>
                                  <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                    {mass.language}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={`${
                                      mass.type === "Special" || mass.type === "Healing"
                                        ? "border-orange-200 text-orange-700 bg-orange-50"
                                        : "border-green-200 text-green-700 bg-green-50"
                                    }`}
                                  >
                                    {mass.type}
                                  </Badge>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium text-purple-900 text-sm">{mass.description}</p>
                                  <p className="text-xs text-purple-700 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {mass.priest}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* Show message if no masses for selected date */}
                {!selectedChurch?.massSchedule.some((schedule: any) => {
                  const selectedDayName = format(selectedDate, "EEEE")
                  return schedule.day === selectedDayName
                }) && (
                  <div className="text-center py-6 text-purple-600">
                    <p>No masses scheduled for {format(selectedDate, "EEEE")}</p>
                    <p className="text-sm text-purple-500 mt-1">Please select a different date</p>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>Contact:</strong> {selectedChurch?.phone}
                </p>
                <p className="text-sm text-purple-700 mt-1">
                  <strong>Email:</strong> {selectedChurch?.email}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <CommonFooter />
    </div>
  )
}
