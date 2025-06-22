"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Download,
  Sparkles,
  Zap,
  Eye,
  Code,
  CheckCircle,
  AlertCircle,
  Loader2,
  Key,
  Lock,
  Unlock,
} from "lucide-react"
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
  email: string
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

interface GenerationResult {
  success: boolean
  user: GitHubUser
  repos: GitHubRepo[]
  files: Array<{ path: string; size: number }>
  repository?: {
    url: string
    name: string
    deploymentUrl?: string
  }
  message: string
}

export function EnhancedPortfolioGenerator() {
  const [username, setUsername] = useState("")
  const [githubToken, setGithubToken] = useState("")
  const [createRepo, setCreateRepo] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const generatePortfolio = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username")
      return
    }

    if (createRepo && !githubToken.trim()) {
      setError("GitHub token is required to create repositories")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)
    setProgress(0)

    try {
      // Simulate progress steps
      const steps = [
        "Fetching GitHub profile...",
        "Analyzing repositories...",
        "Parsing README files...",
        "Generating portfolio template...",
        createRepo ? "Creating GitHub repository..." : "Finalizing generation...",
        createRepo ? "Uploading files..." : "Completing...",
      ]

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i])
        setProgress(((i + 1) / steps.length) * 90) // Leave 10% for final completion
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      const response = await fetch("/api/github/generate-portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          githubToken: githubToken || undefined,
          createRepo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate portfolio")
      }

      setResult(data)
      setProgress(100)
      setCurrentStep("Portfolio generated successfully!")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setProgress(0)
      setCurrentStep("")
    } finally {
      setLoading(false)
    }
  }

  const downloadPortfolio = () => {
    if (!result) return

    // Create a simple download link for the repository
    if (result.repository) {
      window.open(result.repository.url, "_blank")
    }
  }

  return (
    <div className="space-y-8">
      {/* Configuration Section */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Enhanced Portfolio Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">
              GitHub Username
            </Label>
            <Input
              id="username"
              placeholder="Enter GitHub username (e.g., octocat)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              onKeyPress={(e) => e.key === "Enter" && generatePortfolio()}
            />
          </div>

          {/* GitHub Token Input */}
          <div className="space-y-2">
            <Label htmlFor="token" className="text-white flex items-center gap-2">
              <Key className="h-4 w-4" />
              GitHub Personal Access Token
              <Badge variant="secondary" className="text-xs">
                Optional
              </Badge>
            </Label>
            <Input
              id="token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
            <p className="text-xs text-gray-400">
              Required only if you want to create a repository automatically.
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 ml-1"
              >
                Generate token →
              </a>
            </p>
          </div>

          {/* Repository Creation Toggle */}
          <div className="flex items-center space-x-2">
            <Switch id="create-repo" checked={createRepo} onCheckedChange={setCreateRepo} />
            <Label htmlFor="create-repo" className="text-white flex items-center gap-2">
              {createRepo ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              Create GitHub Repository
            </Label>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generatePortfolio}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Generate Portfolio
              </>
            )}
          </Button>

          {/* Progress */}
          {loading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{currentStep}</span>
                <span className="text-blue-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="preview" className="data-[state=active]:bg-gray-800">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="repository" className="data-[state=active]:bg-gray-800">
              <Github className="mr-2 h-4 w-4" />
              Repository
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-gray-800">
              <Code className="mr-2 h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-8">
            {/* Success Message */}
            <Alert className="border-green-500/20 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">{result.message}</AlertDescription>
            </Alert>

            {/* User Profile Section */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  <Avatar className="w-32 h-32 border-4 border-gray-700">
                    <AvatarImage src={result.user.avatar_url || "/placeholder.svg"} alt={result.user.name} />
                    <AvatarFallback className="text-2xl bg-gray-800">
                      {result.user.name?.charAt(0) || result.user.login.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl font-bold text-white mb-2">{result.user.name || result.user.login}</h2>
                    {result.user.bio && <p className="text-gray-400 mb-4 text-lg">{result.user.bio}</p>}

                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{result.user.public_repos}</div>
                        <div className="text-gray-400 text-sm">Repositories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{result.user.followers}</div>
                        <div className="text-gray-400 text-sm">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{result.user.following}</div>
                        <div className="text-gray-400 text-sm">Following</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      {result.user.location && (
                        <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                          📍 {result.user.location}
                        </Badge>
                      )}
                      {result.user.company && (
                        <Badge variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                          🏢 {result.user.company}
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                        onClick={() => window.open(result.user.html_url, "_blank")}
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
                  {result.repos.length} projects included
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.repos.map((repo) => (
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

          <TabsContent value="repository" className="space-y-6">
            {result.repository ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    Repository Created Successfully
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm mb-2">Repository URL:</p>
                    <code className="text-blue-400 text-sm break-all">{result.repository.url}</code>
                  </div>

                  {result.repository.deploymentUrl && (
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Suggested Deployment URL:</p>
                      <code className="text-green-400 text-sm break-all">{result.repository.deploymentUrl}</code>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 h-20 flex-col"
                      onClick={() => window.open(result.repository!.url, "_blank")}
                    >
                      <Github className="h-6 w-6 mb-2" />
                      View Repository
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 h-20 flex-col"
                      onClick={() =>
                        window.open(`https://vercel.com/new/clone?repository-url=${result.repository!.url}`, "_blank")
                      }
                    >
                      <ExternalLink className="h-6 w-6 mb-2" />
                      Deploy to Vercel
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 h-20 flex-col"
                      onClick={downloadPortfolio}
                    >
                      <Download className="h-6 w-6 mb-2" />
                      Clone Repository
                    </Button>
                  </div>

                  <Alert className="border-blue-500/20 bg-blue-500/10">
                    <AlertCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-400">
                      Your portfolio repository has been created! You can now deploy it to Vercel, Netlify, or any other
                      hosting platform.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Lock className="h-12 w-12 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Repository Not Created</h3>
                    <p className="text-sm">
                      Portfolio was generated successfully, but no repository was created. Enable "Create GitHub
                      Repository" and provide a GitHub token to automatically create a repository.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Generated Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Code className="h-4 w-4 text-gray-400" />
                        <span className="text-white font-mono text-sm">{file.path}</span>
                      </div>
                      <Badge variant="outline" className="bg-gray-700 border-gray-600 text-gray-300 text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Project Structure</h4>
                  <div className="text-gray-400 text-sm space-y-1 font-mono">
                    <div>📁 app/</div>
                    <div className="ml-4">📄 layout.tsx</div>
                    <div className="ml-4">📄 page.tsx</div>
                    <div className="ml-4">📄 globals.css</div>
                    <div>📁 components/ui/</div>
                    <div className="ml-4">📄 button.tsx</div>
                    <div className="ml-4">📄 card.tsx</div>
                    <div className="ml-4">📄 avatar.tsx</div>
                    <div className="ml-4">📄 badge.tsx</div>
                    <div>📁 lib/</div>
                    <div className="ml-4">📄 utils.ts</div>
                    <div>📄 package.json</div>
                    <div>📄 next.config.mjs</div>
                    <div>📄 tailwind.config.ts</div>
                    <div>📄 README.md</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
