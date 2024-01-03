'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { updateProject, type FormData } from '@/actions/update-project'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { projectFormSchema } from '@/lib/validations/project'
import { zodResolver } from '@hookform/resolvers/zod'
import { Project } from '@prisma/client'

import { Icons } from '../shared/icons'

interface ProjectFormProps {
  project: Project
}

export function ProjectSettingForm({ project }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      id: project.id,
      projectName: project?.name || '',
      websiteUrl: project?.websiteUrl || '',
      match: project?.match || '',
      cssSelector: project?.cssSelector || '',
      pinecone_ApiKey: project?.pineconeApiKey || '',
      pinecone_environment: project?.pineconeEnvironment || '',
      pinecone_indexName: project?.pineconeIndexName || '',
      openai_ApiKey: project?.openaiApiKey || ''
    }
  })

  const onSubmitForm = async (data: FormData) => {
    setIsLoading(true)
    const { status } = await updateProject(data)

    setIsLoading(false)
    if (status !== 'success') {
      toast({
        title: 'Something went wrong.',
        description: 'Your data was not updated. Please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        description: 'Your data has been updated.'
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Card>
        <CardHeader>
          <CardTitle>Project Info</CardTitle>
          <CardDescription>Update your project info here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-1'>
            <Label htmlFor='projectName'>Project Name</Label>
            <Input
              id='projectName'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('projectName', { required: true })}
            />
            {errors.projectName && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='website_url'>Website Url</Label>
            <Input
              id='website_url'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('websiteUrl', { required: true })}
            />
            {errors.websiteUrl && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='match'>Website Url Match</Label>
            <Input
              id='match'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('match', { required: true })}
            />
            {errors.match && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='cssSelector'>web page css selector</Label>
            <Input
              id='cssSelector'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('cssSelector', { required: true })}
            />
            {errors.cssSelector && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='pinecone_ApiKey'>Pinecone API Key</Label>
            <Input
              id='pinecone_ApiKey'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('pinecone_ApiKey', { required: true })}
            />
            {errors.pinecone_ApiKey && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='pinecone_environment'>Pinecone Environment</Label>
            <Input
              id='pinecone_environment'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('pinecone_environment', { required: true })}
            />
            {errors.pinecone_environment && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='pinecone_indexName'>Pinecone Index Name</Label>
            <Input
              id='pinecone_indexName'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('pinecone_indexName', { required: true })}
            />
            {errors.pinecone_indexName && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className=' mt-3 grid gap-1'>
            <Label htmlFor='openai_ApiKey'>OpenAI API Key</Label>
            <Input
              id='openai_ApiKey'
              className='w-full sm:w-[400px]'
              size={32}
              {...register('openai_ApiKey', { required: true })}
            />
            {errors.openai_ApiKey && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                <Icons.spinner className='mr-2 size-4 animate-spin' />
                <span>Saving</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
