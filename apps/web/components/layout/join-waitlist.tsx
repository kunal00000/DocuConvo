"use client"

import { useSigninModal } from "@/hooks/use-signin-modal";
import { Button } from "../ui/button";

export default function JoinWaitlist() {

  const signInModal = useSigninModal();

  return (
    <>

      <Button className="px-3" variant="default" onClick={signInModal.onOpen}>Join Waitlist</Button>

    </>
  )
}
