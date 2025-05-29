"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Users, Church, BookOpen, Files, Activity } from "lucide-react"

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Churches",
      value: "1,234",
      change: "+12%",
      icon: Church,
      color: "text-blue-600",
    },
    {
      title: "Church Admins",
      value: "456",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "End Users",
      value: "12,345",
      change: "+23%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Total Blogs",
      value: "789",
      change: "+15%",
      icon: BookOpen,
      color: "text-orange-600",
    },
    {
      title: "Files Uploaded",
      value: "2,345",
      change: "+18%",
      icon: Files,
      color: "text-red-600",
    },
    {
      title: "Active Events",
      value: "156",
      change: "+5%",
      icon: Activity,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your platform.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New church registered", church: "St. Mary's Cathedral", time: "2 hours ago" },
                { action: "Blog post published", church: "Sacred Heart Church", time: "4 hours ago" },
                { action: "Event created", church: "St. Joseph's Parish", time: "6 hours ago" },
                { action: "New admin approved", church: "Holy Trinity Church", time: "1 day ago" },
                { action: "Mass schedule updated", church: "Our Lady of Peace", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.church}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Approve Pending Churches</div>
              <div className="text-sm text-muted-foreground">5 churches awaiting approval</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Review New Admins</div>
              <div className="text-sm text-muted-foreground">3 admin applications</div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="font-medium">Moderate Content</div>
              <div className="text-sm text-muted-foreground">12 items need review</div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
