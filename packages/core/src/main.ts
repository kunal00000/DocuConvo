// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from 'crawlee'
import { generateEmbeddings } from './utils/generate-embeddings'
import { getSimilaritySearchResults } from './utils/get-similar-results'

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, request, enqueueLinks, pushData, log }) => {
    await enqueueLinks({
      // Queue all link with this pattern to crawl
      globs: ['https://nextjs.org/docs/**/*']
    })

    // Wait for the <article> to render.
    await page.waitForSelector('article')
    const title = await page.title()
    // log.info(`${title}`, { url: request.loadedUrl })
    console.log(`✅ ${title}, ${request.url}`)

    // Execute a function in the browser which targets
    // the article elements and allows their manipulation.
    const docsContent = await page.$$eval('[data-docs]', (els) => {
      // Extract text content from the
      return els.map((el) => el.textContent)
    })

    const datasets = docsContent.map((text) => {
      // Remove extra \n and spacess to save storage and tokens
      const textWithoutNextLine = text?.replace(/\n/g, ' ')
      const cleanText = textWithoutNextLine?.replace(/\s+/g, ' ')

      pushData({ title, url: request.loadedUrl, text: cleanText })
      return { title, url: request.loadedUrl, text: cleanText }
    })

    // Generate and store embeddings for the dataset to be searchable.
    generateEmbeddings([...new Set(datasets)])
  },
  headless: true,
  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 8
})

await crawler.run(['https://nextjs.org/docs']).then(async () => {
  console.log('crawling done 🚀, now question time...')

  const response = await getSimilaritySearchResults('What is parallel routing?')
  console.log('🔴 Found ', response)
})
