'use client'

import { useState } from 'react'

import axios from 'axios'

import { Icons } from '@/components/shared/icons'
import { Modal } from '@/components/shared/modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { siteConfig } from '@/config/site'
import { useSigninModal } from '@/hooks/use-modal'

export const SignInModal = () => {
  const signInModal = useSigninModal()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  async function onSubmitForm(e) {
    e.preventDefault()
    const data = {
      username: username,
      email: email
    }

    await axios.post(`${siteConfig.url}/api/sendemail`, data)
    signInModal.onClose()
  }

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <form onSubmit={onSubmitForm}>
        <div className='w-full'>
          <div className='flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16'>
            <a href={siteConfig.url}>
              <Icons.logo className='size-10' />
            </a>
            <h3 className='font-urban text-2xl font-bold'>Join Waitlist</h3>
          </div>

          <div className='flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16'>
            <div className='justify-center font-urban'>Email</div>
            <Input
              placeholder='johndoe@xyz.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='font-urban'>Username</div>
            <Input
              placeholder='crazyjohn'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
