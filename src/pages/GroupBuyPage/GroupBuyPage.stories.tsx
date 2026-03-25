import type { Meta, StoryObj } from '@storybook/react-vite';
import { GroupBuyPage } from './GroupBuyPage';

const meta = {
  title: 'Pages/GroupBuyPage',
  component: GroupBuyPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof GroupBuyPage>;

export default meta;
type Story = StoryObj<typeof GroupBuyPage>;

/** Default: all group buy deals with announcement banner and social proof */
export const Default: Story = {};

/** Ending soon deals — groups about to expire, high urgency */
export const EndingSoon: Story = {
  args: {
    filter: 'ending',
  },
};

/** New group buy deals — recently created groups */
export const NewDeals: Story = {
  name: 'New Deals',
  args: {
    filter: 'new',
  },
};

/** All group buy cards showing different progress states (1/3, 2/3, 4/5 members) */
export const VariousProgress: Story = {
  name: 'Various Progress',
};

/** Group buy page with HOT banner and social proof showing 2340 buyers today */
export const WithSocialProof: Story = {
  name: 'With Social Proof',
};

/** Budget-friendly group buy deals */
export const BudgetDeals: Story = {
  name: 'Budget Deals',
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[3] instanceof HTMLElement) {
      tabs[3].click();
    }
  },
};
