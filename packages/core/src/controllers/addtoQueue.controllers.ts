import Bull from 'bull'
import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from '../lib/redis-creds'

import { Request, Response } from 'express'

export const crawlQueue = new Bull('task', {
  redis: {
    password: REDIS_PASSWORD,
    host: REDIS_URL,
    port: REDIS_PORT
  }
})

export async function addToQueue(req: Request, res: Response) {
  const body = await req.body
  // TODO: add relevant data that can be used for further action for example Docuconvo api and other user things
  await crawlQueue.add({
    body
  })
  return res.status(200).json(`Successfully added to Queue`)

}



