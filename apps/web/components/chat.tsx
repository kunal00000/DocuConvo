'use client'

// import { useChat } from '@/hooks/use-chat'
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'

import { Icons } from './shared/icons'

const Chat = ({ project }) => {
  // const { messages, input, handleInputChange, handleSubmit, isLoading } =
  //   useChat({ project })

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: 'http://localhost:3000/api/query',
      headers: { Authorization: `Bearer ${project.docuconvo_key}` }
    })

  return (
    <div className='flex p-10 h-[600px] flex-col'>
      <div className='flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7'>
        {messages.map((m, index) => (
          <div key={index} className='w-full'>
            {m.role === 'assistant' ? (
              <div className='flex items-start'>
                <div className='px-3 py-2.5 bg-white'>
                  <div className='m-auto flex max-w-4xl items-start space-x-3'>
                    <span className='flex overflow-hidden rounded-full bg-white border border-blue-950 w-8 h-8'>
                      <div className='m-auto'>
                        <svg
                          stroke='none'
                          fill='black'
                          strokeWidth='1.5'
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          height='20'
                          width='20'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'></path>
                        </svg>
                      </div>
                    </span>
                    <div className='w-full min-w-0 text-sm sm:text-base'>
                      <div className='prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words prose-p:leading-7 prose-pre:bg-[#282c34] w-full max-w-full flex-1 leading-6'>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='ml-2 mt-1 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row'>
                  <button className='hover:text-blue-600'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                      <path d='M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3'></path>
                    </svg>
                  </button>
                  <button className='hover:text-blue-600' type='button'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 24 24'
                      strokeWidth='2'
                      stroke='currentColor'
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                      <path d='M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3'></path>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className='bg-white px-3 py-2.5'>
                <div className='mx-auto flex max-w-5xl items-start space-x-3'>
                  <span className='flex overflow-hidden rounded-full bg-white border border-blue-950 w-8 h-8'>
                    <div className='m-auto'>
                      <svg
                        stroke='none'
                        fill='black'
                        strokeWidth='0'
                        viewBox='0 0 16 16'
                        height='20'
                        width='20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z'></path>
                      </svg>
                    </div>
                  </span>
                  <div className='w-full min-w-0 text-sm sm:text-base'>
                    <div className='prose prose-stone prose-sm sm:prose-base prose-pre:rounded-md prose-p:whitespace-pre-wrap prose-p:break-words prose-p:leading-7 prose-pre:bg-[#282c34] w-full max-w-full flex-1 leading-6'>
                      <p>{m.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className='flex justify-center'>
            <Icons.spinner className='w-6 h-6 animate-spin text-blue-600' />
          </div>
        )}
      </div>

      <form className='mt-2' onSubmit={handleSubmit}>
        <label htmlFor='chat-input' className='sr-only'>
          Enter your prompt
        </label>
        <div className='relative'>
          <input
            id='chat-input'
            className='block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600 sm:text-base'
            placeholder='Enter your prompt'
            value={input}
            onChange={handleInputChange}
            required></input>
          <button
            type='submit'
            className='absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base'>
            Send <span className='sr-only'>Send message</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
