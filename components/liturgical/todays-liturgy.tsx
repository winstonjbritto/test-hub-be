import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, Palette } from "lucide-react"

export function TodaysLiturgy() {
  // Mock data - in real app, this would come from an API
  const todaysLiturgy = {
    date: "December 14, 2024",
    season: "Advent",
    seasonColor: "purple",
    week: "Third Week of Advent",
    rank: "Weekday",
    title: "Saint John of the Cross, Priest and Doctor of the Church",
    color: "White",
    readings: {
      firstReading: "Isaiah 45:6c-8, 18, 21c-25",
      psalm: "Psalm 85:9ab-10, 11-12, 13-14",
      gospel: "Luke 7:18b-23",
    },
    memorialRank: "Memorial",
  }

  const getColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "white":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "rose":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 mb-8">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Calendar className="h-6 w-6 text-purple-600" />
            Today's Liturgy
          </CardTitle>
          <Badge variant="outline" className={getColorClass(todaysLiturgy.seasonColor)}>
            {todaysLiturgy.season}
          </Badge>
        </div>
        <p className="text-gray-600">{todaysLiturgy.date}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Main Title */}
        <div className="text-center p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{todaysLiturgy.title}</h2>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              <span>Liturgical Color: </span>
              <Badge variant="outline" className={getColorClass(todaysLiturgy.color)}>
                {todaysLiturgy.color}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{todaysLiturgy.memorialRank}</span>
            </div>
          </div>
        </div>

        {/* Scripture Readings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              First Reading
            </h3>
            <p className="text-sm text-gray-600">{todaysLiturgy.readings.firstReading}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Responsorial Psalm
            </h3>
            <p className="text-sm text-gray-600">{todaysLiturgy.readings.psalm}</p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Gospel
            </h3>
            <p className="text-sm text-gray-600">{todaysLiturgy.readings.gospel}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <BookOpen className="h-4 w-4 mr-2" />
            Read Full Readings
          </Button>
          <Button variant="outline">View Mass Times</Button>
          <Button variant="outline">Daily Reflection</Button>
        </div>
      </CardContent>
    </Card>
  )
}
