import type { Metadata } from "next"
import { CommonHeader } from "@/components/common/header"
import { CommonFooter } from "@/components/common/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Notifications | Catholic Church Portal",
  description: "View all your notifications and announcements",
}

export default function NotificationsPage() {
  // This would be fetched from an API in a real application
  const notices = [
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
    {
      id: "6",
      title: "Lenten Services Schedule",
      message:
        "Special Lenten services will be held every Friday during Lent. Check your local church for specific times and details.",
      type: "info",
      priority: "medium",
      startDate: "2024-02-14",
      endDate: "2024-03-29",
      isActive: true,
      isDismissible: true,
      authority: "Diocese Liturgical Committee",
      createdAt: "2024-02-10T12:00:00Z",
      targetAudience: "all",
      displayLocation: "global",
      isRead: true,
    },
    {
      id: "7",
      title: "Volunteer Opportunity: Youth Ministry",
      message:
        "We're looking for volunteers to help with our youth ministry programs. If you're interested, please contact your local parish office.",
      type: "info",
      priority: "low",
      startDate: "2024-05-15",
      endDate: "2024-06-15",
      isActive: true,
      isDismissible: true,
      authority: "Diocesan Youth Ministry",
      createdAt: "2024-05-15T09:30:00Z",
      targetAudience: "all",
      displayLocation: "global",
      isRead: true,
    },
    {
      id: "8",
      title: "New Blog Feature Released",
      message:
        "We've added a new blog feature to the portal. Church admins can now publish articles and updates for their community.",
      type: "success",
      priority: "medium",
      startDate: "2024-04-10",
      endDate: "2024-04-24",
      isActive: true,
      isDismissible: true,
      authority: "Portal Development Team",
      createdAt: "2024-04-10T11:15:00Z",
      targetAudience: "all",
      displayLocation: "global",
      isRead: true,
    },
  ]

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <XCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
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
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = notices.filter((n) => !n.isRead).length

  return (
    <>
      <CommonHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">View and manage all your notifications and announcements</p>
        </div>

        <Card>
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>
                  You have {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-3"
                >
                  All Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-3"
                >
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger
                  value="announcements"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-3"
                >
                  Announcements
                </TabsTrigger>
                <TabsTrigger
                  value="alerts"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 py-3"
                >
                  Alerts
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="divide-y">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-6 hover:bg-muted/30 transition-colors ${!notice.isRead ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 ${getNoticeTypeColor(notice.type)}`}>{getNoticeIcon(notice.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className={`text-lg ${!notice.isRead ? "font-semibold" : "font-medium"}`}>
                              {notice.title}
                            </h3>
                            {getPriorityBadge(notice.priority)}
                          </div>
                          <p className="text-muted-foreground mb-3">{notice.message}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              From: <span className="font-medium">{notice.authority}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{formatDate(notice.createdAt)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread">
                <div className="divide-y">
                  {notices.filter((n) => !n.isRead).length > 0 ? (
                    notices
                      .filter((n) => !n.isRead)
                      .map((notice) => (
                        <div key={notice.id} className="p-6 bg-blue-50 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className={`mt-1 ${getNoticeTypeColor(notice.type)}`}>
                              {getNoticeIcon(notice.type)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-1">
                                <h3 className="text-lg font-semibold">{notice.title}</h3>
                                {getPriorityBadge(notice.priority)}
                              </div>
                              <p className="text-muted-foreground mb-3">{notice.message}</p>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                  From: <span className="font-medium">{notice.authority}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{formatDate(notice.createdAt)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500/50 mb-4" />
                      <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                      <p className="text-muted-foreground">You have no unread notifications</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="announcements">
                <div className="divide-y">
                  {notices
                    .filter((n) => n.type === "info" || n.type === "success")
                    .map((notice) => (
                      <div
                        key={notice.id}
                        className={`p-6 hover:bg-muted/30 transition-colors ${!notice.isRead ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${getNoticeTypeColor(notice.type)}`}>{getNoticeIcon(notice.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className={`text-lg ${!notice.isRead ? "font-semibold" : "font-medium"}`}>
                                {notice.title}
                              </h3>
                              {getPriorityBadge(notice.priority)}
                            </div>
                            <p className="text-muted-foreground mb-3">{notice.message}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                From: <span className="font-medium">{notice.authority}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(notice.createdAt)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts">
                <div className="divide-y">
                  {notices
                    .filter((n) => n.type === "warning" || n.type === "error")
                    .map((notice) => (
                      <div
                        key={notice.id}
                        className={`p-6 hover:bg-muted/30 transition-colors ${!notice.isRead ? "bg-blue-50" : ""}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 ${getNoticeTypeColor(notice.type)}`}>{getNoticeIcon(notice.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className={`text-lg ${!notice.isRead ? "font-semibold" : "font-medium"}`}>
                                {notice.title}
                              </h3>
                              {getPriorityBadge(notice.priority)}
                            </div>
                            <p className="text-muted-foreground mb-3">{notice.message}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                From: <span className="font-medium">{notice.authority}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">{formatDate(notice.createdAt)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <CommonFooter />
    </>
  )
}
