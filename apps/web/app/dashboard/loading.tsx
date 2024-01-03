import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardShell } from '@/components/dashboard/shell'
import { CardSkeleton } from '@/components/shared/card-skeleton'
import { Button } from '@/components/ui/button'

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Dashboard' text='Create and manage projects.'>
        <Button>Add Project</Button>
      </DashboardHeader>
      <div className='divide-border-200 divide-y rounded-md border'>
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
