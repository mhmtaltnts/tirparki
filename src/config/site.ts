export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Akbaşlar',
  description: 'Tır parkı',
  mainNav: [
    {
      title: 'Anasayfa',
      href: '/',
    },

    {
      title: 'Hakkımızda',
      href: '/about',
    },
    {
      title: 'İletişim',
      href: '/contact',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
};
