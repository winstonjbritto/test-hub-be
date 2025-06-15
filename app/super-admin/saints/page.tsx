"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Calendar,
  MapPin,
  Star,
  Users,
  ImageIcon,
  Play,
  Volume2,
  Upload,
  Download,
  SortAsc,
  SortDesc,
} from "lucide-react"
import Link from "next/link"

// Mock saints data
const saintsData = [
  {
    id: 1,
    name: "Saint Francis of Assisi",
    title: "Patron of Animals and Environment",
    feastDay: "October 4",
    born: "1181",
    died: "1226",
    century: "12th-13th Century",
    location: "Assisi, Italy",
    canonized: "July 16, 1228",
    canonizedBy: "Pope Gregory IX",
    image: "/placeholder.svg?height=80&width=80",
    category: "Founder",
    status: "Published",
    patronOf: ["Animals", "Environment", "Italy", "Merchants"],
    mediaCount: { images: 15, videos: 8, audio: 12 },
    lastUpdated: "2024-12-15",
    createdBy: "Admin User",
  },
  {
    id: 2,
    name: "Saint Teresa of Calcutta",
    title: "Mother Teresa - Saint of the Gutters",
    feastDay: "September 5",
    born: "1910",
    died: "1997",
    century: "20th Century",
    location: "Calcutta, India",
    canonized: "September 4, 2016",
    canonizedBy: "Pope Francis",
    image: "/placeholder.svg?height=80&width=80",
    category: "Missionary",
    status: "Published",
    patronOf: ["Missionaries", "Poor", "Volunteers", "India"],
    mediaCount: { images: 25, videos: 18, audio: 10 },
    lastUpdated: "2024-12-10",
    createdBy: "Admin User",
  },
  {
    id: 3,
    name: "Saint Joan of Arc",
    title: "The Maid of Orléans",
    feastDay: "May 30",
    born: "1412",
    died: "1431",
    century: "15th Century",
    location: "France",
    canonized: "May 16, 1920",
    canonizedBy: "Pope Benedict XV",
    image: "/placeholder.svg?height=80&width=80",
    category: "Martyr",
    status: "Draft",
    patronOf: ["France", "Soldiers", "Martyrs", "Prisoners"],
    mediaCount: { images: 20, videos: 12, audio: 8 },
    lastUpdated: "2024-12-08",
    createdBy: "Editor User",
  },
  {
    id: 4,
    name: "Saint John Paul II",
    title: "Pope Saint John Paul the Great",
    feastDay: "October 22",
    born: "1920",
    died: "2005",
    century: "20th-21st Century",
    location: "Poland/Vatican",
    canonized: "April 27, 2014",
    canonizedBy: "Pope Francis",
    image: "/placeholder.svg?height=80&width=80",
    category: "Pope",
    status: "Published",
    patronOf: ["World Youth Day", "Families", "Poland"],
    mediaCount: { images: 35, videos: 25, audio: 20 },
    lastUpdated: "2024-12-12",
    createdBy: "Admin User",
  },
  {
    id: 5,
    name: "Saint Thérèse of Lisieux",
    title: "The Little Flower",
    feastDay: "October 1",
    born: "1873",
    died: "1897",
    century: "19th Century",
    location: "Lisieux, France",
    canonized: "May 17, 1925",
    canonizedBy: "Pope Pius XI",
    image: "/placeholder.svg?height=80&width=80",
    category: "Doctor of the Church",
    status: "Published",
    patronOf: ["Missions", "Florists", "France", "Tuberculosis"],
    mediaCount: { images: 18, videos: 10, audio: 15 },
    lastUpdated: "2024-12-05",
    createdBy: "Editor User",
  },
]

const categories = ["All", "Founder", "Missionary", "Martyr", "Pope", "Doctor of the Church", "Virgin", "Confessor"]
const statuses = ["All", "Published", "Draft", "Archived"]

export default function SuperAdminSaintsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredSaints = saintsData.filter((saint) => {
    const matchesSearch =
      saint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      saint.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || saint.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || saint.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedSaints = [...filteredSaints].sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saints Management</h1>
          <p className="text-gray-600 mt-2">Manage saint profiles, biographies, and media content</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/super-admin/saints/create">
              <Plus className="w-4 h-4 mr-2" />
              Add New Saint
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{saintsData.length}</p>
                <p className="text-sm text-gray-600">Total Saints</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {saintsData.filter((s) => s.status === "Published").length}
                </p>
                <p className="text-sm text-gray-600">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {saintsData.reduce((sum, saint) => sum + saint.mediaCount.images, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Images</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Play className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {saintsData.reduce((sum, saint) => sum + saint.mediaCount.videos, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Videos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search saints by name, title, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>

            {/* Sort */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="name">Sort by Name</option>
                <option value="feastDay">Sort by Feast Day</option>
                <option value="lastUpdated">Sort by Last Updated</option>
                <option value="category">Sort by Category</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saints Table */}
      <Card>
        <CardHeader>
          <CardTitle>Saints List ({sortedSaints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Saint</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Feast Day</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Media</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSaints.map((saint) => (
                  <TableRow key={saint.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={saint.image || "/placeholder.svg"} alt={saint.name} />
                          <AvatarFallback>
                            {saint.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{saint.name}</p>
                          <p className="text-sm text-gray-500">{saint.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{saint.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {saint.feastDay}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {saint.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3 text-sm">
                        <span className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-blue-600" />
                          {saint.mediaCount.images}
                        </span>
                        <span className="flex items-center gap-1">
                          <Play className="w-3 h-3 text-green-600" />
                          {saint.mediaCount.videos}
                        </span>
                        <span className="flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-orange-600" />
                          {saint.mediaCount.audio}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(saint.status)}>{saint.status}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{saint.lastUpdated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/saints/${saint.id}`} target="_blank">
                              <Eye className="w-4 h-4 mr-2" />
                              View Public Page
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Saint
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Upload className="w-4 h-4 mr-2" />
                            Manage Media
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Saint
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Bulk Media Upload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Upload multiple images, videos, or audio files for saints</p>
            <Button className="w-full" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media Files
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Saints Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Export saint information and media inventory</p>
            <Button className="w-full" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Featured Saints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Manage which saints appear on the homepage</p>
            <Button className="w-full" variant="outline">
              <Star className="w-4 h-4 mr-2" />
              Manage Featured
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
