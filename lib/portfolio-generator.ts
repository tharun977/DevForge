import type { GitHubUser, GitHubRepo } from "./github-api"

export class PortfolioGenerator {
  generatePackageJson(user: GitHubUser): string {
    return JSON.stringify(
      {
        name: `${user.login}-portfolio`,
        version: "1.0.0",
        description: `Portfolio website for ${user.name || user.login}`,
        private: true,
        scripts: {
          build: "next build",
          dev: "next dev",
          lint: "next lint",
          start: "next start",
        },
        dependencies: {
          "@radix-ui/react-avatar": "latest",
          "@radix-ui/react-slot": "latest",
          "class-variance-authority": "^0.7.1",
          clsx: "^2.1.1",
          "lucide-react": "^0.454.0",
          next: "15.2.4",
          react: "^19",
          "react-dom": "^19",
          "tailwind-merge": "^2.5.5",
          "tailwindcss-animate": "^1.0.7",
        },
        devDependencies: {
          "@types/node": "^22",
          "@types/react": "^19",
          "@types/react-dom": "^19",
          autoprefixer: "^10.4.20",
          postcss: "^8.5",
          tailwindcss: "^3.4.17",
          typescript: "^5",
        },
      },
      null,
      2,
    )
  }

  generateNextConfig(): string {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig`
  }

  generateTailwindConfig(): string {
    return `import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;`
  }

  generateGlobalCSS(): string {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`
  }

  generateUtilsFile(): string {
    return `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
  }

  generateButtonComponent(): string {
    return `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`
  }

  generateCardComponent(): string {
    return `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`
  }

  generateAvatarComponent(): string {
    return `"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }`
  }

