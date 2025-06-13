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
  UserCheck,
  Church,
  BookOpen,
  Files,
  Settings,
  Bell,
  ChevronUp,
  User2,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"

const menuItems = [
  {
    title: "Dashboard",
    url: "/super-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/super-admin/profile",
    icon: User2,
  },
  {
    title: "Church Admins",
    url: "/super-admin/church-admins",
    icon: UserCheck,
  },
  {
    title: "Users",
    url: "/super-admin/users",
    icon: Users,
  },
  {
    title: "Churches",
    url: "/super-admin/churches",
    icon: Church,
  },
  {
    title: "Blogs",
    url: "/super-admin/blogs",
    icon: BookOpen,
  },
  {
    title: "Notices",
    url: "/super-admin/notices",
    icon: Bell,
  },
  {
    title: "Files",
    url: "/super-admin/files",
    icon: Files,
  },
  {
    title: "Settings",
    url: "/super-admin/settings",
    icon: Settings,
  },
]

export function SuperAdminSidebar() {
  const { user, logout } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Church className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="font-bold text-lg">Catholic Portal</h2>
            <p className="text-sm text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="w-4 h-4" />
                  <span>{user?.name}</span>
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
