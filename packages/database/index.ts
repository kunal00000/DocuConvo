import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

export const prisma = global.cachedPrisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.cachedPrisma = prisma

export * from '@prisma/client'
