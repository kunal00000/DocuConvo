import cors from 'cors'
import express from 'express'

import { queryAuth } from './middlewares/auth.middleware'
import queryRouter from './routes/query.routes'
import queueRouter from './routes/queue.routes'

const app = express()
const PORT = process.env.PORT || 3000

// global middlewares
app.use(express.json())
app.use(cors({ origin: '*' })) // default: allows all origins to access the server

// * routes
app.use('/api', queueRouter)
app.use('/api', queryAuth, queryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
