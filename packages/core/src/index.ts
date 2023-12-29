import cors from 'cors'
import express from 'express'
import queryRouter from './routes/query.routes'
import crawlRouter from './routes/crawl.routes'
import { queryAuth } from './middlewares/auth.middleware'

const app = express()
const PORT = process.env.PORT || 3000

// global middlewares
app.use(express.json())
app.use(cors({ origin: '*' })) // default: allows all origins to access the server

// * routes
app.use('/api', crawlRouter)
app.use('/api', queryAuth, queryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
