import { Pinecone } from '@pinecone-database/pinecone'
import type { Request, Response } from 'express'
import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

export const searchQuery = (req: Request, res: Response) => {
  try {
    const { searchQuery: query } = req.body
    console.log(searchQuery)

    // const pinecone = new Pinecone({
    //   apiKey: apiKey,
    //   environment: environment
    // })

    // const embeddings = new HuggingFaceInferenceEmbeddings({
    //   model: embeddingModel,
    //   apiKey: apiKey
    // })

    // const pineconeIndex = await pinecone.Index(indexName)

    // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    //   pineconeIndex
    // })

    // const results = await vectorStore.similaritySearch(query, maxResults, {
    //   project: projectName
    // })

    // further provide the results to GPT-3.5 to get the answer

    return res.status(200).json({
      success: true,
      message: 'here is your answer',
      answer: 'answer'
    })
  } catch (err: any) {
    return res.status(404).json({
      success: false,
      message: `Something went wrong: ${err.message}`,
      answer: null
    })
  }
}
