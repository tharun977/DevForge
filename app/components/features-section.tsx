import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Palette, Code, Globe, FileText, Cpu, Rocket } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Design",
    description: "Intelligent design suggestions based on your coding style and preferences.",
    badge: "New",
  },
  {
    icon: FileText,
    title: "README Parsing",
    description: "Automatically extract and format content from your repository README files.",
    badge: "Smart",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate production-ready portfolios in under 60 seconds.",
    badge: "Fast",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Choose from dozens of professionally designed themes or create your own.",
    badge: null,
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Clean, semantic code with modern web standards and best practices.",
    badge: null,
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description: "One-click deployment to Vercel, Netlify, or export static files.",
    badge: "Popular",
  },
  {
    icon: Cpu,
    title: "Performance Optimized",
    description: "Built with Next.js 15, optimized for Core Web Vitals and SEO.",
    badge: null,
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Enterprise-grade performance with built-in analytics and monitoring.",
    badge: null,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
            <Sparkles className="mr-2 h-3 w-3" />
            Why Choose DevForge
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            A Faster Path to <span className="text-blue-400">Production</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Accelerate your development with our powerful portfolio generator. Focus on building features, not
            infrastructure.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
