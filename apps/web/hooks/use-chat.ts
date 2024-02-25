import { useState } from 'react'

export const useChat = ({ project }) => {
  const [messages, setMessages] = useState<
    { content: string; role: 'user' | 'ai' }[]
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setMessages([...messages, { content: input, role: 'user' }])
    setInput('')

    try {
      fetch(`https://docuconvo-core.onrender.com/api/query?q=${input}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${project.docuconvo_key}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages([
            ...messages,
            { content: input, role: 'user' },
            { content: data.answer, role: 'ai' }
          ])
          setIsLoading(false)
        })
        .catch((err) => console.log(err))
    } catch (error) {
      setIsLoading(false)
      alert('Error sending message')
      console.error('Error sending message:', error)
    }
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
  }
}
