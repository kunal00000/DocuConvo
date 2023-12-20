import { env } from "@/env.mjs";
import { SiteConfig } from "types"

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "DocuConvo",
  description:
    "Make Your Documentation Developer friendly!!",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/kunalvermax",
    github: "https://github.com/kunal00000/DocuConvo",
  },
  mailSupport: "support@saas-starter.com"
}
