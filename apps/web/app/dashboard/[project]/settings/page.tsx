import { DocsHeader } from '@/components/dashboard/docs-header'
import { ProjectSettingForm } from '@/components/dashboard/project-dashboard'
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

  return (
    <DashboardShell>
      <DocsHeader project={project} items={items} />
      {project ? <ProjectSettingForm project={project} /> : 'null'}
    </DashboardShell>
  )
}
