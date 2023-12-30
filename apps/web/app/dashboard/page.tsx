import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { prisma } from '@docuconvo/database'
import CreateButton, {
  AddButton
} from '@/components/dashboard/add-project-button'
import {DocsLists} from "@/components/dashboard/docs-list"

export const metadata = {
  title: 'Dashboard'
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const userProjects = await prisma.project.findMany({
    where: {
      creatorId: user.id
    }
  })


  return (
    <DashboardShell>
      <DashboardHeader heading='Dashboard' text='Create and manage projects.'>
        <AddButton />
      </DashboardHeader>
      <div>
      {!userProjects.length ? <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any content yet. Start creating content.
          </EmptyPlaceholder.Description>
          <CreateButton/>
        </EmptyPlaceholder>:<DocsLists userProjects={userProjects}/>}
      </div>
    </DashboardShell>
  )
}
