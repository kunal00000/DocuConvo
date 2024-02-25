import { notFound } from 'next/navigation'

import Chat from '@/components/chat'
import { DocsHeader } from '@/components/dashboard/docs-header'
import { DashboardShell } from '@/components/dashboard/shell'
import { dashboardConfig } from '@/config/dashboard'
import { prisma } from '@/lib/db'

export default async function Page({ params }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.project
    }
  })
  const items = dashboardConfig.projectNav

  if (!project) notFound()

  return (
    <DashboardShell>
      <DocsHeader project={project} items={items} />
      <Chat project={project} />
    </DashboardShell>
  )
}
