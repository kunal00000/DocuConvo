import { z } from 'zod'

export const projectFormSchema = z.object({
  id: z.string(),
  projectName: z.string().min(1, 'Name should be at least 1 character'),
  websiteUrl: z.string().url({ message: 'Please enter a valid URL' }),
  match: z.string(),
  cssSelector: z.string().min(1),
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
    .min(1, { message: 'Please enter a valid index name' }),
  openai_ApiKey: z.string().min(10, { message: 'Please enter a valid API key' })
})
