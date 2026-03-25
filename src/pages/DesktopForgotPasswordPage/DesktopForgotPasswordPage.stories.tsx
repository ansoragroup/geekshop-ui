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

export const PrefilledEmail: Story = {
  name: 'Pre-filled Email',
  args: {
    initialEmail: 'nodira.rustamova@geekshop.uz',
  },
};

export const GmailUser: Story = {
  name: 'Gmail User — Confirmation Sent',
  args: {
    initialSubmitted: true,
    initialEmail: 'alisher.karimov@gmail.com',
  },
};

export const CorporateEmail: Story = {
  name: 'Corporate Email — Confirmation Sent',
  args: {
    initialSubmitted: true,
    initialEmail: 'jasur.abdullayev@ansora.group',
  },
};
