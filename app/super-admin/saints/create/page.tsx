"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  ImageIcon,
  Play,
  Volume2,
  Calendar,
  MapPin,
  Crown,
  Star,
  Book,
  Quote,
} from "lucide-react"
import Link from "next/link"

const categories = [
  "Founder",
  "Missionary",
  "Martyr",
  "Pope",
  "Doctor of the Church",
  "Virgin",
  "Confessor",
  "Bishop",
  "Priest",
  "Religious",
]

export default function CreateSaintPage() {
  const [saintData, setSaintData] = useState({
    name: "",
    title: "",
    feastDay: "",
    born: "",
    died: "",
    location: "",
    canonized: "",
    canonizedBy: "",
    category: "",
    fullBio: "",
    patronOf: [] as string[],
    attributes: [] as string[],
    quotes: [] as string[],
    miracles: [] as string[],
    status: "Draft",
  })

  const [newPatron, setNewPatron] = useState("")
  const [newAttribute, setNewAttribute] = useState("")
  const [newQuote, setNewQuote] = useState("")
  const [newMiracle, setNewMiracle] = useState("")

  const addToArray = (field: keyof typeof saintData, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      setSaintData((prev) => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()],
      }))
      setter("")
    }
  }

  const removeFromArray = (field: keyof typeof saintData, index: number) => {
    setSaintData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/super-admin/saints">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Saints
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Saint</h1>
            <p className="text-gray-600 mt-2">Add a new saint profile with complete information</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Save className="w-4 h-4 mr-2" />
            Publish Saint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="biography">Biography</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Saint Name *</Label>
                      <Input
                        id="name"
                        value={saintData.name}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Saint Francis of Assisi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title/Epithet</Label>
                      <Input
                        id="title"
                        value={saintData.title}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Patron of Animals and Environment"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="feastDay">Feast Day *</Label>
                      <Input
                        id="feastDay"
                        value={saintData.feastDay}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, feastDay: e.target.value }))}
                        placeholder="e.g., October 4"
                      />
                    </div>
                    <div>
                      <Label htmlFor="born">Born</Label>
                      <Input
                        id="born"
                        value={saintData.born}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, born: e.target.value }))}
                        placeholder="e.g., 1181"
                      />
                    </div>
                    <div>
                      <Label htmlFor="died">Died</Label>
                      <Input
                        id="died"
                        value={saintData.died}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, died: e.target.value }))}
                        placeholder="e.g., 1226"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={saintData.location}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Assisi, Italy"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={saintData.category}
                        onValueChange={(value) => setSaintData((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="canonized">Canonization Date</Label>
                      <Input
                        id="canonized"
                        value={saintData.canonized}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, canonized: e.target.value }))}
                        placeholder="e.g., July 16, 1228"
                      />
                    </div>
                    <div>
                      <Label htmlFor="canonizedBy">Canonized By</Label>
                      <Input
                        id="canonizedBy"
                        value={saintData.canonizedBy}
                        onChange={(e) => setSaintData((prev) => ({ ...prev, canonizedBy: e.target.value }))}
                        placeholder="e.g., Pope Gregory IX"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="biography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Biography
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="fullBio">Full Biography *</Label>
                    <Textarea
                      id="fullBio"
                      value={saintData.fullBio}
                      onChange={(e) => setSaintData((prev) => ({ ...prev, fullBio: e.target.value }))}
                      placeholder="Write the complete life story of the saint..."
                      className="min-h-[300px] mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Use double line breaks to separate paragraphs. This will be displayed on the public saint page.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              {/* Patron Of */}
              <Card>
                <CardHeader>
                  <CardTitle>Patron Of</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newPatron}
                      onChange={(e) => setNewPatron(e.target.value)}
                      placeholder="Add patronage (e.g., Animals, Environment)"
                      onKeyPress={(e) => e.key === "Enter" && addToArray("patronOf", newPatron, setNewPatron)}
                    />
                    <Button onClick={() => addToArray("patronOf", newPatron, setNewPatron)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {saintData.patronOf.map((patron, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {patron}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFromArray("patronOf", index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attributes */}
              <Card>
                <CardHeader>
                  <CardTitle>Attributes & Symbols</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newAttribute}
                      onChange={(e) => setNewAttribute(e.target.value)}
                      placeholder="Add attribute (e.g., Brown habit, Birds)"
                      onKeyPress={(e) => e.key === "Enter" && addToArray("attributes", newAttribute, setNewAttribute)}
                    />
                    <Button onClick={() => addToArray("attributes", newAttribute, setNewAttribute)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {saintData.attributes.map((attribute, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {attribute}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeFromArray("attributes", index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quotes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Quote className="w-5 h-5" />
                    Famous Quotes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      placeholder="Add a famous quote..."
                      className="min-h-[80px]"
                    />
                    <Button onClick={() => addToArray("quotes", newQuote, setNewQuote)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {saintData.quotes.map((quote, index) => (
                      <div key={index} className="p-3 border rounded-lg flex justify-between items-start">
                        <p className="text-sm italic">"{quote}"</p>
                        <X
                          className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                          onClick={() => removeFromArray("quotes", index)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Miracles */}
              <Card>
                <CardHeader>
                  <CardTitle>Miracles & Notable Acts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMiracle}
                      onChange={(e) => setNewMiracle(e.target.value)}
                      placeholder="Add miracle or notable act..."
                      onKeyPress={(e) => e.key === "Enter" && addToArray("miracles", newMiracle, setNewMiracle)}
                    />
                    <Button onClick={() => addToArray("miracles", newMiracle, setNewMiracle)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {saintData.miracles.map((miracle, index) => (
                      <div key={index} className="p-3 border rounded-lg flex justify-between items-center">
                        <span className="text-sm">{miracle}</span>
                        <X
                          className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500"
                          onClick={() => removeFromArray("miracles", index)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Upload saint images</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Images
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Play className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Upload or link to videos</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Videos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Audio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Audio Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Volume2 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">Upload audio files (prayers, narrations, etc.)</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Audio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{saintData.name || "Saint Name"}</h3>
                  <p className="text-purple-600">{saintData.title || "Title/Epithet"}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{saintData.feastDay || "Feast Day"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{saintData.location || "Location"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-gray-400" />
                    <span>{saintData.category || "Category"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={saintData.status}
                  onValueChange={(value) => setSaintData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full mb-2" variant="outline">
                  Save as Draft
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Publish Saint</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
