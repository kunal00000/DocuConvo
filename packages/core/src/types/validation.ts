import { z } from 'zod'

export const pineconeSchema = z.object({
  apiKey: z.string(),
  /**
   * @example gcp-starter
   */
  environment: z.string(),
  indexName: z.string()
})

export const openaiSchema = z.object({
  apiKey: z.string(),
  searchModel: z.string(),
  embeddingModel: z.string()
})

export const huggingfaceSchema = z.object({
  apiKey: z.string(),
  embeddingModel: z.string()
})

export const orgSchema = z.object({
  /**
   * Organisation name
   * @example nextjs
   */
  name: z.string(),
  /**
   * Project name
   * @example nextjs-website-docs
   */
  projectName: z.string(),
  /**
   * Docuconvo API key, get it from https://docuconvo.com/dashboard
   * @example sk_test_51J0Q
   */
  docuconvoApiKey: z.string(),
  /**
   * Crawler configuration
   */
  crawlInfo: z.object({
    /**
     * URL to start the crawl, if url is a sitemap, it will crawl all pages in the sitemap
     * - prefered to use documentation url for better results
     * @example "https://www.nextjs.org/docs"
     * @example "https://www.nextjs.org/sitemap.xml"
     * @default ""
     */
    startingUrl: z.string(),
    /**
     * Pattern to match against for links on a page to subsequently crawl
     * @example "https://www.nextjs.org/docs/**"
     * @default ""
     */
    match: z.string().or(z.array(z.string())).optional(),
    /**
     * Selector to grab the inner text from
     * - prefered to use for better accurate results
     * @example ".data-docs-container"
     * @default ""
     */
    selector: z.string().optional(),
    /**
     * Don't crawl more than this many pages
     * @example 50
     */
    maxPagesToCrawl: z.number().int().positive().optional()
  })
})
