'use client'

import { useEffect, useRef } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

const accordionData = [
  {
    id: 'item-1',
    title: 'What is Docuconvo?',
    content:
      "Docuconvo is a documentation search solution that creates an AI-powered knowledge base for your organization's documentation. It helps developers to search for the relevant insights from documentation with ease."
  },
  {
    id: 'item-2',
    title: 'Who is this Docuconvo for?',
    content:
      'Docuconvo is for anyone who wants to make their documentation developer-friendly and easily navigable.'
  },
  {
    id: 'item-3',
    title: 'Do I need to pay for this?',
    content:
      'No, this is completely free and opensource. But you have to use your openai and pinecone api keys.'
  },
  {
    id: 'item-4',
    title: 'Where can I ask more questions about this Project?',
    content:
      'If you have any further questions or need assistance regarding this, feel free to contact us at team@docuconvo.com. We are happy to help you.'
  }
]

export const FAQs = () => {
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
    <section
      id={'faqs'}
      ref={divRef}
      className='offset-y-0 offset-x-8 mx-auto my-16 max-w-3xl drop-shadow-xl opacity-0'>
      <div className='flex flex-col items-center gap-5 pt-10 p-4 text-center'>
        <h3 className='max-w-screen-md text-2xl font-semibold tracking-tight sm:text-3xl md:mt-4 md:text-4xl lg:text-5xl font-custom'>
          Frequently Asked Questions
        </h3>
        <p className='text-base text-gray-700 dark:text-white/85 md:text-lg max-w-[90%] mx-auto font-custom'>
          Here are some of the most frequently asked questions about Docuconvo.
        </p>
        <Accordion
          type='single'
          collapsible
          className='w-full select-none rounded-2xl border border-gray-200 p-4'>
          {accordionData.map((accordionItem) => {
            return (
              <AccordionItem key={accordionItem.id} value={accordionItem.id}>
                <AccordionTrigger className='text-left'>
                  {accordionItem.title}
                </AccordionTrigger>
                <AccordionContent className='text-base text-left'>
                  {accordionItem.content}
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
