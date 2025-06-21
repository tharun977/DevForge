import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 })
  }

  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "DevForge-Portfolio-Generator",
      },
    })

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 })
      }
      throw new Error("Failed to fetch user data")
    }

    const userData = await userResponse.json()

    // Fetch user repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "DevForge-Portfolio-Generator",
      },
    })

    if (!reposResponse.ok) {
      throw new Error("Failed to fetch repositories")
    }

    const reposData = await reposResponse.json()

    // Filter out forked repositories and sort by stars
    const filteredRepos = reposData
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)

    // Fetch README content for top repositories
    const reposWithReadme = await Promise.all(
      filteredRepos.slice(0, 10).map(async (repo: any) => {
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/readme`, {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "DevForge-Portfolio-Generator",
            },
          })

          if (readmeResponse.ok) {
            const readmeData = await readmeResponse.json()
            const readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8")
            return { ...repo, readme: readmeContent }
          }
        } catch (error) {
          console.log(`No README found for ${repo.name}`)
        }
        return repo
      }),
    )

    return NextResponse.json({
      user: userData,
      repos: reposWithReadme,
    })
  } catch (error) {
    console.error("GitHub API Error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}
