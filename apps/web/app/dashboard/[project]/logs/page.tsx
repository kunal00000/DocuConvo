import { notFound } from 'next/navigation'

import { DocsHeader } from '@/components/dashboard/docs-header'
import Logs from '@/components/dashboard/logs'
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
      <Logs project={project} />
    </DashboardShell>
  )
}
