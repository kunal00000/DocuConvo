export class Docuconvo {
  private docuconvo_key: string

  constructor({ docuconvo_key }: { docuconvo_key: string }) {
    this.docuconvo_key = docuconvo_key
  }

  public async search(searchQuery: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/query?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${this.docuconvo_key}`
          }
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
