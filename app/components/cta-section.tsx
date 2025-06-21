import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl w-fit mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ready to Build Your Portfolio?</h2>

            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've transformed their GitHub profiles into stunning portfolio websites
              with DevForge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/generator">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium text-lg shadow-2xl hover:shadow-blue-500/25 transition-all hover:scale-105"
                >
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white px-8 py-4 rounded-2xl font-medium text-lg backdrop-blur-sm transition-all hover:scale-105"
                asChild
              >
                <Link href="/examples">View Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
