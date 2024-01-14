'use client'

import React, { useEffect } from 'react'

import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
  Search
} from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'

export function SearchDemo() {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <div className='w-full flex-1 md:w-auto md:flex-none'>
        <button
          onClick={() => {
            setOpen(true)
          }}
          className='min-w-96 max-h-12 px-4 py-2 items-center justify-between focus-visible:ring-ring border-input hover:bg-accent hover:text-accent-foreground bg-background text-muted-foreground relative inline-flex whitespace-nowrap rounded-[0.5rem] border font-normal shadow-none transition-colors focus-visible:outline-none focus-visible:ring-1'>
          <span className='lg:inline-flex'>
            <Search className='mr-2 h-4 w-4 opacity-50 my-auto' />
            Search documentation...
          </span>
          <kbd className='bg-muted pointer-events-none h-6 select-none items-center gap-2 rounded border px-1.5 font-mono text-sm font-medium opacity-100 sm:flex'>
            <span className='text-lg'>⌘</span>K
          </kbd>
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Suggestions'>
            <CommandItem>
              <Calendar className='mr-2 h-4 w-4' />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile className='mr-2 h-4 w-4' />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator className='mr-2 h-4 w-4' />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Settings'>
            <CommandItem>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchDemo
