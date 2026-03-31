import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopAvatarGroup } from './DesktopAvatarGroup';

const meta = {
  title: 'Data Display (Desktop)/DesktopAvatarGroup',
  component: DesktopAvatarGroup,
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
} satisfies Meta<typeof DesktopAvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleAvatars = [
  {
    src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=128&h=128&fit=crop&auto=format',
    name: 'Dilshod Rahimov',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=128&h=128&fit=crop&auto=format',
    name: 'Aziza Karimova',
  },
  {
    src: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=128&h=128&fit=crop&auto=format',
    name: 'Rustam Toshmatov',
  },
  { name: 'Nodira Saidova' },
  {
    src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=128&h=128&fit=crop&auto=format',
    name: 'Sardor Yusupov',
  },
  { name: 'Malika Umarova' },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=128&h=128&fit=crop&auto=format',
    name: 'Jasur Kamolov',
  },
  { name: 'Gulnora Alimova' },
];

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 5),
    max: 3,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    avatars: sampleAvatars,
    max: 5,
    size: 'lg',
  },
};

export const NoOverflow: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
    size: 'md',
  },
};

export const ManyOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    max: 2,
    size: 'md',
  },
};
