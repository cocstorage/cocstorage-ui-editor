import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@cocstorage/ui';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  },
  argTypes: { darkMode: { control: 'boolean' }, customStyle: { control: false } },
  args: { darkMode: false },
  decorators: [
    (Story, { args: { darkMode } }) => (
      <ThemeProvider theme={darkMode ? 'dark' : 'light'}>
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;
