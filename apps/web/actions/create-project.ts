'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/session'
import { ProjectForm } from '@/lib/validations/add-project-form'

export async function createProject({
  project,
  pinecone,
  openai
}: ProjectForm) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return { status: 'error', message: 'User not found.' }
    }

    const isExist = await prisma.project.findFirst({
      where: {
        name: project.projectName,
        creatorId: user.id
      }
    })

    if (isExist) {
      return { status: 'error', message: 'Project name already exists.' }
    }

    const createdProject = await prisma.project.create({
      data: {
        name: project.projectName,
        websiteUrl: project.websiteUrl,
        match: project.match,
        cssSelector: project.cssSelector,
        maxPageToCrawl: 500,
        pineconeIndexName: pinecone.pinecone_indexName,
        pineconeApiKey: pinecone.pinecone_ApiKey,
        pineconeEnvironment: pinecone.pinecone_environment,
        openaiApiKey: openai.openai_ApiKey,
        status: 'embedding',
        creatorId: user?.id
      }
    })

    await prisma.project.update({
      where: {
        id: createdProject.id,
        creatorId: createdProject.creatorId
      },
      data: {
        docuconvo_key: `sk-${createdProject.creatorId}${createdProject.id}`
      }
    })

    revalidatePath('/dashboard')
    return {
      status: 'success',
      message: 'Project created successfully.',
      createdProject
    }
  } catch (error) {
    return { status: 'error', message: error.message }
  }
}
