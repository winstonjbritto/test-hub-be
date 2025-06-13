"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Eye, Calendar, User, Heart, MessageCircle } from "lucide-react"
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

export default function ChurchAdminBlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const blogs = [
    {
      id: "1",
      title: "Preparing for Christmas: A Spiritual Journey",
      excerpt:
        "As we approach the celebration of Christ's birth, let us prepare our hearts and minds for this holy season...",
      content: "Full blog content would go here...",
      author: "Father Michael Johnson",
      church: "St. Mary's Cathedral",
      category: "Spiritual Reflection",
      status: "published",
      date: "2024-12-15",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&text=Christmas+Preparation",
      likes: 45,
      comments: 12,
      views: 234,
      tags: ["Christmas", "Advent", "Prayer", "Reflection"],
    },
    {
      id: "2",
      title: "The Importance of Community in Faith",
      excerpt: "Our faith grows stronger when we come together as a community. In times of joy and sorrow...",
      content: "Full blog content would go here...",
      author: "Father Michael Johnson",
      church: "Sacred Heart Church",
      category: "Community",
      status: "published",
      date: "2024-12-10",
      readTime: "4 min read",
      image: "/placeholder.svg?height=200&width=400&text=Community+Faith",
      likes: 32,
      comments: 8,
      views: 189,
      tags: ["Community", "Faith", "Fellowship", "Support"],
    },
    {
      id: "3",
      title: "Youth Ministry: Engaging the Next Generation",
      excerpt:
        "How can we better engage young people in our faith communities? This post explores innovative approaches...",
      content: "Full blog content would go here...",
      author: "Father Michael Johnson",
      church: "St. Joseph's Parish",
      category: "Youth Ministry",
      status: "draft",
      date: "2024-12-08",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400&text=Youth+Ministry",
      likes: 0,
      comments: 0,
      views: 0,
      tags: ["Youth", "Ministry", "Engagement", "Next Generation"],
    },
    {
      id: "4",
      title: "Finding Peace in Prayer",
      excerpt: "In our busy world, finding moments of peace can be challenging. Discover how prayer can be a source...",
      content: "Full blog content would go here...",
      author: "Father Michael Johnson",
      church: "St. Mary's Cathedral",
      category: "Prayer & Meditation",
      status: "published",
      date: "2024-12-05",
      readTime: "3 min read",
      image: "/placeholder.svg?height=200&width=400&text=Prayer+Peace",
      likes: 56,
      comments: 20,
      views: 312,
      tags: ["Prayer", "Peace", "Meditation", "Spirituality"],
    },
  ]

  const publishedBlogs = blogs.filter((blog) => blog.status === "published")
  const draftBlogs = blogs.filter((blog) => blog.status === "draft")

  const filteredPublished = publishedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredDrafts = draftBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Spiritual Reflection": "bg-purple-100 text-purple-800 border-purple-200",
      Community: "bg-blue-100 text-blue-800 border-blue-200",
      "Youth Ministry": "bg-green-100 text-green-800 border-green-200",
      "Prayer & Meditation": "bg-orange-100 text-orange-800 border-orange-200",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Draft</Badge>
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
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Blog Management</h2>
            <p className="text-purple-600">Create and manage blog posts for your churches</p>
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
              <DialogDescription>Write a new blog post for your church community</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Blog Title</Label>
                <Input id="title" placeholder="Enter blog title" />
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
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spiritual">Spiritual Reflection</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="youth">Youth Ministry</SelectItem>
                    <SelectItem value="prayer">Prayer & Meditation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" placeholder="Brief description of the blog post" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your blog post content here..." className="min-h-[200px]" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="prayer, community, faith" />
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Save as Draft
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">
                  Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-purple-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-purple-200"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="published" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-purple-100">
          <TabsTrigger value="published" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Published ({filteredPublished.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Drafts ({filteredDrafts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPublished.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-purple-50">
                  <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    {getCategoryBadge(blog.category)}
                    {getStatusBadge(blog.status)}
                  </div>
                  <CardTitle className="text-lg text-purple-900 line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-purple-600 line-clamp-2">{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-purple-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-purple-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{blog.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{blog.comments}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrafts.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400 opacity-75 hover:opacity-100"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    {getCategoryBadge(blog.category)}
                    {getStatusBadge(blog.status)}
                  </div>
                  <CardTitle className="text-lg text-purple-900 line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-purple-600 line-clamp-2">{blog.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-purple-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-purple-200 hover:bg-purple-50">
                      <Edit className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Publish
                    </Button>
                    <Button variant="outline" size="sm" className="border-red-200 hover:bg-red-50 text-red-600">
                      <Trash2 className="w-4 h-4" />
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
