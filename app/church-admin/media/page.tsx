"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, ImageIcon, Video, FileText, Download, Trash2, Eye } from "lucide-react"
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

export default function ChurchAdminMediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedChurch, setSelectedChurch] = useState("all")

  const mediaFiles = [
    {
      id: "1",
      name: "Christmas Eve Mass 2024",
      type: "video",
      church: "St. Mary's Cathedral",
      size: "245 MB",
      uploadDate: "2024-12-24",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Christmas+Mass+Video",
      url: "#",
      category: "Mass Recording",
    },
    {
      id: "2",
      name: "Church Interior Photos",
      type: "image",
      church: "St. Mary's Cathedral",
      size: "12 MB",
      uploadDate: "2024-12-20",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Church+Interior",
      url: "#",
      category: "Photography",
    },
    {
      id: "3",
      name: "Youth Group Activities",
      type: "image",
      church: "Sacred Heart Church",
      size: "8 MB",
      uploadDate: "2024-12-18",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Youth+Activities",
      url: "#",
      category: "Events",
    },
    {
      id: "4",
      name: "Sunday Service Bulletin",
      type: "document",
      church: "St. Joseph's Parish",
      size: "2 MB",
      uploadDate: "2024-12-15",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Bulletin+PDF",
      url: "#",
      category: "Documents",
    },
    {
      id: "5",
      name: "Choir Performance",
      type: "video",
      church: "St. Mary's Cathedral",
      size: "156 MB",
      uploadDate: "2024-12-10",
      thumbnail: "/placeholder.svg?height=150&width=200&text=Choir+Performance",
      url: "#",
      category: "Music",
    },
    {
      id: "6",
      name: "Parish History Document",
      type: "document",
      church: "Sacred Heart Church",
      size: "5 MB",
      uploadDate: "2024-12-08",
      thumbnail: "/placeholder.svg?height=150&width=200&text=History+Document",
      url: "#",
      category: "Documents",
    },
  ]

  const churches = ["all", "St. Mary's Cathedral", "Sacred Heart Church", "St. Joseph's Parish"]

  const filteredMedia = mediaFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChurch = selectedChurch === "all" || file.church === selectedChurch
    return matchesSearch && matchesChurch
  })

  const imageFiles = filteredMedia.filter((file) => file.type === "image")
  const videoFiles = filteredMedia.filter((file) => file.type === "video")
  const documentFiles = filteredMedia.filter((file) => file.type === "document")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5 text-blue-600" />
      case "video":
        return <Video className="w-5 h-5 text-red-600" />
      case "document":
        return <FileText className="w-5 h-5 text-green-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      image: "bg-blue-100 text-blue-800 border-blue-200",
      video: "bg-red-100 text-red-800 border-red-200",
      document: "bg-green-100 text-green-800 border-green-200",
    }
    return <Badge className={colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Media Gallery</h2>
            <p className="text-purple-600">Manage photos, videos, and documents for your churches</p>
          </div>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Media Files</DialogTitle>
              <DialogDescription>Add new photos, videos, or documents to your church gallery</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
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
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="mass">Mass Recording</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="documents">Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="files">Files</Label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-purple-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-purple-500">Supports images, videos, and documents up to 100MB</p>
                  <Button variant="outline" className="mt-4 border-purple-200 hover:bg-purple-50">
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsUploadDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">
                  Upload Files
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
                placeholder="Search media files..."
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

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-purple-100">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            All Media ({filteredMedia.length})
          </TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Images ({imageFiles.length})
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Videos ({videoFiles.length})
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Documents ({documentFiles.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMedia.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50 relative">
                  <img
                    src={file.thumbnail || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">{getFileIcon(file.type)}</div>
                  <div className="absolute top-2 right-2">{getTypeBadge(file.type)}</div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-purple-900 line-clamp-2">{file.name}</CardTitle>
                  <CardDescription className="text-xs text-purple-600">{file.church}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs text-purple-600">
                    <span>{file.size}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {file.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {imageFiles.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-50">
                  <img
                    src={file.thumbnail || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-purple-900 line-clamp-2">{file.name}</CardTitle>
                  <CardDescription className="text-xs text-purple-600">{file.church}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs text-purple-600">
                    <span>{file.size}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videoFiles.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50 relative">
                  <img
                    src={file.thumbnail || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-purple-900 line-clamp-2">{file.name}</CardTitle>
                  <CardDescription className="text-xs text-purple-600">{file.church}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs text-purple-600">
                    <span>{file.size}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {file.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-3 h-3 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {documentFiles.map((file) => (
              <Card
                key={file.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-purple-400" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-purple-900 line-clamp-2">{file.name}</CardTitle>
                  <CardDescription className="text-xs text-purple-600">{file.church}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-xs text-purple-600">
                    <span>{file.size}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {file.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-3 h-3 mr-1" />
                      Open
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
