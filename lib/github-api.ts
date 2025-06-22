interface GitHubUser {
  login: string
  name: string
  bio: string
  avatar_url: string
  html_url: string
  public_repos: number
  followers: number
  following: number
  location: string
  company: string
  blog: string
  email: string
  created_at: string
  updated_at: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  homepage: string
  created_at: string
  updated_at: string
  readme?: string
}

interface GitHubApiResponse {
  user: GitHubUser
  repos: GitHubRepo[]
}

export class GitHubAPI {
  private baseUrl = "https://api.github.com"
  private token?: string

  constructor(token?: string) {
    this.token = token
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "DevForge-Portfolio-Generator",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  private async safeJsonParse(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type")
    const responseText = await response.text()

    console.log("Response status:", response.status)
    console.log("Response content-type:", contentType)
    console.log("Response text (first 200 chars):", responseText.substring(0, 200))

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(
        `GitHub API returned non-JSON response: ${response.status} ${response.statusText}. Response: ${responseText.substring(0, 500)}`,
      )
    }

    try {
      return JSON.parse(responseText)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Raw response:", responseText)
      throw new Error(
        `Invalid JSON response from GitHub API: ${parseError instanceof Error ? parseError.message : "Parse failed"}. Response: ${responseText.substring(0, 500)}`,
      )
    }
  }

