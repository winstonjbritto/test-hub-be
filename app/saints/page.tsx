import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CommonFooter } from "@/components/common/footer"
import { CommonHeader } from "@/components/common/header"
import {
  Search,
  Calendar,
  MapPin,
  Heart,
  Crown,
  Cross,
  Book,
  Play,
  Volume2,
  ImageIcon,
  Filter,
  Star,
  Users,
  Globe,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const featuredSaints = [
  {
    id: 1,
    name: "Saint Francis of Assisi",
    title: "Patron of Animals and Environment",
    feastDay: "October 4",
    century: "12th-13th Century",
    location: "Assisi, Italy",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Founded the Franciscan order and devoted his life to serving the poor and caring for creation.",
    patronOf: ["Animals", "Environment", "Italy", "Merchants"],
    category: "Founder",
    mediaCount: { images: 15, videos: 8, audio: 12 },
  },
  {
    id: 2,
    name: "Saint Teresa of Calcutta",
    title: "Mother Teresa - Saint of the Gutters",
    feastDay: "September 5",
    century: "20th Century",
    location: "Calcutta, India",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Dedicated her life to serving the poorest of the poor in the slums of Calcutta.",
    patronOf: ["Missionaries", "Poor", "Volunteers", "India"],
    category: "Missionary",
    mediaCount: { images: 25, videos: 18, audio: 10 },
  },
  {
    id: 3,
    name: "Saint Joan of Arc",
    title: "The Maid of Orléans",
    feastDay: "May 30",
    century: "15th Century",
    location: "France",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Peasant girl who led France to victory in the Hundred Years' War through divine visions.",
    patronOf: ["France", "Soldiers", "Martyrs", "Prisoners"],
    category: "Martyr",
    mediaCount: { images: 20, videos: 12, audio: 8 },
  },
  {
    id: 4,
    name: "Saint John Paul II",
    title: "Pope Saint John Paul the Great",
    feastDay: "October 22",
    century: "20th-21st Century",
    location: "Poland/Vatican",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Polish Pope who played a key role in ending communism and promoting human dignity worldwide.",
    patronOf: ["World Youth Day", "Families", "Poland"],
    category: "Pope",
    mediaCount: { images: 35, videos: 25, audio: 20 },
  },
  {
    id: 5,
    name: "Saint Thérèse of Lisieux",
    title: "The Little Flower",
    feastDay: "October 1",
    century: "19th Century",
    location: "Lisieux, France",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Carmelite nun known for her 'Little Way' of spiritual childhood and trust in God.",
    patronOf: ["Missions", "Florists", "France", "Tuberculosis"],
    category: "Doctor of the Church",
    mediaCount: { images: 18, videos: 10, audio: 15 },
  },
  {
    id: 6,
    name: "Saint Thomas Aquinas",
    title: "The Angelic Doctor",
    feastDay: "January 28",
    century: "13th Century",
    location: "Italy",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Dominican friar and theologian whose writings form the foundation of Catholic theology.",
    patronOf: ["Students", "Schools", "Theologians", "Universities"],
    category: "Doctor of the Church",
    mediaCount: { images: 12, videos: 15, audio: 18 },
  },
]

const saintCategories = [
  { name: "All Saints", count: 156, icon: Users },
  { name: "Martyrs", count: 45, icon: Cross },
  { name: "Doctors of the Church", count: 36, icon: Book },
  { name: "Founders", count: 28, icon: Crown },
  { name: "Missionaries", count: 32, icon: Globe },
  { name: "Mystics", count: 24, icon: Heart },
  { name: "Popes", count: 18, icon: Crown },
  { name: "Virgins", count: 22, icon: Star },
]

export default function SaintsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <CommonHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Saints of the Catholic Church</h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Discover the lives, stories, and inspiration of holy men and women throughout history
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search saints by name, feast day, or patronage..."
                className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-purple-200"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-purple-600 hover:bg-purple-50">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Browse by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {saintCategories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <Button
                      key={category.name}
                      variant="ghost"
                      className="w-full justify-between hover:bg-purple-50 hover:text-purple-700"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4" />
                        {category.name}
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Collection Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-blue-600" />
                    Images
                  </span>
                  <Badge>1,247</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-green-600" />
                    Videos
                  </span>
                  <Badge>324</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-orange-600" />
                    Audio
                  </span>
                  <Badge>189</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Saints */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Featured Saints</h2>
                <Button variant="outline" className="border-purple-200 hover:bg-purple-50">
                  View All Saints
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredSaints.map((saint) => (
                  <Card key={saint.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <img
                        src={saint.image || "/placeholder.svg"}
                        alt={saint.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-purple-700">{saint.category}</Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          {saint.mediaCount.images}
                        </Badge>
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Play className="w-3 h-3 mr-1" />
                          {saint.mediaCount.videos}
                        </Badge>
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          <Volume2 className="w-3 h-3 mr-1" />
                          {saint.mediaCount.audio}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{saint.name}</h3>
                        <p className="text-purple-600 font-medium">{saint.title}</p>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{saint.shortBio}</p>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          Feast Day: {saint.feastDay}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          {saint.location} • {saint.century}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Patron of:</p>
                        <div className="flex flex-wrap gap-1">
                          {saint.patronOf.slice(0, 3).map((patron) => (
                            <Badge key={patron} variant="outline" className="text-xs">
                              {patron}
                            </Badge>
                          ))}
                          {saint.patronOf.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{saint.patronOf.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Link href={`/saints/${saint.id}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Explore Saint's Life
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Browse by Feast Day */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Browse by Feast Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="this-month" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="this-month">This Month</TabsTrigger>
                    <TabsTrigger value="next-month">Next Month</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recently Added</TabsTrigger>
                  </TabsList>

                  <TabsContent value="this-month" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Saint Nicholas", date: "Dec 6", image: "/placeholder.svg?height=80&width=80" },
                        { name: "Saint Lucy", date: "Dec 13", image: "/placeholder.svg?height=80&width=80" },
                        {
                          name: "Saint John of the Cross",
                          date: "Dec 14",
                          image: "/placeholder.svg?height=80&width=80",
                        },
                        { name: "Saint Stephen", date: "Dec 26", image: "/placeholder.svg?height=80&width=80" },
                        {
                          name: "Saint John the Evangelist",
                          date: "Dec 27",
                          image: "/placeholder.svg?height=80&width=80",
                        },
                        { name: "Holy Innocents", date: "Dec 28", image: "/placeholder.svg?height=80&width=80" },
                      ].map((saint) => (
                        <div
                          key={saint.name}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                        >
                          <Avatar className="w-12 h-12">
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
                            <p className="text-sm text-gray-500">{saint.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="next-month" className="mt-6">
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>January saints will be displayed here</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="popular" className="mt-6">
                    <div className="text-center py-8 text-gray-500">
                      <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Most popular saints will be displayed here</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="recent" className="mt-6">
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Recently canonized saints will be displayed here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <CommonFooter />
    </div>
  )
}
