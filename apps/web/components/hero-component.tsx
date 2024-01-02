'use client'

import Spline from '@splinetool/react-spline'

export default function HeroComponent() {
  return (
    <div className='h-[30vh] w-fit'>
      <Spline scene='/spline/chips.spline' className='scale-125' />
    </div>
  )
}
