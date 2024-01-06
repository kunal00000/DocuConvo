import type { Request, Response } from 'express'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { Configuration, OpenAIApi, ResponseTypes } from 'openai-edge'

import { Pinecone } from '@pinecone-database/pinecone'

export const searchQuery = async (req: Request, res: Response) => {
  const {
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    openaiApiKey,
    projectId
  } = req.body

  const searchQuery = req.query.q as string

  try {
    const pinecone = new Pinecone({
      apiKey: pineconeApiKey,
      environment: pineconeEnvironment
    })
    const configuration = new Configuration({
      apiKey: openaiApiKey
    })
    const openai = new OpenAIApi(configuration)

    const pineconeIndex = await pinecone.Index(pineconeIndexName)

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openaiApiKey
    })

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex
    })

    // similar vectors
    const results = await vectorStore.similaritySearch(searchQuery, 2, {
      project: projectId
    })
    let contextText: string =
      results[0]?.pageContent.replace(/<[^>]*>?/gm, '') +
      ' ' +
      results[1]?.pageContent.replace(/<[^>]*>?/gm, '')

    //gpt 3.5 turbo
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: getPrompt(searchQuery, contextText)
        }
      ],
      max_tokens: 512,
      temperature: 0
    })

    const data =
      (await response.json()) as ResponseTypes['createChatCompletion']

    const answer = data.choices[0].message

    return res.status(200).json({
      success: true,
      message: 'Query successful.',
      answer: answer?.content
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: `Something went wrong: ${err.message}.`,
      answer: null
    })
  }
}

const getPrompt = (query: string, context: string) => {
  return `
  ${`
    You are a very enthusiastic Organisation representative who loves
    to help people! Given the following sections from the Organisation
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that."
  `}

  Context sections:
  ${context}

  Question: """
  ${query}
  """

  Answer as markdown (including related code snippets if available):
`
}
