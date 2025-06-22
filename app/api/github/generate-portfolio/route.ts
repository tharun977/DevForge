import { type NextRequest, NextResponse } from "next/server"
import { GitHubAPI } from "@/lib/github-api"
import { PortfolioGenerator } from "@/lib/portfolio-generator"

export async function POST(request: NextRequest) {
  try {
    const { username, githubToken, createRepo = true } = await request.json()

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Initialize GitHub API
    const githubAPI = new GitHubAPI(githubToken)

    // Fetch user data and repositories
    console.log(`Fetching data for user: ${username}`)
    const { user, repos } = await githubAPI.fetchUserData(username)

    // Generate portfolio files
    console.log("Generating portfolio files...")
    const generator = new PortfolioGenerator()
    const files = generator.generateAllFiles(user, repos)

    let repositoryUrl = null
    let deploymentUrl = null
    const repoName = null

    // Create repository if requested and token is provided
    if (createRepo && githubToken) {
      try {
        console.log("Creating GitHub repository…")
        const baseName = `${username}-portfolio`
        let repoName = baseName
        let created = false
        let attempt = 0
        const maxAttempts = 5

        while (!created && attempt < maxAttempts) {
          if (attempt > 0) repoName = `${baseName}-${attempt}`

          try {
            const repository = await githubAPI.createRepository({
              name: repoName,
              description: `Portfolio website for ${user.name || user.login}`,
              private: false,
              auto_init: true,
            })

            repositoryUrl = repository.html_url
            created = true
          } catch (err: any) {
            // If the name is taken, try the next suffix; otherwise bubble up
            const msg = String(err?.message || "")
            if (
              msg.includes("name already exists") ||
              msg.includes("name already taken") ||
              msg.includes("already exists")
            ) {
              attempt += 1
              continue
            }
            throw err
          }
        }

        if (!created) {
          throw new Error(`Could not create a unique repository after ${maxAttempts} attempts`)
        }

        // Give GitHub a moment to finish initialising the repo
        await new Promise((res) => setTimeout(res, 2000))

        console.log("Uploading files to repository…")
        await githubAPI.uploadMultipleFiles(username, repoName, files, "Initial portfolio setup with DevForge")

        deploymentUrl = `https://${repoName}.vercel.app`
        console.log("Portfolio repository created successfully!")
      } catch (repoError) {
        console.error("Error creating repository:", repoError)
        // Continue without repository creation
      }
    }

    return NextResponse.json({
      success: true,
      user,
      repos: repos.slice(0, 6), // Return top 6 repos for preview
      files: files.map((f) => ({ path: f.path, size: f.content.length })), // File info without content
      repository: repositoryUrl
        ? {
            url: repositoryUrl,
            name: repoName,
            deploymentUrl,
          }
        : null,
      message: repositoryUrl
        ? "Portfolio generated and repository created successfully!"
        : "Portfolio generated successfully!",
    })
  } catch (error) {
    console.error("Portfolio generation error:", error)

    if (error instanceof Error) {
      if (error.message.includes("User not found")) {
        return NextResponse.json({ error: "GitHub user not found" }, { status: 404 })
      }
      if (error.message.includes("API rate limit")) {
        return NextResponse.json({ error: "GitHub API rate limit exceeded" }, { status: 429 })
      }
    }

    return NextResponse.json({ error: "Failed to generate portfolio" }, { status: 500 })
  }
}
