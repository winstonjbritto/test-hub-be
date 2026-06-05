"use client"

import { Search, MapPin, Users, Church, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface HeroSectionProps {
  onSearch: (query: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/208371/pexels-photo-208371.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Catholic Church Interior"
          className="w-full h-full object-cover"
        />
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-900/80 to-slate-800/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* Decorative cross pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
      }} />

      {/* Content */}
      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 max-w-7xl py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-amber-400" />
                <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
                  Welcome to the
                </span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Catholic Church
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                    Community
                  </span>
                </h1>
              </div>

              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                Find nearby churches, discover Mass schedules, join events and
                grow in faith alongside a vibrant global Catholic community.
              </p>

              {/* CTA Row */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/churches">
                  <Button
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-7 rounded-full shadow-lg shadow-amber-500/25 transition-all duration-200 hover:scale-105"
                  >
                    Find a Church
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/masses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-full font-semibold px-7 transition-all duration-200 hover:scale-105"
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Mass Timings
                  </Button>
                </Link>
              </div>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                {[
                  { icon: Church, label: "Find Churches", sub: "Near You" },
                  { icon: MapPin, label: "View Mass", sub: "Timings" },
                  { icon: Users, label: "Join Church", sub: "Community" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white/8 hover:bg-white/14 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-white/20 group"
                  >
                    <div className="bg-white/15 group-hover:bg-amber-500/20 p-2 rounded-lg transition-colors duration-200">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-none">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Search Card */}
            <div className="relative">
              {/* Card glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-purple-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/60">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Find a Church</h3>
                  <p className="text-sm text-slate-500 mt-1">Discover Mass schedules near you</p>
                </div>

                <div className="space-y-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Church name, saint, city or pincode..."
                      className="pl-11 h-12 text-sm border-slate-200 bg-slate-50/50 focus-visible:ring-purple-500 focus-visible:border-purple-400 rounded-xl"
                    />
                  </div>

                  {/* Dropdowns */}
                  <div className="grid grid-cols-2 gap-3">
                    <Select defaultValue="bangalore">
                      <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 focus:ring-purple-500 rounded-xl text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                          <SelectValue placeholder="Location" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select defaultValue="english">
                      <SelectTrigger className="h-11 border-slate-200 bg-slate-50/50 focus:ring-purple-500 rounded-xl text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-base flex-shrink-0">🌐</span>
                          <SelectValue placeholder="Language" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <Button className="w-full h-12 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/25 transition-all duration-200 hover:scale-[1.01]">
                    <Search className="w-4 h-4 mr-2" />
                    Search Churches
                  </Button>
                </div>

                {/* Trust signals */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>2,450+ churches listed</span>
                  <span>500K+ community members</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 0 480 0 720 20C960 40 1200 40 1440 20V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
