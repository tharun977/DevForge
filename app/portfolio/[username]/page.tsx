import { notFound } from "next/navigation"
import { PortfolioTemplate } from "./components/portfolio-template"

interface PageProps {
  params: {
    username: string
  }
}

async function getGitHubData(username: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/github/${username}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return null
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const data = await getGitHubData(params.username)

  if (!data) {
    notFound()
  }

  return <PortfolioTemplate user={data.user} repos={data.repos} />
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getGitHubData(params.username)

  if (!data) {
    return {
      title: "Portfolio Not Found",
    }
  }

  return {
    title: `${data.user.name || data.user.login} - Portfolio`,
    description: data.user.bio || `Portfolio of ${data.user.name || data.user.login}`,
  }
}
