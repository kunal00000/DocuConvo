import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { Pinecone } from '@pinecone-database/pinecone'
import dotenv from 'dotenv'
dotenv.config()

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
  environment: process.env.PINECONE_ENV!
})

export async function generateEmbeddings(
  datasets: {
    title: string
    url: string | undefined
    text: string | undefined
  }[]
) {
  const pineconeIndex = await pinecone.Index('docusearch')

  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    apiKey: process.env.HF_TOKEN
  })

  await PineconeStore.fromTexts(
    datasets.map((data) => data.text!),
    datasets.map((data) => {
      return { url: data.url }
    }),
    embeddings,
    { pineconeIndex }
  )
}