  async fetchUserData(username: string): Promise<GitHubApiResponse> {
    try {
      console.log(`Fetching user data for: ${username}`)

      // Fetch user profile
      const userResponse = await fetch(`${this.baseUrl}/users/${username}`, {
        headers: this.getHeaders(),
      })

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("User not found")
        }
        const errorText = await userResponse.text()
        throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}. ${errorText}`)
      }

      const userData: GitHubUser = await this.safeJsonParse(userResponse)
      console.log("User data fetched successfully:", userData.login)

      // Fetch user repositories
      console.log("Fetching user repositories...")
      const reposResponse = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`, {
        headers: this.getHeaders(),
      })

      if (!reposResponse.ok) {
        const errorText = await reposResponse.text()
        throw new Error(
          `Failed to fetch repositories: ${reposResponse.status} ${reposResponse.statusText}. ${errorText}`,
        )
      }

      const reposData: GitHubRepo[] = await this.safeJsonParse(reposResponse)
      console.log(`Fetched ${reposData.length} repositories`)

      // Filter out forked repositories and sort by stars
      const filteredRepos = reposData
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)

      console.log(`Filtered to ${filteredRepos.length} non-fork repositories`)

      // Fetch README content for top repositories
      const reposWithReadme = await Promise.all(
        filteredRepos.slice(0, 10).map(async (repo) => {
          try {
            const readmeResponse = await fetch(`${this.baseUrl}/repos/${username}/${repo.name}/readme`, {
              headers: this.getHeaders(),
            })

            if (readmeResponse.ok) {
              const readmeData = await this.safeJsonParse(readmeResponse)
              const readmeContent = Buffer.from(readmeData.content, "base64").toString("utf-8")
              return { ...repo, readme: readmeContent }
            }
          } catch (error) {
            console.log(`No README found for ${repo.name}:`, error instanceof Error ? error.message : "Unknown error")
          }
          return repo
        }),
      )

      return {
        user: userData,
        repos: reposWithReadme,
      }
    } catch (error) {
      console.error("GitHub API Error in fetchUserData:", error)
      throw error
    }
  }

  async validateToken(): Promise<{ valid: boolean; user?: any; scopes?: string[] }> {
    if (!this.token) {
      return { valid: false }
    }

    try {
      console.log("Validating GitHub token...")
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Token validation failed:", response.status, errorText)
        return { valid: false }
      }

      const user = await this.safeJsonParse(response)
      const scopes = response.headers.get("x-oauth-scopes")?.split(", ") || []

      console.log("Token validated successfully for user:", user.login)
      return {
        valid: true,
        user,
        scopes,
      }
    } catch (error) {
      console.error("Token validation error:", error)
      return { valid: false }
    }
  }

  async checkRepositoryExists(owner: string, repo: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, {
        headers: this.getHeaders(),
      })
      return response.ok
    } catch (error) {
      console.error("Error checking repository existence:", error)
      return false
    }
  }

  async createRepository(repoData: {
    name: string
    description?: string
    private?: boolean
    auto_init?: boolean
  }) {
    if (!this.token) {
      throw new Error("GitHub Personal Access Token is required for repository creation")
    }

    console.log("Creating repository with data:", repoData)

    // Validate token and get user info
    const tokenValidation = await this.validateToken()
    if (!tokenValidation.valid) {
      throw new Error("Invalid or expired GitHub token")
    }

    const currentUser = tokenValidation.user
    console.log("Authenticated as:", currentUser.login)
    console.log("Token scopes:", tokenValidation.scopes)

    // Check if repository already exists
    const repoExists = await this.checkRepositoryExists(currentUser.login, repoData.name)
    if (repoExists) {
      throw new Error(`Repository '${repoData.name}' already exists`)
    }

    // Try REST API first (works for Classic tokens with proper scopes)
    try {
      console.log("Attempting REST API repository creation...")
      const restResponse = await fetch(`${this.baseUrl}/user/repos`, {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: repoData.name,
          description: repoData.description || "",
          private: repoData.private || false,
          auto_init: true,
        }),
      })

      console.log("REST API response status:", restResponse.status)

      if (restResponse.ok) {
        const repository = await this.safeJsonParse(restResponse)
        console.log("Repository created successfully via REST API")
        return repository
      }

      const restError = await this.safeJsonParse(restResponse).catch(async () => {
        const errorText = await restResponse.text()
        return { message: errorText }
      })

      console.log("REST API error response:", restError)

      // If it's a scope/permission issue, try GraphQL
      if (restResponse.status === 403 || restResponse.status === 422) {
        console.log("REST API failed, trying GraphQL...")
        return await this.createRepositoryViaGraphQL(repoData, currentUser.login)
      }

      throw new Error(`REST API failed: ${restError.message || restResponse.statusText}`)
    } catch (error) {
      console.error("Repository creation error:", error)

      // If REST fails, try GraphQL as fallback
      if (error instanceof Error && error.message.includes("REST API failed")) {
        console.log("Attempting GraphQL fallback...")
        return await this.createRepositoryViaGraphQL(repoData, currentUser.login)
      }

      throw error
    }
  }

  private async createRepositoryViaGraphQL(
    repoData: { name: string; description?: string; private?: boolean },
    username: string,
  ) {
    console.log("Creating repository via GraphQL...")

    const mutation = `
      mutation CreateRepository($name: String!, $description: String, $visibility: RepositoryVisibility!) {
        createRepository(input: {
          name: $name
          description: $description
          visibility: $visibility
        }) {
          repository {
            id
            name
            url
            owner {
              login
            }
          }
        }
      }
    `

    const variables = {
      name: repoData.name,
      description: repoData.description || "",
      visibility: repoData.private ? "PRIVATE" : "PUBLIC",
    }

    const response = await fetch(`${this.baseUrl}/graphql`, {
      method: "POST",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables,
      }),
    })

    console.log("GraphQL response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}. ${errorText}`)
    }

    const result = await this.safeJsonParse(response)
    console.log("GraphQL response:", result)

    if (result.errors) {
      const errorMessages = result.errors.map((e: any) => e.message).join("; ")
      throw new Error(`GraphQL errors: ${errorMessages}`)
    }

    if (!result.data?.createRepository?.repository) {
      throw new Error("GraphQL mutation succeeded but no repository data returned")
    }

    const repository = result.data.createRepository.repository

    // Create initial commit to establish main branch
    await this.uploadFile(
      username,
      repoData.name,
      "README.md",
      `# ${repoData.name}\n\nPortfolio repository created with DevForge.\n\nGenerated on ${new Date().toISOString()}\n`,
      "Initial commit - Portfolio setup",
    )

    return {
      id: repository.id,
      name: repository.name,
      html_url: repository.url,
      owner: repository.owner,
    }
  }

  async uploadFile(owner: string, repo: string, path: string, content: string, message: string) {
    if (!this.token) throw new Error("GitHub token is required to upload files")

    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`
    const encodedContent = Buffer.from(content).toString("base64")

    // Helper to actually send the PUT request
    const doPut = async (sha?: string) => {
      return await fetch(url, {
        method: "PUT",
        headers: {
          ...this.getHeaders(),
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          content: encodedContent,
          branch: "main", // Explicitly specify branch
          ...(sha && { sha }),
        }),
      })
    }

    // Retry logic with exponential backoff
    const maxRetries = 5
    let delay = 800 // ms

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        console.log(`Uploading ${path} (attempt ${attempt + 1}/${maxRetries})`)

        // If file exists, fetch SHA (optional; ignore 404)
        let sha: string | undefined
        if (attempt === 0) {
          try {
            const getRes = await fetch(url, { headers: this.getHeaders() })
            if (getRes.ok) {
              const existingFile = await this.safeJsonParse(getRes)
              sha = existingFile.sha
            }
          } catch (error) {
            console.log(`File ${path} doesn't exist yet, creating new file`)
          }
        }

        const putRes = await doPut(sha)

        if (putRes.ok) {
          const result = await this.safeJsonParse(putRes)
          console.log(`Successfully uploaded: ${path}`)
          return result
        }

        // Try to parse error response safely
        let errorMessage: string
        try {
          const errorData = await this.safeJsonParse(putRes)
          errorMessage = errorData.message || putRes.statusText
        } catch {
          const errorText = await putRes.text()
          errorMessage = errorText || putRes.statusText
        }

        console.log(`Upload attempt ${attempt + 1} failed:`, putRes.status, errorMessage)

        // Retry only for specific error conditions
        if (
          attempt < maxRetries - 1 &&
          (putRes.status === 403 ||
            putRes.status === 404 ||
            putRes.status === 500 ||
            /resource not accessible/i.test(errorMessage) ||
            /internal server error/i.test(errorMessage))
        ) {
          console.warn(`Retrying upload of ${path} in ${delay}ms...`)
          await new Promise((r) => setTimeout(r, delay))
          delay *= 2
          continue
        }

        throw new Error(`Failed to upload ${path}: ${errorMessage}`)
      } catch (err) {
        console.error(`Upload error for ${path} (attempt ${attempt + 1}):`, err)

        if (attempt < maxRetries - 1) {
          console.warn(`Retrying upload of ${path} in ${delay}ms due to error...`)
          await new Promise((r) => setTimeout(r, delay))
          delay *= 2
          continue
        }
        throw err
      }
    }
  }

  async uploadMultipleFiles(
    owner: string,
    repo: string,
    files: Array<{ path: string; content: string }>,
    commitMessage = "Portfolio files upload",
  ) {
    if (!this.token) {
      throw new Error("GitHub token is required to upload files")
    }

    console.log(`Starting upload of ${files.length} files to ${owner}/${repo}`)

    const results = []
    const errors = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        console.log(`Uploading file ${i + 1}/${files.length}: ${file.path}`)
        const result = await this.uploadFile(owner, repo, file.path, file.content, commitMessage)
        results.push(result)

        // Small delay to avoid rate limiting
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 200))
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        console.error(`Failed to upload ${file.path}:`, errorMessage)
        errors.push({ file: file.path, error: errorMessage })

        // Continue with other files instead of failing completely
        continue
      }
    }

    if (errors.length > 0) {
      console.warn(`Upload completed with ${errors.length} errors:`, errors)
      if (errors.length === files.length) {
        throw new Error(`All file uploads failed. First error: ${errors[0].error}`)
      }
    }

    console.log(`Successfully uploaded ${results.length}/${files.length} files`)
    return results
  }
}

export type { GitHubUser, GitHubRepo, GitHubApiResponse }
