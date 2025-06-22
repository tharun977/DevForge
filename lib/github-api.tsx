class GithubAPI {
  private owner: string
  private repo: string
  private token: string

  constructor(owner: string, repo: string, token: string) {
    this.owner = owner
    this.repo = repo
    this.token = token
  }

  private getHeaders() {
    return {
      Authorization: `token ${this.token}`,
    }
  }

  async uploadFile(path: string, content: string, message: string, sha?: string): Promise<void> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`
    const encodedContent = Buffer.from(content).toString("base64")

    const maxRetries = 5
    let delay = 800 // ms  → 0.8 s, will double each retry

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const putRes = await fetch(url, {
          method: "PUT",
          headers: {
            ...this.getHeaders(),
            Accept: "application/vnd.github+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            content: encodedContent,
            branch: "main", // <-- always commit to main
            ...(sha && { sha }),
          }),
        })

        if (!putRes.ok) {
          const msg = `${putRes.status} ${putRes.statusText} ${await putRes.text()}`
          console.warn(`PUT ${path} failed (attempt ${attempt + 1}/${maxRetries}) – ${msg}; retrying in ${delay} ms…`)
          await new Promise((r) => setTimeout(r, delay))
          delay *= 2
          continue
        }

        return
      } catch (err) {
        if (attempt < maxRetries - 1) {
          console.warn(
            `uploadFile error (attempt ${attempt + 1}/${maxRetries}) – ${err instanceof Error ? err.message : err}; retrying in ${delay} ms…`,
          )
          await new Promise((r) => setTimeout(r, delay))
          delay *= 2
          continue
        }
        throw err
      }
    }
  }
}
