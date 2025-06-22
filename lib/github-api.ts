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

  async createRepository(repoData: {
    name: string
    description?: string
    private?: boolean
    auto_init?: boolean
  }) {
    if (!this.token) {
      throw new Error("A GitHub Personal Access Token with repo creation permission is required.")
    }

    // Validate token first – helps us fail fast with a clearer error
    const me = await fetch(`${this.baseUrl}/user`, { headers: this.getHeaders() })
    if (me.status === 401) {
      throw new Error("Invalid GitHub token (401 Unauthorized)")
    }

    // Try REST API first (works for Classic tokens)
    const restRes = await fetch(`${this.baseUrl}/user/repos`, {
      method: "POST",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...repoData,
        auto_init: repoData.auto_init ?? true,
      }),
    })

    if (restRes.ok) {
      return await restRes.json()
    }

    const restBody = await restRes.json().catch(() => ({}))
    const restMessage = restBody?.message || restRes.statusText

    // If fine-grained token, REST will return "Resource not accessible"
    if (restRes.status === 403 && /resource not accessible/i.test(restMessage)) {
      // Fallback to GraphQL mutation for fine-grained PATs
      const gqlRes = await fetch(`${this.baseUrl}/graphql`, {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation CreateRepo($name: String!, $visibility: RepositoryVisibility!, $description: String) {
              createRepository(input: {name: $name, visibility: $visibility, description: $description}) {
                repository { 
                  name 
                  url 
                  owner { login }
                }
              }
            }
          `,
          variables: {
            name: repoData.name,
            visibility: repoData.private ? "PRIVATE" : "PUBLIC",
            description: repoData.description || "",
          },
        }),
      })

      const gqlJson = await gqlRes.json()

      if (gqlRes.ok && gqlJson?.data?.createRepository?.repository) {
        const repo = gqlJson.data.createRepository.repository

        // Create initial README to establish main branch
        await this.uploadFile(
          repo.owner.login,
          repo.name,
          "README.md",
          `# ${repo.name}\n\nPortfolio repository created with DevForge.\n`,
          "Initial commit",
        )

        return {
          name: repo.name,
          html_url: repo.url,
          owner: repo.owner,
        }
      }

      const gqlErrors = gqlJson?.errors?.map((e: any) => e.message).join("; ") || "GraphQL repo creation failed"
      throw new Error(`GitHub repo creation failed: ${gqlErrors}`)
    }

    // Any other REST failure
    throw new Error(`GitHub repo creation failed: ${restMessage}`)
  }

  async uploadFile(owner: string, repo: string, path: string, content: string, message: string) {
    if (!this.token) {
      throw new Error("GitHub token is required to upload files")
    }

    const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`
    const encodedContent = Buffer.from(content).toString("base64")

    // Check if file exists first
    let sha: string | undefined
    try {
      const getRes = await fetch(url, { headers: this.getHeaders() })
      if (getRes.ok) {
        const getJson = await getRes.json()
        sha = getJson.sha
      }
    } catch (error) {
      // File doesn't exist, that's fine
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
        ...(sha && { sha }), // Include SHA if updating existing file
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`Failed to upload file: ${errorData.message || response.statusText}`)
    }

    return await response.json()
  }

  async uploadMultipleFiles(
    username: string,
    repoName: string,
    files: Array<{
      path: string
      content: string
    }>,
    message: string,
  ) {
    if (!this.token) {
      throw new Error("GitHub token is required to upload files")
    }

    // Get the latest commit SHA
    const branchResponse = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/git/refs/heads/main`, {
      headers: this.getHeaders(),
    })

    if (!branchResponse.ok) {
      throw new Error("Failed to get branch information")
    }

    const branchData = await branchResponse.json()
    const latestCommitSha = branchData.object.sha

    // Get the tree SHA from the latest commit
    const commitResponse = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/git/commits/${latestCommitSha}`, {
      headers: this.getHeaders(),
    })

    if (!commitResponse.ok) {
      throw new Error("Failed to get commit information")
    }

    const commitData = await commitResponse.json()
    const baseTreeSha = commitData.tree.sha

    // Create tree with all files
    const tree = files.map((file) => ({
      path: file.path,
      mode: "100644",
      type: "blob",
      content: file.content,
    }))

    const treeResponse = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/git/trees`, {
      method: "POST",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree,
      }),
    })

    if (!treeResponse.ok) {
      throw new Error("Failed to create tree")
    }

    const treeData = await treeResponse.json()

    // Create commit
    const newCommitResponse = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/git/commits`, {
      method: "POST",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    })

    if (!newCommitResponse.ok) {
      throw new Error("Failed to create commit")
    }

    const newCommitData = await newCommitResponse.json()

    // Update reference
    const updateRefResponse = await fetch(`${this.baseUrl}/repos/${username}/${repoName}/git/refs/heads/main`, {
      method: "PATCH",
      headers: {
        ...this.getHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sha: newCommitData.sha,
      }),
    })

    if (!updateRefResponse.ok) {
      throw new Error("Failed to update reference")
    }

    return await updateRefResponse.json()
  }
}

export type { GitHubUser, GitHubRepo, GitHubApiResponse }
