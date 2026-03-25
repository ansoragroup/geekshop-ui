import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReturnRequestPage } from './ReturnRequestPage';

const meta = {
  title: 'Pages/ReturnRequestPage',
  component: ReturnRequestPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof ReturnRequestPage>;

export default meta;
type Story = StoryObj<typeof ReturnRequestPage>;

/** Step 1: Select which items to return — checkboxes with product images and prices */
export const SelectItems: Story = {
  args: { step: 0 },
};

/** Step 2: Choose the return reason — radio group with common reasons */
export const SelectReason: Story = {
  args: { step: 1 },
};

/** Step 3: Upload evidence photos and add description — camera button and textarea */
export const UploadPhotos: Story = {
  args: { step: 2 },
};

/** Step 4: Review summary before submitting — selected items, reason, refund amount */
export const ConfirmSubmit: Story = {
  args: { step: 3 },
};

/** Step 1 on narrow iPhone SE — verifies item checkboxes and images fit correctly */
export const SelectItemsSmallScreen: Story = {
  args: { step: 0 },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};

/** Step 3 on narrow device — verifies upload area and textarea layout */
export const UploadPhotosSmallScreen: Story = {
  args: { step: 2 },
  parameters: {
    viewport: { defaultViewport: 'iPhoneSE' },
  },
};
