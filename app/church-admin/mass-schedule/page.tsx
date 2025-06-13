"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Calendar, Clock, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Save, MapPin, Building } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns"

interface Church {
  id: string
  name: string
  address: string
  city: string
  state: string
}

interface MassSchedule {
  id: string
  churchId: string
  time: string
  type: "regular" | "special"
  title?: string
  description?: string
  language?: string
  priest?: string
  recurring?: {
    pattern: "weekly" | "monthly" | "none"
    daysOfWeek?: number[] // 0 = Sunday, 1 = Monday, etc.
    dayOfMonth?: number
  }
}

interface MassOccurrence {
  id: string
  scheduleId: string
  churchId: string
  date: Date
  time: string
  type: "regular" | "special"
  title?: string
  description?: string
  language?: string
  priest?: string
  isModified?: boolean
  isCancelled?: boolean
}

export default function MassSchedulePage() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedChurch, setSelectedChurch] = useState<string>("")
  const [isAddingMass, setIsAddingMass] = useState(false)
  const [isEditingMass, setIsEditingMass] = useState(false)
  const [editingMass, setEditingMass] = useState<MassOccurrence | null>(null)

  // Mock data for churches that the admin manages
  const [churches, setChurches] = useState<Church[]>([
    {
      id: "church1",
      name: "St. Mary's Cathedral",
      address: "123 Cathedral Ave",
      city: "Downtown",
      state: "CA",
    },
    {
      id: "church2",
      name: "Sacred Heart Parish",
      address: "456 Parish St",
      city: "Midtown",
      state: "CA",
    },
    {
      id: "church3",
      name: "Our Lady of Grace",
      address: "789 Grace Blvd",
      city: "Uptown",
      state: "CA",
    },
  ])

  // Mock data for mass schedules by church
  const [massSchedules, setMassSchedules] = useState<MassSchedule[]>([
    // St. Mary's Cathedral schedules
    {
      id: "1",
      churchId: "church1",
      time: "08:00",
      type: "regular",
      title: "Morning Mass",
      language: "English",
      priest: "Father Michael Johnson",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "2",
      churchId: "church1",
      time: "10:30",
      type: "regular",
      title: "Family Mass",
      language: "English",
      priest: "Father Michael Johnson",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "3",
      churchId: "church1",
      time: "18:00",
      type: "regular",
      title: "Evening Mass",
      language: "Spanish",
      priest: "Father Rodriguez",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "4",
      churchId: "church1",
      time: "07:00",
      type: "regular",
      title: "Daily Mass",
      language: "English",
      priest: "Father Michael Johnson",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [1, 2, 3, 4, 5], // Monday to Friday
      },
    },
    {
      id: "5",
      churchId: "church1",
      time: "17:00",
      type: "regular",
      title: "Saturday Vigil",
      language: "English",
      priest: "Father Michael Johnson",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [6], // Saturday
      },
    },
    // Sacred Heart Parish schedules
    {
      id: "6",
      churchId: "church2",
      time: "09:00",
      type: "regular",
      title: "Sunday Mass",
      language: "English",
      priest: "Father Thomas",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "7",
      churchId: "church2",
      time: "11:30",
      type: "regular",
      title: "Spanish Mass",
      language: "Spanish",
      priest: "Padre Martinez",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "8",
      churchId: "church2",
      time: "18:30",
      type: "regular",
      title: "Saturday Vigil",
      language: "English",
      priest: "Father Thomas",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [6], // Saturday
      },
    },
    // Our Lady of Grace schedules
    {
      id: "9",
      churchId: "church3",
      time: "08:30",
      type: "regular",
      title: "Morning Mass",
      language: "English",
      priest: "Father David",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
    {
      id: "10",
      churchId: "church3",
      time: "10:00",
      type: "regular",
      title: "Family Mass",
      language: "English",
      priest: "Father David",
      recurring: {
        pattern: "weekly",
        daysOfWeek: [0], // Sunday
      },
    },
  ])

  // Mock data for specific mass occurrences (overrides and special masses)
  const [massOccurrences, setMassOccurrences] = useState<MassOccurrence[]>([
    {
      id: "occ1",
      scheduleId: "1",
      churchId: "church1",
      date: new Date(2024, 11, 25), // Christmas
      time: "09:00",
      type: "special",
      title: "Christmas Morning Mass",
      description: "Special Christmas celebration",
      language: "English",
      priest: "Father Michael Johnson",
      isModified: true,
    },
  ])

  // Form state for adding/editing mass
  const [massForm, setMassForm] = useState({
    time: "",
    type: "regular" as "regular" | "special",
    title: "",
    description: "",
    language: "English",
    priest: "",
    recurring: {
      pattern: "none" as "weekly" | "monthly" | "none",
      daysOfWeek: [] as number[],
      dayOfMonth: 1,
    },
  })

  // Set default church when component mounts
  useEffect(() => {
    if (churches.length > 0 && !selectedChurch) {
      setSelectedChurch(churches[0].id)
    }
  }, [churches, selectedChurch])

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get current church info
  const currentChurch = churches.find((church) => church.id === selectedChurch)

  // Filter schedules and occurrences by selected church
  const churchMassSchedules = massSchedules.filter((schedule) => schedule.churchId === selectedChurch)
  const churchMassOccurrences = massOccurrences.filter((occurrence) => occurrence.churchId === selectedChurch)

  // Generate mass occurrences for a specific date
  const getMassesForDate = (date: Date): MassOccurrence[] => {
    if (!selectedChurch) return []

    const dayOfWeek = date.getDay()
    const dayOfMonth = date.getDate()
    const masses: MassOccurrence[] = []

    // Check for specific overrides first
    const specificMasses = churchMassOccurrences.filter((occ) => isSameDay(occ.date, date))

    // Get regular scheduled masses for this day
    churchMassSchedules.forEach((schedule) => {
      // Skip if there's a specific override for this schedule on this date
      const hasOverride = specificMasses.some((occ) => occ.scheduleId === schedule.id)
      if (hasOverride) return

      let shouldInclude = false

      if (schedule.recurring?.pattern === "weekly" && schedule.recurring.daysOfWeek?.includes(dayOfWeek)) {
        shouldInclude = true
      } else if (schedule.recurring?.pattern === "monthly" && schedule.recurring.dayOfMonth === dayOfMonth) {
        shouldInclude = true
      }

      if (shouldInclude) {
        masses.push({
          id: `${schedule.id}-${format(date, "yyyy-MM-dd")}`,
          scheduleId: schedule.id,
          churchId: selectedChurch,
          date,
          time: schedule.time,
          type: schedule.type,
          title: schedule.title,
          description: schedule.description,
          language: schedule.language,
          priest: schedule.priest,
        })
      }
    })

    // Add specific masses
    masses.push(...specificMasses)

    return masses.sort((a, b) => a.time.localeCompare(b.time))
  }

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleChurchChange = (churchId: string) => {
    setSelectedChurch(churchId)
    setSelectedDate(null) // Reset selected date when changing church
  }

  const handleAddMass = () => {
    if (!selectedDate || !selectedChurch) return

    const newMass: MassOccurrence = {
      id: `new-${Date.now()}`,
      scheduleId: massForm.recurring.pattern !== "none" ? `schedule-${Date.now()}` : "",
      churchId: selectedChurch,
      date: selectedDate,
      time: massForm.time,
      type: massForm.type,
      title: massForm.title,
      description: massForm.description,
      language: massForm.language,
      priest: massForm.priest,
    }

    if (massForm.recurring.pattern !== "none") {
      // Create a new recurring schedule
      const newSchedule: MassSchedule = {
        id: `schedule-${Date.now()}`,
        churchId: selectedChurch,
        time: massForm.time,
        type: massForm.type,
        title: massForm.title,
        description: massForm.description,
        language: massForm.language,
        priest: massForm.priest,
        recurring: massForm.recurring,
      }
      setMassSchedules([...massSchedules, newSchedule])
    } else {
      // Add as a one-time occurrence
      setMassOccurrences([...massOccurrences, newMass])
    }

    setIsAddingMass(false)
    resetForm()
  }

  const handleEditMass = (mass: MassOccurrence) => {
    setEditingMass(mass)
    setMassForm({
      time: mass.time,
      type: mass.type,
      title: mass.title || "",
      description: mass.description || "",
      language: mass.language || "English",
      priest: mass.priest || "",
      recurring: { pattern: "none", daysOfWeek: [], dayOfMonth: 1 },
    })
    setIsEditingMass(true)
  }

  const handleUpdateMass = () => {
    if (!editingMass || !selectedChurch) return

    const updatedMass: MassOccurrence = {
      ...editingMass,
      time: massForm.time,
      type: massForm.type,
      title: massForm.title,
      description: massForm.description,
      language: massForm.language,
      priest: massForm.priest,
      isModified: true,
    }

    // Check if this is a regular scheduled mass being modified
    if (editingMass.scheduleId && !editingMass.isModified) {
      // Add as a specific occurrence override
      setMassOccurrences([...massOccurrences, updatedMass])
    } else {
      // Update existing occurrence
      setMassOccurrences(massOccurrences.map((occ) => (occ.id === editingMass.id ? updatedMass : occ)))
    }

    setIsEditingMass(false)
    setEditingMass(null)
    resetForm()
  }

  const handleDeleteMass = (mass: MassOccurrence) => {
    if (mass.scheduleId && !mass.isModified) {
      // Mark as cancelled for regular scheduled mass
      const cancelledMass: MassOccurrence = {
        ...mass,
        isCancelled: true,
        isModified: true,
      }
      setMassOccurrences([...massOccurrences, cancelledMass])
    } else {
      // Remove specific occurrence
      setMassOccurrences(massOccurrences.filter((occ) => occ.id !== mass.id))
    }
  }

  const resetForm = () => {
    setMassForm({
      time: "",
      type: "regular",
      title: "",
      description: "",
      language: "English",
      priest: "",
      recurring: { pattern: "none", daysOfWeek: [], dayOfMonth: 1 },
    })
  }

  const toggleDayOfWeek = (day: number) => {
    const currentDays = massForm.recurring.daysOfWeek
    const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day].sort()

    setMassForm({
      ...massForm,
      recurring: { ...massForm.recurring, daysOfWeek: newDays },
    })
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get priests for the selected church
  const getChurchPriests = () => {
    const churchSchedules = massSchedules.filter((schedule) => schedule.churchId === selectedChurch)
    const priests = [...new Set(churchSchedules.map((schedule) => schedule.priest).filter(Boolean))]
    return priests
  }

  if (!selectedChurch) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Mass Schedule</h2>
            <p className="text-purple-600">Loading churches...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-purple-900">Mass Schedule</h2>
            <p className="text-purple-600">Manage mass times and recurring schedules</p>
          </div>
        </div>
      </div>

      {/* Church Selection */}
      <Card className="border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Building className="w-5 h-5" />
            Select Church
          </CardTitle>
          <CardDescription className="text-purple-600">
            Choose which church to manage mass schedules for
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {churches.map((church) => (
              <Card
                key={church.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedChurch === church.id
                    ? "ring-2 ring-purple-500 bg-purple-50"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
                onClick={() => handleChurchChange(church.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{church.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">
                          {church.city}, {church.state}
                        </span>
                      </div>
                      {selectedChurch === church.id && (
                        <Badge className="mt-2 bg-purple-100 text-purple-800">Selected</Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Church Info */}
      {currentChurch && (
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Managing: {currentChurch.name}</h3>
                <p className="text-sm text-gray-600">
                  {currentChurch.address}, {currentChurch.city}, {currentChurch.state}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-3 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <div className="flex items-center justify-between">
              <CardTitle className="text-purple-900 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {format(currentDate, "MMMM yyyy")}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-purple-100">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-purple-700 border-r border-purple-100 last:border-r-0"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const masses = getMassesForDate(day)
                const isSelected = selectedDate && isSameDay(day, selectedDate)
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isTodayDate = isToday(day)

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border-r border-b border-purple-100 last:border-r-0 cursor-pointer transition-colors ${
                      isSelected ? "bg-purple-100" : "hover:bg-purple-50"
                    } ${!isCurrentMonth ? "opacity-50" : ""} ${isTodayDate ? "bg-blue-50" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className={`text-sm font-medium mb-1 ${isTodayDate ? "text-blue-600" : "text-gray-900"}`}>
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1">
                      {masses.slice(0, 3).map((mass) => (
                        <div
                          key={mass.id}
                          className={`text-xs p-1 rounded truncate ${
                            mass.type === "special"
                              ? "bg-orange-100 text-orange-800"
                              : mass.isModified
                                ? "bg-yellow-100 text-yellow-800"
                                : mass.isCancelled
                                  ? "bg-red-100 text-red-800 line-through"
                                  : "bg-purple-100 text-purple-800"
                          }`}
                          title={`${mass.time} - ${mass.title || "Mass"}`}
                        >
                          {mass.time} {mass.title && `- ${mass.title}`}
                        </div>
                      ))}
                      {masses.length > 3 && <div className="text-xs text-gray-500">+{masses.length - 3} more</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Details */}
        <Card className="border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
            <CardTitle className="text-purple-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a Date"}
            </CardTitle>
            {selectedDate && (
              <CardDescription className="text-purple-600">{format(selectedDate, "EEEE")}</CardDescription>
            )}
            {selectedDate && (
              <Dialog open={isAddingMass} onOpenChange={setIsAddingMass}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Mass
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Mass</DialogTitle>
                    <DialogDescription>
                      {selectedDate
                        ? `Adding mass for ${format(selectedDate, "MMMM d, yyyy")} at ${currentChurch?.name}`
                        : "Select a date first"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={massForm.time}
                          onChange={(e) => setMassForm({ ...massForm, time: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={massForm.type}
                          onValueChange={(value: "regular" | "special") => setMassForm({ ...massForm, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">Regular</SelectItem>
                            <SelectItem value="special">Special</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={massForm.title}
                        onChange={(e) => setMassForm({ ...massForm, title: e.target.value })}
                        placeholder="e.g., Morning Mass, Family Mass"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={massForm.language}
                          onValueChange={(value) => setMassForm({ ...massForm, language: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="Latin">Latin</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Priest</Label>
                        <Select
                          value={massForm.priest}
                          onValueChange={(value) => setMassForm({ ...massForm, priest: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priest" />
                          </SelectTrigger>
                          <SelectContent>
                            {getChurchPriests().map((priest) => (
                              <SelectItem key={priest} value={priest}>
                                {priest}
                              </SelectItem>
                            ))}
                            <SelectItem value="custom">Other...</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {massForm.priest === "custom" && (
                      <div className="space-y-2">
                        <Label>Priest Name</Label>
                        <Input
                          value={massForm.priest}
                          onChange={(e) => setMassForm({ ...massForm, priest: e.target.value })}
                          placeholder="Enter priest name"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Recurring Pattern</Label>
                      <Select
                        value={massForm.recurring.pattern}
                        onValueChange={(value: "weekly" | "monthly" | "none") =>
                          setMassForm({ ...massForm, recurring: { ...massForm.recurring, pattern: value } })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">One-time only</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {massForm.recurring.pattern === "weekly" && (
                      <div className="space-y-2">
                        <Label>Days of Week</Label>
                        <div className="flex gap-1">
                          {dayNames.map((day, index) => (
                            <Button
                              key={day}
                              type="button"
                              variant={massForm.recurring.daysOfWeek.includes(index) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleDayOfWeek(index)}
                              className="w-12 h-8 text-xs"
                            >
                              {day}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {massForm.recurring.pattern === "monthly" && (
                      <div className="space-y-2">
                        <Label>Day of Month</Label>
                        <Input
                          type="number"
                          min="1"
                          max="31"
                          value={massForm.recurring.dayOfMonth}
                          onChange={(e) =>
                            setMassForm({
                              ...massForm,
                              recurring: { ...massForm.recurring, dayOfMonth: Number.parseInt(e.target.value) || 1 },
                            })
                          }
                        />
                      </div>
                    )}

                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddMass} disabled={!massForm.time} className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Add Mass
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingMass(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent className="p-4">
            {selectedDate ? (
              <div className="space-y-4">
                {getMassesForDate(selectedDate).map((mass) => (
                  <div
                    key={mass.id}
                    className={`p-3 rounded-lg border ${
                      mass.type === "special"
                        ? "border-orange-200 bg-orange-50"
                        : mass.isModified
                          ? "border-yellow-200 bg-yellow-50"
                          : mass.isCancelled
                            ? "border-red-200 bg-red-50"
                            : "border-purple-200 bg-purple-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className={`font-medium ${mass.isCancelled ? "line-through text-red-600" : ""}`}>
                          {mass.time} - {mass.title || "Mass"}
                        </div>
                        {mass.language && <div className="text-sm text-gray-600">{mass.language}</div>}
                        {mass.priest && <div className="text-sm text-gray-600">{mass.priest}</div>}
                        {mass.description && <div className="text-sm text-gray-600 mt-1">{mass.description}</div>}
                        {mass.isModified && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            {mass.isCancelled ? "Cancelled" : "Modified"}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 ml-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditMass(mass)} className="h-8 w-8 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMass(mass)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {getMassesForDate(selectedDate).length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No masses scheduled</p>
                    <p className="text-sm">Click "Add Mass" to schedule one</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Select a date to view masses</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Mass Dialog */}
      <Dialog open={isEditingMass} onOpenChange={setIsEditingMass}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Mass</DialogTitle>
            <DialogDescription>
              {editingMass && `Editing mass on ${format(editingMass.date, "MMMM d, yyyy")} at ${currentChurch?.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time</Label>
                <Input
                  type="time"
                  value={massForm.time}
                  onChange={(e) => setMassForm({ ...massForm, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={massForm.type}
                  onValueChange={(value: "regular" | "special") => setMassForm({ ...massForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="special">Special</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={massForm.title}
                onChange={(e) => setMassForm({ ...massForm, title: e.target.value })}
                placeholder="e.g., Morning Mass, Family Mass"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={massForm.description}
                onChange={(e) => setMassForm({ ...massForm, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={massForm.language}
                  onValueChange={(value) => setMassForm({ ...massForm, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="Latin">Latin</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priest</Label>
                <Select value={massForm.priest} onValueChange={(value) => setMassForm({ ...massForm, priest: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priest" />
                  </SelectTrigger>
                  <SelectContent>
                    {getChurchPriests().map((priest) => (
                      <SelectItem key={priest} value={priest}>
                        {priest}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Other...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateMass} disabled={!massForm.time} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditingMass(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
