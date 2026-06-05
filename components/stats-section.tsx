"use client"

import { Building2, Users, Heart, CalendarDays, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Building2,
    number: "2,450+",
    label: "Churches Listed",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Parish Priests",
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    icon: TrendingUp,
    number: "500K+",
    label: "Active Members",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
  },
  {
    icon: CalendarDays,
    number: "3,200+",
    label: "Events This Year",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
  },
  {
    icon: Heart,
    number: "25K+",
    label: "Lives Impacted",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
  },
]

export function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-slate-950">
      {/* Background texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,40,200,0.15),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="relative container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Community</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Growing Together in Faith
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl mx-auto">
            Thousands of Catholics across the globe trust Catholic Portal to stay connected with their faith community.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                {/* Icon */}
                <div className={`${stat.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} strokeWidth={1.75} />
                </div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Join thousands of Catholics already using Catholic Portal
            <span className="text-purple-400 font-semibold ml-1 hover:text-purple-300 cursor-pointer transition-colors duration-200">→ Get Started Free</span>
          </p>
        </div>
      </div>
    </section>
  )
}
