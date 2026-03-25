import type { Meta, StoryObj } from '@storybook/react-vite';
import { FAQPage } from './FAQPage';

const meta = {
  title: 'Pages/FAQPage',
  component: FAQPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof FAQPage>;

export default meta;
type Story = StoryObj<typeof FAQPage>;

/** Default: all FAQ categories visible with search */
export const Default: Story = {};

/** FAQ with all items collapsed — initial state */
export const AllCollapsed: Story = {};

/** Order-related FAQ items filtered by category tab */
export const OrderCategory: Story = {
  play: async ({ canvasElement }) => {
    // Click the "Buyurtma" (Order) tab
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** Payment category filtered FAQ items */
export const PaymentCategory: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** Delivery category FAQ items */
export const DeliveryCategory: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[3] instanceof HTMLElement) {
      tabs[3].click();
    }
  },
};

/** Return policy FAQ items */
export const ReturnCategory: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[4] instanceof HTMLElement) {
      tabs[4].click();
    }
  },
};
