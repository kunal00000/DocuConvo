import { PlaywrightCrawler, Configuration } from 'crawlee'

import { generateEmbeddings } from './lib/generate-embeddings.js'
import { DocMetadata } from './types/docs.js'

export async function runCrawler(
  websiteUrl: string,
  match: string,
  cssSelector: string,
  maxPagesToCrawl: number,
  pineconeApiKey: string,
  pineconeEnvironment: string,
  pineconeIndexName: string,
  openaiApiKey: string,
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

  const crawler = new PlaywrightCrawler(
    {
      requestHandler: async ({
        page,
        request,
        enqueueLinks,
        pushData,
        log
      }) => {
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
        const cleanText = docTextContent
          ?.replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')

        pushData({ title, url: request.loadedUrl, text: cleanText })
        // save data for further creating and storing embeddings
        saveData({ title, url: request.loadedUrl, text: cleanText })
      },
      launchContext: {
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      },
      headless: true,
      maxRequestsPerCrawl: maxPagesToCrawl
    },
    new Configuration({
      persistStorage: false
    })
  )

  try {
    await crawler.run([websiteUrl])

    await crawler.requestQueue?.drop()

    await generateEmbeddings(data, {
      pineconeApiKey,
      pineconeEnvironment,
      pineconeIndexName,
      openaiApiKey,
      projectId
    })
    return { success: true, message: 'crawl completed' }
  } catch (error: any) {
    throw new Error(error.message)
    // return { success: false, error: 'Crawl: '+error.message }
  }
}
