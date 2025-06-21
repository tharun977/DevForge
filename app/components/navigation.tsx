"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FolderGitIcon, ChevronDown, Github, Sun, Moon, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 m-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <FolderGitIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DevForge
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl">
                    Resources <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/80 backdrop-blur-md border-white/20 rounded-xl">
                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                    <Link href="/templates">Templates</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                    <Link href="/examples">Examples</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
                    <Link href="/docs">Documentation</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-all px-4 py-2 rounded-xl ${
                  pathname === "/dashboard"
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Dashboard
              </Link>

              <Link
                href="/generator"
                className={`text-sm font-medium transition-all px-4 py-2 rounded-xl ${
                  pathname === "/generator"
                    ? "text-white bg-white/20"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                AI Playground
              </Link>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                asChild
              >
                <Link href="https://github.com" target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>

              <Avatar className="h-8 w-8 ring-2 ring-white/20">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                  U
                </AvatarFallback>
              </Avatar>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/dashboard"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/generator"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Playground
                </Link>
                <Link
                  href="/templates"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Templates
                </Link>
                <Link
                  href="/examples"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Examples
                </Link>
                <Link
                  href="/docs"
                  className="text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
