'use client'

import { useChat } from '@/hooks/use-chat'

import { Icons } from './shared/icons'

const Chat = ({ project }) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ project })

  return (
    <div className='flex p-10 h-[500px] flex-col'>
      <div className='flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-300 sm:text-base sm:leading-7'>
        {messages.map((m, index) => (
          <div key={index}>
            {m.role === 'ai' ? (
              <div className='flex items-start'>
                <img
                  className='mr-2 h-8 w-8 rounded-full'
                  src='https://dummyimage.com/128x128/354ea1/ffffff&text=G'
                />
                <div className='flex min-h-[85px] rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl'>
                  <p>{m.content}</p>
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
              <div className='flex flex-row-reverse items-start'>
                <img
                  className='ml-2 h-8 w-8 rounded-full'
                  src='https://dummyimage.com/128x128/363536/ffffff&text=J'
                />
                <div className='flex rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl'>
                  <p>{m.content}</p>
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
      {/* Prompt message input */}
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
