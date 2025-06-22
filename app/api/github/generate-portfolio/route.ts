import { type NextRequest, NextResponse } from "next/server"
import { GitHubAPI } from "@/lib/github-api"
import { PortfolioGenerator } from "@/lib/portfolio-generator"

async function generateUniqueRepoName(
  githubAPI: GitHubAPI,
  username: string,
  baseName: string,
  maxAttempts = 10,
): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const repoName = i === 0 ? baseName : `${baseName}-${i}`
    const exists = await githubAPI.checkRepositoryExists(username, repoName)
    if (!exists) {
      return repoName
    }
  }
  throw new Error(`Could not generate unique repository name after ${maxAttempts} attempts`)
}

export async function POST(request: NextRequest) {
  console.log("=== Portfolio Generation API Called ===")

  try {
    // Parse request body safely
    let requestBody
    try {
      requestBody = await request.json()
    } catch (parseError) {
      console.error("Failed to parse request JSON:", parseError)
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 })
    }

    const { username, githubToken, createRepo = true } = requestBody

    console.log("Request parameters:")
    console.log("- Username:", username)
    console.log("- Create repo:", createRepo)
    console.log("- Token provided:", !!githubToken)

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    // Initialize GitHub API
    const githubAPI = new GitHubAPI(githubToken)

    // Fetch user data and repositories
    console.log(`=== Fetching GitHub data for user: ${username} ===`)
    let userData, repos
    try {
      const result = await githubAPI.fetchUserData(username)
      userData = result.user
      repos = result.repos
      console.log(`Successfully fetched data for ${userData.name || userData.login}`)
      console.log(`Found ${repos.length} repositories`)
    } catch (fetchError) {
      console.error("Failed to fetch GitHub data:", fetchError)
      const errorMessage = fetchError instanceof Error ? fetchError.message : "Unknown error"
      return NextResponse.json({ error: `Failed to fetch GitHub data: ${errorMessage}` }, { status: 400 })
    }

    // Generate portfolio files
    console.log("=== Generating portfolio files ===")
    let files
    try {
      const generator = new PortfolioGenerator()
      files = generator.generateAllFiles(userData, repos)
      console.log(`Generated ${files.length} portfolio files`)
    } catch (generateError) {
      console.error("Failed to generate portfolio files:", generateError)
      const errorMessage = generateError instanceof Error ? generateError.message : "Unknown error"
      return NextResponse.json({ error: `Failed to generate portfolio files: ${errorMessage}` }, { status: 500 })
    }

    let repositoryUrl = null
    let deploymentUrl = null
    let finalRepoName = null

    // Create repository if requested and token is provided
    if (createRepo && githubToken) {
      try {
        console.log("=== Repository Creation Started ===")

        // Validate token first
        const tokenValidation = await githubAPI.validateToken()
        if (!tokenValidation.valid) {
          throw new Error("Invalid GitHub token. Please check your token and try again.")
        }

        console.log("Token validated successfully")
        console.log("Authenticated user:", tokenValidation.user?.login)

        // Generate unique repository name
        const baseName = `${username}-portfolio`
        finalRepoName = await generateUniqueRepoName(githubAPI, tokenValidation.user.login, baseName)
        console.log("Using repository name:", finalRepoName)

        // Create the repository
        console.log("Creating GitHub repository...")
        const repository = await githubAPI.createRepository({
          name: finalRepoName,
          description: `Portfolio website for ${userData.name || userData.login} - Generated with DevForge`,
          private: false,
          auto_init: true,
        })

        repositoryUrl = repository.html_url
        console.log("Repository created successfully:", repositoryUrl)

        // Wait for repository to be fully initialized
        console.log("Waiting for repository initialization...")
        await new Promise((resolve) => setTimeout(resolve, 5000)) // Increased wait time

        // Upload all portfolio files
        console.log("=== Uploading portfolio files ===")
        await githubAPI.uploadMultipleFiles(
          tokenValidation.user.login,
          finalRepoName,
          files,
          "🚀 Initial portfolio setup with DevForge",
        )

        // Generate deployment URL
        deploymentUrl = `https://${finalRepoName}.vercel.app`

        console.log("=== Repository Creation Completed Successfully ===")
      } catch (repoError) {
        console.error("=== Repository Creation Failed ===")
        console.error("Error details:", repoError)

        // Provide more specific error messages
        let errorMessage = "Failed to create repository"
        if (repoError instanceof Error) {
          if (repoError.message.includes("Invalid GitHub token")) {
            errorMessage = "Invalid GitHub token. Please check your token and permissions."
          } else if (repoError.message.includes("already exists")) {
            errorMessage = "Repository name already exists. Please try again."
          } else if (repoError.message.includes("rate limit")) {
            errorMessage = "GitHub API rate limit exceeded. Please try again later."
          } else if (repoError.message.includes("scope") || repoError.message.includes("permission")) {
            errorMessage = "Insufficient token permissions. Please ensure your token has 'repo' or 'public_repo' scope."
          } else {
            errorMessage = `Repository creation failed: ${repoError.message}`
          }
        }

        // Return error but continue with file generation
        return NextResponse.json(
          {
            error: errorMessage,
            details: repoError instanceof Error ? repoError.message : "Unknown error",
            user: userData,
            repos: repos.slice(0, 6),
            files: files.map((f) => ({ path: f.path, size: f.content.length })),
          },
          { status: 500 },
        )
      }
    }

    console.log("=== Portfolio Generation Completed Successfully ===")

    // Return successful response
    const response = {
      success: true,
      user: userData,
      repos: repos.slice(0, 6), // Return top 6 repos for preview
      files: files.map((f) => ({ path: f.path, size: f.content.length })), // File info without content
      repository: repositoryUrl
        ? {
            url: repositoryUrl,
            name: finalRepoName,
            deploymentUrl,
          }
        : null,
      message: repositoryUrl
        ? "Portfolio generated and repository created successfully!"
        : "Portfolio generated successfully!",
    }

    console.log("Sending successful response")
    return NextResponse.json(response)
  } catch (error) {
    console.error("=== Unexpected Portfolio Generation Error ===")
    console.error("Error details:", error)
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        error: "Failed to generate portfolio",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
