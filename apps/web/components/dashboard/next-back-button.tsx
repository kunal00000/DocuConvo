import React from 'react'

import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { useAddProjectModal } from '@/hooks/use-modal'

const NextBackButton = ({ isLoading }) => {
  const { previousStep, isFirstStep, isLastStep } = useAddProjectModal()
  return (
    <div className='mt-12 flex h-full w-full items-center justify-between'>
      <Button
        onClick={() => previousStep()}
        variant='outline'
        disabled={isFirstStep()}>
        Go Back
      </Button>
      <Button disabled={isLoading}>
        {isLastStep() ? (
          isLoading ? (
            <>
              <Icons.spinner className='mr-2 size-4 animate-spin' />
              <span>Saving</span>
            </>
          ) : (
            'Add Project'
          )
        ) : (
          'Next Step'
        )}
      </Button>
    </div>
  )
}

export default NextBackButton
