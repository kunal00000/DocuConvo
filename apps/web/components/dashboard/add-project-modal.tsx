'use client'

import { useState } from 'react'

import SideBar from '@/components/dashboard/form-side-bar'
import WebsiteInfoForm from '@/components/dashboard/website-info-form'
import { Modal } from '@/components/shared/modal'
import { useAddProjectModal } from '@/hooks/use-modal'
import { ProjectForm } from '@/lib/validations/add-project-form'

import OpenAIForm from './openai-form'
import PineconeInfo from './pinecone-form'

export const AddProjectModal = () => {
  const initialValues: ProjectForm = {
    project: {
      projectName: '',
      websiteUrl: '',
      match: '',
      cssSelector: ''
    },
    pinecone: {
      pinecone_ApiKey: '',
      pinecone_environment: 'gcp-starter',
      pinecone_indexName: ''
    },
    openai: {
      openai_ApiKey: ''
    }
  }
  const { currentStepIndex, goTo, isOpen, onClose, previousStep } =
    useAddProjectModal()
  const [formData, setFormData] = useState(initialValues)

  const updateData = (
    fieldToUpdate: Partial<ProjectForm['project' | 'openai' | 'pinecone']>
  ) => {
    setFormData((prev) => ({
      ...prev,
      ...fieldToUpdate
    }))
  }

  return (
    <Modal showModal={isOpen} setShowModal={onClose}>
      <div className='mx-auto flex w-full justify-center pb-6'>
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      </div>
      <main className={'h-full'}>
        {currentStepIndex === 0 && (
          <WebsiteInfoForm
            key='step1'
            {...formData['project']}
            updateData={updateData}
          />
        )}
        {currentStepIndex === 1 && (
          <PineconeInfo
            key='step2'
            {...formData['pinecone']}
            updateData={updateData}
          />
        )}
        {currentStepIndex === 2 && (
          <OpenAIForm
            key='step3'
            {...formData}
            onClose={onClose}
            previousStep={previousStep}
            updateData={updateData}
          />
        )}
      </main>
    </Modal>
  )
}
