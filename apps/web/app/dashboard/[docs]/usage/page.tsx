import { DocsHeader } from '@/components/dashboard/docs-header'
import { DashboardShell } from '@/components/dashboard/shell'
import { dashboardConfig } from '@/config/dashboard'
import { prisma } from '@docuconvo/database'

export default async function Page({ params }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.docs
    }
  })
  const items = dashboardConfig.docsNav

  return (
    <DashboardShell>
      <DocsHeader project={project} items={items} />
      <div>usqage</div>
    </DashboardShell>
  )
}
