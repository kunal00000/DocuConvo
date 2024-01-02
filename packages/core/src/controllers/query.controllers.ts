import type { Request, Response } from 'express'
import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

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

    const pineconeIndex = await pinecone.Index(pineconeIndexName)

    const embeddings = new HuggingFaceInferenceEmbeddings({
      model: 'sentence-transformers/all-MiniLM-L6-v2',
      apiKey: openaiApiKey
    })

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex
    })

    // similar vectors
    const results = await vectorStore.similaritySearch(searchQuery, 2, {
      project: projectId
    })

    // TODO: gpt interaction

    return res.status(200).json({
      success: true,
      message: 'Answer generated successfully.',
      answer: results
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: `Something went wrong: ${err.message}.`,
      answer: null
    })
  }
}
