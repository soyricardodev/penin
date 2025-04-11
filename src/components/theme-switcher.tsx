"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Sun, Moon, Waves, Leaf, Flower2, Check } from "lucide-react"
import { Theme, useTheme } from "@/components/theme-provider"

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [open, setOpen] = useState(false)

  const themes: { name: string, value: Theme, icon: React.ReactNode, color: string }[] = [
    { name: "Claro", value: "light", icon: <Sun className="h-4 w-4" />, color: "#3b82f6" },
    { name: "Oscuro", value: "dark", icon: <Moon className="h-4 w-4" />, color: "#60a5fa" },
    { name: "Atardecer", value: "theme-sunset", icon: <Sun className="h-4 w-4" />, color: "#f97316" },
    { name: "Océano", value: "theme-ocean", icon: <Waves className="h-4 w-4" />, color: "#0ea5e9" },
    { name: "Bosque", value: "theme-forest", icon: <Leaf className="h-4 w-4" />, color: "#22c55e" },
    { name: "Lavanda", value: "theme-lavender", icon: <Flower2 className="h-4 w-4" />, color: "#a855f7" },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-lg">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => {
              setTheme(themeOption.value)
              setOpen(false)
            }}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themeOption.color }}></div>
                {themeOption.icon}
                <span>{themeOption.name}</span>
              </div>
              {theme === themeOption.value && <Check className="h-4 w-4 ml-auto" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
