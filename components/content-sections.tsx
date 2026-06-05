"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, User, CalendarDays, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

export function ContentSections() {
  const upcomingEvents = [
    {
      id: 1,
      month: "MAY",
      day: "24",
      title: "Pentecost Sunday Celebration",
      time: "All Day",
      location: "St. Mary's Church, Bangalore",
      tag: "Feast",
      tagColor: "bg-amber-100 text-amber-700",
    },
    {
      id: 2,
      month: "JUN",
      day: "02",
      title: "Eucharistic Adoration",
      time: "6:00 PM",
      location: "St. Joseph's Church, Bangalore",
      tag: "Prayer",
      tagColor: "bg-blue-100 text-blue-700",
    },
    {
      id: 3,
      month: "JUN",
      day: "15",
      title: "Feast of the Sacred Heart",
      time: "All Day",
      location: "Holy Trinity Church, Bangalore",
      tag: "Feast",
      tagColor: "bg-rose-100 text-rose-700",
    },
  ]

  const massTimes = [
    { time: "06:00 AM", language: "Tamil", priest: "Fr. Joseph", church: "St. Mary's" },
    { time: "08:00 AM", language: "English", priest: "Fr. John", church: "St. Mary's" },
    { time: "10:00 AM", language: "Malayalam", priest: "Fr. Tom", church: "St. Joseph's" },
    { time: "06:00 PM", language: "English", priest: "Fr. George", church: "Holy Trinity" },
    { time: "07:30 PM", language: "Tamil", priest: "Fr. Xavier", church: "St. Antony's" },
  ]

  const featuredBlog = {
    category: "FAITH",
    date: "May 20, 2025",
    title: "The Power of Prayer in Daily Life",
    description:
      "Discover how consistent, heartfelt prayer strengthens our faith, brings inner peace, and draws us closer to God through every season of life.",
    image:
      "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-2">Stay Connected</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What's Happening in Your Parish</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-purple-600" />
                Upcoming Events
              </h3>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs font-medium -mr-2">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-100 hover:border-purple-100 transition-all duration-200 cursor-pointer"
                >
                  {/* Date Block */}
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex flex-col items-center justify-center shadow-sm">
                    <span className="text-purple-200 text-[10px] font-bold uppercase leading-none">{event.month}</span>
                    <span className="text-white text-xl font-bold leading-tight">{event.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm line-clamp-2 group-hover:text-purple-700 transition-colors duration-200 leading-tight">
                        {event.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Mass Timings */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Today's Masses
              </h3>
              <Link href="/masses">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs font-medium -mr-2">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {massTimes.map((mass, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-purple-50/50 transition-colors duration-150 cursor-pointer border-b border-slate-50 last:border-0"
                >
                  <div className="flex-shrink-0 text-center w-16">
                    <span className="text-sm font-bold text-purple-700 leading-none">{mass.time}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-800 truncate">{mass.language}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {mass.priest}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{mass.church}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Blog */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Featured Blog
              </h3>
              <Link href="/blogs">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs font-medium -mr-2">
                  View All <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
            <Link href="/blogs">
              <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-purple-100 overflow-hidden transition-all duration-200 cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                    {featuredBlog.category}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-purple-700 transition-colors duration-200 line-clamp-2">
                    {featuredBlog.title}
                  </h4>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
                    {featuredBlog.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{featuredBlog.date}</span>
                    <span className="text-sm font-semibold text-purple-600 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
