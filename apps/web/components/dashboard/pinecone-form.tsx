import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useAddProjectModal } from '@/hooks/use-modal'
import { pineconeInfoSchema } from '@/lib/validations/add-project-form'
import { zodResolver } from '@hookform/resolvers/zod'

import NextBackButton from './next-back-button'

type FormData = z.infer<typeof pineconeInfoSchema>

const PineconeEnvironment = [
  'gcp-starter',
  'eu-west4-gcp',
  'northamerica-northeast1-gcp',
  'asia-northeast1-gcp',
  'asia-southeast1-gcp',
  'us-east4-gcp',
  'us-west4-gcp',
  'us-central1-gcp',
  'us-west1-gcp',
  'us-east1-gcp',
  'eu-west1-gcp'
]

const PineconeInfo = ({ pinecone_ApiKey, pinecone_indexName, updateData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<FormData>({
    resolver: zodResolver(pineconeInfoSchema)
  })
  const { nextStep } = useAddProjectModal()

  const onSubmitForm = (data: FormData) => {
    updateData({ pinecone: { ...data } })
    nextStep()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className='flex h-full flex-col justify-evenly'>
      <div className='slide-in-left grid gap-5'>
        <div className='grid gap-1'>
          <Label htmlFor='name'>Index Name</Label>
          <Input
            id='name'
            className='w-full'
            {...register('pinecone_indexName')}
            placeholder='index name'
            defaultValue={pinecone_indexName}
          />
          {errors?.pinecone_indexName && (
            <p className='px-1 text-xs text-red-600'>
              {errors.pinecone_indexName.message}
            </p>
          )}
        </div>

        <div className='grid gap-1'>
          <Label htmlFor='env_name'>Environment Name</Label>
          <Controller
            control={control}
            name='pinecone_environment'
            render={({ field }) => {
              return (
                <Select name='env_name' onValueChange={field.onChange}>
                  <SelectTrigger className='xs:w-[70%] md:w-[60%]'>
                    <SelectValue placeholder='Select a environment name' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Environment Name</SelectLabel>
                      {PineconeEnvironment.map((env) => {
                        return (
                          <SelectItem value={env} key={env}>
                            {env}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }}></Controller>
          {errors?.pinecone_environment && (
            <p className='px-1 text-xs text-red-600'>
              {errors.pinecone_environment.message}
            </p>
          )}
        </div>
        <div className='grid gap-1'>
          <Label htmlFor='apikey'>API Key</Label>
          <Input
            id='apikey'
            className='w-full'
            placeholder='API Key'
            {...register('pinecone_ApiKey')}
            defaultValue={pinecone_ApiKey}
          />
          {errors?.pinecone_ApiKey && (
            <p className='px-1 text-xs text-red-600'>
              {errors.pinecone_ApiKey.message}
            </p>
          )}
        </div>
      </div>

      <NextBackButton isLoading={false} />
    </form>
  )
}

export default PineconeInfo