  generateBadgeComponent(): string {
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`
  }

  generateMainPortfolioComponent(user: GitHubUser, repos: GitHubRepo[]): string {
    const topRepos = repos.slice(0, 6)
    const skills = this.extractSkills(repos)

    return `"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, ExternalLink, Star, GitFork, Mail, MapPin, Building, Calendar, Users, BookOpen } from 'lucide-react'

export default function Portfolio() {
  const user = ${JSON.stringify(user, null, 2)}
  const repos = ${JSON.stringify(topRepos, null, 2)}
  const skills = ${JSON.stringify(skills, null, 2)}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.name || user.login} />
              <AvatarFallback className="text-2xl">{(user.name || user.login).charAt(0)}</AvatarFallback>
            </Avatar>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {user.name || user.login}
            </h1>

            {user.bio && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center mb-8 text-sm text-gray-600 dark:text-gray-400">
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  {user.company}
                </div>
              )}
              {user.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
                onClick={() => window.open(user.html_url, "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub Profile
              </Button>
              {user.blog && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(user.blog, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{user.public_repos}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  Repositories
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{user.followers}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center gap-1">
                  <Users className="w-4 h-4" />
                  Followers
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">{user.following}</div>
                <div className="text-gray-600 text-sm flex items-center justify-center gap-1">
                  <Users className="w-4 h-4" />
                  Following
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Technologies & Skills
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-white"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <Card 
                key={repo.id} 
                className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                      {repo.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      {repo.homepage && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-gray-600 p-1"
                          onClick={() => window.open(repo.homepage, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-gray-600 p-1"
                        onClick={() => window.open(repo.html_url, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {repo.description || "No description available"}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </div>
                    {repo.language && (
                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                        {repo.language}
                      </Badge>
                    )}
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {repo.topics.slice(0, 4).map((topic) => (
                        <Badge
                          key={topic}
                          variant="outline"
                          className="text-xs bg-gray-50 border-gray-200 text-gray-600"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            Built with ❤️ using DevForge Portfolio Generator
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </footer>
    </div>
  )
}`
  }

  generateLayoutFile(user: GitHubUser): string {
    return `import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "${user.name || user.login} - Portfolio",
  description: "${user.bio || `Portfolio of ${user.name || user.login}`}",
  keywords: ["portfolio", "developer", "${user.login}", "github"],
  authors: [{ name: "${user.name || user.login}" }],
  openGraph: {
    title: "${user.name || user.login} - Portfolio",
    description: "${user.bio || `Portfolio of ${user.name || user.login}`}",
    images: ["${user.avatar_url}"],
  },
  twitter: {
    card: "summary_large_image",
    title: "${user.name || user.login} - Portfolio",
    description: "${user.bio || `Portfolio of ${user.name || user.login}`}",
    images: ["${user.avatar_url}"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`
  }

  generateReadme(user: GitHubUser): string {
    return `# ${user.name || user.login} - Portfolio

This is a personal portfolio website generated using DevForge Portfolio Generator.

## About

${user.bio || `Welcome to ${user.name || user.login}'s portfolio website.`}

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🚀 Fast loading with Next.js
- 🎯 SEO optimized
- 📊 GitHub integration
- 🌙 Dark mode support

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/${user.login}/${user.login}-portfolio.git
cd ${user.login}-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This portfolio is optimized for static export and can be deployed to any static hosting service:

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the static files:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the \`out\` folder to your hosting service

## Customization

You can customize this portfolio by:

- Editing the content in \`app/page.tsx\`
- Modifying styles in \`app/globals.css\`
- Adding new components in the \`components\` folder
- Updating the configuration in \`tailwind.config.ts\`

## Contact

- GitHub: [${user.login}](${user.html_url})
${user.blog ? `- Website: [${user.blog}](${user.blog})` : ""}
${user.email ? `- Email: ${user.email}` : ""}

## License

This project is open source and available under the [MIT License](LICENSE).

---

Generated with ❤️ using [DevForge Portfolio Generator](https://devforge.dev)
`
  }

  generateTSConfig(): string {
    return `{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`
  }

  generatePostCSSConfig(): string {
    return `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;`
  }

  private extractSkills(repos: GitHubRepo[]): string[] {
    const languages = new Set<string>()
    const topics = new Set<string>()

    repos.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language)
      }
      if (repo.topics) {
        repo.topics.forEach((topic) => topics.add(topic))
      }
    })

    // Combine and filter common skills
    const allSkills = [...languages, ...topics]
    const commonSkills = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "C#",
      "Go",
      "Rust",
      "PHP",
      "Ruby",
      "React",
      "Vue",
      "Angular",
      "Next.js",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "Spring",
      "HTML",
      "CSS",
      "SCSS",
      "Tailwind",
      "Bootstrap",
      "Material-UI",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "SQLite",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Vercel",
      "Netlify",
      "Git",
      "GitHub",
      "GitLab",
      "CI/CD",
      "Jest",
      "Cypress",
      "Testing",
    ]

    return allSkills
      .filter((skill) =>
        commonSkills.some(
          (common) =>
            skill.toLowerCase().includes(common.toLowerCase()) || common.toLowerCase().includes(skill.toLowerCase()),
        ),
      )
      .slice(0, 20) // Limit to 20 skills
  }

  generateAllFiles(user: GitHubUser, repos: GitHubRepo[]) {
    return [
      { path: "package.json", content: this.generatePackageJson(user) },
      { path: "next.config.mjs", content: this.generateNextConfig() },
      { path: "tailwind.config.ts", content: this.generateTailwindConfig() },
      { path: "postcss.config.mjs", content: this.generatePostCSSConfig() },
      { path: "tsconfig.json", content: this.generateTSConfig() },
      { path: "app/globals.css", content: this.generateGlobalCSS() },
      { path: "app/layout.tsx", content: this.generateLayoutFile(user) },
      { path: "app/page.tsx", content: this.generateMainPortfolioComponent(user, repos) },
      { path: "lib/utils.ts", content: this.generateUtilsFile() },
      { path: "components/ui/button.tsx", content: this.generateButtonComponent() },
      { path: "components/ui/card.tsx", content: this.generateCardComponent() },
      { path: "components/ui/avatar.tsx", content: this.generateAvatarComponent() },
      { path: "components/ui/badge.tsx", content: this.generateBadgeComponent() },
      { path: "README.md", content: this.generateReadme(user) },
    ]
  }
}
