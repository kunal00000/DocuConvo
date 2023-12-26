import { Button } from '@/components/ui/button'
import { useAddProjectModal } from '@/hooks/use-modal'
import React from 'react'
import { Icons } from '@/components/shared/icons'

const NextBackButton = ({ isLoading }) => {
  const { previousStep, isFirstStep, isLastStep } = useAddProjectModal()
  return (
    <div className='w-full h-full mt-12 items-center flex justify-between'>
      <Button
        onClick={() => previousStep()}
        variant='outline'
        disabled={isFirstStep()}
      >
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
