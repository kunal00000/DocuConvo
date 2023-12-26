import { Button } from '@/components/ui/button'

type NavProps = {
  currentStepIndex: number
  goTo: (index: number) => void
}

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <nav>
      <Button
        className='cursor-pointer h-8 rounded-r-none'
        // onClick={() => goTo(0)}
        variant={currentStepIndex === 0 ? 'default' : 'outline'}
      >
        Website
      </Button>
      <Button
        className='cursor-pointer h-8 rounded-l-none rounded-r-none'
        // onClick={() => goTo(1)}
        variant={currentStepIndex === 1 ? 'default' : 'outline'}
      >
        Pinecone
      </Button>
      <Button
        className='cursor-pointer h-8 rounded-l-none'
        // onClick={() => goTo(2)}
        variant={currentStepIndex === 2 ? 'default' : 'outline'}
      >
        OpenAI
      </Button>
    </nav>
  )
}

export default SideBar
