'use client'

import Link from 'next/link'

import { User } from 'next-auth'

import { Button, buttonVariants } from '@/components/ui/button'
import { useSigninModal } from '@/hooks/use-modal'
import useScroll from '@/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types'

import { MainNav } from './main-nav'
import { ModeToggle } from './mode-toggle'
import { UserAccountNav } from './user-account-nav'

interface NavBarProps {
  user: Pick<User, 'name' | 'image' | 'email'> | undefined
  items?: MainNavItem[]
  children?: React.ReactNode
  rightElements?: React.ReactNode
  scroll?: boolean
}

export function NavBar({
  user,
  items,
  children,
  rightElements,
  scroll = false
}: NavBarProps) {
  const scrolled = useScroll(50)
  const signInModal = useSigninModal()

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? 'border-b' : 'bg-background/0') : 'border-b'
      }`}>
      <div className='container flex h-16 items-center justify-between py-4'>
        <MainNav items={items}>{children}</MainNav>

        <div className='flex items-center space-x-3'>
          {rightElements}

          <ModeToggle />
          {!user ? (
            <Link
              href='/login'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' })
              )}>
              Login Page
            </Link>
          ) : null}

          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Button
              className='px-3'
              variant='default'
              size='sm'
              onClick={signInModal.onOpen}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
