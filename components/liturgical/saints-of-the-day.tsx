import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, BookOpen, Heart } from "lucide-react"

export function SaintsOfTheDay() {
  // Mock data for saints
  const saintsToday = [
    {
      name: "Saint John of the Cross",
      title: "Priest and Doctor of the Church",
      rank: "Memorial",
      feast: true,
      description:
        "Spanish Catholic friar, mystic, and poet. A major figure in the Counter-Reformation and founder of the Discalced Carmelites.",
      patronOf: ["Mystics", "Contemplatives", "Spanish poets"],
      year: "1542-1591",
    },
  ]

  const upcomingSaints = [
    {
      name: "Saint Peter Canisius",
      date: "December 21",
      title: "Priest and Doctor of the Church",
      rank: "Memorial",
    },
    {
      name: "Saint Frances Xavier Cabrini",
      date: "December 22",
      title: "Virgin",
      rank: "Memorial",
    },
    {
      name: "Saint John of Kanty",
      date: "December 23",
      title: "Priest",
      rank: "Memorial",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-600" />
          Saints of the Day
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Today's Saints */}
        {saintsToday.map((saint) => (
          <div key={saint.name} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-yellow-900">{saint.name}</h3>
                <p className="text-sm text-yellow-700">{saint.title}</p>
                <p className="text-xs text-yellow-600">{saint.year}</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">{saint.rank}</Badge>
            </div>

            <p className="text-sm text-yellow-800 mb-3">{saint.description}</p>

            {saint.patronOf.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-yellow-600 mb-1">Patron of:</p>
                <div className="flex flex-wrap gap-1">
                  {saint.patronOf.map((patron) => (
                    <Badge key={patron} variant="outline" className="text-xs">
                      {patron}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                Read Biography
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Heart className="h-3 w-3 mr-1" />
                Prayer
              </Button>
            </div>
          </div>
        ))}

        {/* Upcoming Saints */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Upcoming Saints</h4>
          <div className="space-y-2">
            {upcomingSaints.map((saint) => (
              <div key={saint.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-900 text-sm">{saint.name}</h5>
                  <p className="text-xs text-gray-600">{saint.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{saint.date}</p>
                  <Badge variant="outline" className="text-xs">
                    {saint.rank}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
