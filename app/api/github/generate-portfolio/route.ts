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

    // Create repository if requested and token is provided
    if (createRepo && githubToken) {
      try {
        console.log("Creating GitHub repository...")
        const repoName = `${username}-portfolio`

        // Create the repository
        const repository = await githubAPI.createRepository({
          name: repoName,
          description: `Portfolio website for ${user.name || user.login}`,
          private: false,
          auto_init: true,
        })

        repositoryUrl = repository.html_url

        // Wait a moment for repository to be fully created
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Upload all files to the repository
        console.log("Uploading files to repository...")
        await githubAPI.uploadMultipleFiles(username, repoName, files, "Initial portfolio setup with DevForge")

        // Generate deployment URL (assuming Vercel deployment)
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
            name: `${username}-portfolio`,
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
