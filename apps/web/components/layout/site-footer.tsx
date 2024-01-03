import * as React from 'react'

import { cn } from '@/lib/utils'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className='flex items-center justify-evenly md:h-24 md:flex-row md:py-0'>
        <p className='text-md text-center font-urban font-semibold leading-loose md:text-left'>
          Built with {' ❤️ '}
        </p>
      </div>
    </footer>
  )
}
