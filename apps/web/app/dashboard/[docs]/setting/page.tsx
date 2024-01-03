import Link from 'next/link'

import { DocsHeader } from '@/components/dashboard/docs-header'
import { DashboardHeader } from '@/components/dashboard/header'
import { ProjectSettingForm } from '@/components/dashboard/project-dashboard'
import { DashboardShell } from '@/components/dashboard/shell'
import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { dashboardConfig } from '@/config/dashboard'
import { cn } from '@/lib/utils'
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
      <ProjectSettingForm project={project} />
    </DashboardShell>
  )
}
