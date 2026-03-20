import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopRegisterPage } from './DesktopRegisterPage';

const meta = {
  title: 'Pages (Desktop)/DesktopRegisterPage',
  component: DesktopRegisterPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopRegisterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValidationErrors: Story = {
  name: 'With Validation Errors',
  args: {
    initialValues: {
      name: 'Bekzod',
      email: 'alisher@mail.uz',
      phone: '+998 90',
    },
    errors: {
      email: 'This email is already registered',
      password: 'Password must be at least 8 characters',
      phone: 'Enter a valid phone number',
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    loading: true,
    initialValues: {
      name: 'Nodira Karimova',
      email: 'nodira@example.com',
      phone: '+998 93 456 78 90',
    },
  },
};
