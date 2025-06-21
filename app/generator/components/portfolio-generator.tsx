"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Github, ExternalLink, Star, GitFork, Download, Sparkles, Zap, Eye, Code } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  location: string
  company: string
  blog: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  homepage: string
}

export function PortfolioGenerator() {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

  const generatePortfolio = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username")
      return
    }

    setLoading(true)
    setError("")
    setProgress(0)
    setGenerationStep("Fetching GitHub data...")

    try {
      // Simulate progress steps
      const steps = [
        "Fetching GitHub profile...",
        "Analyzing repositories...",
        "Parsing README files...",
        "Generating AI design...",
        "Building portfolio...",
      ]

      for (let i = 0; i < steps.length; i++) {
        setGenerationStep(steps[i])
        setProgress((i + 1) * 20)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      const response = await fetch(`/api/github/${username}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch GitHub data")
      }

      setUserData(data.user)
      setRepos(data.repos)
      setProgress(100)
      setGenerationStep("Portfolio generated successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setProgress(0)
      setGenerationStep("")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Generate Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Enter GitHub username (e.g., octocat)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              onKeyPress={(e) => e.key === "Enter" && generatePortfolio()}
            />
            <Button onClick={generatePortfolio} disabled={loading} className="bg-blue-600 hover:bg-blue-700 px-8">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{generationStep}</span>
                <span className="text-blue-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Portfolio Preview */}
      {userData && (
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="preview" className="data-[state=active]:bg-gray-800">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="data-[state=active]:bg-gray-800">
              <Code className="mr-2 h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-8">
            {/* User Profile Section */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <Avatar className="w-32 h-32 border-4 border-gray-700">
                    <AvatarImage src={userData.avatar_url || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback className="text-2xl bg-gray-800">
                      {userData.name?.charAt(0) || userData.login.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">{userData.name || userData.login}</h2>
                    {userData.bio && <p className="text-gray-400 mb-4 text-lg">{userData.bio}</p>}

                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{userData.public_repos}</div>
                        <div className="text-gray-400 text-sm">Repositories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{userData.followers}</div>
                        <div className="text-gray-400 text-sm">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{userData.following}</div>
                        <div className="text-gray-400 text-sm">Following</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {userData.location && (
                        <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                          📍 {userData.location}
                        </Badge>
                      )}
                      {userData.company && (
                        <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                          🏢 {userData.company}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => window.open(userData.html_url, "_blank")}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20">
                  {repos.length} repositories analyzed
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.slice(0, 6).map((repo) => (
                  <Card
                    key={repo.id}
                    className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white truncate group-hover:text-blue-400 transition-colors">
                          {repo.name}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => window.open(repo.html_url, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {repo.description || "No description available"}
                      </p>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Star className="w-4 h-4" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <GitFork className="w-4 h-4" />
                          {repo.forks_count}
                        </div>
                        {repo.language && (
                          <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 text-xs">
                            {repo.language}
                          </Badge>
                        )}
                      </div>

                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {repo.topics.slice(0, 3).map((topic) => (
                            <Badge
                              key={topic}
                              variant="outline"
                              className="text-xs bg-gray-800 border-gray-700 text-gray-300"
                            >
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Export Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Download ZIP
                  </Button>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 h-20 flex-col">
                    <Github className="h-6 w-6 mb-2" />
                    Deploy to Vercel
                  </Button>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 h-20 flex-col">
                    <ExternalLink className="h-6 w-6 mb-2" />
                    View Live Site
                  </Button>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Live Preview URL:</p>
                  <code className="text-blue-400 text-sm">https://devforge.vercel.app/portfolio/{userData.login}</code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
