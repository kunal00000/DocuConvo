import { Request, Response } from 'express'
import { runCrawl } from '../main'
import dotenv from 'dotenv'
dotenv.config()

export async function crawlController(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1] // Bearer <token>
  if (!token || token !== process.env.AuthToken)
    return res.status(401).json({ message: 'Not authorized' })

  const {
    websiteUrl,
    match,
    cssSelector,
    maxPagesToCrawl,
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    hfApiKey,
    projectId
  } = req.body

  const { success } = await runCrawl(
    websiteUrl,
    match,
    cssSelector,
    maxPagesToCrawl,
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    hfApiKey,
    projectId
  )
  return res.status(200).json({ message: success })
}
