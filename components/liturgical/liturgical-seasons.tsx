import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Leaf, Snowflake, Crown } from "lucide-react"

export function LiturgicalSeasons() {
  // Mock data for current liturgical season
  const currentSeason = {
    name: "Advent",
    color: "Purple",
    startDate: "December 1, 2024",
    endDate: "December 24, 2024",
    daysTotal: 24,
    daysElapsed: 14,
    description: "A season of preparation for the celebration of Christ's birth and His second coming.",
    themes: ["Preparation", "Hope", "Waiting", "Expectation"],
  }

  const upcomingSeasons = [
    {
      name: "Christmas",
      color: "White",
      startDate: "December 25, 2024",
      icon: Snowflake,
      description: "Celebrating the birth of Jesus Christ",
    },
    {
      name: "Ordinary Time",
      color: "Green",
      startDate: "January 13, 2025",
      icon: Leaf,
      description: "Growing in faith and discipleship",
    },
    {
      name: "Lent",
      color: "Purple",
      startDate: "March 5, 2025",
      icon: Crown,
      description: "Preparation for Easter through prayer, fasting, and almsgiving",
    },
  ]

  const getColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case "purple":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "white":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const progressPercentage = (currentSeason.daysElapsed / currentSeason.daysTotal) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-purple-600" />
          Liturgical Seasons
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Season */}
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg text-purple-900">{currentSeason.name}</h3>
            <Badge className={getColorClass(currentSeason.color)}>{currentSeason.color}</Badge>
          </div>

          <p className="text-sm text-purple-700 mb-4">{currentSeason.description}</p>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-purple-600 mb-1">
                <span>Season Progress</span>
                <span>
                  {currentSeason.daysElapsed} of {currentSeason.daysTotal} days
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div>
              <p className="text-xs text-purple-600 mb-2">Key Themes:</p>
              <div className="flex flex-wrap gap-1">
                {currentSeason.themes.map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Seasons */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Upcoming Seasons</h4>
          <div className="space-y-3">
            {upcomingSeasons.map((season) => {
              const IconComponent = season.icon
              return (
                <div key={season.name} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-full">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-gray-900">{season.name}</h5>
                      <Badge variant="outline" className={`text-xs ${getColorClass(season.color)}`}>
                        {season.color}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{season.description}</p>
                    <p className="text-xs text-gray-500">Begins {season.startDate}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
