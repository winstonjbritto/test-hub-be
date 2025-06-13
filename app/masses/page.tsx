"use client"

import { useState } from "react"
import { format, addDays, subDays, isSameDay } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, MapPin, Clock, Globe, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"

interface Church {
  id: string
  name: string
  address: string
  city: string
  state: string
  image: string
}

interface Mass {
  id: string
  churchId: string
  date: Date
  time: string
  title: string
  language: string
  priest: string
  type: "regular" | "special"
  description?: string
}

export default function MassSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedChurch, setSelectedChurch] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Mock data for churches
  const [churches, setChurches] = useState<Church[]>([
    {
      id: "church1",
      name: "St. Mary's Cathedral",
      address: "123 Cathedral Ave",
      city: "Downtown",
      state: "CA",
      image: "/images/church-exterior.png",
    },
    {
      id: "church2",
      name: "Sacred Heart Parish",
      address: "456 Parish St",
      city: "Midtown",
      state: "CA",
      image: "/images/church-interior.png",
    },
    {
      id: "church3",
      name: "Our Lady of Grace",
      address: "789 Grace Blvd",
      city: "Uptown",
      state: "CA",
      image: "/images/stained-glass.png",
    },
  ])

  // Mock data for masses
  const [masses, setMasses] = useState<Mass[]>([
    // Today's masses
    {
      id: "mass1",
      churchId: "church1",
      date: new Date(),
      time: "08:00",
      title: "Morning Mass",
      language: "English",
      priest: "Father Michael Johnson",
      type: "regular",
    },
    {
      id: "mass2",
      churchId: "church1",
      date: new Date(),
      time: "10:30",
      title: "Family Mass",
      language: "English",
      priest: "Father Michael Johnson",
      type: "regular",
    },
    {
      id: "mass3",
      churchId: "church1",
      date: new Date(),
      time: "18:00",
      title: "Evening Mass",
      language: "Spanish",
      priest: "Father Rodriguez",
      type: "regular",
    },
    {
      id: "mass4",
      churchId: "church2",
      date: new Date(),
      time: "09:00",
      title: "Sunday Mass",
      language: "English",
      priest: "Father Thomas",
      type: "regular",
    },
    {
      id: "mass5",
      churchId: "church3",
      date: new Date(),
      time: "08:30",
      title: "Morning Mass",
      language: "English",
      priest: "Father David",
      type: "regular",
    },

    // Tomorrow's masses
    {
      id: "mass6",
      churchId: "church1",
      date: addDays(new Date(), 1),
      time: "07:00",
      title: "Daily Mass",
      language: "English",
      priest: "Father Michael Johnson",
      type: "regular",
    },
    {
      id: "mass7",
      churchId: "church2",
      date: addDays(new Date(), 1),
      time: "18:30",
      title: "Evening Prayer Service",
      language: "English",
      priest: "Father Thomas",
      type: "regular",
    },

    // Special masses
    {
      id: "mass8",
      churchId: "church1",
      date: addDays(new Date(), 3),
      time: "19:00",
      title: "Healing Mass",
      language: "English",
      priest: "Father Michael Johnson",
      type: "special",
      description: "Special mass for healing and prayer",
    },
    {
      id: "mass9",
      churchId: "church3",
      date: addDays(new Date(), 5),
      time: "10:00",
      title: "First Communion",
      language: "English",
      priest: "Father David",
      type: "special",
      description: "First Holy Communion celebration",
    },
  ])

  // Filter masses based on selected date, church, and search query
  const filteredMasses = masses
    .filter((mass) => {
      const matchesDate = isSameDay(mass.date, selectedDate)
      const matchesChurch = selectedChurch === "all" || mass.churchId === selectedChurch
      const matchesSearch =
        searchQuery === "" ||
        mass.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mass.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mass.priest.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (mass.description && mass.description.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesDate && matchesChurch && matchesSearch
    })
    .sort((a, b) => a.time.localeCompare(b.time))

  const handlePreviousDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1))
  }

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1))
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setIsCalendarOpen(false)
    }
  }

  // Get church details by ID
  const getChurch = (churchId: string) => {
    return churches.find((church) => church.id === churchId)
  }

  // Group masses by church
  const massesByChurch: Record<string, Mass[]> = {}

  filteredMasses.forEach((mass) => {
    if (!massesByChurch[mass.churchId]) {
      massesByChurch[mass.churchId] = []
    }
    massesByChurch[mass.churchId].push(mass)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <CommonHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Mass Schedule</h1>
              <p className="text-purple-600">Find and attend masses at your local churches</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousDay}
                  className="h-10 w-10 border-purple-200"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-[180px] justify-start text-left font-normal border-purple-200"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "MMMM d, yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
                  </PopoverContent>
                </Popover>

                <Button variant="outline" size="icon" onClick={handleNextDay} className="h-10 w-10 border-purple-200">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Select value={selectedChurch} onValueChange={setSelectedChurch}>
                <SelectTrigger className="w-[180px] border-purple-200">
                  <SelectValue placeholder="All Churches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Churches</SelectItem>
                  {churches.map((church) => (
                    <SelectItem key={church.id} value={church.id}>
                      {church.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search by title, language, or priest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md border-purple-200"
            />
          </div>

          <div className="space-y-6">
            {Object.keys(massesByChurch).length > 0 ? (
              Object.entries(massesByChurch).map(([churchId, churchMasses]) => {
                const church = getChurch(churchId)
                if (!church) return null

                return (
                  <Card key={churchId} className="border-purple-200 overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto">
                        <img
                          src={church.image || "/placeholder.svg"}
                          alt={church.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                          <CardTitle className="text-purple-900">{church.name}</CardTitle>
                          <CardDescription className="text-purple-700 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {church.address}, {church.city}, {church.state}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-700 mb-3">
                            Masses for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                          </h3>
                          <div className="space-y-3">
                            {churchMasses.map((mass) => (
                              <div
                                key={mass.id}
                                className={`p-3 rounded-lg border ${
                                  mass.type === "special"
                                    ? "border-orange-200 bg-orange-50"
                                    : "border-purple-200 bg-purple-50"
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="font-medium flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-purple-600" />
                                      {mass.time} - {mass.title}
                                      {mass.type === "special" && <Badge className="bg-orange-500">Special</Badge>}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                      <Globe className="h-3 w-3" />
                                      {mass.language}
                                    </div>
                                    <div className="text-sm text-gray-600 flex items-center gap-2">
                                      <User className="h-3 w-3" />
                                      {mass.priest}
                                    </div>
                                    {mass.description && (
                                      <p className="text-sm text-gray-600 mt-2 italic">{mass.description}</p>
                                    )}
                                  </div>
                                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                    Details
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })
            ) : (
              <Card className="border-purple-200">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Masses Found</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    There are no masses scheduled for {format(selectedDate, "MMMM d, yyyy")}
                    {selectedChurch !== "all" && " at this church"}.{searchQuery && " matching your search criteria."}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <Button variant="outline" onClick={() => setSelectedDate(new Date())}>
                      View Today's Masses
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedChurch("all")}>
                      View All Churches
                    </Button>
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <CommonFooter />
    </div>
  )
}
