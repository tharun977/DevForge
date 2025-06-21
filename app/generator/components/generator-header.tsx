import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function GeneratorHeader() {
  return (
    <div className="text-center mb-12">
      <Badge variant="secondary" className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
        <Sparkles className="mr-2 h-3 w-3" />
        AI Playground
      </Badge>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Generate Your <span className="text-blue-400">Portfolio</span>
      </h1>

      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        Enter your GitHub username to automatically generate a stunning, production-ready portfolio website with
        AI-powered design.
      </p>
    </div>
  )
}
