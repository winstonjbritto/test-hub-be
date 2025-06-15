import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Crown, Heart, ChevronLeft, ChevronRight, Star, Clock, MapPin } from "lucide-react"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"

export default function LiturgicalCalendarPage() {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const today = currentDate.getDate()

  // Mock liturgical data
  const todaysLiturgy = {
    date: "December 14, 2024",
    season: "Advent",
    seasonColor: "purple",
    rank: "Weekday",
    title: "Saturday of the Second Week of Advent",
    saint: "Saint John of the Cross, Priest and Doctor",
    readings: {
      first: "Sirach 48:1-4, 9-11",
      psalm: "Psalm 80:2ac and 3b, 15-16, 18-19",
      gospel: "Matthew 17:9a, 10-13",
    },
    liturgicalColor: "Purple",
    themes: ["Preparation", "Repentance", "Hope"],
  }

  const liturgicalEvents = [
    { date: 8, title: "Immaculate Conception", rank: "Solemnity", color: "white" },
    { date: 12, title: "Our Lady of Guadalupe", rank: "Feast", color: "white" },
    { date: 14, title: "St. John of the Cross", rank: "Memorial", color: "white" },
    { date: 21, title: "St. Peter Canisius", rank: "Memorial", color: "white" },
    { date: 25, title: "Christmas Day", rank: "Solemnity", color: "white" },
    { date: 26, title: "St. Stephen", rank: "Feast", color: "red" },
    { date: 27, title: "St. John the Evangelist", rank: "Feast", color: "white" },
    { date: 28, title: "Holy Innocents", rank: "Feast", color: "red" },
  ]

  const upcomingFeasts = [
    {
      date: "Dec 25",
      title: "Christmas Day",
      rank: "Solemnity",
      color: "gold",
      daysUntil: 11,
      description: "The Nativity of Our Lord Jesus Christ",
    },
    {
      date: "Jan 1",
      title: "Mary, Mother of God",
      rank: "Solemnity",
      color: "white",
      daysUntil: 18,
      description: "Solemnity of Mary, the Holy Mother of God",
    },
    {
      date: "Jan 6",
      title: "Epiphany",
      rank: "Solemnity",
      color: "white",
      daysUntil: 23,
      description: "The Manifestation of the Lord",
    },
  ]

  const saintsOfTheDay = [
    {
      name: "Saint John of the Cross",
      title: "Priest and Doctor of the Church",
      feast: "December 14",
      patronOf: ["Mystics", "Contemplatives", "Spanish Poets"],
      biography:
        "Spanish Catholic friar, mystic, and poet. A major figure in the Counter-Reformation and founder of the Discalced Carmelites.",
      keyWorks: ["Dark Night of the Soul", "Ascent of Mount Carmel"],
    },
  ]

  const liturgicalSeasons = {
    current: {
      name: "Advent",
      color: "Purple",
      duration: "4 weeks",
      currentWeek: 2,
      daysElapsed: 10,
      totalDays: 28,
      themes: ["Preparation", "Hope", "Waiting", "Expectation"],
      description: "A season of preparation for the celebration of the birth of Jesus Christ at Christmas.",
    },
    upcoming: [
      {
        name: "Christmas",
        startDate: "Dec 25",
        color: "White/Gold",
        description: "Celebrating the birth of Jesus Christ",
      },
      {
        name: "Ordinary Time",
        startDate: "Jan 13",
        color: "Green",
        description: "Time for growth in Christian living",
      },
    ],
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const event = liturgicalEvents.find((e) => e.date === day)
      const isToday = day === today

      days.push(
        <div
          key={day}
          className={`h-12 p-1 border border-gray-100 flex flex-col items-center justify-center text-sm relative cursor-pointer hover:bg-purple-50 transition-colors ${
            isToday ? "bg-purple-100 border-purple-300 font-bold text-purple-900" : ""
          }`}
        >
          <span className={isToday ? "text-purple-900" : "text-gray-700"}>{day}</span>
          {event && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 ${
                event.color === "white"
                  ? "bg-gray-300"
                  : event.color === "red"
                    ? "bg-red-500"
                    : event.color === "purple"
                      ? "bg-purple-500"
                      : "bg-yellow-500"
              }`}
            ></div>
          )}
        </div>,
      )
    }

    return days
  }

  const getLiturgicalColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case "purple":
        return "bg-purple-600"
      case "white":
        return "bg-white border border-gray-300"
      case "red":
        return "bg-red-600"
      case "green":
        return "bg-green-600"
      case "gold":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRankBadgeColor = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "solemnity":
        return "bg-gold-100 text-gold-800 border-gold-200"
      case "feast":
        return "bg-red-100 text-red-800 border-red-200"
      case "memorial":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <CommonHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Liturgical Calendar</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow the rhythm of the Church year with feast days, seasons, and daily liturgical celebrations
          </p>
        </div>

        {/* Today's Liturgy - Featured Section */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Today's Liturgy
              </CardTitle>
              <div className={`w-6 h-6 rounded-full ${getLiturgicalColorClass(todaysLiturgy.liturgicalColor)}`}></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">{todaysLiturgy.title}</h3>
                <p className="text-purple-100 mb-2">{todaysLiturgy.date}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {todaysLiturgy.season}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {todaysLiturgy.rank}
                  </Badge>
                </div>
                <p className="text-lg font-medium">{todaysLiturgy.saint}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Today's Readings:</h4>
                <ul className="space-y-1 text-sm text-purple-100">
                  <li>First Reading: {todaysLiturgy.readings.first}</li>
                  <li>Psalm: {todaysLiturgy.readings.psalm}</li>
                  <li>Gospel: {todaysLiturgy.readings.gospel}</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    Read Full
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Find Mass
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Calendar View */}
          <div className="lg:col-span-2">
            <Card className="border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    December 2024
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-gray-600">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Solemnity</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Feast</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-300 rounded"></div>
                    <span>Memorial</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar Information */}
          <div className="space-y-6">
            {/* Current Liturgical Season */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Crown className="h-5 w-5 text-purple-600" />
                  Current Season
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-purple-900">{liturgicalSeasons.current.name}</h3>
                    <div
                      className={`w-4 h-4 rounded-full ${getLiturgicalColorClass(liturgicalSeasons.current.color)}`}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{liturgicalSeasons.current.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {liturgicalSeasons.current.daysElapsed}/{liturgicalSeasons.current.totalDays} days
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(liturgicalSeasons.current.daysElapsed / liturgicalSeasons.current.totalDays) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Themes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {liturgicalSeasons.current.themes.map((theme, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saints of the Day */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Saint of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                {saintsOfTheDay.map((saint, index) => (
                  <div key={index} className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-purple-900">{saint.name}</h3>
                      <p className="text-sm text-gray-600">{saint.title}</p>
                      <p className="text-xs text-purple-600 font-medium">{saint.feast}</p>
                    </div>

                    <p className="text-sm text-gray-700">{saint.biography}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Patron of:</h4>
                      <div className="flex flex-wrap gap-1">
                        {saint.patronOf.map((patron, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {patron}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Biography
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        Prayers
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Feasts */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Upcoming Feasts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingFeasts.map((feast, index) => (
                    <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm text-purple-900">{feast.title}</h4>
                          <div className={`w-3 h-3 rounded-full ${getLiturgicalColorClass(feast.color)}`}></div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{feast.description}</p>
                        <Badge variant="outline" className={`text-xs ${getRankBadgeColor(feast.rank)}`}>
                          {feast.rank}
                        </Badge>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs font-medium text-purple-600">{feast.date}</p>
                        <p className="text-xs text-gray-500">{feast.daysUntil} days</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              Liturgical Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-white/80">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <span className="font-medium">Daily Readings</span>
                <span className="text-sm text-gray-600 text-center">Scripture readings for today's Mass</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-white/80">
                <Heart className="h-6 w-6 text-red-600" />
                <span className="font-medium">Seasonal Devotions</span>
                <span className="text-sm text-gray-600 text-center">Prayers and practices for Advent</span>
              </Button>

              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-white/80">
                <Crown className="h-6 w-6 text-yellow-600" />
                <span className="font-medium">Saints Guide</span>
                <span className="text-sm text-gray-600 text-center">Learn about Catholic saints</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <CommonFooter />
    </div>
  )
}
