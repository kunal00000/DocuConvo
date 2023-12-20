import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/shared/icons"
import { ModeToggle } from "@/components/layout/mode-toggle"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="flex items-center justify-evenly md:h-24 md:flex-row md:py-0">
        <p className="text-center text-md leading-loose md:text-left font-urban font-semibold">
          Built with {" ❤️ "}
        </p>
      </div>
    </footer>
  )
}
