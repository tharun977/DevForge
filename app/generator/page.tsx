import { Suspense } from "react"
import { PortfolioGenerator } from "./components/portfolio-generator"
import { GeneratorHeader } from "./components/generator-header"

export default function GeneratorPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GeneratorHeader />
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-400">Loading AI Playground...</span>
            </div>
          }
        >
          <PortfolioGenerator />
        </Suspense>
      </div>
    </div>
  )
}
