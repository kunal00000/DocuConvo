import { HuggingFaceInferenceEmbeddings } from 'langchain/embeddings/hf'
import { PineconeStore } from 'langchain/vectorstores/pinecone'

import { Index, Pinecone, RecordMetadata } from '@pinecone-database/pinecone'

import { DocMetadata } from '../types/docs'

// TODO: handle when vector store is not pinecone
// TODO: handle when embeddings are stored already
export async function generateEmbeddings(
  dataset: DocMetadata[],
  {
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    hfApiKey,
    projectId
  }: {
    pineconeApiKey: string
    pineconeEnvironment: string
    pineconeIndexName: string
    hfApiKey: string
    projectId: string
  }
) {
  const pinecone = new Pinecone({
    apiKey: pineconeApiKey,
    environment: pineconeEnvironment
  })

  const pineconeIndex = await pinecone.Index(pineconeIndexName)

  const embeddings = new HuggingFaceInferenceEmbeddings({
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    apiKey: hfApiKey
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
}

export async function checkIfEmbeddingsExist(
  pineconeIndex: Index<RecordMetadata>,
  embeddings: HuggingFaceInferenceEmbeddings,
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
