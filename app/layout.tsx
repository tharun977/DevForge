import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "./components/navigation"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevForge - AI-Powered Portfolio Generator",
  description:
    "Transform your GitHub profile into stunning portfolio websites with AI-powered design and README parsing.",
  keywords: "portfolio, generator, github, developer, nextjs, ai, readme",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-black text-white">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
