"use client"

import { Search, MapPin, Users, Church } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HeroSectionProps {
  onSearch: (query: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/church-interior.png"
          alt="Catholic Church"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div>
                <p className="text-amber-400 text-lg font-medium mb-2">Welcome to the</p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  Catholic Church<br />Community
                </h1>
                <p className="text-lg text-gray-300">
                  Find churches, Mass timings, events, blogs and grow in faith with our Catholic community.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Church className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Find Churches</p>
                    <p className="text-sm text-gray-300">Near You</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="bg-white/20 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">View Mass</p>
                    <p className="text-sm text-gray-300">Timings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Join Church</p>
                    <p className="text-sm text-gray-300">Community</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Search Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Find Churches Near You</h3>
              
              <div className="space-y-4">
                {/* Search Input */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search by Church, Saint, City or Pincode..."
                      className="pl-12 py-3 text-base border-gray-300 focus:border-slate-900 focus:ring-slate-900"
                    />
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-2 gap-3">
                  <Select defaultValue="location">
                    <SelectTrigger className="border-gray-300 focus:border-slate-900 focus:ring-slate-900">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location">Bangalore</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="language">
                    <SelectTrigger className="border-gray-300 focus:border-slate-900 focus:ring-slate-900">
                      <span className="mr-2">🌐</span>
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="language">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-base font-semibold rounded-lg flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Churches
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
