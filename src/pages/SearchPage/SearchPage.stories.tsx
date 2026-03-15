import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchPage } from './SearchPage';

const meta = {
  title: 'Pages/SearchPage',
  component: SearchPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'White' },
  },
} satisfies Meta<typeof SearchPage>;

export default meta;
type Story = StoryObj<typeof SearchPage>;

export const Empty: Story = {
  args: {
    state: 'empty',
  },
};

export const WithResults: Story = {
  args: {
    state: 'withResults',
  },
};

export const NoResults: Story = {
  args: {
    state: 'noResults',
  },
};
