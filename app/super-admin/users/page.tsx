"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Check, X, Eye, Edit, Trash2, UserPlus } from "lucide-react"
import { SplitLayout } from "@/components/layouts/split-layout"
import { FilterSidebar } from "@/components/filters/filter-sidebar"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])

  const users = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      church: "St. Mary's Cathedral",
      role: "end_user",
      status: "active",
      approved: true,
      joinDate: "2024-01-15",
      lastActive: "2024-12-20",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary.johnson@email.com",
      church: "Sacred Heart Church",
      role: "end_user",
      status: "active",
      approved: true,
      joinDate: "2024-02-20",
      lastActive: "2024-12-19",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    },
    {
      id: "3",
      name: "David Wilson",
      email: "david.wilson@email.com",
      church: "St. Joseph's Parish",
      role: "end_user",
      status: "pending",
      approved: false,
      joinDate: "2024-12-18",
      lastActive: "2024-12-18",
      avatar: "/placeholder.svg?height=40&width=40&text=DW",
    },
    {
      id: "4",
      name: "Sarah Brown",
      email: "sarah.brown@email.com",
      church: "Holy Trinity Church",
      role: "end_user",
      status: "inactive",
      approved: true,
      joinDate: "2023-11-10",
      lastActive: "2024-11-15",
      avatar: "/placeholder.svg?height=40&width=40&text=SB",
    },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.church.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role)

    const matchesStatus =
      statusFilter.length === 0 ||
      statusFilter.includes(user.approved ? "approved" : "pending") ||
      statusFilter.includes(user.status)

    return matchesSearch && matchesRole && matchesStatus
  })

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

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge variant="destructive">Super Admin</Badge>
      case "church_admin":
        return <Badge variant="default">Church Admin</Badge>
      case "end_user":
        return <Badge variant="outline">End User</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setRoleFilter([])
    setStatusFilter([])
  }

  const leftPanel = (
    <FilterSidebar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filters={[
        {
          title: "Role",
          options: [
            { label: "End User", value: "end_user", count: users.filter((u) => u.role === "end_user").length },
            { label: "Church Admin", value: "church_admin", count: users.filter((u) => u.role === "church_admin").length },
            { label: "Super Admin", value: "super_admin", count: users.filter((u) => u.role === "super_admin").length },
          ],
          selectedValues: roleFilter,
          onFilterChange: handleRoleFilterChange,
        },
        {
          title: "Status",
          options: [
            { label: "Active", value: "active", count: users.filter((u) => u.status === "active").length },
            { label: "Pending Approval", value: "pending", count: users.filter((u) => !u.approved).length },
            { label: "Inactive", value: "inactive", count: users.filter((u) => u.status === "inactive").length },
          ],
          selectedValues: statusFilter,
          onFilterChange: handleStatusFilterChange,
        },
      ]}
      onReset={handleResetFilters}
    />
  )

  const rightPanel = (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage end users and their accounts</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            All Users {filteredUsers.length !== users.length && `(${filteredUsers.length})`}
          </CardTitle>
          <CardDescription>Manage and monitor user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your filters
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Church</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.church}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status, user.approved)}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {!user.approved && (
                            <DropdownMenuItem>
                              <Check className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <X className="w-4 h-4 mr-2" />
                            {user.status === "active" ? "Deactivate" : "Activate"}
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
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-4 p-4 md:p-8 border-b">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <SplitLayout leftPanel={leftPanel} rightPanel={rightPanel} />
    </div>
  )
}
