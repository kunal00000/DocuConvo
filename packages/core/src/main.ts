import { PlaywrightCrawler } from 'crawlee'

import { generateEmbeddings } from './lib/generate-embeddings'
import { DocMetadata } from './types/docs'

export async function runCrawl(
  websiteUrl: string,
  match: string,
  cssSelector: string,
  maxPagesToCrawl: number,
  pineconeApiKey: string,
  pineconeEnvironment: string,
  pineconeIndexName: string,
  hfApiKey: string,
  projectId: string
) {
  let data: DocMetadata[] = []
  const saveData = ({ title, url, text }: DocMetadata) => {
    // TODO: optimise to check if doc with title already exist in data
    let isExist = false
    data.forEach((d) => {
      if (d.url === url) {
        isExist = true
        return
      }
    })
    if (!isExist) data.push({ title, url, text })
  }

  const crawler = new PlaywrightCrawler({
    requestHandler: async ({ page, request, enqueueLinks, pushData, log }) => {
      await enqueueLinks({
        globs: typeof match === 'string' ? [match] : match // Queue all link with this pattern to crawl
      })

      const title = await page.title()
      log.info(`✅ ${title}`, { url: request.loadedUrl })

      let docTextContent: string | null

      if (cssSelector) {
        await page.waitForSelector(cssSelector)
        docTextContent = await page.$eval(cssSelector, (el) => el.textContent)
      } else {
        docTextContent = await page.textContent('body') // If selector is not provided, extract all text from the page.
      }

      // Remove extra \n and spacess to save storage and tokens
      const cleanText = docTextContent?.replace(/\n/g, ' ').replace(/\s+/g, ' ')

      pushData({ title, url: request.loadedUrl, text: cleanText })
      // save data for further creating and storing embeddings
      saveData({ title, url: request.loadedUrl, text: cleanText })
    },
    headless: true,
    maxRequestsPerCrawl: maxPagesToCrawl
  })

  try {
    await crawler.run([websiteUrl])

    await crawler.requestQueue?.drop()

    await generateEmbeddings(data, {
      pineconeApiKey,
      pineconeEnvironment,
      pineconeIndexName,
      hfApiKey,
      projectId
    })
    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}
