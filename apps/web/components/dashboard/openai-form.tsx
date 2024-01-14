import { useState } from 'react'

import { useRouter } from 'next/navigation'

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

const NEXT_PUBLIC_API_AUTH_TOKEN = process.env.NEXT_PUBLIC_API_AUTH_TOKEN || ''
const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

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

  const generateEmbedding = async (createdProject) => {
    try {
      if (!createdProject) throw new Error('No project id')

      await fetch(`${NEXT_PUBLIC_API_URL}/api/queue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${NEXT_PUBLIC_API_AUTH_TOKEN}`
        },
        body: JSON.stringify(createdProject)
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  const router = useRouter()
  const onSubmitForm = async (data: FormData) => {
    try {
      setIsLoading(true)
      const { status, message, createdProject } = await createProject({
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
        generateEmbedding(createdProject)

        router.push(`/dashboard/${createdProject?.id}/logs`)
      }
    } catch (err) {
      console.log(err)
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
