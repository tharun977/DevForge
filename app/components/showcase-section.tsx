import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star } from "lucide-react"

const showcaseProjects = [
  {
    name: "Sarah Chen",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Modern portfolio showcasing React, Node.js, and cloud architecture projects.",
    stars: 124,
    tech: ["React", "TypeScript", "AWS"],
    url: "#",
  },
  {
    name: "Alex Rodriguez",
    role: "Frontend Engineer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Creative portfolio featuring interactive animations and modern design systems.",
    stars: 89,
    tech: ["Vue.js", "Three.js", "GSAP"],
    url: "#",
  },
  {
    name: "Jordan Kim",
    role: "DevOps Engineer",
    image: "/placeholder.svg?height=200&width=300",
    description: "Technical portfolio highlighting infrastructure automation and monitoring tools.",
    stars: 156,
    tech: ["Docker", "Kubernetes", "Python"],
    url: "#",
  },
]

export function ShowcaseSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
            Showcase
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Built with <span className="text-purple-400">DevForge</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what developers are creating with our AI-powered portfolio generator
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseProjects.map((project, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 group overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{project.name}</h3>
                      <p className="text-gray-300 text-sm">{project.role}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs bg-gray-800 border-gray-700 text-gray-300">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <ExternalLink className="mr-2 h-3 w-3" />
                    View Site
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <Github className="h-3 w-3" />
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
