"use client"

import { useState, useEffect } from "react"
import { X, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface EventNotificationProps {
  id?: string
  title: string
  date: string
  description: string
  linkText?: string
  linkHref?: string
  className?: string
}

export function EventNotification({
  id = "event-notification",
  title,
  date,
  description,
  linkText = "Learn More",
  linkHref = "/events",
  className,
}: EventNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Check if this notification has been dismissed before
    const dismissedEvents = localStorage.getItem("dismissedEvents")
    const dismissed = dismissedEvents ? JSON.parse(dismissedEvents).includes(id) : false

    if (dismissed) {
      setIsVisible(false)
    } else {
      // Add entrance animation after a short delay
      const timer = setTimeout(() => {
        setHasAnimated(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [id])

  const handleDismiss = () => {
    setHasAnimated(false)

    // After exit animation completes, hide the notification
    setTimeout(() => {
      setIsVisible(false)

      // Save to localStorage
      const dismissedEvents = localStorage.getItem("dismissedEvents")
      const dismissed = dismissedEvents ? JSON.parse(dismissedEvents) : []
      localStorage.setItem("dismissedEvents", JSON.stringify([...dismissed, id]))
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 max-w-md w-full transform transition-all duration-300 ease-in-out",
        hasAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      <Card className="border border-purple-200 bg-purple-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-base text-purple-900">{title}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 rounded-full hover:bg-purple-100"
                  onClick={handleDismiss}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
              <p className="text-sm font-medium text-purple-700 mt-1">{date}</p>
              <p className="text-sm mt-1 text-purple-800">{description}</p>

              <div className="mt-3">
                <Link href={linkHref}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-purple-300 bg-purple-100 hover:bg-purple-200 text-purple-800"
                  >
                    {linkText}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
