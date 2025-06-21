import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-4">
                "A seamless fusion of technology and creativity — this platform redefined how I showcase my work."
              </p>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">Jane Doe</p>
                  <p className="text-gray-400 text-sm">Full Stack Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-4">
                "The AI-powered design suggestions helped me create a portfolio that truly represents my brand."
              </p>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">Mike Smith</p>
                  <p className="text-gray-400 text-sm">UI/UX Designer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <Quote className="h-8 w-8 text-purple-400 mb-4" />
              <p className="text-gray-300 mb-4">
                "From GitHub to gorgeous portfolio in minutes. This tool is a game-changer for developers."
              </p>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">Sarah Johnson</p>
                  <p className="text-gray-400 text-sm">Software Engineer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
