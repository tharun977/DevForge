"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Zap, Settings, Palette, Globe } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Learn the basics of creating your first portfolio with DevForge",
    articles: ["Quick Start Guide", "Setting up your GitHub", "Choosing a Template", "Basic Configuration"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Code,
    title: "Customization",
    description: "Advanced customization options and code modifications",
    articles: ["Custom CSS Styling", "Adding Components", "JavaScript Integration", "Third-party Libraries"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "AI Features",
    description: "Leverage AI-powered features for better portfolios",
    articles: ["AI Design Suggestions", "Content Generation", "README Parsing", "Auto-optimization"],
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Configure your portfolio settings and preferences",
    articles: ["Environment Variables", "SEO Settings", "Analytics Setup", "Performance Tuning"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Themes & Design",
    description: "Create and customize themes for your portfolio",
    articles: ["Theme Structure", "Color Schemes", "Typography", "Responsive Design"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Deployment",
    description: "Deploy your portfolio to various hosting platforms",
    articles: ["Vercel Deployment", "Netlify Setup", "Custom Domain", "SSL Configuration"],
    color: "from-teal-500 to-blue-500",
  },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to know about creating, customizing, and deploying your portfolio with DevForge
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl justify-start h-auto p-4"
              asChild
            >
              <Link href="/docs/quick-start">
                <div>
                  <div className="font-semibold">Quick Start</div>
                  <div className="text-sm text-white/60">Get up and running in 5 minutes</div>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl justify-start h-auto p-4"
              asChild
            >
              <Link href="/docs/api">
                <div>
                  <div className="font-semibold">API Reference</div>
                  <div className="text-sm text-white/60">Complete API documentation</div>
                </div>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl justify-start h-auto p-4"
              asChild
            >
              <Link href="/docs/examples">
                <div>
                  <div className="font-semibold">Code Examples</div>
                  <div className="text-sm text-white/60">Ready-to-use code snippets</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 rounded-2xl"
            >
              <CardHeader className="pb-4">
                <div className={`p-3 bg-gradient-to-r ${section.color} rounded-xl w-fit mb-4`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{section.title}</CardTitle>
                <p className="text-white/60 text-sm">{section.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {section.articles.map((article, articleIndex) => (
                    <Button
                      key={articleIndex}
                      variant="ghost"
                      className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                      asChild
                    >
                      <Link
                        href={`/docs/${section.title.toLowerCase().replace(/\s+/g, "-")}/${article.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {article}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Join our community or contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium"
                asChild
              >
                <Link href="https://discord.gg/devforge" target="_blank">
                  Join Discord Community
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-medium"
                asChild
              >
                <Link href="mailto:support@devforge.com">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
