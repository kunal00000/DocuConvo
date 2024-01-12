import { DocsHeader } from '@/components/dashboard/docs-header'
import { Overview } from '@/components/dashboard/overview'
import { DashboardShell } from '@/components/dashboard/shell'
import { dashboardConfig } from '@/config/dashboard'
import { prisma } from '@docuconvo/database'

export default async function Page({ params }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.project
    }
  })
  const items = dashboardConfig.projectNav

  return (
    <DashboardShell>
      <DocsHeader project={project} items={items} />
      <Overview project={project} />
    </DashboardShell>
  )
}
