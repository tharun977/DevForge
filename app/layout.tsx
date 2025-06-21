import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "./components/navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevForge - AI-Powered Portfolio Generator",
  description: "Transform your GitHub profile into stunning portfolio websites in minutes",
  keywords: ["portfolio", "generator", "github", "developer", "nextjs", "ai"],
  authors: [{ name: "DevForge Team" }],
  creator: "DevForge",
  publisher: "DevForge",
  openGraph: {
    title: "DevForge - AI-Powered Portfolio Generator",
    description: "Transform your GitHub profile into stunning portfolio websites in minutes",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://devforge.vercel.app",
    siteName: "DevForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevForge - AI-Powered Portfolio Generator",
    description: "Transform your GitHub profile into stunning portfolio websites in minutes",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="devforge-theme"
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 light:from-slate-50 light:via-purple-50 light:to-slate-50">
            <div className="absolute inset-0 bg-[url('/grid.png')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <Navigation />
            <main className="relative">{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
