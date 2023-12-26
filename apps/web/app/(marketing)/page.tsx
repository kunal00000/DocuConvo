import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/shared/icons'
import HeroComponent from '@/components/hero-component'
import { SiteFooter } from '@/components/layout/site-footer'
import JoinWaitlist from '@/components/layout/join-waitlist'

export default async function IndexPage() {
  return (
    <>
      <section className='space-y-6 pb-12 lg:py-12'>
        <div className='items-center flex justify-center'>
          <HeroComponent />
        </div>

        <div className='container flex max-w-[64rem] flex-col items-center gap-5 text-center '>
          <h1
            className='animate-fade-up text-balance font-urban text-4xl font-extrabold tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl'
            style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
          >
            Make Documentation{' '}
            <span className='text-gradient_indigo-purple font-extrabold'>
              Developer Friendly
            </span>
          </h1>

          <div
            className='flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4'
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <JoinWaitlist />
            <Link
              href={siteConfig.links.github}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'px-4'
              )}
            >
              <Icons.gitHub className='mr-2 size-4' />
              <p>
                <span className='sm:inline-block'>Star on</span> GitHub{' '}
              </p>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  )
}
