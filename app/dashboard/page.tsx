"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Settings, Trash2, Eye } from "lucide-react"
import Link from "next/link"

const portfolios = [
  {
    id: 1,
    name: "My Portfolio",
    username: "johndoe",
    status: "published",
    views: 1234,
    lastUpdated: "2 days ago",
    template: "Modern",
    url: "/portfolio/johndoe",
  },
  {
    id: 2,
    name: "Creative Portfolio",
    username: "janedoe",
    status: "draft",
    views: 0,
    lastUpdated: "1 week ago",
    template: "Creative",
    url: "/portfolio/janedoe",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/70">Manage your portfolios and track their performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white mb-1">2</div>
              <div className="text-white/60 text-sm">Total Portfolios</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white mb-1">1,234</div>
              <div className="text-white/60 text-sm">Total Views</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white mb-1">1</div>
              <div className="text-white/60 text-sm">Published</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white mb-1">1</div>
              <div className="text-white/60 text-sm">Drafts</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolios Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Your Portfolios</h2>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
            asChild
          >
            <Link href="/generator">
              <Plus className="mr-2 h-4 w-4" />
              Create New
            </Link>
          </Button>
        </div>

        {/* Portfolios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Card
              key={portfolio.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all rounded-2xl"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{portfolio.name}</CardTitle>
                  <Badge
                    variant={portfolio.status === "published" ? "default" : "secondary"}
                    className={
                      portfolio.status === "published"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                    }
                  >
                    {portfolio.status}
                  </Badge>
                </div>
                <p className="text-white/60 text-sm">@{portfolio.username}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Template:</span>
                    <span className="text-white">{portfolio.template}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Views:</span>
                    <span className="text-white">{portfolio.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Updated:</span>
                    <span className="text-white">{portfolio.lastUpdated}</span>
                  </div>

                  <div className="flex gap-2 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                      asChild
                    >
                      <Link href={portfolio.url}>
                        <Eye className="mr-2 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 rounded-xl"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
