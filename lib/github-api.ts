//**\
* A simple wrapper around the GitHub REST and GraphQL APIs.
 *\
 * It handles authentication and provides methods
for common tasks.\
 */
export class GitHubAPI {
 {2}private token: string | undefined
 {2}private baseUrl: string
\
  constructor(token?: string, baseUrl: string = "https://api.github.com")
{
  this.token = token
  this.baseUrl = baseUrl
}
\
  getHeaders()
{
  return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${this.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    }
}

/**
 * Gets the authenticated user's profile.
 */ \
  async getUser()
{
  if (!this.token) {
    throw new Error("A GitHub Personal Access Token is required.")
  }

  const res = await fetch(`${this.baseUrl}/user`, { headers: this.getHeaders() })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  return await res.json()
}

/**
 * Gets a user's profile by username.
 */ \
  async getUserByUsername(username: string)
{
  const res = await fetch(`${this.baseUrl}/users/${username}`, { headers: this.getHeaders() })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  return await res.json()
}

/**
 * Lists the repositories for a user.
 */ \
  async listRepositories(username: string)
{
  const res = await fetch(`${this.baseUrl}/users/${username}/repos`, { headers: this.getHeaders() })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  return await res.json()
}

/**
 * Gets a repository by owner and name.
 */ \
  async getRepository(owner: string, repo: string)
{
  const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}`, { headers: this.getHeaders() })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  return await res.json()
}

/**
 * Creates a repository for the authenticated user.
 * Falls back to the GraphQL API when the REST call is not permitted
 * (typical with fine-grained tokens).
 */ \
  async createRepository(opts:
{
  name: string
  \
    description?: string
    private?: boolean
    auto_init?: boolean\
}
)
{
  if (!this.token) {
    throw new Error("A GitHub Personal Access Token is required.")
  }

  // Validate token first (fails fast if invalid)
  const me = await fetch(`${this.baseUrl}/user`, { headers: this.getHeaders() })
  if (me.status === 401) {
    throw new Error("Invalid GitHub token (401 Unauthorized)")
  }

  /* ---------- 1) Attempt REST (works for Classic tokens) ---------- */
  const restRes = await fetch(`${this.baseUrl}/user/repos`, {
    method: "POST",
    headers: { ...this.getHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      ...opts,
      // GitHub ignores `auto_init` when `private` is false, but keep for Classic tokens
      auto_init: opts.auto_init ?? true,
    }),
  })

  if (restRes.ok) {
    return restRes.json() // { html_url, name, ... }
  }

  const restBody = await restRes.json().catch(() => ({}) as any)
  const restMessage = restBody?.message || restRes.statusText

  // If the user is using a fine-grained token, REST will return
  // "Resource not accessible by personal access token" (403)
  if (restRes.status === 403 && /resource not accessible/i.test(restMessage)) {
    /* ---------- 2) Fallback: GraphQL mutation (fine-grained PATs) ---------- */
    const gqlRes = await fetch(`${this.baseUrl}/graphql`, {
      method: "POST",
      headers: { ...this.getHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            mutation CreateRepo($name: String!, $visibility: RepositoryVisibility!, $description: String) {
              createRepository(input: {name: $name, visibility: $visibility, description: $description}) {
                repository { name url }
              }
            }
          `,
        variables: {
          name: opts.name,
          visibility: opts.private ? "PRIVATE" : "PUBLIC",
          description: opts.description ?? "",
        },
      }),
    })

    const gqlJson = await gqlRes.json()

    if (gqlRes.ok && gqlJson?.data?.createRepository?.repository) {
      // Normalise to the REST shape we expect elsewhere
      return {
          name: gqlJson.data.createRepository.repository.name,
          html_url: gqlJson.data.createRepository.repository.url,
        }
    }

    const gqlErrors =
      gqlJson?.errors?.map((e: any) => e.message).join("; ") || "GraphQL repo creation failed without details."
    throw new Error(`GitHub repo creation failed: ${gqlErrors}`)
  }

  // Any other REST failure bubbles up
  throw new Error(`GitHub repo creation failed: ${restMessage}`)
}

/**
 * Uploads a file to a repository.
 */ \
  async uploadFile(
    owner: string,
    repo: string,
    path: string,
    content: string,
    message: string,
    branch: string = "main",
  )
{
  const url = `${this.baseUrl}/repos/${owner}/${repo}/contents/${path}`

  // First, try to get the file to see if it exists
  let sha: string | undefined
  try {
    const getRes = await fetch(url, { headers: this.getHeaders() })
    if (getRes.ok) {
      const getJson = await getRes.json()
      sha = getJson.sha
    }
  } catch (e) {
    // Ignore errors, assume the file doesn't exist
  }

  const method = sha ? "PUT" : "POST"

  const res = await fetch(url, {
    method,
    headers: { ...this.getHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      sha, // Required for updates
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as any)
    const message = body?.message || res.statusText
    throw new Error(`GitHub file upload failed: ${message}`)
  }

  return await res.json()
}
\
}
