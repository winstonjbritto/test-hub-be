"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NotificationProps {
  id?: string
  title: string
  message: string
  type?: "info" | "warning" | "success" | "error"
  dismissible?: boolean
  className?: string
}

export function LandingNotification({
  id = "landing-notification",
  title = "Welcome to Catholic Church Portal",
  message = "Find masses, events, and connect with your local parish community.",
  type = "info",
  dismissible = true,
  className,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Check if this notification has been dismissed before
    const dismissedNotifications = localStorage.getItem("dismissedNotifications")
    const dismissed = dismissedNotifications ? JSON.parse(dismissedNotifications).includes(id) : false

    if (dismissed) {
      setIsVisible(false)
    } else {
      // Add entrance animation after a short delay
      const timer = setTimeout(() => {
        setHasAnimated(true)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [id])

  const handleDismiss = () => {
    setHasAnimated(false)

    // After exit animation completes, hide the notification
    setTimeout(() => {
      setIsVisible(false)

      // Save to localStorage
      const dismissedNotifications = localStorage.getItem("dismissedNotifications")
      const dismissed = dismissedNotifications ? JSON.parse(dismissedNotifications) : []
      localStorage.setItem("dismissedNotifications", JSON.stringify([...dismissed, id]))
    }, 300)
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out",
        hasAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      <Card className={cn("border shadow-lg", getStyles())}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">{getIcon()}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-base">{title}</h4>
                {dismissible && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 rounded-full hover:bg-black/10"
                    onClick={handleDismiss}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                )}
              </div>
              <p className="text-sm mt-1">{message}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
