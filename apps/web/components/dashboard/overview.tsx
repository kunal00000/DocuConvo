'use client'

import Link from 'next/link'

import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export const Overview = ({ project }: any) => {
  return (
    <Card>
      <div className='mx-6 py-4'>
        <div className='grid grid-cols-12 gap-4 2xl:gap-20'>
          <div className='col-span-12 2xl:col-span-4'>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <h3 className=' text-xl font-bold'>
                  Connecting to your new project
                </h3>
                <p className=' text-base text-gray-700 2xl:max-w-sm'>
                  Interact with your documentation conversational system which
                  make your documentaion loved by your users
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <Link
                  target='_blank'
                  className='font-regular bg-button hover:bg-selection border-button hover:border-button-hover focus-visible:outline-brand-600 relative inline-flex translate-y-[1px] cursor-pointer items-center justify-center space-x-2 rounded-md border px-2.5 py-1 text-center text-xs text-foreground shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1'
                  href='https://github.com/kunal00000/DocuConvo?tab=readme-ov-file#introduction'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={14}
                    height={14}
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='sbui-icon'>
                    <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
                    <polyline points='15 3 21 3 21 9' />
                    <line x1={10} y1={14} x2={21} y2={3} />
                  </svg>
                  <span className='truncate'>APIs Docs</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-span-12 2xl:col-span-8'>
            <div className='relative'>
              <div className='transition-opacity duration-300'>
                <div className='border-overlay undefined mb-8 overflow-hidden rounded-md border border-t-0 shadow-sm'>
                  <div>
                    <div className='border-panel-border-interior-light dark:border-panel-border-interior-dark border-t px-6 py-4'>
                      <div className='input-mono grid gap-2 text-sm md:grid md:grid-cols-12'>
                        <div className='col-span-4 flex flex-col space-y-2'>
                          <label className=' block text-sm' htmlFor=''>
                            <div className='space-y-2'>
                              <p className='text-sm font-semibold'>
                                DocuConvo Key
                              </p>
                            </div>
                          </label>
                        </div>
                        <div className='col-span-8'>
                          <div>
                            <div className='relative'>
                              <input
                                type='text'
                                className='peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder:text-foreground-muted border-control box-border block w-full truncate rounded-md border bg-foreground/[.026] px-4 py-2 pr-20 text-sm text-foreground opacity-50 shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md'
                                readOnly={true}
                                defaultValue={project?.docuconvo_key}
                              />
                              <div className='absolute inset-y-0 right-0 flex items-center space-x-1 pl-3 pr-1'>
                                <button
                                  type='button'
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      project?.docuconvo_key
                                    )
                                    toast({
                                      title: 'Success!',
                                      description: 'copied to clipboard',
                                      variant: 'default'
                                    })
                                  }}
                                  className='font-regular bg-button hover:bg-selection border-button hover:border-button-hover focus-visible:outline-brand-600 relative inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border px-2.5 py-1 text-center text-xs text-foreground shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={14}
                                    height={14}
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    className='sbui-icon'>
                                    <rect
                                      x={9}
                                      y={9}
                                      width={13}
                                      height={13}
                                      rx={2}
                                      ry={2}
                                    />
                                    <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                                  </svg>
                                  <span className='truncate'>Copy</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <p
                            data-state='hide'
                            className='data-show:mt-2 data-show:animate-slide-down-normal data-hide:animate-slide-up-normal text-sm text-red-900 transition-all'
                          />
                          <div className='er mt-2 text-sm leading-normal text-gray-700'>
                            <p>This key has to be used for your all searches</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='border-panel-border-interior-light dark:border-panel-border-interior-dark border-t'>
                      <div className='bg-surface-100 relative min-h-[200px] px-4 py-6'>
                        <div className='flex w-max items-center rounded-t-sm border border-b-0 bg-gray-50'>
                          <div className='cursor-pointer  bg-white  px-3  py-1  text-sm  transition '>
                            Node.js
                          </div>
                        </div>
                        <div className='relative'>
                          <pre className='peer/input focus-visible:border-foreground-muted focus-visible:ring-background-control placeholder:text-foreground-muted border-control box-border block w-full whitespace-pre-line rounded-md rounded-t-none border bg-foreground/[.026] px-4 py-2 text-sm text-foreground opacity-50 shadow-sm outline-none transition-all focus:ring-2 focus:ring-current focus-visible:shadow-md'>
                            {`  import { Docuconvo } from 'docuconvo'
const docuconvo = new Docuconvo({       docuconvo_key: '${project?.docuconvo_key}' }) 
const { answer, message, error } = await docuconvo.search(searchQuery)`}
                          </pre>
                          <button
                            type='button'
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `import { Docuconvo } from 'docuconvo'
const docuconvo = new Docuconvo({       docuconvo_key: '${project?.docuconvo_key}' })
const { answer, message, error } = await docuconvo.search(searchQuery)`
                              )
                              toast({
                                title: 'Success!',
                                description: 'copied to clipboard',
                                variant: 'default'
                              })
                            }}
                            className='font-regular bg-button hover:bg-selection border-button hover:border-button-hover focus-visible:outline-brand-600 absolute right-2 top-2 inline-flex cursor-pointer items-center justify-center space-x-2 rounded-md border px-2.5 py-1 text-center text-xs text-foreground shadow-sm outline-none outline-0 transition-all duration-200 ease-out focus-visible:outline-4 focus-visible:outline-offset-1'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width={14}
                              height={14}
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='sbui-icon'>
                              <rect
                                x={9}
                                y={9}
                                width={13}
                                height={13}
                                rx={2}
                                ry={2}
                              />
                              <path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
                            </svg>
                            <span className='truncate'>Copy</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
