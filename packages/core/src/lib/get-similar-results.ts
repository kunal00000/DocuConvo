import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { pinecone } from './pinecone'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { Config } from '../config'

export async function getVectorSearch(
  query: string,
  config: Config
): Promise<any[]> {
  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: config.huggingface?.embeddingModel,
    apiKey: config.huggingface?.apiKey
  })

  const pineconeIndex = await pinecone.Index(config.pinecone?.indexName!)

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex
  })

  const results = await vectorStore.similaritySearch(query, 1, {
    org: config.org.name,
    project: config.org.projectName
  })
  return results
}
