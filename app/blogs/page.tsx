"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, User, Church, Share2, Heart, MessageCircle } from "lucide-react"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import Link from "next/link"

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [churchFilter, setChurchFilter] = useState("all")

  const blogs = [
    {
      id: "1",
      title: "Preparing for Christmas: A Spiritual Journey",
      excerpt:
        "As we approach the celebration of Christ's birth, let us prepare our hearts and minds for this holy season. Advent is a time of reflection, prayer, and anticipation...",
      content: "Full blog content would go here...",
      author: "Father Michael Johnson",
      church: "St. Mary's Cathedral",
      category: "Spiritual Reflection",
      date: "December 15, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&text=Christmas+Preparation",
      likes: 45,
      comments: 12,
      tags: ["Christmas", "Advent", "Prayer", "Reflection"],
    },
    {
      id: "2",
      title: "The Importance of Community in Faith",
      excerpt:
        "Our faith grows stronger when we come together as a community. In times of joy and sorrow, we find strength in our shared beliefs and mutual support...",
      content: "Full blog content would go here...",
      author: "Deacon Robert Smith",
      church: "St. Mary's Cathedral",
      category: "Community",
      date: "December 10, 2024",
      readTime: "4 min read",
      image: "/placeholder.svg?height=200&width=400&text=Community+Faith",
      likes: 32,
      comments: 8,
      tags: ["Community", "Faith", "Fellowship", "Support"],
    },
    {
      id: "3",
      title: "Youth Ministry: Engaging the Next Generation",
      excerpt:
        "How can we better engage young people in our faith communities? This post explores innovative approaches to youth ministry and building lasting connections...",
      content: "Full blog content would go here...",
      author: "Sister Catherine Smith",
      church: "Sacred Heart Church",
      category: "Youth Ministry",
      date: "December 8, 2024",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400&text=Youth+Ministry",
      likes: 28,
      comments: 15,
      tags: ["Youth", "Ministry", "Engagement", "Next Generation"],
    },
    {
      id: "4",
      title: "Finding Peace in Prayer",
      excerpt:
        "In our busy world, finding moments of peace can be challenging. Discover how prayer can be a source of tranquility and strength in daily life...",
      content: "Full blog content would go here...",
      author: "Father David Wilson",
      church: "St. Joseph's Parish",
      category: "Prayer & Meditation",
      date: "December 5, 2024",
      readTime: "3 min read",
      image: "/placeholder.svg?height=200&width=400&text=Prayer+Peace",
      likes: 56,
      comments: 20,
      tags: ["Prayer", "Peace", "Meditation", "Spirituality"],
    },
    {
      id: "5",
      title: "Serving Others: The Heart of Christianity",
      excerpt:
        "Service to others is at the core of Christian teaching. Learn about our community outreach programs and how you can make a difference...",
      content: "Full blog content would go here...",
      author: "Father Robert Brown",
      church: "Holy Trinity Church",
      category: "Service & Outreach",
      date: "December 3, 2024",
      readTime: "7 min read",
      image: "/placeholder.svg?height=200&width=400&text=Service+Outreach",
      likes: 41,
      comments: 18,
      tags: ["Service", "Outreach", "Community", "Charity"],
    },
    {
      id: "6",
      title: "The Beauty of Sacred Music",
      excerpt:
        "Sacred music has the power to lift our spirits and draw us closer to God. Explore the rich tradition of Catholic music and its role in worship...",
      content: "Full blog content would go here...",
      author: "Music Director Sarah Johnson",
      church: "St. Mary's Cathedral",
      category: "Liturgy & Music",
      date: "November 28, 2024",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400&text=Sacred+Music",
      likes: 38,
      comments: 9,
      tags: ["Music", "Liturgy", "Worship", "Tradition"],
    },
  ]

  const categories = [
    "all",
    "Spiritual Reflection",
    "Community",
    "Youth Ministry",
    "Prayer & Meditation",
    "Service & Outreach",
    "Liturgy & Music",
  ]
  const churches = ["all", "St. Mary's Cathedral", "Sacred Heart Church", "St. Joseph's Parish", "Holy Trinity Church"]

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || blog.category === categoryFilter
    const matchesChurch = churchFilter === "all" || blog.church === churchFilter

    return matchesSearch && matchesCategory && matchesChurch
  })

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Catholic Blogs</h1>
          <p className="text-lg text-muted-foreground">Spiritual insights, community stories, and faith reflections</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Blog Posts</CardTitle>
            <CardDescription>Search by title, author, tags, or content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={churchFilter} onValueChange={setChurchFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Church" />
                </SelectTrigger>
                <SelectContent>
                  {churches.map((church) => (
                    <SelectItem key={church} value={church}>
                      {church === "all" ? "All Churches" : church}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Blog */}
        {filteredBlogs.length > 0 && (
          <Card className="mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={filteredBlogs[0].image || "/placeholder.svg"}
                  alt={filteredBlogs[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <Badge className="mb-2">{filteredBlogs[0].category}</Badge>
                <h2 className="text-2xl font-bold mb-3">{filteredBlogs[0].title}</h2>
                <p className="text-muted-foreground mb-4">{filteredBlogs[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{filteredBlogs[0].author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Church className="w-4 h-4" />
                    <span>{filteredBlogs[0].church}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{filteredBlogs[0].date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href={`/blogs/${filteredBlogs[0].id}`}>
                    <Button>Read Full Article</Button>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{filteredBlogs[0].likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{filteredBlogs[0].comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.slice(1).map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100">
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{blog.category}</Badge>
                  <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{blog.author}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Church className="w-4 h-4" />
                  <span>{blog.church}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{blog.comments}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/blogs/${blog.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No blog posts found matching your criteria.</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <CommonFooter />
    </div>
  )
}
