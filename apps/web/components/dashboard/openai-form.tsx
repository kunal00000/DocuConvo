import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createProject } from '@/actions/create-project'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { openAiSchema } from '@/lib/validations/add-project-form'
import { zodResolver } from '@hookform/resolvers/zod'

import NextBackButton from './next-back-button'

type FormData = z.infer<typeof openAiSchema>

const OpenAIForm = ({
  project,
  pinecone,
  openai,
  updateData,
  onClose,
  previousStep
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(openAiSchema)
  })

  const onSubmitForm = async (data: FormData) => {
    setIsLoading(true)
    const { status, message } = await createProject({
      project,
      pinecone,
      openai: data
    })
    setIsLoading(false)
    if (status === 'error') {
      toast({
        title: 'Something went wrong.',
        description: message + ' Please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Success!',
        description: message,
        variant: 'default'
      })
      onClose()
      updateData({ project: {}, pinecone: {}, openai: {} })
      previousStep()
      previousStep()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className='flex h-full flex-col justify-evenly'>
      <div className='slide-in-left grid gap-1'>
        <Label htmlFor='api-key'>API key</Label>
        <Input
          id='api-key'
          className='w-full'
          {...register('openai_ApiKey')}
          placeholder='API key'
          defaultValue={openai['openai_ApiKey']}
          onChange={(e) =>
            updateData({ openai: { openai_ApiKey: e.target.value } })
          }
        />
        {errors?.openai_ApiKey && (
          <p className='px-1 text-xs text-red-600'>
            {errors.openai_ApiKey.message}
          </p>
        )}
      </div>

      <NextBackButton isLoading={isLoading} />
    </form>
  )
}

export default OpenAIForm
