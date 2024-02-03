import dynamic from 'next/dynamic'

import HeroSection from '@/components/hero-section'
import { HowToGetStarted } from '@/components/how-to-get-started'
import { SiteFooter } from '@/components/layout/site-footer'

const FAQs = dynamic(() => import('@/components/faq'))

export default async function IndexPage() {
  return (
    <>
      <HeroSection />
      <HowToGetStarted />
      <FAQs />
      <SiteFooter />
    </>
  )
}
