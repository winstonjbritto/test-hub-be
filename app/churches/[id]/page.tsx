"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Phone, Mail, Globe, Calendar, FileText, Play } from "lucide-react"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

export default function ChurchDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const getFilteredMassSchedule = () => {
    if (!selectedDate) return church.massSchedule

    const selectedDayName = format(selectedDate, "EEEE")
    return church.massSchedule.filter((schedule) => schedule.day === selectedDayName)
  }

  // Mock church data - in real app, fetch based on params.id
  const church = {
    id: params.id,
    name: "St. Mary's Cathedral",
    address: "123 Faith Street, New York, NY 10001",
    diocese: "Archdiocese of New York",
    pastor: "Father Michael Johnson",
    members: 1250,
    founded: "1879",
    image: "/images/church-exterior.png",
    phone: "(212) 555-0123",
    email: "info@stmarys.com",
    website: "www.stmarys.com",
    description:
      "St. Mary's Cathedral has been a cornerstone of faith in New York City since 1879. Our beautiful Gothic architecture and vibrant community welcome all who seek spiritual growth and fellowship.",
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
            time: "12:00 PM",
            language: "Spanish",
            priest: "Father Carlos Rodriguez",
            type: "Regular",
            description: "Misa en Español",
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
        day: "Monday",
        masses: [
          {
            time: "7:00 AM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Morning Mass",
          },
          {
            time: "12:00 PM",
            language: "English",
            priest: "Deacon Robert Smith",
            type: "Regular",
            description: "Noon Mass",
          },
        ],
      },
      {
        day: "Tuesday",
        masses: [
          {
            time: "7:00 AM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Morning Mass",
          },
          {
            time: "12:00 PM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Noon Mass",
          },
        ],
      },
      {
        day: "Wednesday",
        masses: [
          {
            time: "7:00 AM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Morning Mass",
          },
          {
            time: "12:00 PM",
            language: "English",
            priest: "Deacon Robert Smith",
            type: "Regular",
            description: "Noon Mass",
          },
          {
            time: "7:00 PM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Healing",
            description: "Healing Mass with Anointing",
          },
        ],
      },
      {
        day: "Thursday",
        masses: [
          {
            time: "7:00 AM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Morning Mass",
          },
          {
            time: "12:00 PM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Noon Mass",
          },
        ],
      },
      {
        day: "Friday",
        masses: [
          {
            time: "7:00 AM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Regular",
            description: "Morning Mass",
          },
          {
            time: "12:00 PM",
            language: "English",
            priest: "Deacon Robert Smith",
            type: "Regular",
            description: "Noon Mass",
          },
          {
            time: "3:00 PM",
            language: "English",
            priest: "Father Michael Johnson",
            type: "Stations",
            description: "Stations of the Cross",
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
          {
            time: "7:00 PM",
            language: "Spanish",
            priest: "Father Carlos Rodriguez",
            type: "Vigil",
            description: "Misa Vigilia en Español",
          },
        ],
      },
    ],
    clergy: [
      {
        name: "Father Michael Johnson",
        role: "Pastor",
        image: "/placeholder.svg?height=150&width=150&text=Fr.+Michael",
        bio: "Father Michael has served our community for over 15 years, bringing wisdom and compassion to all he encounters.",
      },
      {
        name: "Deacon Robert Smith",
        role: "Deacon",
        image: "/placeholder.svg?height=150&width=150&text=Dcn.+Robert",
        bio: "Deacon Robert assists with liturgical celebrations and community outreach programs.",
      },
    ],
    upcomingEvents: [
      {
        title: "Christmas Eve Mass",
        date: "December 24, 2024",
        time: "11:00 PM",
        description: "Join us for our beautiful Christmas Eve celebration with special music and candlelight.",
        image: "/images/church-interior.png",
      },
      {
        title: "New Year's Day Mass",
        date: "January 1, 2025",
        time: "10:00 AM",
        description: "Begin the new year with prayer and reflection.",
        image: "/images/prayer-hands.png",
      },
      {
        title: "Youth Group Meeting",
        date: "January 5, 2025",
        time: "7:00 PM",
        description: "Weekly gathering for teens and young adults.",
        image: "/images/community-gathering.png",
      },
    ],
    gallery: [
      "/images/church-interior.png",
      "/images/stained-glass.png",
      "/images/church-exterior.png",
      "/images/community-gathering.png",
      "/images/prayer-hands.png",
      "/images/church-hero.png",
    ],
    documents: [
      { name: "Parish Bulletin - December 2024", type: "PDF", size: "2.3 MB" },
      { name: "Mass Schedule", type: "PDF", size: "1.1 MB" },
      { name: "Parish History", type: "PDF", size: "5.7 MB" },
      { name: "Community Guidelines", type: "PDF", size: "800 KB" },
    ],
    blogs: [
      {
        title: "Preparing for Christmas: A Spiritual Journey",
        date: "December 15, 2024",
        excerpt: "As we approach the celebration of Christ's birth, let us prepare our hearts...",
        author: "Father Michael Johnson",
        image: "/images/prayer-hands.png",
      },
      {
        title: "The Importance of Community in Faith",
        date: "December 10, 2024",
        excerpt: "Our faith grows stronger when we come together as a community...",
        author: "Deacon Robert Smith",
        image: "/images/community-gathering.png",
      },
    ],
    liveStream: {
      available: true,
      platform: "YouTube",
      nextStream: "Sunday Mass - 10:30 AM",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={church.image || "/placeholder.svg"}
          alt={church.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">{church.name}</h1>
            <p className="text-xl opacity-90 flex items-center gap-2 drop-shadow-md">
              <MapPin className="w-5 h-5" />
              {church.address}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-purple-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="masses" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Masses
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Events
            </TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Gallery
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Documents
            </TabsTrigger>
            <TabsTrigger value="blogs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Blogs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-900">About Our Parish</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-purple-700 leading-relaxed">{church.description}</p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <p className="font-medium text-purple-900">Founded</p>
                        <p className="text-purple-700">{church.founded}</p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Diocese</p>
                        <p className="text-purple-700">{church.diocese}</p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Members</p>
                        <p className="text-purple-700">{church.members.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Pastor</p>
                        <p className="text-purple-700">{church.pastor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-900">Our Clergy</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      {church.clergy.map((member, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
                          />
                          <div>
                            <h4 className="font-medium text-purple-900">{member.name}</h4>
                            <p className="text-sm text-purple-600 mb-2">{member.role}</p>
                            <p className="text-sm text-purple-700">{member.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-900">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-700">{church.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-700">{church.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-700">{church.website}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-purple-600 mt-1" />
                      <span className="text-purple-700">{church.address}</span>
                    </div>
                  </CardContent>
                </Card>

                {church.liveStream.available && (
                  <Card className="border-purple-200 overflow-hidden">
                    <div className="h-32 bg-gray-200 relative">
                      <img src="/images/church-interior.png" alt="Live Stream" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                      <CardTitle className="text-purple-900 flex items-center gap-2">
                        <Play className="w-5 h-5 text-red-600" />
                        Live Stream
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-purple-700 mb-3">Join us online for live masses and special events</p>
                      <p className="font-medium mb-3 text-purple-900">Next: {church.liveStream.nextStream}</p>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Live on {church.liveStream.platform}
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-purple-200">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <CardTitle className="text-purple-900">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-200 hover:bg-purple-50 text-purple-700"
                    >
                      <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                      View Mass Schedule
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-200 hover:bg-purple-50 text-purple-700"
                    >
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      Join Our Community
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-200 hover:bg-purple-50 text-purple-700"
                    >
                      <Mail className="w-4 h-4 mr-2 text-purple-600" />
                      Contact Pastor
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="masses">
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Mass Schedule</CardTitle>
                <CardDescription className="text-purple-700">Join us for worship throughout the week</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Date Picker Section */}
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-purple-900">Select Date:</span>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[240px] justify-start text-left font-normal border-purple-200 hover:bg-purple-50"
                        >
                          <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          className="border-purple-200"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Selected Date Display */}
                  <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900">
                      Mass Schedule for {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Today"}
                    </h3>
                  </div>

                  {/* Mass Schedule Display */}
                  <div className="space-y-4">
                    {getFilteredMassSchedule().length > 0 ? (
                      getFilteredMassSchedule().map((schedule, index) => (
                        <div key={index} className="space-y-3">
                          <h4 className="text-lg font-semibold text-purple-900 border-b border-purple-200 pb-2">
                            {schedule.day} Masses
                          </h4>
                          <div className="grid gap-3">
                            {schedule.masses.map((mass, massIndex) => (
                              <div
                                key={massIndex}
                                className="p-4 border border-purple-200 rounded-lg bg-white hover:bg-purple-50/50 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Badge
                                        variant="outline"
                                        className={`border-purple-200 text-purple-700 font-medium ${
                                          mass.type === "Special" || mass.type === "Healing" || mass.type === "Stations"
                                            ? "bg-orange-50 border-orange-200 text-orange-700"
                                            : "bg-purple-50"
                                        }`}
                                      >
                                        {mass.time}
                                      </Badge>
                                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                        {mass.language}
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className={`${
                                          mass.type === "Special" || mass.type === "Healing" || mass.type === "Stations"
                                            ? "border-orange-200 text-orange-700 bg-orange-50"
                                            : "border-green-200 text-green-700 bg-green-50"
                                        }`}
                                      >
                                        {mass.type}
                                      </Badge>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="font-medium text-purple-900">{mass.description}</p>
                                      <p className="text-sm text-purple-700 flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        Celebrant: {mass.priest}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-200 hover:bg-purple-50 text-purple-700"
                                  >
                                    Register
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 text-purple-600">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                        <p className="text-lg font-medium">No masses scheduled</p>
                        <p className="text-sm">
                          for {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "the selected date"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            {church.upcomingEvents.map((event, index) => (
              <Card key={index} className="border-purple-200 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-purple-900">{event.title}</CardTitle>
                          <CardDescription className="text-purple-700">
                            {event.date} at {event.time}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-purple-200 text-purple-700">
                          Upcoming
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-purple-700">{event.description}</p>
                      <Button className="mt-4 bg-purple-600 hover:bg-purple-700">Register to Attend</Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="gallery">
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Photo Gallery</CardTitle>
                <CardDescription className="text-purple-700">Moments from our parish life</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {church.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Documents & Resources</CardTitle>
                <CardDescription className="text-purple-700">
                  Important parish documents and information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {church.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-purple-200 rounded-lg hover:bg-purple-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-purple-900">{doc.name}</p>
                          <p className="text-sm text-purple-700">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-200 hover:bg-purple-50 text-purple-700"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-4">
            {church.blogs.map((blog, index) => (
              <Card key={index} className="border-purple-200 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                      <CardTitle className="text-lg text-purple-900">{blog.title}</CardTitle>
                      <CardDescription className="text-purple-700">
                        By {blog.author} • {blog.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-purple-700 mb-4">{blog.excerpt}</p>
                      <Button variant="outline" className="border-purple-200 hover:bg-purple-50 text-purple-700">
                        Read More
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <CommonFooter />
    </div>
  )
}
