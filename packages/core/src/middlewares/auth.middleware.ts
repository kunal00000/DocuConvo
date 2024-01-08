import { NextFunction, Request, Response } from 'express'

import { prisma } from '../lib/db.js'

export const queryAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1] // <Bearer sk-()()>
  if (token) {
    try {
      const creatorId = token.slice(3, 28)
      const projectId = token.slice(28, 53)

      const data = await prisma.project.findUnique({
        where: {
          id: projectId,
          creatorId: creatorId
        }
      })

      if (!data) {
        return res.status(404).json({
          error: {
            message:
              'No docuconvo project found. Try creating a project first at https://docuconvo.com/dashboard',
            type: 'PROJECT_NOT_FOUND'
          }
        })
      }

      req.body = {
        pineconeApiKey: data['pineconeApiKey'],
        pineconeEnvironment: data['pineconeEnvironment'],
        pineconeIndexName: data['pineconeIndexName'],
        openaiApiKey: data['openaiApiKey'],
        projectId
      }

      next()
    } catch (error) {
      return res.status(401).json({
        error: {
          message: 'Authentication failed for docuconvo',
          type: 'AUTH_FAILED'
        }
      })
    }
  } else {
    return res.status(401).json({
      error: {
        message: 'No docuconvo key provided',
        type: 'MISSING_API_KEY'
      }
    })
  }
}
