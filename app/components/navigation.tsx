"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, ChevronDown, Github, Sun, Moon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">DevForge</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-700">
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link href="/templates">Templates</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link href="/examples">Examples</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <Link href="/docs">Documentation</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                pathname === "/dashboard" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/generator"
              className={`text-sm font-medium transition-colors ${
                pathname === "/generator" ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              AI Playground
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-300 hover:text-white"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Github className="h-4 w-4" />
            </Button>

            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-gray-700 text-white text-sm">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  )
}
