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

/** Default: three addresses (Home default, Work, Parents) with edit/delete actions */
export const Default: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

/** Single address — only one home address saved */
export const SingleAddress: Story = {
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};

/** Empty state — no addresses saved, CTA to add first address */
export const Empty: Story = {
  args: {
    empty: true,
  },
};

/** Delete confirmation popup visible for work address */
export const DeleteConfirmation: Story = {
  args: {
    empty: false,
    showDeleteConfirm: true,
  },
};

/** Multiple addresses with default indicator and "Add Address" button at bottom */
export const WithAddButton: Story = {
  name: 'With Add Button',
  args: {
    empty: false,
    showDeleteConfirm: false,
  },
};
