"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, X, Plus } from "lucide-react"
import Link from "next/link"

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  // Mock user data - in real app, fetch based on userId
  const [formData, setFormData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    church: "St. Mary's Cathedral",
    role: "Member",
    status: "active",
    address: "123 Main Street, Springfield, IL 62701",
    dateOfBirth: "1985-06-15",
    emergencyContactName: "Jane Smith",
    emergencyContactPhone: "(555) 987-6543",
    emergencyContactRelationship: "Spouse",
    ministries: ["Youth Group", "Altar Server", "Choir"],
    skills: ["Music", "Teaching", "Event Planning"],
    availability: ["Weekends", "Wednesday Evenings"],
    baptismDate: "1985-07-20",
    confirmationDate: "1998-05-15",
    firstCommunionDate: "1993-04-18",
    notes:
      "Active member who regularly volunteers for community events. Has been instrumental in organizing youth activities.",
  })

  const [newMinistry, setNewMinistry] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [newAvailability, setNewAvailability] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field as keyof typeof prev] as string[]), value.trim()],
      }))
      setter("")
    }
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    // In real app, save to backend
    console.log("Saving user data:", formData)
    router.push(`/church-admin/users/${userId}/profile`)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/church-admin/users/${userId}/profile`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Profile
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Edit Member</h2>
            <p className="text-purple-600">Update member information and details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/church-admin/users/${userId}/profile`}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Link>
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Basic Information</CardTitle>
            <CardDescription className="text-purple-600">Personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-purple-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-purple-200"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-purple-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border-purple-200"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="phone" className="text-purple-700">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="border-purple-200"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-purple-700">
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="border-purple-200"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-purple-700">
                Address
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="border-purple-200"
                rows={2}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="role" className="text-purple-700">
                  Role
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Leader">Leader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status" className="text-purple-700">
                  Status
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Emergency Contact</CardTitle>
            <CardDescription className="text-purple-600">Emergency contact information</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="emergencyContactName" className="text-purple-700">
                Contact Name
              </Label>
              <Input
                id="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                className="border-purple-200"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="emergencyContactPhone" className="text-purple-700">
                  Phone
                </Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                  className="border-purple-200"
                />
              </div>
              <div>
                <Label htmlFor="emergencyContactRelationship" className="text-purple-700">
                  Relationship
                </Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange("emergencyContactRelationship", e.target.value)}
                  className="border-purple-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ministry Involvement */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Ministry Involvement</CardTitle>
            <CardDescription className="text-purple-600">Ministries, skills, and availability</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label className="text-purple-700">Ministries</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {formData.ministries.map((ministry, index) => (
                  <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                    {ministry}
                    <button
                      onClick={() => removeArrayItem("ministries", index)}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add ministry"
                  value={newMinistry}
                  onChange={(e) => setNewMinistry(e.target.value)}
                  className="border-purple-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("ministries", newMinistry, setNewMinistry)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-purple-700">Skills & Talents</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                    {skill}
                    <button
                      onClick={() => removeArrayItem("skills", index)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="border-purple-200"
                />
                <Button type="button" variant="outline" onClick={() => addArrayItem("skills", newSkill, setNewSkill)}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-purple-700">Availability</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-2">
                {formData.availability.map((time, index) => (
                  <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                    {time}
                    <button
                      onClick={() => removeArrayItem("availability", index)}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add availability"
                  value={newAvailability}
                  onChange={(e) => setNewAvailability(e.target.value)}
                  className="border-purple-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addArrayItem("availability", newAvailability, setNewAvailability)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sacramental Records */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Sacramental Records</CardTitle>
            <CardDescription className="text-purple-600">Important sacramental dates</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="baptismDate" className="text-purple-700">
                Baptism Date
              </Label>
              <Input
                id="baptismDate"
                type="date"
                value={formData.baptismDate}
                onChange={(e) => handleInputChange("baptismDate", e.target.value)}
                className="border-purple-200"
              />
            </div>
            <div>
              <Label htmlFor="firstCommunionDate" className="text-purple-700">
                First Communion Date
              </Label>
              <Input
                id="firstCommunionDate"
                type="date"
                value={formData.firstCommunionDate}
                onChange={(e) => handleInputChange("firstCommunionDate", e.target.value)}
                className="border-purple-200"
              />
            </div>
            <div>
              <Label htmlFor="confirmationDate" className="text-purple-700">
                Confirmation Date
              </Label>
              <Input
                id="confirmationDate"
                type="date"
                value={formData.confirmationDate}
                onChange={(e) => handleInputChange("confirmationDate", e.target.value)}
                className="border-purple-200"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <CardTitle className="text-purple-900">Notes</CardTitle>
          <CardDescription className="text-purple-600">Additional notes and observations</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="border-purple-200"
            rows={4}
            placeholder="Add any additional notes about this member..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
