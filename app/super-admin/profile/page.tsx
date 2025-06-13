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
import { CalendarDays, Church, FileEdit, Key, Mail, Phone, Shield, User, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SuperAdminProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "admin@catholicportal.com",
    phone: "+1 (555) 123-4567",
    title: "System Administrator",
    bio: "Experienced system administrator with over 10 years managing church platforms and digital infrastructure.",
    joinDate: "January 15, 2020",
    address: "123 Vatican Street, Rome, Italy",
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const stats = [
    { label: "Churches", value: "156", icon: Church },
    { label: "Church Admins", value: "42", icon: Users },
    { label: "Users", value: "2,845", icon: User },
  ]

  const recentActivities = [
    { action: "Approved new church", time: "2 hours ago", target: "St. Mary's Cathedral" },
    { action: "Updated system settings", time: "Yesterday", target: "Global notification preferences" },
    { action: "Added new church admin", time: "3 days ago", target: "Fr. James Wilson" },
    { action: "Reviewed blog post", time: "1 week ago", target: "Easter Celebration Guide" },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Super Admin Profile</h1>

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
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Super Administrator</span>
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
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
                <span>Joined {profileData.joinDate}</span>
              </div>
              <div className="pt-4">
                <Badge className="bg-purple-600 hover:bg-purple-700">Super Admin</Badge>
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-700">System Access</Badge>
                <Badge className="ml-2 bg-green-600 hover:bg-green-700">Full Privileges</Badge>
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
              <CardTitle className="text-lg">System Overview</CardTitle>
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
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and bio</CardDescription>
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
                          <Shield className="w-5 h-5 text-purple-600" />
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
                        <h3 className="font-medium">Active Sessions</h3>
                        <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Account Audit Log</h3>
                        <p className="text-sm text-muted-foreground">View security events for your account</p>
                      </div>
                      <Button variant="outline">View Log</Button>
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
