"use client"

import { Calendar, Radio, Heart, BookOpen, Rss, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeatureCards() {
  const features = [
    {
      icon: Calendar,
      title: "Today's Masses",
      subtitle: "View all Mass timings",
      color: "bg-amber-500",
    },
    {
      icon: Calendar,
      title: "Church Calendar",
      subtitle: "Events & Feasts",
      color: "bg-slate-600",
    },
    {
      icon: Heart,
      title: "Prayer Requests",
      subtitle: "We are here to pray",
      color: "bg-rose-500",
    },
    {
      icon: Radio,
      title: "Live Streaming",
      subtitle: "Watch Holy Mass",
      color: "bg-red-600",
    },
    {
      icon: BookOpen,
      title: "Read Blogs",
      subtitle: "Faith & Inspiration",
      color: "bg-emerald-500",
    },
    {
      icon: Gift,
      title: "Donate",
      subtitle: "Support Your Church",
      color: "bg-rose-600",
    },
  ]

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-0 shadow-none hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-3">
                  <div className={`${feature.color} w-16 h-16 rounded-full mx-auto flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
