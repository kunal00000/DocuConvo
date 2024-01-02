import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export const configSchema = z.object({
  org: z.object({
    name: z.string(),
    projectName: z.string(),
    docuconvoApiKey: z.string()
  }),

  crawlInfo: z.object({
    startingUrl: z.string(),
    match: z.string().or(z.array(z.string())).optional(),
    selector: z.string().optional(),
    maxPagesToCrawl: z.number().int().positive().optional()
  }),

  vectorStore: z.enum(['pinecone', 'supabase']),

  aiModel: z.enum(['openai', 'huggingface']),

  pinecone: z
    .object({
      apiKey: z.string(),
      environment: z.string(),
      indexName: z.string()
    })
    .optional(),

  openai: z
    .object({
      apiKey: z.string(),
      searchModel: z.string(),
      embeddingModel: z.string()
    })
    .optional(),

  huggingface: z
    .object({
      apiKey: z.string(),
      embeddingModel: z.string()
    })
    .optional()
})

export type Config = z.infer<typeof configSchema>

// TODO: remove config and seek input for these values from user
export const config: Config = {
  org: {
    name: 'nextjs',
    projectName: 'docs',
    docuconvoApiKey: 'sk_test_51J0Q'
  },
  crawlInfo: {
    startingUrl: 'https://nextjs.org/docs',
    match: 'https://nextjs.org/docs/**',
    selector: '[data-docs]',
    maxPagesToCrawl: 20
  },
  vectorStore: 'pinecone',
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY!,
    environment: 'gcp-starter',
    indexName: 'docusearch'
  },
  aiModel: 'huggingface',
  huggingface: {
    apiKey: process.env.HF_TOKEN!,
    embeddingModel: 'sentence-transformers/all-MiniLM-L6-v2'
  }
}
