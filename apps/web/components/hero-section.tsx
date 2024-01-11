import Image from 'next/image'
import Link from 'next/link'

import JoinWaitlist from '@/components/layout/join-waitlist'
import { Icons } from '@/components/shared/icons'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const HeroSection = () => {
  return (
    <section className='space-y-6 flex justify-center items-center'>
      <div className=' flex max-w-[64rem] flex-col items-center gap-5 text-center pt-20 md:pt-28 '>
        <h1
          className='animate-fade-up text-balance font-urban text-4xl font-extrabold md:mt-12 tracking-tight opacity-0 sm:text-5xl md:text-6xl lg:text-7xl'
          style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
          Make Documentation{' '}
          <span className='text-gradient_indigo-purple font-extrabold'>
            Developer Friendly
          </span>
        </h1>
        <div
          className='animate-fade-up opacity-0'
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <p className=' text-lg md:text-xl text-gray-700 '>
            Streamline your documentation journey and achieve your goals with
            ease.
          </p>
        </div>
        <div
          className='flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4'
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <JoinWaitlist />
          <Link
            href={siteConfig.links.github}
            target='_blank'
            rel='noreferrer'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'px-4'
            )}>
            <Icons.gitHub className='mr-2 size-4' />
            <p>
              <span className='sm:inline-block'>Star on</span> GitHub{' '}
            </p>
          </Link>
        </div>

        <div className='p-5'>
          <Image
            src='/hero.webp'
            width={1024}
            height={680}
            alt='Page Banner'
            objectFit='cover'
            loading='eager'
            className='mx-auto'
          />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
