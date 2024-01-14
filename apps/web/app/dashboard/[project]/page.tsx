import { notFound } from 'next/navigation'

import { DocsHeader } from '@/components/dashboard/docs-header'
import { Overview } from '@/components/dashboard/overview'
import { DashboardShell } from '@/components/dashboard/shell'
import { dashboardConfig } from '@/config/dashboard'
import { prisma } from '@/lib/db'

export default async function Page({ params }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.project
    }
  })

  if (!project) notFound()

  const items = dashboardConfig.projectNav
  // TODO: Use Layout to reduce code duplication
  return (
    <DashboardShell>
      <DocsHeader project={project} items={items} />
      <Overview project={project} />
    </DashboardShell>
  )
}
