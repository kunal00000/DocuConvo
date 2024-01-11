'use client'

import { useState } from 'react'

import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

const accordionData = [
  {
    id: 1,
    title: 'What is Docuconvo?',
    isOpen: true,
    content:
      "Docuconvo is an AI-powered knowledge base that helps you to create a unified knowledge base for your organization's documentation. It will make your documentation developer-friendly and help you to achieve your goals with ease."
  },
  {
    id: 2,
    title: 'Who is this Docuconvo for?',
    isOpen: false,
    content:
      'Docuconvo is for anyone who wants to make their documentation developer-friendly. It is for anyone who wants to streamline their documentation journey and achieve their goals with ease.'
  },
  {
    id: 3,
    title: 'Do I need to pay for this?',
    isOpen: false,
    content:
      'No, this is completely free and opensource. But you have to use your openai and pinecone api keys.'
  },
  {
    id: 4,
    title: 'Where can I ask more questions about this Project?',
    isOpen: false,
    content:
      'If you have any further questions or need assistance regarding this, feel free to contact us. We will be happy to help you.'
  }
]

const accordionItemType = {
  top: 'rounded-t-lg',
  default: 'border rounded-none border-t-0',
  bottom: 'border border-t-0 rounded-b-lg'
}

export const FAQs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null)

  const accordionClickHandle = (id) => {
    setActiveAccordion(id === activeAccordion ? null : id)
  }

  return (
    <section className=' my-16 drop-shadow-xl max-w-3xl mx-auto offset-y-0 offset-x-8'>
      <div className=' flex  flex-col items-center gap-5 text-center pt-10 md:pt-20 '>
        <h2 className='text-lg tracking-tight bg-white border border-gray-700 rounded-full px-3 w-max '>
          FAQs
        </h2>
        <h3 className='text-2xl font-semibold md:mt-4 max-w-screen-md tracking-tight sm:text-3xl md:text-4xl lg:text-5xl'>
          Frequently Asked Questions
        </h3>
        <p className=' text-lg md:text-xl text-gray-700 max-w-screen-md  '>
          Here are some of the most frequently asked questions about Docuconvo.
        </p>
        <div className=' mt-16 w-full'>
          {accordionData.map((accordionItem, index) => (
            <div
              key={accordionItem.id}
              className={clsx(
                ' border border-neutral-200 bg-white overflow-hidden',
                {
                  [accordionItemType.top]: index === 0,
                  [accordionItemType.default]:
                    index > 0 && index < accordionData.length - 1,
                  [accordionItemType.bottom]: index === accordionData.length - 1
                }
              )}>
              <h2 className=' mb-0'>
                <button
                  className='group relative flex w-full font-semibold items-center rounded-t-lg border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition'
                  type='button'
                  aria-expanded={accordionItem.isOpen}
                  onClick={() => accordionClickHandle(accordionItem.id)}>
                  {accordionItem.title}
                  <div
                    className={`ml-auto h-8 w-8  ${
                      activeAccordion == accordionItem.id
                        ? 'rotate-[-90deg]'
                        : 'rotate-[90deg]'
                    } transition-transform duration-0 ease-in-out motion-reduce:transition-none`}>
                    <ChevronRight />
                  </div>
                </button>
              </h2>
              <div
                className={clsx(' py-4 px-5 text-base text-start', {
                  hidden: activeAccordion !== accordionItem.id, // Use hidden class to animate height to 0
                  '!visibility block': activeAccordion === accordionItem.id // Use block class to show content again
                })}>
                <p>{accordionItem.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
