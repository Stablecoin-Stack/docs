import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Stablecoin Stack',
  tagline: 'On-chain stablecoin payments, without friction',
  favicon: 'img/icon-blue-bg.png',

  future: {
    v4: true,
  },

  url: 'https://docs.stablecoinstack.org',
  baseUrl: '/',

  organizationName: 'stablecoin-stack',
  projectName: 'docs',
  onBrokenLinks: 'throw',
  //onBrokenMarkdownLinks: 'warn',
  //siteConfig.markdown.hooks.onBrokenMarkdownLinks
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/stablecoin-stack/stablecoin-stack/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',

    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'Stablecoin Stack',
      logo: {
        alt: 'Stablecoin Stack Logo',
        src: 'img/logo-white-bg-512.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ssfCustomSidebar', //'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          position: 'left',
          label: 'Home',
          href: '/',
        },
        {
          position: 'right',
          label: 'Financial Support',
          href: '/donate',
        },
        {
          href: 'https://github.com/stablecoin-stack',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {

      logo: {
        alt: "Stablecoin stack logo",
        src: 'img/icon-blue-bg.png',
        width: 80
      },
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
<<<<<<< HEAD
            { label: 'Introduction', to: '/introduction' },
            { label: 'Architecture', to: '/impl/architecture-overview' },
            { label: 'Checkout & Wallet', to: '/impl/checkout-platform' },
            { label: 'Security Model', to: '/impl/security-model' },
=======
            { label: 'Introduction', to: '/docs/introduction' },
            { label: 'Architecture', to: '/docs/impl/architecture-overview' },
            { label: 'Checkout & Wallet', to: '/docs/impl/checkout-platform' },
            { label: 'Security Model', to: '/docs/impl/security-model' },
>>>>>>> ca0438e2be4983b5089ef73042d86b43f5001de4
          ],
        },
        {
          title: 'Developers',
          items: [
<<<<<<< HEAD
            { label: 'SDK & Integration', to: '/impl/sdk-integration-guide' },
            { label: 'Token Standards', to: '/impl/token-standards-support' },
            { label: 'Deployment Guide', to: '/impl/deployment-guide' },
=======
            { label: 'SDK & Integration', to: '/docs/impl/sdk-integration-guide' },
            { label: 'Token Standards', to: '/docs/impl/token-standards-support' },
            { label: 'Deployment Guide', to: '/docs/impl/deployment-guide' },
>>>>>>> ca0438e2be4983b5089ef73042d86b43f5001de4
            { label: 'GitHub', href: 'https://github.com/stablecoin-stack' },
          ],
        },
        {
          title: 'Foundation',
          items: [
<<<<<<< HEAD
            { label: 'Vision & Principles', to: '/vision-principles' },
            { label: 'Governance', to: 'https://stablecoinstack.org/governance-and-community' },
            { label: 'Roadmap', to: '/roadmap' },
=======
            { label: 'Vision & Principles', to: '/docs/vision-principles' },
            { label: 'Governance', to: 'https://stablecoinstack.org/governance-and-community' },
            { label: 'Roadmap', to: '/docs/roadmap' },
>>>>>>> ca0438e2be4983b5089ef73042d86b43f5001de4
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/your-invite' },
            { label: 'X (Twitter)', href: 'https://x.com/stablecoinstack' },
            { label: 'Blog / Updates', to: 'https://stablecoinstack.org/blog' },
          ],
        },
      ],
      copyright: `
    © ${new Date().getFullYear()} Stablecoin Stack Foundation.
    MIT License. Stablecoin Stack is open-source and community-driven.
  `,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;