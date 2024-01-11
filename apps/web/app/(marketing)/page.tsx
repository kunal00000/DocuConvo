import { FAQs } from '@/components/faq'
import Features from '@/components/features'
import HeroSection from '@/components/hero-section'
import { SiteFooter } from '@/components/layout/site-footer'

export default async function IndexPage() {
  return (
    <>
      <HeroSection />
      <Features />
      <FAQs />
      <SiteFooter />
    </>
  )
}
