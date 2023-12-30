export class Docuconvo {
  private docuconvo_key: string

  constructor(key: string) {
    this.docuconvo_key = key
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
      return data
    } catch (error) {
      throw error // Rethrow the error for further handling
    }
  }
}

;(async () => {
  try {
    const x = new Docuconvo(
      'sk-clqmwe56l0000pexxj6cntpulclqr4gbnn0001pjampa2l9tkt'
    )
    const data = await x.search('next js')
    console.log(data)
  } catch (error) {
    console.error('Error during execution:', error)
  }
})()
