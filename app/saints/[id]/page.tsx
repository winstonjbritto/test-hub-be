import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommonFooter } from "@/components/common/footer"
import { CommonHeader } from "@/components/common/header"
import {
  Calendar,
  MapPin,
  Crown,
  Book,
  Play,
  Volume2,
  ImageIcon,
  ArrowLeft,
  Share2,
  Bookmark,
  Download,
  ExternalLink,
  Quote,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for a specific saint
const saintData = {
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
  image: "/placeholder.svg?height=400&width=400",
  fullBio: `Giovanni di Pietro di Bernardone, known as Francis of Assisi, was born into a wealthy merchant family in Assisi, Italy, around 1181. His early life was marked by luxury and worldly pursuits, but a series of spiritual experiences led to his dramatic conversion.

After a vision of Christ speaking to him from the cross at San Damiano, Francis abandoned his comfortable life to embrace radical poverty and service to others. He founded the Franciscan order, emphasizing simplicity, poverty, and care for creation.

Francis was known for his deep love of nature and animals, often preaching to birds and taming wild wolves. His famous "Canticle of the Creatures" is one of the earliest works of literature in Italian vernacular.

He received the stigmata (wounds of Christ) in 1224, making him the first recorded person to bear these marks. Francis died on October 3, 1226, and was canonized just two years later by Pope Gregory IX.`,
  patronOf: [
    "Animals",
    "Environment",
    "Italy",
    "Merchants",
    "Ecology",
    "Peace",
    "Needleworkers",
    "Tapestry workers",
    "Catholic Action",
  ],
  attributes: ["Brown habit", "Stigmata", "Birds", "Wolf", "Cross", "Skull"],
  quotes: [
    "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.",
    "Lord, make me an instrument of your peace.",
    "It is in giving that we receive.",
    "Preach the Gospel at all times. When necessary, use words.",
  ],
  miracles: ["Taming the Wolf of Gubbio", "Preaching to the Birds", "Receiving the Stigmata", "Healing the lepers"],
  relatedSaints: [
    { name: "Saint Clare of Assisi", relation: "Spiritual daughter and founder of Poor Clares" },
    { name: "Saint Anthony of Padua", relation: "Fellow Franciscan friar" },
    { name: "Saint Bonaventure", relation: "Franciscan theologian and biographer" },
  ],
  mediaGallery: {
    images: [
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "Preaching to the Birds",
        description: "Famous scene of St. Francis preaching to birds",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "Receiving the Stigmata",
        description: "Francis receiving the wounds of Christ",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "Taming the Wolf of Gubbio",
        description: "Francis taming the fierce wolf",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "Basilica of Saint Francis",
        description: "The beautiful basilica in Assisi",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "First Nativity Scene",
        description: "Francis creating the first Christmas nativity",
      },
      {
        url: "/placeholder.svg?height=300&width=400",
        title: "San Damiano Cross",
        description: "The cross that spoke to Francis",
      },
    ],
    videos: [
      {
        url: "#",
        title: "The Life of Saint Francis",
        duration: "45:30",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        url: "#",
        title: "Francis and the Sultan",
        duration: "28:15",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      { url: "#", title: "The Franciscan Way", duration: "35:20", thumbnail: "/placeholder.svg?height=200&width=300" },
      {
        url: "#",
        title: "Canticle of the Creatures",
        duration: "12:45",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ],
    audio: [
      { url: "#", title: "Prayer of Saint Francis", duration: "3:45", type: "Prayer" },
      { url: "#", title: "Life Story Narration", duration: "25:30", type: "Biography" },
      { url: "#", title: "Canticle of the Creatures", duration: "8:20", type: "Hymn" },
      { url: "#", title: "Franciscan Meditation", duration: "15:00", type: "Meditation" },
      { url: "#", title: "Saint Francis Novena", duration: "12:15", type: "Novena" },
    ],
  },
}

export default function SaintDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <CommonHeader />
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/saints">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Saints
              </Button>
            </Link>
            <div className="flex gap-2 ml-auto">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1">
              <div className="relative">
                <img
                  src={saintData.image || "/placeholder.svg"}
                  alt={saintData.name}
                  className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-purple-700">Canonized Saint</Badge>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{saintData.name}</h1>
              <p className="text-xl text-purple-100 mb-6">{saintData.title}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-200" />
                    <span>Feast Day: {saintData.feastDay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-purple-200" />
                    <span>{saintData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-200" />
                    <span>
                      {saintData.born} - {saintData.died}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-purple-200" />
                    <span>Canonized: {saintData.canonized}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-200" />
                    <span>By: {saintData.canonizedBy}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Patron of:</h3>
                <div className="flex flex-wrap gap-2">
                  {saintData.patronOf.map((patron) => (
                    <Badge key={patron} variant="secondary" className="bg-white/20 text-white border-white/30">
                      {patron}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="biography" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="biography">Biography</TabsTrigger>
            <TabsTrigger value="media">Media Gallery</TabsTrigger>
            <TabsTrigger value="quotes">Quotes & Prayers</TabsTrigger>
            <TabsTrigger value="miracles">Miracles</TabsTrigger>
            <TabsTrigger value="related">Related Saints</TabsTrigger>
          </TabsList>

          <TabsContent value="biography">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="w-5 h-5" />
                      Life Story
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    {saintData.fullBio.split("\n\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attributes & Symbols</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {saintData.attributes.map((attribute) => (
                        <Badge key={attribute} variant="outline">
                          {attribute}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Prayer Card
                    </Button>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Vatican Biography
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="media">
            <div className="space-y-8">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Images ({saintData.mediaGallery.images.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saintData.mediaGallery.images.map((image, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={image.url || "/placeholder.svg"}
                            alt={image.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900">{image.title}</h4>
                          <p className="text-sm text-gray-600">{image.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Videos ({saintData.mediaGallery.videos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {saintData.mediaGallery.videos.map((video, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                              <Play className="w-6 h-6 text-purple-600" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-black/70 text-white">{video.duration}</Badge>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Audio */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-5 h-5" />
                    Audio Resources ({saintData.mediaGallery.audio.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {saintData.mediaGallery.audio.map((audio, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Volume2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{audio.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{audio.duration}</span>
                            <Badge variant="outline">{audio.type}</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quotes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {saintData.quotes.map((quote, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-purple-300 mb-4" />
                    <blockquote className="text-lg text-gray-700 italic mb-4">"{quote}"</blockquote>
                    <cite className="text-sm text-gray-500">— {saintData.name}</cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="miracles">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Miracles & Notable Acts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {saintData.miracles.map((miracle, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-purple-50 transition-colors">
                      <h4 className="font-medium text-gray-900 mb-2">{miracle}</h4>
                      <p className="text-sm text-gray-600">
                        Detailed account of this miraculous event would be displayed here with historical context and
                        significance.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="related">
            <Card>
              <CardHeader>
                <CardTitle>Related Saints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {saintData.relatedSaints.map((saint, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${saint.name}`} />
                        <AvatarFallback>
                          {saint.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{saint.name}</h4>
                        <p className="text-sm text-gray-600">{saint.relation}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Saint
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <CommonFooter />
    </div>
  )
}
