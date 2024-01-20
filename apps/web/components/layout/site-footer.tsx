import * as React from 'react'

import { cn } from '@/lib/utils'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='flex flex-col gap-5 items-center justify-evenly md:h-24 md:flex-row md:py-0 text-center pb-4'>
        <p className='text-md uppercase font-custom font-bold leading-loose text-gradient_indigo-purple'>
          Built by opensource
        </p>
        <p className='text-xs md:text-sm leading-tight text-left'>
          © 2024 DocuConvo. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
