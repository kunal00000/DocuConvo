import { DashboardConfig } from 'types'

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: 'https://github.com/kunal00000/DocuConvo?tab=readme-ov-file#introduction'
    }
  ],
  sidebarNav: [
    {
      title: 'Panel',
      href: '/dashboard',
      icon: 'post'
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings'
    }
  ],
  docsNav: [
    {
      title: 'overview',
      href: '/',
      icon: 'post'
    },

    {
      title: 'setting',
      href: '/setting',
      icon: 'settings'
    }
  ]
}
