export class Docuconvo {
  private docuconvo_key: string

  constructor({ docuconvo_key }: { docuconvo_key: string }) {
    this.docuconvo_key = docuconvo_key
  }

  public async search(searchQuery: string) {
    try {
      const response = await fetch(
        `https://docuconvo-core.onrender.com/api/query?q=${searchQuery}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.docuconvo_key}`
          },
          body: JSON.stringify({
            messages: [{ content: searchQuery, role: 'user' }]
          })
        }
      )

      const data = await response.json()
      if (data.error) throw new Error(data.error.message)
      return data
    } catch (error) {
      throw error // Rethrow the error for further handling
    }
  }
}
