"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Check, X, Eye, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChurchAdminsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const churchAdmins = [
    {
      id: "1",
      name: "Father Michael Johnson",
      email: "michael@stmarys.com",
      church: "St. Mary's Cathedral",
      diocese: "New York",
      status: "active",
      approved: true,
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    },
    {
      id: "2",
      name: "Sister Catherine Smith",
      email: "catherine@sacredheart.com",
      church: "Sacred Heart Church",
      diocese: "Los Angeles",
      status: "active",
      approved: true,
      joinDate: "2024-02-20",
      avatar: "/placeholder.svg?height=40&width=40&text=CS",
    },
    {
      id: "3",
      name: "Father David Wilson",
      email: "david@stjoseph.com",
      church: "St. Joseph's Parish",
      diocese: "Chicago",
      status: "pending",
      approved: false,
      joinDate: "2024-12-20",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
    },
    {
      id: "4",
      name: "Father Robert Brown",
      email: "robert@holytrinity.com",
      church: "Holy Trinity Church",
      diocese: "Boston",
      status: "inactive",
      approved: true,
      joinDate: "2023-11-10",
      avatar: "/placeholder.svg?height=40&width=40&text=RB",
    },
  ]

  const filteredAdmins = churchAdmins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.church.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string, approved: boolean) => {
    if (!approved) {
      return <Badge variant="destructive">Pending Approval</Badge>
    }
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Church Admins</h2>
            <p className="text-muted-foreground">Manage church administrators and their permissions</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Church Admin</DialogTitle>
              <DialogDescription>Create a new church administrator account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="church">Church</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select church" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stmarys">St. Mary's Cathedral</SelectItem>
                    <SelectItem value="sacredheart">Sacred Heart Church</SelectItem>
                    <SelectItem value="stjoseph">St. Joseph's Parish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diocese">Diocese</Label>
                <Input id="diocese" placeholder="Enter diocese" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Create Admin</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Church Administrators</CardTitle>
          <CardDescription>Manage and monitor church admin accounts</CardDescription>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search admins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Church</TableHead>
                <TableHead>Diocese</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={admin.avatar || "/placeholder.svg"}
                        alt={admin.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{admin.church}</TableCell>
                  <TableCell>{admin.diocese}</TableCell>
                  <TableCell>{getStatusBadge(admin.status, admin.approved)}</TableCell>
                  <TableCell>{new Date(admin.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {!admin.approved && (
                          <DropdownMenuItem>
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <X className="w-4 h-4 mr-2" />
                          {admin.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
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
    </div>
  )
}
