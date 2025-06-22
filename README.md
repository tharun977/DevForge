# 🚀 DevForge - Dynamic Portfolio Generator


<div align="center">

<img src="/placeholder-logo.svg" alt="DevForge Logo" width="120" />

**Create stunning developer portfolios in minutes with AI-powered generation**

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge\&logo=vercel)](https://vercel.com/tharun-ramans-projects/v0-dynamic-portfolio-generator)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge\&logo=tailwind-css)](https://tailwindcss.com/)

[🌟 Live Demo](https://v0-dynamic-portfolio-generator.vercel.app) • [📖 Documentation](https://devforge.dev/docs) • [🎨 Templates](https://devforge.dev/templates) • [💬 Discord](https://discord.gg/devforge)

</div>

---

## 📋 Table of Contents

* [✨ Features](#-features)
* [🎨 Design Philosophy](#-design-philosophy)
* [🛠️ Tech Stack](#️-tech-stack)
* [🚀 Quick Start](#-quick-start)
* [📁 Project Structure](#-project-structure)
* [🎯 Core Features](#-core-features)
* [🌐 API Reference](#-api-reference)
* [🎨 UI Components](#-ui-components)
* [📱 Pages & Navigation](#-pages--navigation)
* [🔧 Configuration](#-configuration)
* [🚀 Deployment](#-deployment)
* [🧪 Testing](#-testing)
* [📊 Performance](#-performance)
* [🤝 Contributing](#-contributing)
* [🐛 Troubleshooting](#-troubleshooting)
* [📈 Roadmap](#-roadmap)
* [📄 License](#-license)
* [🙏 Acknowledgments](#-acknowledgments)
* [📊 Stats](#-stats)

---

## ✨ Features

### 🎯 **Core Functionality**

* **AI-Powered Generation**: Automatically create portfolios from GitHub profiles
* **Real-time GitHub Integration**: Live repository data and README parsing
* **Multiple Templates**: Choose from professionally designed templates
* **Responsive Design**: Perfect on desktop, tablet, and mobile
* **SEO Optimized**: Built-in meta tags and structured data
* **Performance First**: 95+ Lighthouse scores across all metrics

### 🎨 **Modern UI/UX**

* **Glassmorphic Design**: Beautiful frosted glass effects with backdrop blur
* **Smooth Animations**: Micro-interactions and hover effects
* **Dark/Light Mode**: Automatic theme switching
* **Mobile-First**: Responsive design with collapsible navigation
* **Accessibility**: WCAG 2.1 AA compliant

### 📊 **Dashboard & Analytics**

* **Portfolio Management**: Create, edit, and delete portfolios
* **Performance Tracking**: View counts, engagement metrics
* **Template Library**: Browse and preview available templates
* **Real Examples**: Showcase of successful portfolios

---

## 🎨 Design Philosophy

DevForge embraces a **modern glassmorphic design** that combines elegance with functionality:

### **Glassmorphic Navigation**

\`\`\`css
/* Core glassmorphic styling */
.glassmorphic-nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
\`\`\`

### **Design Principles**

* **Transparency**: Layered glass effects create depth
* **Blur Effects**: Backdrop filters for modern aesthetics
* **Gradient Accents**: Purple-to-blue gradients for CTAs
* **Rounded Corners**: Consistent 16px+ border radius
* **Hover States**: Scale and glow effects on interaction

---

## 🛠️ Tech Stack

### **Frontend**

* **[Next.js 15](https://nextjs.org/)** - React framework with App Router
* **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
* **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
* **[shadcn/ui](https://ui.shadcn.com/)** - High-quality React components
* **[Lucide React](https://lucide.dev/)** - Beautiful icon library
* **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### **Backend & APIs**

* **Next.js API Routes** - Serverless API endpoints
* **GitHub API v3** - Repository and user data
* **Vercel Functions** - Serverless deployment

### **Development Tools**

* **ESLint** - Code linting
* **Prettier** - Code formatting
* **PostCSS** - CSS processing
* **Autoprefixer** - CSS vendor prefixes

---

## 🚀 Quick Start

### **Prerequisites**

* Node.js 18+
* npm or yarn
* Git

### **Installation**

1. **Clone the repository**

   \`\`\`bash
   git clone https://github.com/your-username/devforge.git
   cd devforge
   \`\`\`

2. **Install dependencies**

   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**

   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Add your environment variables:

   \`\`\`env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   GITHUB_TOKEN=your_github_personal_access_token
   \`\`\`

4. **Run the development server**

   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **First Portfolio**

\`\`\`bash
# Generate a portfolio for a GitHub user
curl http://localhost:3000/api/github/octocat
\`\`\`

---

## 📁 Project Structure

\`\`\`plaintext
devforge/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── github/               # GitHub integration
│   │       └── [username]/route.ts  # User data endpoint
│   ├── components/               # Page components
│   │   ├── navigation.tsx           # Glassmorphic navbar
│   │   ├── hero-section.tsx         # Landing hero
│   │   ├── features-section.tsx     # Feature showcase
│   │   └── ...                      # Other sections
│   ├── dashboard/                # Dashboard pages
│   │   └── page.tsx                 # Portfolio management
│   ├── generator/                # AI generator
│   │   ├── page.tsx                 # Generator interface
│   │   └── components/              # Generator components
│   ├── portfolio/                # Dynamic portfolios
│   │   └── [username]/              # User portfolio pages
│   ├── templates/                # Template gallery
│   ├── examples/                 # Portfolio examples
│   ├── docs/                     # Documentation
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   └── theme-provider.tsx        # Theme context
├── lib/                          # Utilities
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
│   ├── placeholder.svg           # Placeholder images
│   └── ...                       # Other assets
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
\`\`\`
