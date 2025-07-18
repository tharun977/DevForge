import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star } from "lucide-react"
import Link from "next/link"

const showcaseProjects = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Modern portfolio showcasing React, Node.js, and cloud architecture projects.",
    stars: 124,
    tech: ["React", "TypeScript", "AWS"],
    url: "/portfolio/sarahchen",
    github: "https://github.com/sarahchen",
  },
  {
    name: "Alex Rodriguez",
    role: "Frontend Engineer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Creative portfolio featuring interactive animations and modern design systems.",
    stars: 89,
    tech: ["Vue.js", "Three.js", "GSAP"],
    url: "/portfolio/alexrodriguez",
    github: "https://github.com/alexrodriguez",
  },
  {
    name: "Jordan Kim",
    role: "DevOps Engineer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Technical portfolio highlighting infrastructure automation and monitoring tools.",
    stars: 156,
    tech: ["Docker", "Kubernetes", "Python"],
    url: "/portfolio/jordankim",
    github: "https://github.com/jordankim",
  },
]

export function ShowcaseSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            Showcase
          </Badge>
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Built with </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DevForge</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See what developers are creating with our AI-powered portfolio generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-105 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      <p className="text-white/70 text-sm">{project.role}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-white/60 text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-white/10 border-white/20 text-white/80">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white rounded-xl"
                    asChild
                  >
                    <Link href={project.url}>
                      <ExternalLink className="mr-2 h-3 w-3" />
                      View Site
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white rounded-xl"
                    asChild
                  >
                    <Link href={project.github} target="_blank">
                      <Github className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
