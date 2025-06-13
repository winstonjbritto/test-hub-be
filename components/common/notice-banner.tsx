"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Info, CheckCircle, XCircle, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface Notice {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  priority: "low" | "medium" | "high" | "urgent"
  startDate: string
  endDate: string
  isActive: boolean
  isDismissible: boolean
  authority: string
  createdAt: string
  targetAudience: "all" | "church_admin" | "super_admin" | "regular_user"
  displayLocation: "global" | "dashboard" | "churches" | "events" | "blogs"
}

export function NoticeBanner() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [dismissedNotices, setDismissedNotices] = useState<string[]>([])

  useEffect(() => {
    // Load dismissed notices from localStorage
    const dismissed = localStorage.getItem("dismissedNotices")
    if (dismissed) {
      setDismissedNotices(JSON.parse(dismissed))
    }

    // Mock notices data - replace with actual API call
    const mockNotices: Notice[] = [
      {
        id: "1",
        title: "Christmas Mass Schedule",
        message:
          "Special Christmas Mass services will be held on December 24th and 25th. Please check your local church for specific times.",
        type: "info",
        priority: "high",
        startDate: "2024-12-20",
        endDate: "2024-12-26",
        isActive: true,
        isDismissible: true,
        authority: "Archbishop Michael Thompson",
        createdAt: "2024-12-20T10:00:00Z",
        targetAudience: "all",
        displayLocation: "global",
      },
      {
        id: "2",
        title: "Emergency Weather Alert",
        message:
          "Due to severe weather conditions, all evening services for December 22nd have been cancelled. Please stay safe.",
        type: "warning",
        priority: "urgent",
        startDate: "2024-12-22",
        endDate: "2024-12-23",
        isActive: true,
        isDismissible: false,
        authority: "Diocese Emergency Committee",
        createdAt: "2024-12-22T08:00:00Z",
        targetAudience: "all",
        displayLocation: "global",
      },
      {
        id: "3",
        title: "System Maintenance",
        message:
          "The portal will be undergoing maintenance on June 5th from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.",
        type: "info",
        priority: "medium",
        startDate: "2024-06-03",
        endDate: "2024-06-05",
        isActive: true,
        isDismissible: true,
        authority: "System Administrator",
        createdAt: "2024-06-01T10:00:00Z",
        targetAudience: "all",
        displayLocation: "global",
      },
      {
        id: "4",
        title: "New Feature: Mass Schedule Calendar",
        message:
          "We've added a new calendar view for mass schedules. Church admins can now manage recurring masses more easily.",
        type: "success",
        priority: "medium",
        startDate: "2024-05-28",
        endDate: "2024-06-11",
        isActive: true,
        isDismissible: true,
        authority: "Portal Development Team",
        createdAt: "2024-05-28T09:00:00Z",
        targetAudience: "church_admin",
        displayLocation: "dashboard",
      },
    ]

    setNotices(mockNotices)
  }, [])

  const getActiveNotices = (location = "global") => {
    const now = new Date()
    return notices.filter((notice) => {
      const startDate = new Date(notice.startDate)
      const endDate = new Date(notice.endDate)
      return (
        notice.isActive &&
        now >= startDate &&
        now <= endDate &&
        !dismissedNotices.includes(notice.id) &&
        (notice.displayLocation === "global" || notice.displayLocation === location)
      )
    })
  }

  const dismissNotice = (noticeId: string) => {
    const newDismissed = [...dismissedNotices, noticeId]
    setDismissedNotices(newDismissed)
    localStorage.setItem("dismissedNotices", JSON.stringify(newDismissed))
  }

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <XCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getNoticeStyles = (type: string, priority: string) => {
    let baseStyles = "border-l-4 "

    // Type-based colors
    switch (type) {
      case "warning":
        baseStyles += "border-yellow-500 bg-yellow-50 text-yellow-800 "
        break
      case "success":
        baseStyles += "border-green-500 bg-green-50 text-green-800 "
        break
      case "error":
        baseStyles += "border-red-500 bg-red-50 text-red-800 "
        break
      default:
        baseStyles += "border-blue-500 bg-blue-50 text-blue-800 "
    }

    // Priority-based additional styles
    if (priority === "urgent") {
      baseStyles += "animate-pulse shadow-lg "
    }

    return baseStyles
  }

  const activeNotices = getActiveNotices()

  if (activeNotices.length === 0) {
    return null
  }

  return (
    <div className="w-full">
      {activeNotices.map((notice) => (
        <Alert key={notice.id} className={getNoticeStyles(notice.type, notice.priority)}>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getNoticeIcon(notice.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-sm">{notice.title}</h4>
                  {notice.priority === "urgent" && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <Bell className="w-3 h-3 mr-1" />
                      URGENT
                    </span>
                  )}
                </div>
                <AlertDescription className="text-sm">{notice.message}</AlertDescription>
                <div className="mt-2 text-xs opacity-75">— {notice.authority}</div>
              </div>
            </div>
            {notice.isDismissible && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10"
                onClick={() => dismissNotice(notice.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Dismiss notice</span>
              </Button>
            )}
          </div>
        </Alert>
      ))}
    </div>
  )
}
