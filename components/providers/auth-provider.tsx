"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "super_admin" | "church_admin" | "end_user"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  churchId?: string
  isActive: boolean
  isApproved: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Mock authentication - replace with actual API call
    const mockUsers: User[] = [
      {
        id: "1",
        email: "superadmin@church.com",
        name: "Super Admin",
        role: "super_admin",
        isActive: true,
        isApproved: true,
      },
      {
        id: "2",
        email: "admin@stmarys.com",
        name: "Church Admin",
        role: "church_admin",
        churchId: "church1",
        isActive: true,
        isApproved: true,
      },
      {
        id: "3",
        email: "user@example.com",
        name: "End User",
        role: "end_user",
        isActive: true,
        isApproved: true,
      },
    ]

    const foundUser = mockUsers.find((u) => u.email === email && password === "password")

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
