import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Palette, Code, Globe, FileText, Cpu, Rocket } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Intelligent design suggestions based on your coding style and preferences.",
    badge: "New",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "README Parsing",
    description: "Automatically extract and format content from your repository README files.",
    badge: "Smart",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate production-ready portfolios in under 60 seconds.",
    badge: "Fast",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Choose from dozens of professionally designed themes or create your own.",
    badge: null,
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Clean, semantic code with modern web standards and best practices.",
    badge: null,
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description: "One-click deployment to Vercel, Netlify, or export static files.",
    badge: "Popular",
    color: "from-teal-500 to-blue-500",
  },
  {
    icon: Cpu,
    title: "Performance Optimized",
    description: "Built with Next.js 15, optimized for Core Web Vitals and SEO.",
    badge: null,
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Enterprise-grade performance with built-in analytics and monitoring.",
    badge: null,
    color: "from-violet-500 to-purple-500",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <Sparkles className="mr-2 h-3 w-3" />
            Why Choose DevForge
          </Badge>
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              A Faster Path to{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Production
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Accelerate your development with our powerful portfolio generator. Focus on building features, not
            infrastructure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-105 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
