import cors from 'cors'
import express from 'express'

import { queryAuth } from './middlewares/auth.middleware.js'
import queryRouter from './routes/query.routes.js'
import queueRouter from './routes/queue.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

// global middlewares
app.use(express.json())
app.use(cors({ origin: '*' })) // default: allows all origins to access the server

// * routes
app.get('/', (req, res) => {
  console.log(req.headers)
  res.send('Hello World!')
})
app.use('/api', queueRouter)
app.use('/api', queryAuth, queryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
