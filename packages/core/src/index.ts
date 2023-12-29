import cors from 'cors'
import express from 'express'
import queryRouter from './routes/query.routes'
import crawlRouter from './routes/crawl.routes'
import { crawlAuth } from './middlewares/auth.middleware'

const app = express()
const PORT = process.env.PORT || 3000

// global middlewares
app.use(express.json())
app.use(cors({ origin: '*' })) // default: allows all origins to access the server

// * routes
app.use('/api', crawlAuth, crawlRouter)
app.use('/api', queryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
