import { Pinecone } from '@pinecone-database/pinecone'
import { config } from '../config'

// TODO: handle when vector store is not pinecone
export const pinecone = new Pinecone({
  apiKey: config.pinecone?.apiKey!,
  environment: config.pinecone?.environment!
})
