import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopLoginPage } from './DesktopLoginPage';

const meta = {
  title: 'Pages (Desktop)/DesktopLoginPage',
  component: DesktopLoginPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopLoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  name: 'With Error',
  args: {
    error: 'Invalid email or password. Please try again.',
    initialEmail: 'alisher@mail.uz',
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    loading: true,
    initialEmail: 'nodira@geekshop.uz',
  },
};
