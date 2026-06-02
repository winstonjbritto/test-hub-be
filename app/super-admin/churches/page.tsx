"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Users, Calendar } from "lucide-react"
import { SplitLayout } from "@/components/layouts/split-layout"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ChurchesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [dioceseFilter, setDioceseFilter] = useState<string[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const churches = [
    {
      id: "1",
      name: "St. Mary's Cathedral",
      address: "123 Faith Street, New York, NY 10001",
      diocese: "Archdiocese of New York",
      pastor: "Father Michael Johnson",
      members: 1250,
      status: "active",
      approved: true,
      image: "/placeholder.svg?height=200&width=300&text=St.+Mary's+Cathedral",
      massSchedule: ["Sunday 8:00 AM", "Sunday 10:30 AM", "Sunday 6:00 PM"],
      phone: "(212) 555-0123",
      email: "info@stmarys.com",
    },
    {
      id: "2",
      name: "Sacred Heart Church",
      address: "456 Hope Avenue, Los Angeles, CA 90210",
      diocese: "Archdiocese of Los Angeles",
      pastor: "Sister Catherine Smith",
      members: 890,
      status: "active",
      approved: true,
      image: "/placeholder.svg?height=200&width=300&text=Sacred+Heart+Church",
      massSchedule: ["Sunday 9:00 AM", "Sunday 11:00 AM"],
      phone: "(323) 555-0456",
      email: "info@sacredheart.com",
    },
    {
      id: "3",
      name: "St. Joseph's Parish",
      address: "789 Grace Road, Chicago, IL 60601",
      diocese: "Archdiocese of Chicago",
      pastor: "Father David Wilson",
      members: 650,
      status: "pending",
      approved: false,
      image: "/placeholder.svg?height=200&width=300&text=St.+Joseph's+Parish",
      massSchedule: ["Sunday 8:30 AM", "Sunday 10:00 AM"],
      phone: "(312) 555-0789",
      email: "info@stjoseph.com",
    },
    {
      id: "4",
      name: "Holy Trinity Church",
      address: "321 Peace Lane, Boston, MA 02101",
      diocese: "Archdiocese of Boston",
      pastor: "Father Robert Brown",
      members: 1100,
      status: "active",
      approved: true,
      image: "/placeholder.svg?height=200&width=300&text=Holy+Trinity+Church",
      massSchedule: ["Sunday 7:30 AM", "Sunday 9:30 AM", "Sunday 11:30 AM"],
      phone: "(617) 555-0321",
      email: "info@holytrinity.com",
    },
  ]

  const filteredChurches = churches.filter((church) => {
    const matchesSearch =
      church.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      church.diocese.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter.length === 0 ||
      statusFilter.includes(church.approved ? "approved" : "pending") ||
      statusFilter.includes(church.status)

    const matchesDiocese = dioceseFilter.length === 0 || dioceseFilter.includes(church.diocese)

    return matchesSearch && matchesStatus && matchesDiocese
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

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const handleDioceseFilterChange = (value: string) => {
    setDioceseFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setStatusFilter([])
    setDioceseFilter([])
  }

  const leftPanel = (
    <FilterSidebar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      filters={[
        {
          title: "Status",
          options: [
            { label: "Active", value: "active", count: churches.filter((c) => c.status === "active").length },
            { label: "Pending Approval", value: "pending", count: churches.filter((c) => !c.approved).length },
            { label: "Inactive", value: "inactive", count: churches.filter((c) => c.status === "inactive").length },
          ],
          selectedValues: statusFilter,
          onFilterChange: handleStatusFilterChange,
        },
        {
          title: "Diocese",
          options: [
            { label: "Archdiocese of New York", value: "Archdiocese of New York" },
            { label: "Archdiocese of Los Angeles", value: "Archdiocese of Los Angeles" },
            { label: "Archdiocese of Chicago", value: "Archdiocese of Chicago" },
            { label: "Archdiocese of Boston", value: "Archdiocese of Boston" },
          ],
          selectedValues: dioceseFilter,
          onFilterChange: handleDioceseFilterChange,
        },
      ]}
      onReset={handleResetFilters}
    />
  )

  const rightPanel = (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Churches</h2>
          <p className="text-muted-foreground">Manage churches and their information</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Church
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Church</DialogTitle>
              <DialogDescription>Register a new church in the system</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="churchName">Church Name</Label>
                <Input id="churchName" placeholder="Enter church name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pastor">Pastor/Priest</Label>
                <Input id="pastor" placeholder="Enter pastor name" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diocese">Diocese</Label>
                <Input id="diocese" placeholder="Enter diocese" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Add Church</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            All Churches {filteredChurches.length !== churches.length && `(${filteredChurches.length})`}
          </CardTitle>
          <CardDescription>Manage and monitor church registrations</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredChurches.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No churches found matching your filters
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredChurches.map((church) => (
                <Card key={church.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={church.image || "/placeholder.svg"}
                      alt={church.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{church.name}</CardTitle>
                      {getStatusBadge(church.status, church.approved)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {church.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm">
                      <p>
                        <strong>Pastor:</strong> {church.pastor}
                      </p>
                      <p>
                        <strong>Diocese:</strong> {church.diocese}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{church.members} members</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{church.massSchedule.length} masses</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center gap-4 p-4 md:p-8 border-b">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Churches Management</h1>
      </div>
      <SplitLayout leftPanel={leftPanel} rightPanel={rightPanel} />
    </div>
  )
}
