"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Search, MapPin, Clock, Users, Edit, Trash2, Eye } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChurchAdminEventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const events = [
    {
      id: "1",
      title: "Christmas Eve Mass",
      description: "Join us for our beautiful Christmas Eve celebration with special music and candlelight.",
      church: "St. Mary's Cathedral",
      date: "2024-12-24",
      time: "11:00 PM",
      location: "Main Sanctuary",
      attendees: 200,
      maxAttendees: 250,
      status: "upcoming",
      category: "Mass",
      image: "/placeholder.svg?height=200&width=300&text=Christmas+Eve+Mass",
    },
    {
      id: "2",
      title: "New Year's Day Mass",
      description: "Begin the new year with prayer and reflection.",
      church: "St. Mary's Cathedral",
      date: "2025-01-01",
      time: "10:00 AM",
      location: "Main Sanctuary",
      attendees: 150,
      maxAttendees: 200,
      status: "upcoming",
      category: "Mass",
      image: "/placeholder.svg?height=200&width=300&text=New+Year+Mass",
    },
    {
      id: "3",
      title: "Youth Group Meeting",
      description: "Weekly gathering for teens and young adults.",
      church: "Sacred Heart Church",
      date: "2025-01-05",
      time: "7:00 PM",
      location: "Youth Hall",
      attendees: 25,
      maxAttendees: 40,
      status: "upcoming",
      category: "Youth",
      image: "/placeholder.svg?height=200&width=300&text=Youth+Group",
    },
    {
      id: "4",
      title: "Bible Study",
      description: "Weekly Bible study and discussion group.",
      church: "St. Joseph's Parish",
      date: "2025-01-08",
      time: "7:30 PM",
      location: "Parish Hall",
      attendees: 30,
      maxAttendees: 35,
      status: "upcoming",
      category: "Education",
      image: "/placeholder.svg?height=200&width=300&text=Bible+Study",
    },
    {
      id: "5",
      title: "Thanksgiving Service",
      description: "Community thanksgiving celebration.",
      church: "St. Mary's Cathedral",
      date: "2024-11-28",
      time: "6:00 PM",
      location: "Main Sanctuary",
      attendees: 180,
      maxAttendees: 200,
      status: "completed",
      category: "Special",
      image: "/placeholder.svg?height=200&width=300&text=Thanksgiving",
    },
  ]

  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const pastEvents = events.filter((event) => event.status === "completed")

  const filteredUpcoming = upcomingEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPast = pastEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.church.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCategoryBadge = (category: string) => {
    const colors = {
      Mass: "bg-purple-100 text-purple-800 border-purple-200",
      Youth: "bg-blue-100 text-blue-800 border-blue-200",
      Education: "bg-green-100 text-green-800 border-green-200",
      Special: "bg-orange-100 text-orange-800 border-orange-200",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const getAttendanceColor = (attendees: number, maxAttendees: number) => {
    const percentage = (attendees / maxAttendees) * 100
    if (percentage >= 90) return "text-red-600"
    if (percentage >= 70) return "text-orange-600"
    return "text-green-600"
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Events</h2>
            <p className="text-purple-600">Manage church events and activities</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Add a new event to your church calendar</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="church">Church</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select church" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stmarys">St. Mary's Cathedral</SelectItem>
                    <SelectItem value="sacredheart">Sacred Heart Church</SelectItem>
                    <SelectItem value="stjoseph">St. Joseph's Parish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mass">Mass</SelectItem>
                    <SelectItem value="youth">Youth</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" type="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Event location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input id="maxAttendees" type="number" placeholder="Maximum capacity" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Event description" />
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-purple-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Upcoming Events ({filteredUpcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Past Events ({filteredPast.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpcoming.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg text-purple-900 line-clamp-2">{event.title}</CardTitle>
                    {getCategoryBadge(event.category)}
                  </div>
                  <CardDescription className="text-purple-600 line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className={getAttendanceColor(event.attendees, event.maxAttendees)}>
                        {event.attendees}/{event.maxAttendees} attendees
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPast.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden opacity-75 hover:opacity-100 transition-all duration-300 border-purple-200"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg text-purple-900 line-clamp-2">{event.title}</CardTitle>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <CardDescription className="text-purple-600 line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-purple-700">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attended</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View Report
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
