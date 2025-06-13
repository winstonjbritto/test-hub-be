"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Upload, FileText, Download, Trash2, Eye, Edit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ChurchAdminDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedChurch, setSelectedChurch] = useState("all")

  const documents = [
    {
      id: "1",
      name: "Parish Bulletin - December 2024",
      description: "Weekly parish bulletin with announcements and schedules",
      church: "St. Mary's Cathedral",
      category: "Bulletin",
      size: "2.3 MB",
      uploadDate: "2024-12-20",
      lastModified: "2024-12-20",
      type: "PDF",
      downloads: 45,
      isPublic: true,
    },
    {
      id: "2",
      name: "Mass Schedule 2025",
      description: "Complete mass schedule for the upcoming year",
      church: "St. Mary's Cathedral",
      category: "Schedule",
      size: "1.1 MB",
      uploadDate: "2024-12-15",
      lastModified: "2024-12-18",
      type: "PDF",
      downloads: 78,
      isPublic: true,
    },
    {
      id: "3",
      name: "Youth Group Guidelines",
      description: "Guidelines and rules for youth group participation",
      church: "Sacred Heart Church",
      category: "Guidelines",
      size: "800 KB",
      uploadDate: "2024-12-10",
      lastModified: "2024-12-10",
      type: "PDF",
      downloads: 23,
      isPublic: false,
    },
    {
      id: "4",
      name: "Parish History Document",
      description: "Complete history of the parish from founding to present",
      church: "St. Joseph's Parish",
      category: "History",
      size: "5.7 MB",
      uploadDate: "2024-12-05",
      lastModified: "2024-12-05",
      type: "PDF",
      downloads: 67,
      isPublic: true,
    },
    {
      id: "5",
      name: "Financial Report Q4 2024",
      description: "Quarterly financial report for parish operations",
      church: "St. Mary's Cathedral",
      category: "Financial",
      size: "1.8 MB",
      uploadDate: "2024-12-01",
      lastModified: "2024-12-01",
      type: "PDF",
      downloads: 12,
      isPublic: false,
    },
    {
      id: "6",
      name: "Event Planning Checklist",
      description: "Comprehensive checklist for organizing parish events",
      church: "Sacred Heart Church",
      category: "Planning",
      size: "650 KB",
      uploadDate: "2024-11-28",
      lastModified: "2024-11-30",
      type: "PDF",
      downloads: 34,
      isPublic: false,
    },
  ]

  const churches = ["all", "St. Mary's Cathedral", "Sacred Heart Church", "St. Joseph's Parish"]
  const categories = ["all", "Bulletin", "Schedule", "Guidelines", "History", "Financial", "Planning"]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChurch = selectedChurch === "all" || doc.church === selectedChurch
    return matchesSearch && matchesChurch
  })

  const getCategoryBadge = (category: string) => {
    const colors = {
      Bulletin: "bg-blue-100 text-blue-800 border-blue-200",
      Schedule: "bg-green-100 text-green-800 border-green-200",
      Guidelines: "bg-orange-100 text-orange-800 border-orange-200",
      History: "bg-purple-100 text-purple-800 border-purple-200",
      Financial: "bg-red-100 text-red-800 border-red-200",
      Planning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const getVisibilityBadge = (isPublic: boolean) => {
    return isPublic ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">Public</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Private</Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Documents</h2>
            <p className="text-purple-600">Manage church documents and resources</p>
          </div>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Add a new document to your church library</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="docName">Document Name</Label>
                  <Input id="docName" placeholder="Enter document name" />
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bulletin">Bulletin</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="guidelines">Guidelines</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Brief description of the document" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibility">Visibility</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to all members</SelectItem>
                    <SelectItem value="private">Private - Admin only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-600 mb-2">Drag and drop your document here, or click to browse</p>
                  <p className="text-sm text-purple-500">Supports PDF, DOC, DOCX files up to 10MB</p>
                  <Button variant="outline" className="mt-4 border-purple-200 hover:bg-purple-50">
                    Choose File
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">
                  Upload Document
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="border-purple-200">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-purple-200"
              />
            </div>
            <Select value={selectedChurch} onValueChange={setSelectedChurch}>
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
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <CardTitle className="text-purple-900">Document Library</CardTitle>
          <CardDescription className="text-purple-600">Manage and organize church documents</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-200">
                <TableHead className="text-purple-700">Document</TableHead>
                <TableHead className="text-purple-700">Church</TableHead>
                <TableHead className="text-purple-700">Category</TableHead>
                <TableHead className="text-purple-700">Size</TableHead>
                <TableHead className="text-purple-700">Visibility</TableHead>
                <TableHead className="text-purple-700">Downloads</TableHead>
                <TableHead className="text-purple-700">Last Modified</TableHead>
                <TableHead className="text-right text-purple-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="border-purple-100 hover:bg-purple-50/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-purple-500" />
                      <div>
                        <div className="font-medium text-purple-900">{doc.name}</div>
                        <div className="text-sm text-purple-600 line-clamp-1">{doc.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-700">{doc.church}</TableCell>
                  <TableCell>{getCategoryBadge(doc.category)}</TableCell>
                  <TableCell className="text-purple-700">{doc.size}</TableCell>
                  <TableCell>{getVisibilityBadge(doc.isPublic)}</TableCell>
                  <TableCell className="text-purple-700">{doc.downloads}</TableCell>
                  <TableCell className="text-purple-700">{new Date(doc.lastModified).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
            <CardTitle className="text-sm font-medium text-purple-700">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{filteredDocuments.length}</div>
            <p className="text-xs text-purple-600">Across all churches</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Public Documents</CardTitle>
            <Badge className="h-4 w-4 bg-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {filteredDocuments.filter((doc) => doc.isPublic).length}
            </div>
            <p className="text-xs text-purple-600">Available to members</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">
              {filteredDocuments.reduce((sum, doc) => sum + doc.downloads, 0)}
            </div>
            <p className="text-xs text-purple-600">This month</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">12.4 MB</div>
            <p className="text-xs text-purple-600">Of 1GB limit</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
