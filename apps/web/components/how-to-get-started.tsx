'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'

import { Icons } from './shared/icons'

const content = [
  {
    id: 1,
    title: 'Provide Documentation Details',
    icon: Icons.MousePointerSquare,
    points: [
      'URL of your documentation website.',
      'URL pattern for your documentation.',
      'CSS selector for the main text content.'
    ],
    pointExample: [
      'Example - https://nextjs.org/docs',
      'Example - https://nextjs.org/docs/**, using a wildcard (*) to capture variations.',
      'this helps identify the primary content area of your documentation.'
    ],
    content:
      'To create a knowledge base for their documentation website, you need to provide the following details',
    align: 'left',
    image: 'website-details-input.webp'
  },
  {
    id: 2,
    title: 'Pinecone Details',
    icon: Icons.database,
    points: ['Pinecone API Key', 'Index Name', 'Environment'],
    align: 'right',
    content:
      'To store vector embeddings, ensuring complete ownership of your data',
    image: 'pinecone-input.webp'
  },
  {
    id: 3,
    title: 'OpenAI Details',
    icon: Icons.bot,
    points: ['OpenAI API Key'],
    align: 'left',
    content:
      'OpenAI API key will be used to generate responses for search queries with documentation context.',
    image: 'openai-input.webp'
  },
  {
    id: 4,
    title: 'Integrate in codebase',
    icon: Icons.logs,
    points: [],
    align: 'right',
    content:
      'Integrate Docuconvo search with your existing documentation website in just a three lines of code.',
    image: 'integrate-code.svg'
  }
]

export const HowToGetStarted = () => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            divRef.current?.classList.remove('opacity-0')
            divRef.current?.classList.add('animate-fade-x')
            observer.unobserve(divRef.current!)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (divRef.current) observer.observe(divRef.current)
  }, [])

  return (
    <div
      id={'get-started'}
      className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 opacity-0'
      ref={divRef}>
      <div className='text-center font-custom'>
        <p className='text-xs md:text-sm font-bold uppercase tracking-wider md:tracking-widest text-gray-700 dark:text-slate-50'>
          a complete{' '}
          <span className='text-gradient_indigo-purple'>
            Documentation Search{' '}
          </span>
          Solution
        </p>
        <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl lg:text-5xl'>
          Get Started in 4 Easy Steps
        </h2>
        <p className='text-md text-gray-700 dark:text-white/85 md:text-lg mx-auto font-custom mt-4 max-w-2xl font-normal lg:leading-8'>
          Going through documentation can take up a lot of time. DocuConvo is
          simple yet powerful tool designed to make this process simpler.
        </p>
      </div>
      <div className='mx-auto mt-12 max-w-6xl space-y-12 sm:mt-16 sm:space-y-20 lg:mt-20 lg:space-y-24 xl:space-y-32'>
        {content.map((item) => {
          return (
            <div
              key={item.id}
              className='grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-2 lg:items-center xl:gap-x-16'>
              <div className={item.id % 2 == 0 ? 'md:order-2' : ''}>
                <Image
                  src={`/${item.image}`}
                  width={1024}
                  height={680}
                  alt='get-started-image'
                  style={{ objectFit: 'cover' }}
                  loading='lazy'
                  className='h-full w-full rounded-2xl border border-gray-200 object-cover shadow-xl select-none'
                />
              </div>
              <div
                className={`md:self-center ${
                  item.id % 2 == 0 ? 'md:order-1' : ''
                } `}>
                <div className='inline-flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-black'>
                  <item.icon />
                </div>
                <h3 className='mt-4 text-2xl font-bold text-gray-900 dark:text-white/95 sm:text-3xl'>
                  {item.title}
                </h3>
                <h4 className='mt-2 text-base font-normal text-gray-700 dark:text-white/80 lg:text-lg'>
                  {item.content}
                </h4>
                <ul className='mt-6 space-y-2 text-base font-normal text-gray-700 dark:text-white/85 lg:text-lg'>
                  {item.points.map((point, i) => {
                    return (
                      <li key={i} className='flex flex-col'>
                        <div className='flex items-center gap-3'>
                          <Icons.asterisk />
                          <h5>{point}</h5>
                        </div>

                        {item.pointExample ? (
                          <p className='text-xs text-zinc-500 dark:text-white/60 pl-8'>
                            {item.pointExample[i]}
                          </p>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
