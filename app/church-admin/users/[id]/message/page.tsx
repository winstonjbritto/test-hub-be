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
import { ArrowLeft, Send, Mail, MessageCircle, Phone } from "lucide-react"
import Link from "next/link"

export default function SendMessagePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  // Mock user data
  const user = {
    id: userId,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    church: "St. Mary's Cathedral",
    role: "Member",
  }

  const [messageData, setMessageData] = useState({
    method: "email",
    subject: "",
    message: "",
    priority: "normal",
  })

  const handleInputChange = (field: string, value: string) => {
    setMessageData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSend = () => {
    // In real app, send message via selected method
    console.log("Sending message:", messageData)
    router.push(`/church-admin/users/${userId}/profile`)
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="w-4 h-4" />
      case "sms":
        return <MessageCircle className="w-4 h-4" />
      case "call":
        return <Phone className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Low Priority</Badge>
      default:
        return <Badge variant="outline">Normal</Badge>
    }
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
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Send Message</h2>
            <p className="text-purple-600">Send a message to {user.name}</p>
          </div>
        </div>
        <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recipient Info */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Recipient</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-12 h-12 rounded-full border-2 border-purple-200"
              />
              <div>
                <div className="font-medium text-purple-900">{user.name}</div>
                <div className="text-sm text-purple-600">{user.church}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-700">
                <Mail className="w-4 h-4 text-purple-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <Phone className="w-4 h-4 text-purple-500" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Form */}
        <Card className="md:col-span-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900">Compose Message</CardTitle>
            <CardDescription className="text-purple-600">
              Choose your communication method and compose your message
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Message Method and Priority */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="method" className="text-purple-700">
                  Communication Method
                </Label>
                <Select value={messageData.method} onValueChange={(value) => handleInputChange("method", value)}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        SMS Text
                      </div>
                    </SelectItem>
                    <SelectItem value="call">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Call Note
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority" className="text-purple-700">
                  Priority
                </Label>
                <Select value={messageData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject (for email) */}
            {messageData.method === "email" && (
              <div>
                <Label htmlFor="subject" className="text-purple-700">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={messageData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Enter email subject"
                  className="border-purple-200"
                />
              </div>
            )}

            {/* Message Content */}
            <div>
              <Label htmlFor="message" className="text-purple-700">
                {messageData.method === "email"
                  ? "Message"
                  : messageData.method === "sms"
                    ? "Text Message"
                    : "Call Notes"}
              </Label>
              <Textarea
                id="message"
                value={messageData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder={
                  messageData.method === "email"
                    ? "Type your email message here..."
                    : messageData.method === "sms"
                      ? "Type your text message here..."
                      : "Enter notes about the phone call..."
                }
                className="border-purple-200"
                rows={8}
              />
              <div className="text-sm text-purple-600 mt-2">
                {messageData.method === "sms" && "SMS messages are limited to 160 characters"}
                {messageData.method === "call" && "These notes will be saved for your records"}
              </div>
            </div>

            {/* Message Preview */}
            <Card className="bg-purple-50/50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-purple-700 flex items-center gap-2">
                  {getMethodIcon(messageData.method)}
                  Message Preview
                  {getPriorityBadge(messageData.priority)}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-purple-700">To:</span> {user.name} ({user.email})
                  </div>
                  {messageData.subject && (
                    <div className="text-sm">
                      <span className="font-medium text-purple-700">Subject:</span> {messageData.subject}
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="font-medium text-purple-700">Message:</span>
                    <div className="mt-1 p-3 bg-white rounded border border-purple-200 text-purple-900">
                      {messageData.message || "Your message will appear here..."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <div>
              <Label className="text-purple-700">Quick Templates</Label>
              <div className="grid gap-2 md:grid-cols-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleInputChange(
                      "message",
                      "Thank you for your continued participation in our church community. We appreciate your dedication and service.",
                    )
                  }
                  className="justify-start text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Thank You</div>
                    <div className="text-xs text-muted-foreground">Appreciation message</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleInputChange(
                      "message",
                      "We wanted to follow up on your recent inquiry. Please let us know if you have any questions or need assistance.",
                    )
                  }
                  className="justify-start text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Follow Up</div>
                    <div className="text-xs text-muted-foreground">General follow-up</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleInputChange(
                      "message",
                      "We have an upcoming event that we think you'd be interested in. Please see the details below and let us know if you can attend.",
                    )
                  }
                  className="justify-start text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Event Invitation</div>
                    <div className="text-xs text-muted-foreground">Invite to event</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleInputChange(
                      "message",
                      "We're reaching out to see how you're doing and if there's anything our church community can do to support you.",
                    )
                  }
                  className="justify-start text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium">Check In</div>
                    <div className="text-xs text-muted-foreground">Pastoral care</div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
