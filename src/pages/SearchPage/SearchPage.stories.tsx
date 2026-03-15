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

/** Empty state showing popular searches and search history */
export const Empty: Story = {
  args: {
    state: 'empty',
  },
};

/** Results with working TabFilter sorting and live search filtering */
export const WithResults: Story = {
  args: {
    state: 'withResults',
  },
};

/** No results found for the search query */
export const NoResults: Story = {
  args: {
    state: 'noResults',
  },
};
