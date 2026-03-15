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

export const AddNew: Story = {
  args: {
    mode: 'add',
  },
};

export const EditExisting: Story = {
  args: {
    mode: 'edit',
    addressId: 0,
  },
};

export const WithErrors: Story = {
  args: {
    mode: 'add',
    showErrors: true,
  },
};
