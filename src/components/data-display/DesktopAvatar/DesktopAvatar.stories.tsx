import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAvatar } from './DesktopAvatar';

const meta = {
  title: 'Data Display (Desktop)/DesktopAvatar',
  component: DesktopAvatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/seed/avatar1/128/128',
    name: 'Dilshod Rahimov',
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <DesktopAvatar name="John Doe" size="sm" />
      <DesktopAvatar name="John Doe" size="md" />
      <DesktopAvatar name="John Doe" size="lg" />
      <DesktopAvatar name="John Doe" size="xl" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <DesktopAvatar src="https://picsum.photos/seed/av1/128/128" name="Aziza Karimova" size="sm" />
      <DesktopAvatar src="https://picsum.photos/seed/av2/128/128" name="Rustam Toshmatov" size="md" />
      <DesktopAvatar src="https://picsum.photos/seed/av3/128/128" name="Nodira Saidova" size="lg" />
      <DesktopAvatar src="https://picsum.photos/seed/av4/128/128" name="Sardor Yusupov" size="xl" />
    </div>
  ),
};

export const OnlineStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <DesktopAvatar name="Online User" size="lg" showOnline online />
      <DesktopAvatar name="Offline User" size="lg" showOnline online={false} />
      <DesktopAvatar
        src="https://picsum.photos/seed/av5/128/128"
        name="Dilshod"
        size="xl"
        showOnline
        online
      />
    </div>
  ),
};

export const InitialsFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <DesktopAvatar name="Aziza Karimova" size="lg" />
      <DesktopAvatar name="Rustam" size="lg" />
      <DesktopAvatar name="Nodira Saidova" size="lg" />
      <DesktopAvatar name="Sardor Yusupov" size="lg" />
      <DesktopAvatar size="lg" />
    </div>
  ),
};
