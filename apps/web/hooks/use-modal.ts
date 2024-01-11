import { create } from 'zustand'

interface useSignInModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

interface useWaitlistModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSigninModal = create<useSignInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

export const useWaitlistModal = create<useWaitlistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))

interface useAddProjectModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  currentStepIndex: number
  nextStep: () => void
  previousStep: () => void
  goTo: (index: number) => void
  isFirstStep: () => boolean
  isLastStep: () => boolean
}

export const useAddProjectModal = create<useAddProjectModalStore>(
  (set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    currentStepIndex: 0,

    nextStep: () => {
      const { currentStepIndex } = get()

      if (currentStepIndex < 2) {
        set({ currentStepIndex: currentStepIndex + 1 })
      }
    },

    previousStep: () => {
      const { currentStepIndex } = get()

      if (currentStepIndex > 0) {
        set({ currentStepIndex: currentStepIndex - 1 })
      }
    },

    goTo: (index: number) => {
      set({ currentStepIndex: index })
    },

    isFirstStep: () => {
      const { currentStepIndex } = get()
      return currentStepIndex === 0
    },

    isLastStep: () => {
      const { currentStepIndex } = get()
      return currentStepIndex === 2
    }
  })
)
