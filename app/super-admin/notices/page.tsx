"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Eye, EyeOff, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"

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
}

export default function NoticesPage() {
  const { toast } = useToast()
  const [notices, setNotices] = useState<Notice[]>([
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
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as const,
    priority: "medium" as const,
    startDate: "",
    endDate: "",
    isDismissible: true,
    authority: "",
  })

  const handleSubmit = () => {
    if (editingNotice) {
      // Update existing notice
      setNotices(
        notices.map((notice) =>
          notice.id === editingNotice.id
            ? { ...notice, ...formData, id: editingNotice.id, isActive: true, createdAt: editingNotice.createdAt }
            : notice,
        ),
      )
      toast({
        title: "Notice Updated",
        description: "The notice has been successfully updated.",
      })
    } else {
      // Create new notice
      const newNotice: Notice = {
        ...formData,
        id: Date.now().toString(),
        isActive: true,
        createdAt: new Date().toISOString(),
      }
      setNotices([...notices, newNotice])
      toast({
        title: "Notice Created",
        description: "The notice has been successfully created.",
      })
    }

    setIsDialogOpen(false)
    setEditingNotice(null)
    setFormData({
      title: "",
      message: "",
      type: "info",
      priority: "medium",
      startDate: "",
      endDate: "",
      isDismissible: true,
      authority: "",
    })
  }

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      message: notice.message,
      type: notice.type,
      priority: notice.priority,
      startDate: notice.startDate,
      endDate: notice.endDate,
      isDismissible: notice.isDismissible,
      authority: notice.authority,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setNotices(notices.filter((notice) => notice.id !== id))
    toast({
      title: "Notice Deleted",
      description: "The notice has been successfully deleted.",
    })
  }

  const toggleActive = (id: string) => {
    setNotices(notices.map((notice) => (notice.id === id ? { ...notice, isActive: !notice.isActive } : notice)))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: "secondary",
      medium: "outline",
      high: "default",
      urgent: "destructive",
    } as const

    return <Badge variant={variants[priority as keyof typeof variants]}>{priority.toUpperCase()}</Badge>
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Notice Management</h2>
            <p className="text-muted-foreground">Create and manage notices for all portal users</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingNotice ? "Edit Notice" : "Create New Notice"}</DialogTitle>
              <DialogDescription>
                {editingNotice
                  ? "Update the notice details below."
                  : "Create a new notice to display to all portal users."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter notice title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter notice message"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="authority">Authority</Label>
                <Input
                  id="authority"
                  value={formData.authority}
                  onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
                  placeholder="e.g., Archbishop Michael Thompson"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="dismissible"
                  checked={formData.isDismissible}
                  onCheckedChange={(checked) => setFormData({ ...formData, isDismissible: checked })}
                />
                <Label htmlFor="dismissible">Allow users to dismiss this notice</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                {editingNotice ? "Update Notice" : "Create Notice"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
          <CardDescription>Manage all notices displayed to portal users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Authority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notices.map((notice) => (
                <TableRow key={notice.id}>
                  <TableCell className="font-medium">{notice.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(notice.type)}
                      <span className="capitalize">{notice.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(notice.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleActive(notice.id)}>
                        {notice.isActive ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <span className={notice.isActive ? "text-green-600" : "text-gray-400"}>
                        {notice.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(notice.startDate).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">to {new Date(notice.endDate).toLocaleDateString()}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{notice.authority}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(notice)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(notice.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
