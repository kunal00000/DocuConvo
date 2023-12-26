import { z } from 'zod'

export const websiteInfoSchema = z.object({
  projectName: z.string().min(1, 'Name should be at least 1 character'),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' }),
  match: z.string(),
  cssSelector: z.string().min(1)
  // maxPagesToCrawl: z
  //   .number()
  //   .int()
  //   .positive({ message: 'value should be positive' })
})

type webForm = z.infer<typeof websiteInfoSchema>
export type WebInfo = webForm & {
  maxPagesToCrawl: number
}

export const pineconeInfoSchema = z.object({
  pinecone_ApiKey: z
    .string()
    .min(10, { message: 'Please enter a valid API key' }),
  pinecone_environment: z.enum([
    'gcp-starter',
    'eu-west4-gcp',
    'northamerica-northeast1-gcp',
    'asia-northeast1-gcp',
    'asia-southeast1-gcp',
    'us-east4-gcp',
    'us-west4-gcp',
    'us-central1-gcp',
    'us-west1-gcp',
    'us-east1-gcp',
    'eu-west1-gcp'
  ]),
  pinecone_indexName: z
    .string()
    .min(1, { message: 'Please enter a valid index name' })
})

export type PineconeForm = z.infer<typeof pineconeInfoSchema>

export const openAiSchema = z.object({
  openai_ApiKey: z.string().min(10, { message: 'Please enter a valid API key' })
})

export type OpenAiForm = z.infer<typeof openAiSchema>

export const projectFormSchema = z.object({
  project: websiteInfoSchema,

  pinecone: pineconeInfoSchema,

  openai: openAiSchema
})

export type ProjectForm = z.infer<typeof projectFormSchema>
