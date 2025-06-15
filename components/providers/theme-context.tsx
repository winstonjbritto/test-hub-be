"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemeSettings = {
  primaryColor: string
  accentColor: string
  darkMode: boolean
  colorScheme: string
  borderRadius: string
  fontFamily: string
  compactMode: boolean
}

const defaultThemeSettings: ThemeSettings = {
  primaryColor: "purple",
  accentColor: "blue",
  darkMode: false,
  colorScheme: "default",
  borderRadius: "medium",
  fontFamily: "inter",
  compactMode: false,
}

type ThemeContextType = {
  themeSettings: ThemeSettings
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void
  resetThemeSettings: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme()
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultThemeSettings)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load theme settings from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem("themeSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setThemeSettings(parsedSettings)

        // Apply dark mode setting
        if (parsedSettings.darkMode) {
          setTheme("dark")
        } else {
          setTheme("light")
        }
      } catch (error) {
        console.error("Failed to parse theme settings:", error)
      }
    }
    setIsInitialized(true)
  }, [setTheme])

  // Apply theme settings to CSS variables
  useEffect(() => {
    if (!isInitialized) return

    // Save settings to localStorage
    localStorage.setItem("themeSettings", JSON.stringify(themeSettings))

    // Apply dark mode
    if (themeSettings.darkMode) {
      setTheme("dark")
    } else {
      setTheme("light")
    }

    // Apply CSS variables for colors
    const root = document.documentElement

    // Apply border radius
    const radiusValues = {
      none: "0",
      small: "0.25rem",
      medium: "0.5rem",
      large: "0.75rem",
      xl: "1rem",
    }
    root.style.setProperty(
      "--radius",
      radiusValues[themeSettings.borderRadius as keyof typeof radiusValues] || "0.5rem",
    )

    // Apply font family
    const fontValues = {
      inter: "Inter, sans-serif",
      roboto: "Roboto, sans-serif",
      opensans: "'Open Sans', sans-serif",
      lato: "Lato, sans-serif",
      poppins: "Poppins, sans-serif",
    }
    root.style.setProperty(
      "--font-family",
      fontValues[themeSettings.fontFamily as keyof typeof fontValues] || "Inter, sans-serif",
    )

    // Apply compact mode
    if (themeSettings.compactMode) {
      document.body.classList.add("compact-mode")
    } else {
      document.body.classList.remove("compact-mode")
    }

    // Apply primary color
    const primaryColorMap: Record<string, string> = {
      purple: "var(--purple-600)",
      blue: "hsl(221, 83%, 53%)",
      green: "hsl(142, 71%, 45%)",
      red: "hsl(0, 84%, 60%)",
      orange: "hsl(24, 94%, 50%)",
      teal: "hsl(168, 76%, 42%)",
      indigo: "hsl(231, 48%, 48%)",
      pink: "hsl(330, 81%, 60%)",
    }

    const accentColorMap: Record<string, string> = {
      purple: "var(--purple-200)",
      blue: "hsl(213, 94%, 89%)",
      green: "hsl(142, 77%, 89%)",
      red: "hsl(0, 94%, 89%)",
      orange: "hsl(24, 94%, 89%)",
      teal: "hsl(168, 76%, 89%)",
      indigo: "hsl(231, 48%, 89%)",
      pink: "hsl(330, 81%, 89%)",
    }

    // Apply color scheme adjustments
    switch (themeSettings.colorScheme) {
      case "vibrant":
        // Increase saturation for vibrant mode
        break
      case "muted":
        // Decrease saturation for muted mode
        break
      case "monochrome":
        // Use grayscale for monochrome mode
        break
      default:
        // Default color scheme
        break
    }

    // Update CSS variables for theme colors
    document.documentElement.style.setProperty(
      "--theme-primary",
      primaryColorMap[themeSettings.primaryColor] || "var(--purple-600)",
    )
    document.documentElement.style.setProperty(
      "--theme-accent",
      accentColorMap[themeSettings.accentColor] || "var(--purple-200)",
    )
  }, [themeSettings, isInitialized, setTheme])

  const updateThemeSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...settings }))
  }

  const resetThemeSettings = () => {
    setThemeSettings(defaultThemeSettings)
  }

  return (
    <ThemeContext.Provider value={{ themeSettings, updateThemeSettings, resetThemeSettings }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}
