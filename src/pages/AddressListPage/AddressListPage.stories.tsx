import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddressListPage } from './AddressListPage';

const meta = {
  title: 'Pages/AddressListPage',
  component: AddressListPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof AddressListPage>;

export default meta;
type Story = StoryObj<typeof AddressListPage>;

export const Default: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

export const SingleAddress: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

export const Empty: Story = {
  args: {
    empty: true,
  },
};

export const DeleteConfirmation: Story = {
  args: {
    empty: false,
    showDeleteConfirm: true,
  },
};
