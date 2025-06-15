"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight, Church, Clock, Heart, MapPin, Bell, Users } from "lucide-react"

export default function UserDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const upcomingMasses = [
    {
      id: 1,
      church: "St. Mary's Cathedral",
      time: "Sunday, 10:00 AM",
      date: "June 16, 2024",
      address: "123 Main St, New York, NY",
    },
    {
      id: 2,
      church: "Sacred Heart Chapel",
      time: "Sunday, 8:30 AM",
      date: "June 16, 2024",
      address: "456 Church Ave, New York, NY",
    },
    {
      id: 3,
      church: "St. Joseph's Parish",
      time: "Saturday, 5:00 PM",
      date: "June 15, 2024",
      address: "789 Faith Blvd, New York, NY",
    },
  ]

  const favoriteChurches = [
    {
      id: 1,
      name: "St. Mary's Cathedral",
      address: "123 Main St, New York, NY",
      distance: "0.8 miles",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Sacred Heart Chapel",
      address: "456 Church Ave, New York, NY",
      distance: "1.2 miles",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const recentBlogs = [
    {
      id: 1,
      title: "Understanding the Liturgical Calendar",
      excerpt: "A guide to the seasons and celebrations of the Catholic Church year.",
      date: "June 10, 2024",
      author: "Fr. Michael Thomas",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      title: "The Meaning of Pentecost",
      excerpt: "Exploring the significance of the Holy Spirit's descent upon the Apostles.",
      date: "June 5, 2024",
      author: "Sr. Elizabeth Marie",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const communityEvents = [
    {
      id: 1,
      title: "Parish Picnic",
      date: "June 20, 2024",
      time: "12:00 PM - 4:00 PM",
      location: "St. Mary's Park",
    },
    {
      id: 2,
      title: "Bible Study Group",
      date: "Every Wednesday",
      time: "7:00 PM - 8:30 PM",
      location: "Parish Hall",
    },
    {
      id: 3,
      title: "Youth Ministry Meeting",
      date: "June 18, 2024",
      time: "6:30 PM - 8:00 PM",
      location: "Youth Center",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "Mass Schedule Change",
      message: "Sunday Mass time changed to 10:30 AM starting next week",
      date: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New Blog Post",
      message: "New article: 'The Meaning of Pentecost' has been published",
      date: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Parish Picnic is coming up this Saturday!",
      date: "2 days ago",
      read: true,
    },
  ]

  return (
    <>
      <CommonHeader />
      <main className="container mx-auto py-6 px-4">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name || "Friend"}!
              </h1>
              <p className="text-purple-100 mb-4">
                Your spiritual journey continues. Here's what's happening in your Catholic community.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/churches">
                  <Button variant="secondary" size="sm">
                    Find a Church
                  </Button>
                </Link>
                <Link href="/masses">
                  <Button variant="secondary" size="sm">
                    Mass Times
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent text-white border-white hover:bg-white/10"
                  >
                    Update Profile
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Stained Glass"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="masses">Masses</TabsTrigger>
            <TabsTrigger value="churches">Churches</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Church className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Favorite Churches</p>
                    <p className="text-2xl font-bold">{favoriteChurches.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upcoming Masses</p>
                    <p className="text-2xl font-bold">{upcomingMasses.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notifications</p>
                    <p className="text-2xl font-bold">{notifications.filter((n) => !n.read).length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Community Events</p>
                    <p className="text-2xl font-bold">{communityEvents.length}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Next Mass */}
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 border-b border-purple-100">
                <CardTitle className="text-purple-800">Your Next Mass</CardTitle>
                <CardDescription>Coming up soon</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Church className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{upcomingMasses[0].church}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{upcomingMasses[0].time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{upcomingMasses[0].date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{upcomingMasses[0].address}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      Directions
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Blogs */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Articles</CardTitle>
                    <Link href="/blogs">
                      <Button variant="ghost" size="sm" className="text-xs">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentBlogs.map((blog) => (
                      <div key={blog.id} className="flex items-start gap-3 p-4">
                        <img
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{blog.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-purple-600">{blog.date}</span>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{blog.author}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Notifications</CardTitle>
                    <Link href="/notifications">
                      <Button variant="ghost" size="sm" className="text-xs">
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-4">
                        <div
                          className={`w-2 h-2 mt-2 rounded-full ${notification.read ? "bg-gray-300" : "bg-purple-600"}`}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Masses Tab */}
          <TabsContent value="masses">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Masses</CardTitle>
                <CardDescription>Masses you've saved or are near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingMasses.map((mass) => (
                    <div key={mass.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <Church className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{mass.church}</h3>
                          <Button variant="ghost" size="sm" className="h-8">
                            <Heart className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{mass.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{mass.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{mass.address}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Directions
                          </Button>
                          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <p className="text-sm text-muted-foreground">Showing {upcomingMasses.length} upcoming masses</p>
                <Link href="/masses">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Find More Masses
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Churches Tab */}
          <TabsContent value="churches">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Churches</CardTitle>
                <CardDescription>Churches you've saved or visited recently</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {favoriteChurches.map((church) => (
                    <div key={church.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <img
                        src={church.image || "/placeholder.svg"}
                        alt={church.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{church.name}</h3>
                          <Badge className="bg-purple-600">{church.distance}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{church.address}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            Mass Times
                          </Button>
                          <Link href={`/churches/${church.id}`}>
                            <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 flex justify-between">
                <p className="text-sm text-muted-foreground">Showing {favoriteChurches.length} favorite churches</p>
                <Link href="/churches">
                  <Button variant="ghost" size="sm" className="gap-1">
                    Find More Churches
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Community Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Events</CardTitle>
                  <CardDescription>Upcoming events in your community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {communityEvents.map((event) => (
                      <div key={event.id} className="p-4 border rounded-lg">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-3">
                          <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Blogs */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                  <CardDescription>Latest from the Catholic community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBlogs.map((blog) => (
                      <div key={blog.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <img
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{blog.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-purple-600">{blog.date}</span>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{blog.author}</span>
                          </div>
                          <div className="mt-2">
                            <Link href={`/blogs/${blog.id}`}>
                              <Button variant="outline" size="sm">
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50">
                  <Link href="/blogs" className="w-full">
                    <Button variant="ghost" className="w-full">
                      View All Articles
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <CommonFooter />
    </>
  )
}
