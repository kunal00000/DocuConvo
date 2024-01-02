import { SiteConfig } from 'types'

import { env } from '@/env.mjs'

const site_url = env.NEXT_PUBLIC_APP_URL

export const siteConfig: SiteConfig = {
  name: 'DocuConvo',
  description: 'Make Your Documentation Developer friendly!!',
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: 'https://x.com/kunalvermax',
    github: 'https://github.com/kunal00000/DocuConvo'
  },
  mailSupport: 'docuconvo@gmail.com'
}
