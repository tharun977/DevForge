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

  async fetchUserData(username: string): Promise<GitHubApiResponse> {
    try {
      // Fetch user profile
      const userResponse = await fetch(`${this.baseUrl}/users/${username}`, {
        headers: this.getHeaders(),
      })

      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error("User not found")
        }
        throw new Error(`Failed to fetch user data: ${userResponse.statusText}`)
      }

      const userData: GitHubUser = await userResponse.json()

      // Fetch user repositories
      const reposResponse = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`, {
        headers: this.getHeaders(),
      })

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`)
      }

      const reposData: GitHubRepo[] = await reposResponse.json()

      // Filter out forked repositories and sort by stars
      const filteredRepos = reposData
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)

      // Fetch README content for top repositories
      const reposWithReadme = await Promise.all(
        filteredRepos.slice(0, 10).map(async (repo) => {
          try {
            const readmeResponse = await fetch(`${this.baseUrl}/repos/${username}/${repo.name}/readme`, {
              headers: this.getHeaders(),
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

      return {
        user: userData,
        repos: reposWithReadme,
      }
    } catch (error) {
      console.error("GitHub API Error:", error)
      throw error
    }
  }

  async validateToken(): Promise<{ valid: boolean; user?: any; scopes?: string[] }> {
    if (!this.token) {
      return { valid: false }
    }

    try {
      const response = await fetch(`${this.baseUrl}/user`, {
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        return { valid: false }
      }

      const user = await response.json()
      const scopes = response.headers.get("x-oauth-scopes")?.split(", ") || []

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
    } catch {
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
        const repository = await restResponse.json()
        console.log("Repository created successfully via REST API")
        return repository
      }

      const restError = await restResponse.json().catch(() => ({}))
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
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = await response.json()
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
    if (!this.token) {
      throw new Error("GitHub token is required to upload files")
    }

    console.log(`Uploading file: ${path} to ${owner}/${repo}`)

    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`
    const encodedContent = Buffer.from(content).toString("base64")

    // Check if file exists first
    let sha: string | undefined
    try {
      const getResponse = await fetch(url, { headers: this.getHeaders() })
      if (getResponse.ok) {
        const existingFile = await getResponse.json()
        sha = existingFile.sha
        console.log(`File ${path} exists, updating with SHA: ${sha}`)
      }
    } catch (error) {
      console.log(`File ${path} doesn't exist, creating new file`)
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: encodedContent,
        ...(sha && { sha }),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error(`Failed to upload ${path}:`, errorData)
      throw new Error(`Failed to upload file ${path}: ${errorData.message || response.statusText}`)
    }

    const result = await response.json()
    console.log(`Successfully uploaded: ${path}`)
    return result
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

    console.log(`Uploading ${files.length} files to ${owner}/${repo}`)

    const results = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        console.log(`Uploading file ${i + 1}/${files.length}: ${file.path}`)
        const result = await this.uploadFile(owner, repo, file.path, file.content, commitMessage)
        results.push(result)

        // Small delay to avoid rate limiting
        if (i < files.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      } catch (error) {
        console.error(`Failed to upload ${file.path}:`, error)
        throw new Error(`Failed to upload ${file.path}: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }

    console.log(`Successfully uploaded all ${files.length} files`)
    return results
  }
}

export type { GitHubUser, GitHubRepo, GitHubApiResponse }
