const Loading = () => {
  return (
    <div className='flex justify-center items-center min-h-[50vh] '>
      <div className='flex relative h-8 w-8'>
        <span className='animate-ping absolute h-8 w-8 -top-0 -left-0 rounded-full bg-cyan-500 opacity-75'></span>
        <span className='absolute h-8 w-8 -top-0 -left-0 bg-cyan-500 rounded-full opacity-55'></span>
        <span className='relative rounded-full h-4 w-4 top-2 left-2 bg-cyan-500'></span>
      </div>
    </div>
  )
}

export default Loading
