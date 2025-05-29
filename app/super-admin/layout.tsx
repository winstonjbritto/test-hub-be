"use client"

import type React from "react"

import { useAuth } from "@/components/providers/auth-provider"
import { SuperAdminSidebar } from "@/components/super-admin/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "super_admin")) {
      redirect("/auth/signin")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "super_admin") {
    return null
  }

  return (
    <SidebarProvider>
      <SuperAdminSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
