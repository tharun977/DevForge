import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import { ShowcaseSection } from "./components/showcase-section"
import { CTASection } from "./components/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <CTASection />
    </main>
  )
}
