"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, Star } from "lucide-react"
import Link from "next/link"

const templates = [
  {
    id: 1,
    name: "Modern Minimal",
    description: "Clean and professional design perfect for developers",
    image: "/placeholder.svg?height=200&width=300",
    category: "Professional",
    downloads: 1234,
    rating: 4.8,
    price: "Free",
    preview: "/templates/modern-minimal",
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Vibrant and creative design for designers and artists",
    image: "/placeholder.svg?height=200&width=300",
    category: "Creative",
    downloads: 856,
    rating: 4.9,
    price: "Pro",
    preview: "/templates/creative-portfolio",
  },
  {
    id: 3,
    name: "Tech Showcase",
    description: "Perfect for showcasing technical projects and skills",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technical",
    downloads: 2341,
    rating: 4.7,
    price: "Free",
    preview: "/templates/tech-showcase",
  },
  {
    id: 4,
    name: "Business Professional",
    description: "Corporate-style template for business professionals",
    image: "/placeholder.svg?height=200&width=300",
    category: "Business",
    downloads: 567,
    rating: 4.6,
    price: "Pro",
    preview: "/templates/business-professional",
  },
  {
    id: 5,
    name: "Dark Theme",
    description: "Sleek dark theme with modern animations",
    image: "/placeholder.svg?height=200&width=300",
    category: "Modern",
    downloads: 1789,
    rating: 4.9,
    price: "Free",
    preview: "/templates/dark-theme",
  },
  {
    id: 6,
    name: "Minimalist Grid",
    description: "Grid-based layout with focus on content",
    image: "/placeholder.svg?height=200&width=300",
    category: "Minimal",
    downloads: 923,
    rating: 4.5,
    price: "Pro",
    preview: "/templates/minimalist-grid",
  },
]

const categories = ["All", "Professional", "Creative", "Technical", "Business", "Modern", "Minimal"]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Portfolio Templates</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose from our collection of professionally designed templates to create your perfect portfolio
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={
                category === "All"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative">
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 text-white border-white/30">{template.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    className={
                      template.price === "Free"
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    }
                  >
                    {template.price}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-white/60 text-sm mb-4">{template.description}</p>

                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{template.rating}</span>
                  </div>
                  <div className="text-white/60">{template.downloads.toLocaleString()} downloads</div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl"
                    asChild
                  >
                    <Link href={template.preview}>
                      <Eye className="mr-2 h-3 w-3" />
                      Preview
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
                    asChild
                  >
                    <Link href={`/generator?template=${template.id}`}>
                      <Download className="mr-2 h-3 w-3" />
                      Use
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
