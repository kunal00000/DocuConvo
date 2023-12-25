"use client";

import { useState } from "react";
import { Icons } from "@/components/shared/icons";
import { Modal } from "@/components/shared/modal";
import { siteConfig } from "@/config/site";
import { useSigninModal } from "@/hooks/use-signin-modal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from 'axios'
import { useToast } from "../ui/use-toast";

export const SignInModal = () => {
  const { toast } = useToast()
  const signInModal = useSigninModal();
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  async function onSubmitForm(e) {
    e.preventDefault()
    const data = {
      username: username,
      email: email
    }
    console.log(data)

    const res = await axios.post('http://localhost:3000/api/sendemail', data)
    toast({
      title: "🤗❤️🤗",
      description: `${res.data.res}`
    })
    signInModal.onClose()

  }

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <form onSubmit={onSubmitForm}>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
            <a href={siteConfig.url}>
              <Icons.logo className="size-10" />
            </a>
            <h3 className="font-urban text-2xl font-bold">Join Waitlist</h3>
          </div>

          <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
            <div className="font-urban justify-center">Email</div>
            <Input placeholder="johndoe@xyz.com" onChange={(e) => setEmail(e.target.value)} />
            <div className="font-urban">Username</div>
            <Input placeholder="crazyjohn" onChange={(e) => setUsername(e.target.value)} />
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
