"use client"

import { useState } from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Church, FileEdit, Heart, Mail, MapPin, Phone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"

export default function UserProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Maria Rodriguez",
    email: user?.email || "maria@example.com",
    phone: "+1 (555) 234-5678",
    address: "789 Faith Street, Chicago, IL",
    bio: "Active parish member at St. Mary's Cathedral. Volunteer for youth ministry and choir member for 5 years.",
    joinDate: "August 5, 2019",
    parish: "St. Mary's Cathedral",
    interests: ["Youth Ministry", "Music", "Bible Study", "Community Service"],
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const affiliatedChurches = [
    { name: "St. Mary's Cathedral", role: "Primary Parish", since: "2015" },
    { name: "Sacred Heart Chapel", role: "Volunteer", since: "2018" },
  ]

  const upcomingEvents = [
    { name: "Sunday Mass", date: "Every Sunday, 10:00 AM", location: "St. Mary's Cathedral" },
    { name: "Youth Group Meeting", date: "Wednesday, 7:00 PM", location: "Parish Hall" },
    { name: "Choir Practice", date: "Thursday, 6:30 PM", location: "Choir Room" },
    { name: "Community Service", date: "Saturday, 9:00 AM", location: "Food Pantry" },
  ]

  return (
    <>
      <CommonHeader />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage
                      src={user?.avatar || "/placeholder.svg?height=128&width=128&query=person"}
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-4xl">{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Church className="w-4 h-4 text-blue-600" />
                  <span>Member at {profileData.parish}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profileData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {profileData.joinDate}</span>
                </div>
                <div className="pt-4 flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} className="bg-blue-600 hover:bg-blue-700">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsEditing(!isEditing)} className="w-full">
                  <FileEdit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel Editing" : "Edit Profile"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="profile">Profile Details</TabsTrigger>
                <TabsTrigger value="churches">My Churches</TabsTrigger>
                <TabsTrigger value="events">Upcoming Events</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parish">Primary Parish</Label>
                        <Input
                          id="parish"
                          value={profileData.parish}
                          onChange={(e) => setProfileData({ ...profileData, parish: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">About Me</Label>
                        <Textarea
                          id="bio"
                          rows={5}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isEditing && (
                      <Button onClick={handleSave} className="ml-auto">
                        Save Changes
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Churches Tab */}
              <TabsContent value="churches">
                <Card>
                  <CardHeader>
                    <CardTitle>My Churches</CardTitle>
                    <CardDescription>Churches you are affiliated with</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {affiliatedChurches.map((church, index) => (
                        <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-0">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Church className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-lg">{church.name}</p>
                              <Badge
                                variant={church.role === "Primary Parish" ? "default" : "outline"}
                                className={church.role === "Primary Parish" ? "bg-blue-600" : ""}
                              >
                                {church.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Member since {church.since}</p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">
                                View Church
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Events you are registered for</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {upcomingEvents.map((event, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Heart className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{event.name}</p>
                            <p className="text-sm text-blue-600">{event.date}</p>
                            <p className="text-sm text-muted-foreground">{event.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  )
}
