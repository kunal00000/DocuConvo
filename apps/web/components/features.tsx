import React from 'react'

import Image from 'next/image'

const ContentImageData = [
  {
    id: 1,
    title: 'Effortless Integration',
    content:
      'Our first priority is to make developer life easier. We have made the integration process as simple as possible. You can integrate Docuconvo with your existing documentation website in just a three lines of code. We have also provided a detailed documentation for the same.',
    align: 'right',
    image: '/features1.png'
  },
  {
    id: 2,
    title: 'Easy search',
    content:
      'We have made the search process as simple as possible. You can search for the queries in the search bar and we will provide you with the best possible answer. We have also provided a detailed documentation for the same.',
    align: 'left',
    image: '/features2.png'
  }
]

const Features = () => {
  return (
    <section className='flex items-center justify-center space-y-6'>
      <div className=' flex max-w-[64rem] flex-col items-center gap-5 pt-10 text-center md:pt-20 '>
        <h2 className='rounded-full border border-gray-700 bg-white px-4 text-lg tracking-tight dark:text-black  '>
          Features
        </h2>
        <h3 className='max-w-screen-md text-2xl font-semibold tracking-tight sm:text-3xl md:mt-4 md:text-4xl lg:text-5xl'>
          Simplify Your Documentation Journey with Docuconvo
        </h3>
        <p className=' max-w-screen-md text-lg text-gray-700 md:text-xl  '>
          Our application crawls the entire documentation website provided by
          the organization to Create the undifited Knowledge Base. This
          knowledge base is then used to generate the answers to the queries.
        </p>
        <div className=' mt-16 space-y-28'>
          {ContentImageData.map((item) => (
            <div
              key={item.id}
              className=' grid gap-10 md:grid-cols-2 md:gap-12'>
              <div
                className={`rounded-3xl ${
                  item.align === 'left' ? 'md:order-1' : ''
                }`}>
                <Image
                  src={item.image}
                  width={512}
                  height={512}
                  objectFit='cover'
                  alt='Process Banner 1'
                  className='blur-16 w-full rounded-2xl    drop-shadow-xl'
                />
              </div>
              <div
                className={` text-start ${
                  item.align === 'left'
                    ? 'ml-auto md:pr-16 lg:pr-24 xl:pr-32'
                    : 'mr-auto md:pl-16 lg:pl-24  xl:pl-32'
                } content my-auto text-black/60 dark:text-white/60`}>
                <h3 className='mb-6 text-xl font-semibold text-black md:text-2xl dark:text-white'>
                  {item.title}
                </h3>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
