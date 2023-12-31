import { DashboardHeader } from "@/components/dashboard/header"
import { prisma } from "@docuconvo/database"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import Link from "next/link"
import { dashboardConfig } from "@/config/dashboard"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/dashboard/overview"
import { Card, CardContent } from "@/components/ui/card"
import {DocsHeader} from "@/components/dashboard/docs-header"



export default async function Page({ params }) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.docs
    }
  })
  const items = dashboardConfig.docsNav

  
    return <DashboardShell>
    <DocsHeader project={project} items={items}/>

    {project?.status ==="embedding"&&(
      <div className="flex flex-col gap-4">
        making your docs full of knowledge...
</div>
    )}
    {project?.status ==="created"&& <Overview project={project}/>}
    
      </DashboardShell>
  }