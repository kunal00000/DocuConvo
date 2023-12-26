'use client'

import { Button } from '@/components/ui/button'
import { useAddProjectModal } from '@/hooks/use-modal'

const CreateButton = () => {
  const addProjectModal = useAddProjectModal()
  return (
    <div onClick={addProjectModal.onOpen}>
      <Button variant='outline'>Create Project</Button>
    </div>
  )
}

export const AddButton = () => {
  const addProjectModal = useAddProjectModal()
  return (
    <div onClick={addProjectModal.onOpen}>
      <Button>Add Project</Button>
    </div>
  )
}

export default CreateButton
