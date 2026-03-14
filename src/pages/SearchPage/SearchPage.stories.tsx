import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchPage } from './SearchPage';

const meta: Meta<typeof SearchPage> = {
  title: 'Pages/SearchPage',
  component: SearchPage,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'White' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchPage>;

export const EmptyState: Story = {
  args: {
    state: 'empty',
  },
};

export const TypingSuggestions: Story = {
  args: {
    state: 'typing',
  },
};

export const SearchResults: Story = {
  args: {
    state: 'results',
  },
};
