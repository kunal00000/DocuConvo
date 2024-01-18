import { SiteConfig } from 'types'

const site_url = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const siteConfig: SiteConfig = {
  name: 'DocuConvo.',
  description: 'Make Your Documentation Developer friendly!',
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: 'https://x.com/kunalvermax',
    github: 'https://github.com/kunal00000/DocuConvo'
  },
  mailSupport: 'docuconvo@gmail.com'
}
