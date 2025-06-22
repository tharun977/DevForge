import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        {/* Badge */}
        <Badge
          variant="secondary"
          className="mb-8 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm px-6 py-2 text-sm"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          The Ultimate Portfolio Generator
        </Badge>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Build
          </span>{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Faster
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            with DevForge
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your GitHub profile into stunning portfolio websites in minutes. AI-powered design with README
          parsing and production-ready templates.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/generator">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium text-lg shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white px-8 py-4 rounded-2xl font-medium text-lg backdrop-blur-sm transition-all hover:scale-105"
            asChild
          >
            <Link href="https://discord.gg/devforge" target="_blank">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white px-8 py-4 rounded-2xl font-medium text-lg backdrop-blur-sm transition-all hover:scale-105"
            asChild
          >
            <Link href="https://github.com/tharun977/devforge" target="_blank">
              <Star className="mr-2 h-5 w-5" />
              Star on GitHub
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/60">Portfolios Created</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-white/60">Templates Available</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-white mb-2">99%</div>
            <div className="text-white/60">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
