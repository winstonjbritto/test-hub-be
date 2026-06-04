"use client"

import { Building2, Users, Heart, CalendarDays, TrendingUp } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Building2,
      number: "2,450+",
      label: "Churches",
      color: "text-amber-600",
    },
    {
      icon: Users,
      number: "1,200+",
      label: "Parish Priests",
      color: "text-purple-600",
    },
    {
      icon: Users,
      number: "500K+",
      label: "Active Members",
      color: "text-blue-600",
    },
    {
      icon: CalendarDays,
      number: "3,200+",
      label: "Events This Year",
      color: "text-slate-600",
    },
    {
      icon: Heart,
      number: "25K+",
      label: "Lives Impacted",
      color: "text-rose-600",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center text-white space-y-2">
                <div className="flex justify-center mb-3">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
