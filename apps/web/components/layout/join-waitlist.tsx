'use client'

import { Button } from '@/components/ui/button'
import { useSigninModal } from '@/hooks/use-modal'

export default function JoinWaitlist() {
  const signInModal = useSigninModal()

  return (
    <>
      <Button className='px-3' variant='default' onClick={signInModal.onOpen}>
        Join Waitlist
      </Button>
    </>
  )
}
