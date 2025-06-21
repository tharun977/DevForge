"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Star, Eye } from "lucide-react"
import Link from "next/link"

const examples = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full Stack Developer",
    description: "Modern portfolio showcasing React, Node.js, and cloud architecture projects with interactive demos.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React", "TypeScript", "AWS", "Docker"],
    stars: 124,
    views: 5420,
    url: "/portfolio/sarahchen",
    github: "https://github.com/sarahchen",
    template: "Modern Minimal",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    role: "Frontend Engineer",
    description: "Creative portfolio featuring interactive animations, 3D elements, and modern design systems.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Vue.js", "Three.js", "GSAP", "Nuxt"],
    stars: 89,
    views: 3210,
    url: "/portfolio/alexrodriguez",
    github: "https://github.com/alexrodriguez",
    template: "Creative Portfolio",
  },
  {
    id: 3,
    name: "Jordan Kim",
    role: "DevOps Engineer",
    description: "Technical portfolio highlighting infrastructure automation, monitoring tools, and cloud solutions.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Docker", "Kubernetes", "Python", "Terraform"],
    stars: 156,
    views: 4890,
    url: "/portfolio/jordankim",
    github: "https://github.com/jordankim",
    template: "Tech Showcase",
  },
  {
    id: 4,
    name: "Maya Patel",
    role: "UI/UX Designer",
    description: "Design-focused portfolio showcasing user experience projects, case studies, and design process.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Figma", "Framer", "React", "Tailwind"],
    stars: 203,
    views: 6780,
    url: "/portfolio/mayapatel",
    github: "https://github.com/mayapatel",
    template: "Creative Portfolio",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Backend Developer",
    description:
      "API-focused portfolio demonstrating microservices architecture, database design, and system scalability.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["Node.js", "PostgreSQL", "Redis", "GraphQL"],
    stars: 78,
    views: 2340,
    url: "/portfolio/davidwilson",
    github: "https://github.com/davidwilson",
    template: "Tech Showcase",
  },
  {
    id: 6,
    name: "Lisa Zhang",
    role: "Mobile Developer",
    description: "Mobile-first portfolio showcasing iOS and Android applications with cross-platform solutions.",
    image: "/placeholder.svg?height=200&width=300",
    tech: ["React Native", "Swift", "Kotlin", "Flutter"],
    stars: 167,
    views: 4560,
    url: "/portfolio/lisazhang",
    github: "https://github.com/lisazhang",
    template: "Modern Minimal",
  },
]

const roles = [
  "All",
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Mobile Developer",
]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Portfolio Examples</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Get inspired by real portfolios created with DevForge. See how developers showcase their work and skills.
          </p>
        </div>

        {/* Role Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {roles.map((role) => (
            <Button
              key={role}
              variant={role === "All" ? "default" : "outline"}
              className={
                role === "All"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              }
            >
              {role}
            </Button>
          ))}
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example) => (
            <Card
              key={example.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white border-white/30">{example.template}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{example.name}</h3>
                      <p className="text-white/70 text-sm">{example.role}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{example.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400">
                        <Eye className="h-3 w-3" />
                        <span>{example.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{example.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {example.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-white/10 border-white/20 text-white/80">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                    asChild
                  >
                    <Link href={example.url}>
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Portfolio
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                    asChild
                  >
                    <Link href={example.github} target="_blank">
                      <Github className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Own?</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have already created stunning portfolios with DevForge.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium text-lg"
              asChild
            >
              <Link href="/generator">Start Building Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
