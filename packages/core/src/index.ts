import cors from 'cors'
import express, { type Request, type Response } from 'express'
import queryRouter from './routes/query.routes'

const app = express()
const PORT = process.env.PORT || 3000

// global middlewares
app.use(express.json())
app.use(cors({ origin: '*' })) // default: allows all origins to access the server

// * routes
app.get('/', (res: Response) => {
  res.status(200).json({ message: 'Welcome to Create-KREST API' })
})
app.use('/api', queryRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
