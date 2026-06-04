"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CalendarDays, User } from "lucide-react"
import Link from "next/link"

export function ContentSections() {
  const upcomingEvents = [
    {
      id: 1,
      date: "MAY 24",
      title: "Pentecost Sunday Celebration",
      time: "May 24, 2025 • All Day",
      location: "St. Mary's Church, Bangalore",
      image: "/images/church-interior.png",
    },
    {
      id: 2,
      date: "JUN 02",
      title: "Eucharistic Adoration",
      time: "June 02, 2025 • 6:00 PM",
      location: "St. Joseph's Church, Bangalore",
      image: "/images/stained-glass.png",
    },
    {
      id: 3,
      date: "JUN 15",
      title: "Feast of the Sacred Heart",
      time: "June 15, 2025 • All Day",
      location: "Holy Trinity Church, Bangalore",
      image: "/images/prayer-hands.png",
    },
  ]

  const massTimes = [
    {
      time: "06:00 AM",
      language: "Tamil Mass",
      priest: "Fr. Joseph",
      church: "St. Mary's Church",
    },
    {
      time: "08:00 AM",
      language: "English Mass",
      priest: "Fr. John",
      church: "St. Mary's Church",
    },
    {
      time: "10:00 AM",
      language: "Malayalam Mass",
      priest: "Fr. Tom",
      church: "St. Joseph's Church",
    },
    {
      time: "06:00 PM",
      language: "English Mass",
      priest: "Fr. George",
      church: "Holy Trinity Church",
    },
    {
      time: "07:30 PM",
      language: "Tamil Mass",
      priest: "Fr. Xavier",
      church: "St. Antony's Church",
    },
  ]

  const featuredBlog = {
    category: "FAITH",
    date: "May 20, 2025",
    title: "The Power of Prayer in Daily Life",
    description: "Discover how prayer strengthens our faith and brings us closer to God every day.",
    readMore: "Read More →",
    image: "/images/prayer-hands.png",
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Upcoming Events</h3>
              <Link href="/events">
                <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-0">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-200">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 py-3 pr-4">
                      <div className="text-sm font-bold text-gray-500 mb-1">{event.date}</div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Today's Mass Timings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Today's Mass Timings</h3>
              <Link href="/masses">
                <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0">
                  View All
                </Button>
              </Link>
            </div>
            <Card className="border-0">
              <CardContent className="p-0">
                <div className="divide-y">
                  {massTimes.map((mass, index) => (
                    <div key={index} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">{mass.time}</span>
                          <span className="text-xs font-medium text-gray-500">{mass.language}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {mass.priest}
                          </span>
                          <span>{mass.church}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Blog */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Featured Blog</h3>
              <Link href="/blogs">
                <Button variant="link" className="text-gray-600 hover:text-gray-900 p-0">
                  View All
                </Button>
              </Link>
            </div>
            <Card className="overflow-hidden border-0 h-full">
              <div className="aspect-video bg-gray-200 mb-4">
                <img
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="space-y-4">
                <Badge variant="secondary" className="bg-slate-900 text-white hover:bg-slate-800">
                  {featuredBlog.category}
                </Badge>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {featuredBlog.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {featuredBlog.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{featuredBlog.date}</span>
                  <Link href="/blogs" className="text-slate-900 text-sm font-semibold hover:underline">
                    {featuredBlog.readMore}
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
