import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Crown, Star, Heart } from "lucide-react"

export function UpcomingFeasts() {
  const upcomingFeasts = [
    {
      name: "Christmas Day",
      date: "December 25",
      daysAway: 11,
      rank: "Solemnity",
      color: "White",
      description: "The Nativity of Our Lord Jesus Christ",
      icon: Crown,
    },
    {
      name: "Saint Stephen",
      date: "December 26",
      daysAway: 12,
      rank: "Feast",
      color: "Red",
      description: "First Martyr",
      icon: Star,
    },
    {
      name: "Saint John the Evangelist",
      date: "December 27",
      daysAway: 13,
      rank: "Feast",
      color: "White",
      description: "Apostle and Evangelist",
      icon: Heart,
    },
    {
      name: "Holy Innocents",
      date: "December 28",
      daysAway: 14,
      rank: "Feast",
      color: "Red",
      description: "Martyrs",
      icon: Star,
    },
    {
      name: "Mary, Mother of God",
      date: "January 1",
      daysAway: 18,
      rank: "Solemnity",
      color: "White",
      description: "Octave Day of Christmas",
      icon: Crown,
    },
  ]

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Solemnity":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Feast":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Memorial":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getLiturgicalColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case "white":
        return "bg-gray-100 text-gray-800"
      case "red":
        return "bg-red-100 text-red-800"
      case "purple":
        return "bg-purple-100 text-purple-800"
      case "green":
        return "bg-green-100 text-green-800"
      case "rose":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Upcoming Feasts
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {upcomingFeasts.map((feast) => {
            const IconComponent = feast.icon
            return (
              <div key={feast.name} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <IconComponent className="h-4 w-4 text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{feast.name}</h4>
                      <Badge className={getRankColor(feast.rank)}>{feast.rank}</Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{feast.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{feast.date}</span>
                        <span>•</span>
                        <span>{feast.daysAway} days away</span>
                      </div>

                      <Badge variant="outline" className={`text-xs ${getLiturgicalColorClass(feast.color)}`}>
                        {feast.color}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">View all upcoming liturgical celebrations</p>
        </div>
      </CardContent>
    </Card>
  )
}
