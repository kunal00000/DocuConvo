'use server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export type FormData = {
  id: string
  projectName: string
  websiteUrl: string
  match: string
  cssSelector: string
  pinecone_ApiKey: string
  pinecone_environment: string
  pinecone_indexName: string
  openai_ApiKey: string
}

export async function updateProject(data: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      throw new Error('Unauthorized')
    }

    // Update the user name.
    await prisma.project.update({
      where: {
        id: data.id,
        creatorId: session?.user.id
      },
      data: {
        name: data.projectName,
        websiteUrl: data.websiteUrl,
        match: data.match,
        cssSelector: data.cssSelector,
        pineconeApiKey: data.pinecone_ApiKey,
        pineconeEnvironment: data.pinecone_environment,
        pineconeIndexName: data.pinecone_indexName,
        openaiApiKey: data.openai_ApiKey
      }
    })

    // revalidatePath('/dashboard/settings')
    return { status: 'success' }
  } catch (error) {
    console.log(error)
    return { status: 'error' }
  }
}
