"use client"

import { useState, useEffect } from "react"
import { Bell, Check, AlertTriangle, Info, CheckCircle, XCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

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
  isRead: boolean
}

export function NoticeCenter() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
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
        isRead: false,
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
        isRead: true,
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
        isRead: false,
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
        isRead: false,
      },
      {
        id: "5",
        title: "Profile Pages Added",
        message:
          "We've added comprehensive profile pages for all user roles. Update your profile information to enhance your experience.",
        type: "success",
        priority: "low",
        startDate: "2024-05-29",
        endDate: "2024-06-12",
        isActive: true,
        isDismissible: true,
        authority: "Portal Development Team",
        createdAt: "2024-05-29T14:30:00Z",
        targetAudience: "all",
        displayLocation: "global",
        isRead: false,
      },
    ]

    setNotices(mockNotices)

    // Calculate unread count
    const unread = mockNotices.filter((notice) => !notice.isRead).length
    setUnreadCount(unread)
  }, [])

  const markAsRead = (noticeId: string) => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) => (notice.id === noticeId ? { ...notice, isRead: true } : notice)),
    )

    // Recalculate unread count
    setUnreadCount((prevCount) => Math.max(0, prevCount - 1))
  }

  const markAllAsRead = () => {
    setNotices((prevNotices) => prevNotices.map((notice) => ({ ...notice, isRead: true })))
    setUnreadCount(0)
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

  const getNoticeTypeColor = (type: string) => {
    switch (type) {
      case "warning":
        return "text-yellow-500"
      case "success":
        return "text-green-500"
      case "error":
        return "text-red-500"
      default:
        return "text-blue-500"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return (
          <Badge variant="outline" className="border-red-200 bg-red-100 text-red-800">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-200 bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-200 bg-gray-100 text-gray-800">
            Low
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="border-b bg-muted/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notifications</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <Check className="mr-1 h-3 w-3" />
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full rounded-none border-b bg-transparent">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="flex-1 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
                >
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="max-h-[350px] overflow-y-auto">
                {notices.length > 0 ? (
                  <div className="divide-y">
                    {notices.map((notice) => (
                      <div
                        key={notice.id}
                        className={cn(
                          "p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                          !notice.isRead && "bg-blue-50",
                        )}
                        onClick={() => markAsRead(notice.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn("mt-0.5", getNoticeTypeColor(notice.type))}>
                            {getNoticeIcon(notice.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className={cn("text-sm font-medium", !notice.isRead && "font-semibold")}>
                                {notice.title}
                              </p>
                              <span className="text-xs text-muted-foreground">{formatDate(notice.createdAt)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{notice.message}</p>
                            <div className="flex items-center justify-between pt-1">
                              <div className="text-xs text-muted-foreground">{notice.authority}</div>
                              {getPriorityBadge(notice.priority)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
                    <p className="text-sm font-medium">No notifications</p>
                    <p className="text-xs text-muted-foreground">You're all caught up!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="unread" className="max-h-[350px] overflow-y-auto">
                {notices.filter((n) => !n.isRead).length > 0 ? (
                  <div className="divide-y">
                    {notices
                      .filter((n) => !n.isRead)
                      .map((notice) => (
                        <div
                          key={notice.id}
                          className="p-4 bg-blue-50 hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => markAsRead(notice.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={cn("mt-0.5", getNoticeTypeColor(notice.type))}>
                              {getNoticeIcon(notice.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold">{notice.title}</p>
                                <span className="text-xs text-muted-foreground">{formatDate(notice.createdAt)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">{notice.message}</p>
                              <div className="flex items-center justify-between pt-1">
                                <div className="text-xs text-muted-foreground">{notice.authority}</div>
                                {getPriorityBadge(notice.priority)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-10 w-10 text-green-500/50 mb-2" />
                    <p className="text-sm font-medium">All caught up!</p>
                    <p className="text-xs text-muted-foreground">No unread notifications</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="border-t p-2">
              <Button variant="ghost" size="sm" className="w-full justify-center text-xs text-muted-foreground" asChild>
                <a href="/notifications">
                  View all notifications
                  <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
