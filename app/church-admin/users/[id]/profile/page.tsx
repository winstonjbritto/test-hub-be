"use client"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, MessageCircle, Phone, Mail, MapPin, Calendar, Church, Heart, Award } from "lucide-react"
import Link from "next/link"

export default function UserProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  // Mock user data - in real app, fetch based on userId
  const user = {
    id: userId,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    church: "St. Mary's Cathedral",
    role: "Member",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-12-20",
    avatar: "/placeholder.svg?height=120&width=120&text=JS",
    ministry: "Youth Group",
    address: "123 Main Street, Springfield, IL 62701",
    dateOfBirth: "1985-06-15",
    emergencyContact: {
      name: "Jane Smith",
      phone: "(555) 987-6543",
      relationship: "Spouse",
    },
    ministries: ["Youth Group", "Altar Server", "Choir"],
    sacraments: {
      baptism: "1985-07-20",
      confirmation: "1998-05-15",
      firstCommunion: "1993-04-18",
    },
    notes:
      "Active member who regularly volunteers for community events. Has been instrumental in organizing youth activities.",
    skills: ["Music", "Teaching", "Event Planning"],
    availability: ["Weekends", "Wednesday Evenings"],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Leader":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Leader</Badge>
      case "Volunteer":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Volunteer</Badge>
      case "Member":
        return <Badge variant="outline">Member</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/church-admin/users" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Users
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Member Profile</h2>
            <p className="text-purple-600">View detailed member information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/church-admin/users/${userId}/message`}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Message
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/church-admin/users/${userId}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1 border-purple-200">
          <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <div className="flex justify-center mb-4">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-purple-200"
              />
            </div>
            <CardTitle className="text-purple-900">{user.name}</CardTitle>
            <CardDescription className="text-purple-600">{user.email}</CardDescription>
            <div className="flex justify-center gap-2 mt-2">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 text-purple-700">
              <Phone className="w-4 h-4 text-purple-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-purple-700">
              <Mail className="w-4 h-4 text-purple-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-purple-700">
              <Church className="w-4 h-4 text-purple-500" />
              <span>{user.church}</span>
            </div>
            <div className="flex items-center gap-3 text-purple-700">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm">{user.address}</span>
            </div>
            <div className="flex items-center gap-3 text-purple-700">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-purple-700">Date of Birth</label>
                  <p className="text-purple-900">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">Last Active</label>
                  <p className="text-purple-900">{new Date(user.lastActive).toLocaleDateString()}</p>
                </div>
              </div>
              <Separator className="bg-purple-200" />
              <div>
                <label className="text-sm font-medium text-purple-700">Emergency Contact</label>
                <div className="mt-2 space-y-1">
                  <p className="text-purple-900">{user.emergencyContact.name}</p>
                  <p className="text-purple-600 text-sm">{user.emergencyContact.relationship}</p>
                  <p className="text-purple-600 text-sm">{user.emergencyContact.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ministry Involvement */}
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Ministry Involvement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-purple-700">Current Ministries</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.ministries.map((ministry, index) => (
                    <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                      {ministry}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700">Skills & Talents</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-purple-700">Availability</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.availability.map((time, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sacramental Records */}
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Sacramental Records
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-purple-700">Baptism</label>
                  <p className="text-purple-900">{new Date(user.sacraments.baptism).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">First Communion</label>
                  <p className="text-purple-900">{new Date(user.sacraments.firstCommunion).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">Confirmation</label>
                  <p className="text-purple-900">{new Date(user.sacraments.confirmation).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-purple-700 leading-relaxed">{user.notes}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
