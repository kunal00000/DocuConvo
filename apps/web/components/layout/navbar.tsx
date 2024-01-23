'use client'

import Link from 'next/link'

import { User } from 'next-auth'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MainNavItem } from '@/types'

import { MainNav } from './main-nav'
import { ModeToggle } from './mode-toggle'
import { UserAccountNav } from './user-account-nav'

interface NavBarProps {
  user: Pick<User, 'name' | 'image' | 'email'> | undefined
  items?: MainNavItem[]
  children?: React.ReactNode
  scroll?: boolean
}

export function NavBar({ user, items, children }: NavBarProps) {
  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all border-b`}>
      <div className='container flex h-16 items-center justify-between py-4 mx-auto'>
        <MainNav items={items}>{children}</MainNav>

        <div className='flex items-center space-x-3'>
          <ModeToggle />
          {!user ? (
            <Link
              href='/login'
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' })
              )}>
              Login
            </Link>
          ) : null}

          {user && <UserAccountNav user={user} />}
        </div>
      </div>
      <div
        className={cn(
          'absolute -bottom-5 z-50 h-10 w-full [mask:linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] before:absolute before:inset-0 before:top-5 before:h-[1px] before:bg-gradient-to-r before:from-[#AE48FF] before:via-[#6C47FF] before:via-[25%] before:to-[#18CCFC] before:opacity-20 before:blur-[2px] after:absolute after:inset-0 after:left-1/2 after:top-5 after:h-[1px] after:w-full after:-translate-x-1/2 after:bg-gradient-to-r after:from-[#AE48FF] after:via-[#6C47FF] after:via-[25%] after:to-[#18CCFC] after:[mask:linear-gradient(90deg,transparent,black,black,transparent)]'
        )}
      />
    </header>
  )
}
