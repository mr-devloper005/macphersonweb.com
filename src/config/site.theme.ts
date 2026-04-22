import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Document and identity platform',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'profile',
    featuredTaskKeys: ['profile', 'pdf', 'article'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'editorial-feature',
    classified: 'catalog-grid',
    pdf: 'editorial-feature',
    sbm: 'catalog-grid',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
