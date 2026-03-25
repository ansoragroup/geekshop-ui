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

/** Initial state — popular searches ranking and recent search history tags */
export const Empty: Story = {
  args: {
    state: 'empty',
  },
};

/** Search results for "RTX 4090" — product grid with TabFilter sorting and FilterBar */
export const WithResults: Story = {
  args: {
    state: 'withResults',
  },
};

/** No matching products — empty illustration with suggestion to browse popular items */
export const NoResults: Story = {
  args: {
    state: 'noResults',
  },
};

/** Initial empty state on narrow iPhone SE — verifies popular searches and history fit */
export const EmptyOnSmallScreen: Story = {
  args: {
    state: 'empty',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** Search results on narrow device — verifies product grid columns and filter bar layout */
export const WithResultsOnSmallScreen: Story = {
  args: {
    state: 'withResults',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** No results on narrow device — verifies empty illustration and CTA button fit */
export const NoResultsOnSmallScreen: Story = {
  args: {
    state: 'noResults',
  },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};
