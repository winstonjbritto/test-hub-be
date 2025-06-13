"use client"

import type React from "react"
import { useAuth } from "@/components/providers/auth-provider"
import { ChurchAdminSidebar } from "@/components/church-admin/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ChurchAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "church_admin")) {
      redirect("/auth/signin")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "church_admin") {
    return null
  }

  return (
    <SidebarProvider>
      <ChurchAdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
