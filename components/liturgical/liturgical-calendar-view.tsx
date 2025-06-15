"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export function LiturgicalCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock liturgical events
  const liturgicalEvents = {
    "2024-12-08": { title: "Immaculate Conception", rank: "Solemnity", color: "white" },
    "2024-12-12": { title: "Our Lady of Guadalupe", rank: "Feast", color: "white" },
    "2024-12-14": { title: "St. John of the Cross", rank: "Memorial", color: "white" },
    "2024-12-21": { title: "St. Peter Canisius", rank: "Memorial", color: "white" },
    "2024-12-25": { title: "Christmas Day", rank: "Solemnity", color: "white" },
    "2024-12-26": { title: "St. Stephen", rank: "Feast", color: "red" },
    "2024-12-27": { title: "St. John the Evangelist", rank: "Feast", color: "white" },
    "2024-12-28": { title: "Holy Innocents", rank: "Feast", color: "red" },
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getColorClass = (color: string) => {
    switch (color) {
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="p-2 h-20" />
          ))}

          {/* Days of the month */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day)
            const event = liturgicalEvents[dateKey]
            const isToday =
              new Date().toDateString() ===
              new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

            return (
              <div
                key={day}
                className={`p-2 h-20 border rounded-lg ${
                  isToday ? "bg-purple-50 border-purple-200" : "border-gray-200"
                } hover:bg-gray-50 transition-colors`}
              >
                <div className={`text-sm font-medium ${isToday ? "text-purple-600" : "text-gray-900"}`}>{day}</div>
                {event && (
                  <div className="mt-1">
                    <Badge variant="secondary" className={`text-xs px-1 py-0 ${getColorClass(event.color)}`}>
                      {event.rank}
                    </Badge>
                    <div className="text-xs text-gray-600 mt-1 line-clamp-2">{event.title}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Liturgical Ranks</h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <Badge className="bg-yellow-100 text-yellow-800">Solemnity</Badge>
            <Badge className="bg-blue-100 text-blue-800">Feast</Badge>
            <Badge className="bg-green-100 text-green-800">Memorial</Badge>
            <Badge className="bg-gray-100 text-gray-800">Optional Memorial</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
