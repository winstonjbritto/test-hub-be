"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, MapPin, Clock, Plus, X, Save, ImageIcon, Info, Globe } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EditChurchPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, fetch based on params.id
  const [churchData, setChurchData] = useState({
    id: params.id,
    name: "St. Mary's Cathedral",
    diocese: "new-york",
    address: "123 Faith Street, New York, NY 10001",
    phone: "(212) 555-0123",
    email: "info@stmarys.com",
    website: "www.stmarys.com",
    pastor: "Father Michael Johnson",
    founded: "1879",
    description: "Historic cathedral serving the community since 1879 with beautiful Gothic architecture.",
    latitude: "40.7128",
    longitude: "-74.0060",
    bannerImage: "/images/church-exterior.png",
    galleryImages: ["/images/church-interior.png", "/images/stained-glass.png"],
    massSchedule: [
      { day: "Sunday", times: ["08:00", "10:30", "18:00"] },
      { day: "Monday", times: ["07:00", "12:00"] },
      { day: "Tuesday", times: ["07:00", "12:00"] },
      { day: "Wednesday", times: ["07:00", "12:00"] },
      { day: "Thursday", times: ["07:00", "12:00"] },
      { day: "Friday", times: ["07:00", "12:00"] },
      { day: "Saturday", times: ["08:00", "17:00"] },
    ],
    facilities: ["Parking", "Wheelchair Access", "Air Conditioning", "Sound System"],
    languages: ["English", "Spanish", "Latin"],
    specialPrograms: ["Youth Group", "Bible Study", "Food Bank", "Senior Ministry"],
  })

  // Form states
  const [churchName, setChurchName] = useState("")
  const [diocese, setDiocese] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [pastor, setPastor] = useState("")
  const [founded, setFounded] = useState("")
  const [description, setDescription] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [bannerImage, setBannerImage] = useState("")
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [massSchedule, setMassSchedule] = useState(churchData.massSchedule)
  const [facilities, setFacilities] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [specialPrograms, setSpecialPrograms] = useState<string[]>([])

  const [newGalleryImage, setNewGalleryImage] = useState("")
  const [newFacility, setNewFacility] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [newProgram, setNewProgram] = useState("")
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  useEffect(() => {
    // Simulate loading church data
    setTimeout(() => {
      setChurchName(churchData.name)
      setDiocese(churchData.diocese)
      setAddress(churchData.address)
      setPhone(churchData.phone)
      setEmail(churchData.email)
      setWebsite(churchData.website)
      setPastor(churchData.pastor)
      setFounded(churchData.founded)
      setDescription(churchData.description)
      setLatitude(churchData.latitude)
      setLongitude(churchData.longitude)
      setBannerImage(churchData.bannerImage)
      setGalleryImages(churchData.galleryImages)
      setMassSchedule(churchData.massSchedule)
      setFacilities(churchData.facilities)
      setLanguages(churchData.languages)
      setSpecialPrograms(churchData.specialPrograms)
      setIsLoading(false)
    }, 1000)
  }, [])

  const getCurrentLocation = () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString())
          setLongitude(position.coords.longitude.toString())
          setIsGettingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsGettingLocation(false)
        },
      )
    } else {
      setIsGettingLocation(false)
    }
  }

  const addMassTime = (dayIndex: number) => {
    const newSchedule = [...massSchedule]
    newSchedule[dayIndex].times.push("")
    setMassSchedule(newSchedule)
  }

  const removeMassTime = (dayIndex: number, timeIndex: number) => {
    const newSchedule = [...massSchedule]
    newSchedule[dayIndex].times.splice(timeIndex, 1)
    setMassSchedule(newSchedule)
  }

  const updateMassTime = (dayIndex: number, timeIndex: number, time: string) => {
    const newSchedule = [...massSchedule]
    newSchedule[dayIndex].times[timeIndex] = time
    setMassSchedule(newSchedule)
  }

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setGalleryImages([...galleryImages, newGalleryImage.trim()])
      setNewGalleryImage("")
    }
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  const addItem = (
    items: string[],
    setItems: (items: string[]) => void,
    newItem: string,
    setNewItem: (item: string) => void,
  ) => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()])
      setNewItem("")
    }
  }

  const removeItem = (items: string[], setItems: (items: string[]) => void, index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    router.push("/church-admin/churches")
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-purple-200 rounded animate-pulse" />
            <div className="w-32 h-8 bg-purple-200 rounded animate-pulse" />
            <div>
              <div className="w-48 h-8 bg-purple-200 rounded animate-pulse mb-2" />
              <div className="w-64 h-4 bg-purple-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="w-32 h-10 bg-purple-200 rounded animate-pulse" />
        </div>

        <div className="space-y-6">
          <div className="w-full h-12 bg-purple-100 rounded animate-pulse" />
          <div className="w-full h-96 bg-white border border-purple-200 rounded-lg animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/church-admin/churches">
            <Button variant="outline" size="sm" className="border-purple-200 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Churches
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Edit Church</h2>
            <p className="text-purple-600">Update information for {churchData.name}</p>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </div>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-purple-100">
          <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Info className="w-4 h-4 mr-2" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="location" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Clock className="w-4 h-4 mr-2" />
            Mass Schedule
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <ImageIcon className="w-4 h-4 mr-2" />
            Media
          </TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <Globe className="w-4 h-4 mr-2" />
            Details
          </TabsTrigger>
        </TabsList>

        {/* Same tab content as create page but with pre-filled values */}
        <TabsContent value="basic" className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Basic Information</CardTitle>
              <CardDescription className="text-purple-600">Essential details about your church</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-purple-700">
                    Church Name *
                  </Label>
                  <Input
                    id="churchName"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                    placeholder="Enter church name"
                    className="border-purple-200"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diocese" className="text-purple-700">
                    Diocese *
                  </Label>
                  <Select value={diocese} onValueChange={setDiocese}>
                    <SelectTrigger className="border-purple-200">
                      <SelectValue placeholder="Select diocese" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">Archdiocese of New York</SelectItem>
                      <SelectItem value="los-angeles">Archdiocese of Los Angeles</SelectItem>
                      <SelectItem value="chicago">Archdiocese of Chicago</SelectItem>
                      <SelectItem value="boston">Archdiocese of Boston</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pastor" className="text-purple-700">
                    Pastor/Priest *
                  </Label>
                  <Input
                    id="pastor"
                    value={pastor}
                    onChange={(e) => setPastor(e.target.value)}
                    placeholder="Enter pastor name"
                    className="border-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded" className="text-purple-700">
                    Founded Year
                  </Label>
                  <Input
                    id="founded"
                    value={founded}
                    onChange={(e) => setFounded(e.target.value)}
                    placeholder="e.g., 1879"
                    className="border-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-purple-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="border-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="border-purple-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-purple-700">
                  Website
                </Label>
                <Input
                  id="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="Enter website URL"
                  className="border-purple-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-purple-700">
                  Full Address *
                </Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter complete address"
                  className="border-purple-200"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-purple-700">
                  About the Church
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your church, its history, mission, and community"
                  className="border-purple-200"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Include all other tabs with similar structure but pre-filled values */}
        <TabsContent value="location" className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Geographic Location</CardTitle>
              <CardDescription className="text-purple-600">Set precise coordinates for your church</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="latitude" className="text-purple-700">
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g., 40.7128"
                    className="border-purple-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude" className="text-purple-700">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g., -74.0060"
                    className="border-purple-200"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={getCurrentLocation}
                  disabled={isGettingLocation}
                  className="border-purple-200 hover:bg-purple-50"
                >
                  {isGettingLocation ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                      Getting Location...
                    </div>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-2" />
                      Update Location
                    </>
                  )}
                </Button>
                <p className="text-sm text-purple-600">
                  Use this to automatically update coordinates based on your current location
                </p>
              </div>
              {latitude && longitude && (
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Coordinates set:</strong> {latitude}, {longitude}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    This will help people find your church using location-based search
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continue with other tabs... */}
        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Mass Schedule</CardTitle>
              <CardDescription className="text-purple-600">Set mass times for each day of the week</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {massSchedule.map((daySchedule, dayIndex) => (
                <div key={daySchedule.day} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-purple-700 font-medium">{daySchedule.day}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addMassTime(dayIndex)}
                      className="border-purple-200 hover:bg-purple-50"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Time
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {daySchedule.times.map((time, timeIndex) => (
                      <div key={timeIndex} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateMassTime(dayIndex, timeIndex, e.target.value)}
                          className="border-purple-200"
                        />
                        {daySchedule.times.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeMassTime(dayIndex, timeIndex)}
                            className="border-red-200 hover:bg-red-50 text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
              <CardTitle className="text-purple-900">Church Media</CardTitle>
              <CardDescription className="text-purple-600">Upload banner and gallery images</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bannerImage" className="text-purple-700">
                    Banner Image URL
                  </Label>
                  <Input
                    id="bannerImage"
                    value={bannerImage}
                    onChange={(e) => setBannerImage(e.target.value)}
                    placeholder="Enter banner image URL"
                    className="border-purple-200"
                  />
                  <p className="text-xs text-purple-600">This will be the main image displayed for your church</p>
                </div>

                {bannerImage && (
                  <div className="border border-purple-200 rounded-lg overflow-hidden">
                    <img
                      src={bannerImage || "/placeholder.svg"}
                      alt="Banner preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=400&text=Invalid+Image+URL"
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label className="text-purple-700">Gallery Images</Label>
                <div className="flex gap-2">
                  <Input
                    value={newGalleryImage}
                    onChange={(e) => setNewGalleryImage(e.target.value)}
                    placeholder="Enter gallery image URL"
                    className="border-purple-200"
                  />
                  <Button type="button" onClick={addGalleryImage} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="relative border border-purple-200 rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=128&width=200&text=Invalid+URL"
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6">
            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Church Facilities</CardTitle>
                <CardDescription className="text-purple-600">List available facilities and amenities</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    placeholder="e.g., Parking, Wheelchair Access, Air Conditioning"
                    className="border-purple-200"
                  />
                  <Button
                    type="button"
                    onClick={() => addItem(facilities, setFacilities, newFacility, setNewFacility)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {facilities.map((facility, index) => (
                    <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                      {facility}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(facilities, setFacilities, index)}
                        className="ml-2 h-auto p-0 text-purple-600 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Languages</CardTitle>
                <CardDescription className="text-purple-600">Languages used in masses and services</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="e.g., English, Spanish, Latin"
                    className="border-purple-200"
                  />
                  <Button
                    type="button"
                    onClick={() => addItem(languages, setLanguages, newLanguage, setNewLanguage)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(languages, setLanguages, index)}
                        className="ml-2 h-auto p-0 text-purple-600 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                <CardTitle className="text-purple-900">Special Programs</CardTitle>
                <CardDescription className="text-purple-600">Youth programs, community services, etc.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    placeholder="e.g., Youth Group, Bible Study, Food Bank"
                    className="border-purple-200"
                  />
                  <Button
                    type="button"
                    onClick={() => addItem(specialPrograms, setSpecialPrograms, newProgram, setNewProgram)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialPrograms.map((program, index) => (
                    <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                      {program}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(specialPrograms, setSpecialPrograms, index)}
                        className="ml-2 h-auto p-0 text-purple-600 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
