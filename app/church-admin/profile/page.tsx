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
import { Building2, CalendarDays, Church, FileEdit, Key, Mail, Phone, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChurchAdminProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "Fr. Michael Johnson",
    email: user?.email || "fr.michael@catholicportal.com",
    phone: "+1 (555) 987-6543",
    title: "Parish Priest",
    bio: "Ordained in 2010, serving as parish priest at St. Mary's Cathedral. Focused on youth ministry and community outreach programs.",
    joinDate: "March 10, 2021",
    address: "456 Church Avenue, Boston, MA",
    diocese: "Archdiocese of Boston",
    ordination: "June 15, 2010",
    languages: ["English", "Latin", "Spanish"],
    specialization: "Youth Ministry",
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const stats = [
    { label: "Churches", value: "3", icon: Church },
    { label: "Members", value: "1,245", icon: User },
    { label: "Years", value: "13", icon: CalendarDays },
  ]

  const managedChurches = [
    { name: "St. Mary's Cathedral", role: "Primary Administrator", location: "Boston, MA" },
    { name: "Sacred Heart Parish", role: "Assistant Administrator", location: "Cambridge, MA" },
    { name: "St. Joseph's Chapel", role: "Weekend Ministry", location: "Somerville, MA" },
  ]

  const recentActivities = [
    { action: "Updated mass schedule", time: "3 hours ago", target: "St. Mary's Cathedral" },
    { action: "Added new event", time: "Yesterday", target: "Youth Retreat - Sacred Heart" },
    { action: "Uploaded documents", time: "2 days ago", target: "Parish Council Minutes" },
    { action: "Published blog post", time: "1 week ago", target: "Sunday Homily Reflection" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Church Admin Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg?height=128&width=128&query=priest"}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="text-4xl">{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{profileData.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Church className="w-4 h-4 text-purple-600" />
                <span>{profileData.title}</span>
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
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span>{profileData.diocese}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span>Ordained {profileData.ordination}</span>
              </div>
              <div className="pt-4">
                <Badge className="bg-purple-600 hover:bg-purple-700">Church Admin</Badge>
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">{profileData.specialization}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setIsEditing(!isEditing)} className="w-full">
                <FileEdit className="w-4 h-4 mr-2" />
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </CardFooter>
          </Card>

          {/* Stats Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Ministry Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <stat.icon className="w-6 h-6 text-purple-600 mb-2" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="churches">My Churches</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal and ministry information</CardDescription>
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
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={profileData.title}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
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
                      <Label htmlFor="diocese">Diocese</Label>
                      <Input
                        id="diocese"
                        value={profileData.diocese}
                        onChange={(e) => setProfileData({ ...profileData, diocese: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ordination">Ordination Date</Label>
                      <Input
                        id="ordination"
                        value={profileData.ordination}
                        onChange={(e) => setProfileData({ ...profileData, ordination: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={profileData.specialization}
                        onValueChange={(value) => setProfileData({ ...profileData, specialization: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger id="specialization">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Youth Ministry">Youth Ministry</SelectItem>
                          <SelectItem value="Family Ministry">Family Ministry</SelectItem>
                          <SelectItem value="Liturgy">Liturgy</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Community Outreach">Community Outreach</SelectItem>
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="bio">Biography</Label>
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
                  <CardDescription>Churches you currently administer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {managedChurches.map((church, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6 border-b last:border-0">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Church className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-lg">{church.name}</p>
                            <Badge variant={church.role.includes("Primary") ? "default" : "outline"}>
                              {church.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{church.location}</p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              Manage Church
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Church className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            {activity.action}: <span className="text-purple-600">{activity.target}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Change Password</h3>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                      <Button variant="outline">
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Login History</h3>
                        <p className="text-sm text-muted-foreground">View your recent login activity</p>
                      </div>
                      <Button variant="outline">View History</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
