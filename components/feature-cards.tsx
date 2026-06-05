"use client"

import { Calendar, Radio, Heart, BookOpen, Gift, Clock } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Clock,
    title: "Today's Masses",
    subtitle: "View all Mass timings",
    href: "/masses",
    gradient: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-200",
  },
  {
    icon: Calendar,
    title: "Church Calendar",
    subtitle: "Events & Feasts",
    href: "/liturgical-calendar",
    gradient: "from-blue-500 to-indigo-600",
    glow: "group-hover:shadow-blue-200",
  },
  {
    icon: Heart,
    title: "Prayer Requests",
    subtitle: "We are here to pray",
    href: "/prayers",
    gradient: "from-rose-500 to-pink-600",
    glow: "group-hover:shadow-rose-200",
  },
  {
    icon: Radio,
    title: "Live Streaming",
    subtitle: "Watch Holy Mass",
    href: "/live",
    gradient: "from-red-500 to-rose-600",
    glow: "group-hover:shadow-red-200",
  },
  {
    icon: BookOpen,
    title: "Read Blogs",
    subtitle: "Faith & Inspiration",
    href: "/blogs",
    gradient: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-200",
  },
  {
    icon: Gift,
    title: "Donate",
    subtitle: "Support Your Church",
    href: "/donate",
    gradient: "from-purple-500 to-violet-600",
    glow: "group-hover:shadow-purple-200",
  },
]

export function FeatureCards() {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.title} href={feature.href}>
                <div className={`group flex flex-col items-center text-center p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-xl ${feature.glow}`}>
                  <div
                    className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 mb-4`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1 group-hover:text-purple-700 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-tight">{feature.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
