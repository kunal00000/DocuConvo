'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAddProjectModal } from '@/hooks/use-modal'
import { websiteInfoSchema } from '@/lib/validations/add-project-form'
import { zodResolver } from '@hookform/resolvers/zod'

import NextBackButton from './next-back-button'

type FormData = z.infer<typeof websiteInfoSchema>

const WebsiteInfoForm = ({
  projectName,
  websiteUrl,
  match,
  cssSelector,
  updateData
}) => {
  const { nextStep } = useAddProjectModal()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(websiteInfoSchema)
  })

  const onSubmit = async (data: FormData) => {
    updateData({ project: { ...data } })
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full flex-col justify-evenly'>
      <div className='slide-in-left grid gap-5'>
        <div className='grid gap-1'>
          <Label htmlFor='projectName'>Project name</Label>
          <Input
            id='projectName'
            placeholder='Nextjs'
            type='name'
            {...register('projectName')}
            defaultValue={projectName}
          />
          {errors?.projectName && (
            <p className='px-1 text-xs text-red-600'>
              {errors.projectName.message}
            </p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='websiteUrl'>Documatation URL</Label>
          <Input
            id='websiteUrl'
            placeholder='https://nextjs.org/docs'
            type='url'
            {...register('websiteUrl')}
            defaultValue={websiteUrl}
          />
          {errors?.websiteUrl && (
            <p className='px-1 text-xs text-red-600'>
              {errors.websiteUrl.message}
            </p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='match'>Match</Label>
          <Input
            id='match'
            placeholder='https://nextjs.org/docs/**'
            type='text'
            {...register('match')}
            defaultValue={match}
          />
          {errors?.match && (
            <p className='px-1 text-xs text-red-600'>{errors.match.message}</p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='cssSelector'>CSS Selector</Label>
          <Input
            id='cssSelector'
            placeholder='.docs-container'
            type='text'
            {...register('cssSelector')}
            defaultValue={cssSelector}
          />
          {errors?.cssSelector && (
            <p className='px-1 text-xs text-red-600'>
              {errors.cssSelector.message}
            </p>
          )}
        </div>
      </div>

      <NextBackButton isLoading={false} />
    </form>
  )
}

export default WebsiteInfoForm
