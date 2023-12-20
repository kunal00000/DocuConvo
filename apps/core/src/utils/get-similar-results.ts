import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { pinecone } from './generate-embeddings'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import dotenv from 'dotenv'
dotenv.config()

export async function getSimilaritySearchResults(
  query: string
): Promise<any[]> {
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    apiKey: process.env.HF_TOKEN
  })

  const pineconeIndex = await pinecone.Index('docusearch')

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex
  })

  // 2. find similar vectors
  const results = await vectorStore.similaritySearch(query, 1)
  return results
}
