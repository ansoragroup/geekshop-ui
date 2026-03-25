import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlashSalePage } from './FlashSalePage';

const meta = {
  title: 'Pages/FlashSalePage',
  component: FlashSalePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof FlashSalePage>;

export default meta;
type Story = StoryObj<typeof FlashSalePage>;

/** Default: 10:00 time slot with live flash sale products */
export const Default: Story = {};

/** Active flash sale at 10:00 slot — products with sell-through progress bars */
export const LiveSale10AM: Story = {
  name: 'Live Sale 10AM',
};

/** Active flash sale at 14:00 slot */
export const LiveSale2PM: Story = {
  name: 'Live Sale 2PM',
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[1] instanceof HTMLElement) {
      tabs[1].click();
    }
  },
};

/** Upcoming 20:00 slot showing "notify me" button */
export const UpcomingSlot: Story = {
  play: async ({ canvasElement }) => {
    const tabs = canvasElement.querySelectorAll('[role="tab"]');
    if (tabs[2] instanceof HTMLElement) {
      tabs[2].click();
    }
  },
};

/** Flash sale with countdown timer running — products with various sell-through % */
export const WithCountdown: Story = {};

/** Flash sale showing products near sold out (high sell-through percentage) */
export const NearSoldOut: Story = {};
