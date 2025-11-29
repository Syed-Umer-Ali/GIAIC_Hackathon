# Tasks: Core Book Setup

**Input**: Design documents from `/specs/001-core-book-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: No tests are included in this plan.

**Organization**: Tasks are grouped by phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Initialization

**Purpose**: Project initialization and basic structure

- [x] T001 Run `npx create-docusaurus@latest physical-ai-book classic --typescript` to scaffold the project.
- [x] T002 Remove the default "Tutorial" and "Blog" dummy files.

**STOP**: Human review recommended before proceeding to the next phase.

---

## Phase 2: Configuration

**Purpose**: Configure the Docusaurus project.

- [x] T003 Update `docusaurus.config.ts` with the following configuration:
  ```typescript
  import {themes as prismThemes} from 'prism-react-renderer';
  import type {Config} from '@docusaurus/types';
  import type * as Preset from '@docusaurus/preset-classic';

  const config: Config = {
    title: 'Physical AI & Humanoid Robotics',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://<username>.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/physical-ai-book/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: '<username>', // Usually your GitHub org/user name.
    projectName: 'physical-ai-book', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
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
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            // Remove this to remove the "edit this page" links.
            editUrl:
              'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          },
          theme: {
            customCss: './src/css/custom.css',
          },
        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/intro',
            label: 'Textbook',
            position: 'left',
          },
          {to: '/blog', label: 'About', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
cwf-lock-line:
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig,
  };

  export default config;

  ```

**STOP**: Human review recommended before proceeding to the next phase.

---

## Phase 3: Content Structure

**Purpose**: Create the module folders and configure the sidebar.

- [x] T004 Create the following folders in the `/docs` directory:
  - `01-module-1-ros2`
  - `02-module-2-gazebo`
  - `03-module-3-isaac`
  - `04-module-4-vla`
- [x] T005 Update `sidebars.ts` to automatically generate the sidebar from the `docs/` folder structure:
  ```typescript
  import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

  const sidebars: SidebarsConfig = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually
    /*
    tutorialSidebar: [
      'intro',
      'hello',
      {
        type: 'category',
        label: 'Tutorial',
        items: ['tutorial-basics/create-a-document'],
      },
    ],
     */
  };

  export default sidebars;
  ```

**STOP**: Human review recommended before proceeding to the next phase.

---

## Phase 4: Theming

**Purpose**: Apply the "Cyberpunk/Robotics" theme.

- [x] T006 Update `src/css/custom.css` with the following CSS rules:
  ```css
  /**
   * Any CSS included here will be global. The classic template
   * bundles Infima by default. Infima is a CSS framework designed to
   * work well for content-centric websites.
   */

  /* You can override the default Infima variables here. */
  :root {
    --ifm-color-primary: #00f3ff;
    --ifm-color-primary-dark: #00dbe6;
    --ifm-color-primary-darker: #00d2d9;
    --ifm-color-primary-darkest: #00afb3;
    --ifm-color-primary-light: #29f5ff;
    --ifm-color-primary-lighter: #36f6ff;
    --ifm-color-primary-lightest: #63f8ff;
    --ifm-code-font-size: 95%;
    --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
  }

  /* For readability concerns, you should choose a lighter palette in dark mode. */
  [data-theme='dark'] {
    --ifm-color-primary: #00f3ff;
    --ifm-color-primary-dark: #00dbe6;
    --ifm-color-primary-darker: #00d2d9;
    --ifm-color-primary-darkest: #00afb3;
    --ifm-color-primary-light: #29f5ff;
    --ifm-color-primary-lighter: #36f6ff;
    --ifm-color-primary-lightest: #63f8ff;
    --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
    background-color: #0a0a0a;
  }
  ```

**STOP**: Human review recommended before proceeding to the next phase.


