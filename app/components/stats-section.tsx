import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function StatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats Card */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-6xl font-bold text-white">12+</div>
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U1</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white/20">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U3</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <p className="text-gray-300">Leading developers trust our AI for their portfolio experiences</p>
            </CardContent>
          </Card>

          {/* Feature Badges */}
          <div className="space-y-4">
            <div className="bg-white/10 rounded-full px-6 py-3 inline-block">
              <span className="text-white font-medium">Transformative experience</span>
            </div>
            <div className="bg-white/10 rounded-full px-6 py-3 inline-block ml-8">
              <span className="text-white font-medium">Trusted by over 12+ global innovators</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
