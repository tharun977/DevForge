import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageCircle, Star } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <Badge
          variant="secondary"
          className="mb-8 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 transition-colors"
        >
          <span className="mr-2">✨</span>
          The Ultimate Portfolio Generator
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Build <span className="text-blue-400">Faster</span> with
          <br />
          DevForge
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your GitHub profile into stunning portfolio websites in minutes. AI-powered design with README
          parsing and production-ready templates.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/generator">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg font-medium"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Join Discord
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg font-medium"
          >
            <Star className="mr-2 h-4 w-4" />
            Star on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
