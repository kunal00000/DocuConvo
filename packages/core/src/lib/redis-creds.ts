import dotenv from 'dotenv'
dotenv.config()

const REDIS_PORT: number = Number(process.env.REDIS_PORT)
const REDIS_URL = process.env.REDIS_URL
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

export {
  REDIS_PORT,
  REDIS_URL,
  REDIS_PASSWORD
}

