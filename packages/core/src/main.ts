import { PlaywrightCrawler } from 'crawlee'
import { generateEmbeddings } from './lib/generate-embeddings'
import { config } from './config'
import { DocMetadata } from './types/docs'

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
      globs:
        typeof config.crawlInfo.match === 'string'
          ? [config.crawlInfo.match]
          : config.crawlInfo.match // Queue all link with this pattern to crawl
    })

    const title = await page.title()
    log.info(`✅ ${title}`, { url: request.loadedUrl })

    let docTextContent: string | null

    if (config.crawlInfo.selector) {
      await page.waitForSelector(config.crawlInfo.selector)
      docTextContent = await page.$eval(
        config.crawlInfo.selector,
        (el) => el.textContent
      )
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
  maxRequestsPerCrawl: config.crawlInfo.maxPagesToCrawl
})

try {
  await crawler.run([config.crawlInfo.startingUrl])
  await generateEmbeddings(data, config)
} catch (e) {
  console.log(e)
}
