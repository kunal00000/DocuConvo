'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { DashboardHeader } from '@/components/dashboard/header'
import { Icons } from '@/components/shared/icons'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function DocsHeader({ project, items }) {
  if (!project) notFound()
  return (
    <div>
      <DashboardHeader
        heading={project!.name}
        text={project?.websiteUrl}></DashboardHeader>
      <div className='flex items-center justify-between'>
        <Card className=' mt-2 flex h-max    w-max items-center '>
          <CardContent className='flex  items-center px-1 pb-0'>
            <nav className=' my-1  flex items-start gap-2 '>
              {items.map((item, index) => {
                const Icon = Icons[item.icon || 'arrowRight']
                return (
                  item.href && (
                    <Link
                      key={index}
                      href={
                        item.disabled
                          ? '/'
                          : '/dashboard/' + project?.id + item.href
                      }>
                      <span
                        className={cn(
                          'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                          'path' === item.href ? 'bg-accent' : 'transparent',
                          item.disabled && 'cursor-not-allowed opacity-80'
                        )}>
                        <Icon className='mr-2 size-4' />
                        <span>{item.title}</span>
                      </span>
                    </Link>
                  )
                )
              })}
            </nav>
          </CardContent>
        </Card>
        <Card className='mr-2 border  p-1'>
          {project?.status == 'created' ? (
            <div className='group flex items-center gap-2 rounded-md px-3 py-[2px] text-sm font-medium'>
              <div className='flex relative h-3 w-3'>
                <span className='animate-ping absolute h-3 w-3 -top-0 -left-0 rounded-full bg-green-600 opacity-75'></span>
                <span className='relative rounded-full h-3 w-3 -top-0 -left-0 bg-green-600'></span>
              </div>
              Running
            </div>
          ) : (
            <div className='group flex cursor-wait items-center gap-2 rounded-md px-2 py-[2px] text-sm font-medium'>
              <>
                <div className='flex relative h-3 w-3'>
                  <span className='animate-ping absolute h-3 w-3 -top-0 -left-0 rounded-full bg-orange-600 opacity-75'></span>
                  <span className='relative rounded-full h-3 w-3 -top-0 -left-0 bg-orange-600'></span>
                </div>
                <span>Processing</span>
              </>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
