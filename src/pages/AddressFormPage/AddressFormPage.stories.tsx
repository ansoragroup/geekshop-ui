import type { Meta, StoryObj } from '@storybook/react-vite';
import { AddressFormPage } from './AddressFormPage';

const meta = {
  title: 'Pages/AddressFormPage',
  component: AddressFormPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof AddressFormPage>;

export default meta;
type Story = StoryObj<typeof AddressFormPage>;

/** Add new address — empty form with Home label selected */
export const AddNew: Story = {
  args: {
    mode: 'add',
  },
};

/** Edit existing address — form pre-filled with Jasur Karimov's home address */
export const EditExisting: Story = {
  args: {
    mode: 'edit',
    addressId: 0,
  },
};

/** Form with validation errors showing on required fields (name, phone, address) */
export const WithErrors: Story = {
  args: {
    mode: 'add',
    showErrors: true,
  },
};

/** Edit second address — work address at Mustaqillik ko'chasi */
export const EditWorkAddress: Story = {
  args: {
    mode: 'edit',
    addressId: 1,
  },
};

/** Add new address with Work label pre-selected */
export const AddWorkAddress: Story = {
  args: {
    mode: 'add',
  },
};
