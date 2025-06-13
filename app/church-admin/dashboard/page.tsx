"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Calendar, BookOpen, Files, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChurchAdminDashboard() {
  const stats = [
    {
      title: "Registered Users",
      value: "234",
      change: "+12%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Upcoming Events",
      value: "8",
      change: "+2",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Published Blogs",
      value: "45",
      change: "+5",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "Media Files",
      value: "156",
      change: "+23",
      icon: Files,
      color: "text-orange-600",
    },
  ]

  const recentEvents = [
    {
      name: "Sunday Mass",
      date: "Dec 24, 2024",
      time: "10:00 AM",
      attendees: 150,
      image: "/images/church-interior.png",
    },
    {
      name: "Christmas Eve Service",
      date: "Dec 24, 2024",
      time: "11:00 PM",
      attendees: 200,
      image: "/images/stained-glass.png",
    },
    {
      name: "Youth Group Meeting",
      date: "Dec 26, 2024",
      time: "6:00 PM",
      attendees: 25,
      image: "/images/community-gathering.png",
    },
    {
      name: "Bible Study",
      date: "Dec 28, 2024",
      time: "7:00 PM",
      attendees: 30,
      image: "/images/prayer-hands.png",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Church Dashboard</h2>
            <p className="text-purple-600">Manage your church community and activities</p>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-6">
        <img src="/images/church-hero.png" alt="Church Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-center">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard</h3>
            <p className="text-white/90 max-w-md">
              Manage your church, events, and community from one central location.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{stat.value}</div>
              <p className="text-xs text-purple-600">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-purple-200">
          <CardHeader className="border-b border-purple-100">
            <CardTitle className="text-purple-900">Upcoming Events</CardTitle>
            <CardDescription className="text-purple-600">Your church's scheduled activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-purple-100">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center p-4 hover:bg-purple-50/50 transition-colors">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-purple-900">{event.name}</h4>
                    <p className="text-sm text-purple-600">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-purple-700">{event.attendees} expected</p>
                    <Button variant="outline" size="sm" className="mt-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-4 h-4 mr-1 text-purple-600" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-purple-200">
          <CardHeader className="border-b border-purple-100">
            <CardTitle className="text-purple-900">Quick Actions</CardTitle>
            <CardDescription className="text-purple-600">Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2 relative h-32 rounded-lg overflow-hidden mb-2">
                <img src="/images/church-interior.png" alt="Create Event" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create New Event
                  </Button>
                </div>
              </div>

              <div className="relative h-24 rounded-lg overflow-hidden">
                <img src="/images/prayer-hands.png" alt="Write Blog" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
                  <Button variant="outline" className="bg-white/80 hover:bg-white border-purple-200 text-purple-900">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Write Blog
                  </Button>
                </div>
              </div>

              <div className="relative h-24 rounded-lg overflow-hidden">
                <img
                  src="/images/community-gathering.png"
                  alt="Manage Members"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900/60 flex items-center justify-center">
                  <Button variant="outline" className="bg-white/80 hover:bg-white border-purple-200 text-purple-900">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Members
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
