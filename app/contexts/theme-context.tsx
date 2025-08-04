"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type ThemeType = "light" | "dark" | "blue" | "purple" | "green"

type ThemeContextType = {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>("light")

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem("gia-theme") as ThemeType
    if (savedTheme && ["light", "dark", "blue", "purple", "green"].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("gia-theme", theme)

    // Apply theme class to document
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-blue", "theme-purple", "theme-green")
    document.documentElement.classList.add(`theme-${theme}`)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
