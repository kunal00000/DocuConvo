import { FAQs } from '@/components/faq'
import HeroSection from '@/components/hero-section'
import { HowToGetStarted } from '@/components/how-to-get-started'
import { SiteFooter } from '@/components/layout/site-footer'

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
