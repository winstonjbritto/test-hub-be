"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, UserPlus, Eye, Edit, MessageCircle, Church } from "lucide-react"

export default function ChurchAdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [churchFilter, setChurchFilter] = useState("all")

  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      church: "St. Mary's Cathedral",
      role: "Member",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-12-20",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      phone: "(555) 123-4567",
      ministry: "Youth Group",
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary.johnson@email.com",
      church: "St. Mary's Cathedral",
      role: "Volunteer",
      status: "active",
      joinDate: "2024-02-20",
      lastActive: "2024-12-19",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      phone: "(555) 234-5678",
      ministry: "Choir",
    },
    {
      id: "3",
      name: "David Wilson",
      email: "david.wilson@email.com",
      church: "Sacred Heart Church",
      role: "Member",
      status: "active",
      joinDate: "2024-03-10",
      lastActive: "2024-12-18",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
      phone: "(555) 345-6789",
      ministry: "Altar Server",
    },
    {
      id: "4",
      name: "Sarah Brown",
      email: "sarah.brown@email.com",
      church: "St. Joseph's Parish",
      role: "Leader",
      status: "active",
      joinDate: "2023-11-10",
      lastActive: "2024-12-17",
      avatar: "/placeholder.svg?height=40&width=40&text=SB",
      phone: "(555) 456-7890",
      ministry: "Bible Study",
    },
  ]

  const churches = ["all", "St. Mary's Cathedral", "Sacred Heart Church", "St. Joseph's Parish"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ministry.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesChurch = churchFilter === "all" || user.church === churchFilter

    return matchesSearch && matchesChurch
  })

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
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Church Members</h2>
            <p className="text-purple-600">Manage members across your churches</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <CardTitle className="text-purple-900">All Members</CardTitle>
          <CardDescription className="text-purple-600">Manage and monitor church members</CardDescription>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200"
              />
            </div>
            <Select value={churchFilter} onValueChange={setChurchFilter}>
              <SelectTrigger className="w-48 border-purple-200">
                <SelectValue placeholder="Filter by church" />
              </SelectTrigger>
              <SelectContent>
                {churches.map((church) => (
                  <SelectItem key={church} value={church}>
                    {church === "all" ? "All Churches" : church}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-200">
                <TableHead className="text-purple-700">Member</TableHead>
                <TableHead className="text-purple-700">Church</TableHead>
                <TableHead className="text-purple-700">Role</TableHead>
                <TableHead className="text-purple-700">Ministry</TableHead>
                <TableHead className="text-purple-700">Status</TableHead>
                <TableHead className="text-purple-700">Join Date</TableHead>
                <TableHead className="text-right text-purple-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-purple-100 hover:bg-purple-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-purple-200"
                      />
                      <div>
                        <div className="font-medium text-purple-900">{user.name}</div>
                        <div className="text-sm text-purple-600">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Church className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-700">{user.church}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      {user.ministry}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="text-purple-700">{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-purple-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Members</CardTitle>
            <UserPlus className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{filteredUsers.length}</div>
            <p className="text-xs text-purple-600">Active members</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Leaders</CardTitle>
            <Badge className="h-4 w-4 bg-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {filteredUsers.filter((u) => u.role === "Leader").length}
            </div>
            <p className="text-xs text-purple-600">Ministry leaders</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Volunteers</CardTitle>
            <Badge className="h-4 w-4 bg-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {filteredUsers.filter((u) => u.role === "Volunteer").length}
            </div>
            <p className="text-xs text-purple-600">Active volunteers</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">3</div>
            <p className="text-xs text-purple-600">New members</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
