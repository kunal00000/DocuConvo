import { NextFunction, Request, Response } from 'express'
import { prisma } from '@docuconvo/database'

export const crawlAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] // Bearer <token>
  if (!token || token !== process.env.AuthToken)
    return res.status(401).json({ message: 'Not authorized' })

  next()
}

// export const queryAuth = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const api_key_header = req.headers['x-security-path'] // <API KEY: sk-()()>
//   if (api_key_header && typeof api_key_header === 'string') {
//     try {
//       const creatorId = api_key_header.slice(3, 28)
//       const projectId = api_key_header.slice(28, 53)

//       const data = await prisma.project.findUnique({
//         where: {
//           id: projectId,
//           creatorId: creatorId
//         }
//       })

//       req.headers['pinecone-api-key'] = data?.pineconeApiKey as string
//       req.headers['pinecone-environment'] = data?.pineconeEnvironment as string
//       req.headers['pinecone-index-name'] = data?.pineconeIndexName as string
//       req.headers['openai-api-key'] = data?.openaiApiKey as string

//       next()
//     } catch (error) {
//       console.log(error)
//       return res.status(401).json({
//         message: 'Authentication failed'
//       })
//     }
//   } else {
//     return res.status(401).json({
//       message: 'No API key provided'
//     })
//   }
// }
