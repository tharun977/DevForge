"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, ExternalLink, Star, GitFork, MapPin, LinkIcon, Mail, Calendar } from "lucide-react"
import Link from "next/link"

interface GitHubUser {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  location: string | null
  blog: string | null
  email: string | null
  created_at: string
  html_url: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  topics: string[]
}

interface PortfolioTemplateProps {
  user: GitHubUser
  repos: GitHubRepo[]
}

export default function PortfolioTemplate({ user, repos }: PortfolioTemplateProps) {
  const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="glassmorphic-card rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 ring-4 ring-white/20">
              <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name || user.login} />
              <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                {(user.name || user.login).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">{user.name || user.login}</h1>
              <p className="text-xl text-gray-300 mb-4">@{user.login}</p>

              {user.bio && <p className="text-gray-200 text-lg mb-4 max-w-2xl">{user.bio}</p>}

              <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(user.created_at)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.public_repos}</div>
                  <div className="text-sm text-gray-400">Repositories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.followers}</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{user.following}</div>
                  <div className="text-sm text-gray-400">Following</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <Link href={user.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View GitHub Profile
                  </Link>
                </Button>
                {user.blog && (
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Link
                      href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Website
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="glassmorphic-card rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRepos.map((repo) => (
              <Card
                key={repo.id}
                className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center justify-between">
                    <span className="truncate">{repo.name}</span>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.language && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {repo.language}
                      </Badge>
                    )}
                    {repo.topics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="border-white/20 text-white/80 text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>

                    <Button asChild size="sm" className="bg-white/10 hover:bg-white/20 text-white">
                      <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {repos.length > 6 && (
            <div className="text-center mt-8">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Link href={`${user.html_url}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                  View All Repositories
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Named export for deployment compatibility
export { PortfolioTemplate }
