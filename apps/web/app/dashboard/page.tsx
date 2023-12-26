import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { EmptyPlaceholder } from '@/components/shared/empty-placeholder'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { prisma } from '@/lib/db'
import CreateButton, {
  AddButton
} from '@/components/dashboard/add-project-button'

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
        {userProjects.length > 0 ? (
          <div>
            Projects
            {userProjects.map((project) => (
              <div>{project.name}</div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>No projects found</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any project yet. Start a project now.
            </EmptyPlaceholder.Description>
            <CreateButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
