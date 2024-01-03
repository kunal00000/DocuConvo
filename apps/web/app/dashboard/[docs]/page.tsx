import { DocsHeader } from '@/components/dashboard/docs-header'
import { Overview } from '@/components/dashboard/overview'
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

      {project?.status === 'embedding' && (
        <div className='flex flex-col gap-4'>
          making your docs full of knowledge...
        </div>
      )}
      {project?.status === 'created' && <Overview project={project} />}
    </DashboardShell>
  )
}
