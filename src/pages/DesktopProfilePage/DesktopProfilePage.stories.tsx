import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProfilePage } from './DesktopProfilePage';

const meta = {
  title: 'Pages (Desktop)/DesktopProfilePage',
  component: DesktopProfilePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Alisher Karimov',
    userEmail: 'alisher@mail.uz',
    userPhone: '+998 90 123 45 67',
  },
};

export const EditMode: Story = {
  name: 'Different User',
  args: {
    userName: 'Nodira Rustamova',
    userEmail: 'nodira.rustamova@geekshop.uz',
    userPhone: '+998 93 456 78 90',
  },
};
