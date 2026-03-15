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

export const SelectItems: Story = {
  args: { step: 0 },
};

export const SelectReason: Story = {
  args: { step: 1 },
};

export const UploadPhotos: Story = {
  args: { step: 2 },
};

export const ConfirmSubmit: Story = {
  args: { step: 3 },
};
