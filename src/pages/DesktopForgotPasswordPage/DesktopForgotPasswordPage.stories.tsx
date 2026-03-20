import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopForgotPasswordPage } from './DesktopForgotPasswordPage';

const meta = {
  title: 'Pages (Desktop)/DesktopForgotPasswordPage',
  component: DesktopForgotPasswordPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopForgotPasswordPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmailSent: Story = {
  name: 'Email Sent',
  args: {
    initialSubmitted: true,
    initialEmail: 'bekzod.tursunov@mail.uz',
  },
};
