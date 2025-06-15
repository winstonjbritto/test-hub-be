"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { ThemeContextProvider } from "./theme-context"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeContextProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </ThemeContextProvider>
  )
}
