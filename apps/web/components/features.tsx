import React from 'react'

const Features = () => {
  return (
    <section
      id='features'
      className='bg-white py-12 sm:py-16 lg:py-20 xl:py-24'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center font-custom'>
          <p className='text-[0.65rem] md:text-sm font-bold uppercase tracking-wider md:tracking-widest text-gray-700'>
            a complete{' '}
            <span className='text-gradient_indigo-purple'>
              Documentation Search{' '}
            </span>
            Solution
          </p>
          <h2 className='mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl'>
            Streamline Your Documentation Experience
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-sm font-normal text-gray-700 lg:text-xl lg:leading-8'>
            Going through documentation can take up a lot of time. DocuConvo is
            simple yet powerful tool designed to make this process simpler.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features
