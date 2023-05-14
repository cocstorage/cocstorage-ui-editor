import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="https://static.cocstorage.com/css/minsansvf-dynamic-subset.css" />
    <style>
          body { font-family: MinSansVF, serif; }
    </style>
  `,
  docs: {
    autodocs: 'tag'
  }
};
export default config;
