import { DashboardHeader } from "@/components/dashboard/header"
import { prisma } from "@docuconvo/database"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import Link from "next/link"
import { dashboardConfig } from "@/config/dashboard"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { ProjectSettingForm } from "@/components/dashboard/project-dashboard"
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
<ProjectSettingForm project={project}/>
      </DashboardShell>
  }