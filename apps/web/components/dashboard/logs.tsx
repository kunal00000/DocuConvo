'use client'

import { useEffect, useRef, useState } from 'react'

import { Card } from '@/components/ui/card'
import { client } from '@/lib/supabase'

import { Icons } from '../shared/icons'

const Logs = ({ project }) => {
  const [logs, setLogs] = useState<string[]>([])
  const [isLoading, setisLoading] = useState<boolean>(true)

  const listRef = useRef<null | HTMLUListElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo(0, listRef.current?.scrollHeight)
  }, [logs])

  useEffect(() => {
    setisLoading(true)
    const fetchLogs = async () => {
      const response = await fetch(`/api/logs?projectId=${project.id}`)

      if (!response.ok) {
        return
      }

      if (response.ok) {
        const { logs } = await response.json()
        setLogs(logs.map((log) => log.message))
        setisLoading(false)
      }
    }

    fetchLogs()
  }, [project.id])

  const messageReceived = (message: string) => {
    setLogs((logs) => [...logs, message])
  }

  client
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'logMessage',
        filter: `projectId=eq.${project.id}`
      },
      (payload) => messageReceived(payload.new.message)
    )
    .subscribe()

  return (
    <Card>
      <div className='mx-6 py-4'>
        <div className='grid grid-cols-12 gap-4 2xl:gap-20'>
          <div className='col-span-12 2xl:col-span-4'>
            <div className='space-y-2'>
              <div className='space-y-2'>
                <h3 className=' text-xl font-bold'>Logs</h3>
                <p className=' text-base text-gray-700 2xl:max-w-sm'>
                  We are crawling your website and building a knowledge graph
                  for all the data we find. Track the progress here.
                </p>
              </div>
            </div>
          </div>
          <div className='col-span-12 2xl:col-span-8'>
            <div className='relative'>
              <div className='transition-opacity duration-300'>
                <div className='border-overlay undefined mb-8 overflow-hidden rounded-md border border-t-0 shadow-sm'>
                  <div className='border-panel-border-interior-light dark:border-panel-border-interior-dark border-t'>
                    <ul
                      ref={listRef}
                      className=' relative max-h-[325px] min-h-[275px] overflow-scroll bg-slate-800 px-4 py-6 pb-16'>
                      {logs.length > 0 ? (
                        logs.map((log, index) => (
                          <li
                            key={index}
                            className='text-nowrap font-mono text-sm leading-loose text-white/80'>
                            {log}
                          </li>
                        ))
                      ) : isLoading ? (
                        <Icons.spinner className='m-auto size-6 animate-spin text-white/90' />
                      ) : (
                        <li className='text-nowrap font-mono text-sm leading-loose text-white/80'>
                          No logs yet
                        </li>
                      )}
                    </ul>
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

export default Logs
