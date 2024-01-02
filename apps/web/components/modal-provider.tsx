'use client'

import { SignInModal } from '@/components/layout/sign-in-modal'
import { useMounted } from '@/hooks/use-mounted'

import { AddProjectModal } from './dashboard/add-project-modal'

export const ModalProvider = () => {
  const mounted = useMounted()

  if (!mounted) {
    return null
  }

  return (
    <>
      <SignInModal />
      <AddProjectModal />
      {/* add your own modals here... */}
    </>
  )
}
