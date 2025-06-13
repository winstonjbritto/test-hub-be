"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Users,
  Church,
  BookOpen,
  Files,
  Calendar,
  Settings,
  ChevronUp,
  User2,
  LogOut,
  ImageIcon,
  Building2,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"

const menuItems = [
  {
    title: "Dashboard",
    url: "/church-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/church-admin/profile",
    icon: User2,
  },
  {
    title: "My Churches",
    url: "/church-admin/churches",
    icon: Building2,
  },
  {
    title: "Mass Schedule",
    url: "/church-admin/mass-schedule",
    icon: CalendarDays,
  },
  {
    title: "Users",
    url: "/church-admin/users",
    icon: Users,
  },
  {
    title: "Events",
    url: "/church-admin/events",
    icon: Calendar,
  },
  {
    title: "Blogs",
    url: "/church-admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Media Gallery",
    url: "/church-admin/media",
    icon: ImageIcon,
  },
  {
    title: "Documents",
    url: "/church-admin/documents",
    icon: Files,
  },
  {
    title: "Settings",
    url: "/church-admin/settings",
    icon: Settings,
  },
]

export function ChurchAdminSidebar() {
  const { user, logout } = useAuth()

  return (
    <Sidebar className="border-r border-purple-200 bg-gradient-to-b from-purple-50 to-white">
      <SidebarHeader className="border-b border-purple-200 bg-white/50">
        <div className="flex items-center gap-2 px-2 py-2">
          <Church className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="font-bold text-lg text-purple-900">Catholic Portal</h2>
            <p className="text-sm text-purple-600">Church Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-700">Church Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-purple-100 hover:text-purple-900">
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-purple-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-purple-100">
                  <div className="flex items-center gap-2">
                    <img src={user?.avatar || "/placeholder.svg"} alt={user?.name} className="w-6 h-6 rounded-full" />
                    <span className="truncate">{user?.name}</span>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <User2 className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
