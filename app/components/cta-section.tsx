import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl p-12">
          <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-6" />

          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Portfolio?</h2>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who've transformed their GitHub profiles into stunning portfolio websites with
            DevForge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium">
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 rounded-lg font-medium"
            >
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
