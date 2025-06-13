"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, MapPin, Users, Calendar, Settings, Edit, Eye, Church, ImageIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function ChurchAdminChurchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChurch, setSelectedChurch] = useState("church1")

  // Mock data for churches managed by this admin
  const churches = [
    {
      id: "church1",
      name: "St. Mary's Cathedral",
      address: "123 Faith Street, New York, NY 10001",
      diocese: "Archdiocese of New York",
      pastor: "Father Michael Johnson",
      members: 1250,
      status: "active",
      image: "/placeholder.svg?height=200&width=300&text=St.+Mary's+Cathedral",
      massSchedule: ["Sunday 8:00 AM", "Sunday 10:30 AM", "Sunday 6:00 PM"],
      phone: "(212) 555-0123",
      email: "info@stmarys.com",
      upcomingEvents: 5,
      recentBlogs: 3,
      totalMedia: 45,
    },
    {
      id: "church2",
      name: "Sacred Heart Church",
      address: "456 Hope Avenue, Los Angeles, CA 90210",
      diocese: "Archdiocese of Los Angeles",
      pastor: "Father Michael Johnson",
      members: 890,
      status: "active",
      image: "/placeholder.svg?height=200&width=300&text=Sacred+Heart+Church",
      massSchedule: ["Sunday 9:00 AM", "Sunday 11:00 AM"],
      phone: "(323) 555-0456",
      email: "info@sacredheart.com",
      upcomingEvents: 3,
      recentBlogs: 2,
      totalMedia: 32,
    },
    {
      id: "church3",
      name: "St. Joseph's Parish",
      address: "789 Grace Road, Chicago, IL 60601",
      diocese: "Archdiocese of Chicago",
      pastor: "Father Michael Johnson",
      members: 650,
      status: "active",
      image: "/placeholder.svg?height=200&width=300&text=St.+Joseph's+Parish",
      massSchedule: ["Sunday 8:30 AM", "Sunday 10:00 AM"],
      phone: "(312) 555-0789",
      email: "info@stjoseph.com",
      upcomingEvents: 4,
      recentBlogs: 1,
      totalMedia: 28,
    },
  ]

  const filteredChurches = churches.filter(
    (church) =>
      church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedChurchData = churches.find((c) => c.id === selectedChurch)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">My Churches</h2>
            <p className="text-purple-600">Manage your assigned churches and their information</p>
          </div>
        </div>
        <Link href="/church-admin/churches/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Church
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-purple-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="manage" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Manage Churches
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Church Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChurches.map((church) => (
              <Card
                key={church.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src={church.image || "/placeholder.svg"}
                    alt={church.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg text-purple-900">{church.name}</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 text-purple-600">
                    <MapPin className="w-4 h-4" />
                    {church.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span>{church.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{church.upcomingEvents} events</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Settings className="w-4 h-4 mr-1" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-900">Church Management</CardTitle>
                  <CardDescription className="text-purple-600">Select a church to manage its details</CardDescription>
                </div>
                <Select value={selectedChurch} onValueChange={setSelectedChurch}>
                  <SelectTrigger className="w-64 border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {churches.map((church) => (
                      <SelectItem key={church.id} value={church.id}>
                        {church.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {selectedChurchData && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-purple-700">Church Name</Label>
                        <Input value={selectedChurchData.name} className="border-purple-200" />
                      </div>
                      <div>
                        <Label className="text-purple-700">Pastor</Label>
                        <Input value={selectedChurchData.pastor} className="border-purple-200" />
                      </div>
                      <div>
                        <Label className="text-purple-700">Phone</Label>
                        <Input value={selectedChurchData.phone} className="border-purple-200" />
                      </div>
                      <div>
                        <Label className="text-purple-700">Email</Label>
                        <Input value={selectedChurchData.email} className="border-purple-200" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-purple-700">Diocese</Label>
                        <Input value={selectedChurchData.diocese} className="border-purple-200" />
                      </div>
                      <div>
                        <Label className="text-purple-700">Address</Label>
                        <Textarea value={selectedChurchData.address} className="border-purple-200" />
                      </div>
                      <div>
                        <Label className="text-purple-700">Members Count</Label>
                        <Input value={selectedChurchData.members.toString()} className="border-purple-200" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                      Cancel
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Total Members</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {churches.reduce((sum, church) => sum + church.members, 0).toLocaleString()}
                </div>
                <p className="text-xs text-purple-600">Across all churches</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {churches.reduce((sum, church) => sum + church.upcomingEvents, 0)}
                </div>
                <p className="text-xs text-purple-600">Upcoming events</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Active Churches</CardTitle>
                <Church className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{churches.length}</div>
                <p className="text-xs text-purple-600">Under management</p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Media Files</CardTitle>
                <ImageIcon className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">
                  {churches.reduce((sum, church) => sum + church.totalMedia, 0)}
                </div>
                <p className="text-xs text-purple-600">Total media files</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Church Performance</CardTitle>
              <CardDescription className="text-purple-600">Overview of your churches' activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {churches.map((church) => (
                  <div
                    key={church.id}
                    className="flex items-center justify-between p-4 border border-purple-200 rounded-lg bg-purple-50/50"
                  >
                    <div>
                      <h4 className="font-medium text-purple-900">{church.name}</h4>
                      <p className="text-sm text-purple-600">{church.members} members</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-purple-900">{church.upcomingEvents}</div>
                        <div className="text-purple-600">Events</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-purple-900">{church.recentBlogs}</div>
                        <div className="text-purple-600">Blogs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-purple-900">{church.totalMedia}</div>
                        <div className="text-purple-600">Media</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
