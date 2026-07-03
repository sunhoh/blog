import type { SiteConfig } from '~/cfg-schema';

const config: SiteConfig = {
  siteUrl: 'https://whitespace-blog-template.netlify.app',
  title: 'Hello World',
  titleTemplate: '%s',
  description: 'minimalism coding blog build with astro',
  favicon: '/favicon.svg',
  ogImage: '/og.avif',
  analytics: {
    provider: 'umami',
    websiteId: '3e44b81b-09f0-4eaf-8c30-aad1b17e7903',
  },
  bio: {
    name: '이선호',
    avatar: '/avatar.avif',
    description: `환영합니다! /posts에서 문서를 확인하실 수 있습니다.\n현재 의료 서비스(MSO)에서 근무하고 있습니다.`,
    links: [
      {
        label: 'mail',
        url: 'dltjsgho94@gmail.com',
      },
      {
        label: 'github',
        url: 'https://github.com/sunhoh',
      },
    ],
  },
  // @see https://giscus.app/
  giscus: {
    repo: 'bepyan/whitespace-blog-template',
    repoId: 'R_kgDONQJYcQ',
  },
};

export default config;
