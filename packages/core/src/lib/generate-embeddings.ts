import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'

import { DocMetadata } from '../types/docs.js'

// TODO: handle when vector store is not pinecone
// TODO: handle when embeddings are stored already
export async function generateEmbeddings(
  dataset: DocMetadata[],
  {
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    openaiApiKey,
    projectId
  }: {
    pineconeApiKey: string
    pineconeEnvironment: string
    pineconeIndexName: string
    openaiApiKey: string
    projectId: string
  }
) {
  try {
    const pinecone = new Pinecone({
      apiKey: pineconeApiKey,
      environment: pineconeEnvironment
    })

    const pineconeIndex = await pinecone.Index(pineconeIndexName)

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: openaiApiKey
    })

    const { isExist } = await checkIfEmbeddingsExist(
      pineconeIndex,
      embeddings,
      projectId
    )

    if (isExist) {
      // delete existing embeddings
      // TODO: Delete for same urls only not for all (org and project)
      // TODO: Filters in this operation are not supported 'Starter'
      // TODO: Switch to supabase or Use deleteAll for now (self-host)
      await pineconeIndex.deleteAll()
    }

    await PineconeStore.fromTexts(
      dataset.map((data) => data.text!),
      dataset.map((data) => {
        return {
          url: data.url,
          project: projectId
        }
      }),
      embeddings,
      { pineconeIndex }
    )

    return { success: true, message: 'Embeddings generated successfully' }
  } catch (error: any) {
    throw new Error(error.message)
    // return { success: false, message: 'Embeddings: ' + error.message }
  }
}

export async function checkIfEmbeddingsExist(
  pineconeIndex: Index<RecordMetadata>,
  embeddings: OpenAIEmbeddings,
  projectId: string
) {
  const { totalRecordCount } = await pineconeIndex.describeIndexStats()

  if (totalRecordCount && totalRecordCount > 0) {
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex
    })

    const results = await vectorStore.similaritySearch('', 1000, {
      project: projectId
    })

    if (results.length > 0) {
      return { isExist: true, count: results.length }
    }
  }
  return { isExist: false, count: 0 }
}
