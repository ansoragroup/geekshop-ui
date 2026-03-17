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
  { src: 'https://picsum.photos/seed/grp1/128/128', name: 'Dilshod Rahimov' },
  { src: 'https://picsum.photos/seed/grp2/128/128', name: 'Aziza Karimova' },
  { src: 'https://picsum.photos/seed/grp3/128/128', name: 'Rustam Toshmatov' },
  { name: 'Nodira Saidova' },
  { src: 'https://picsum.photos/seed/grp5/128/128', name: 'Sardor Yusupov' },
  { name: 'Malika Umarova' },
  { src: 'https://picsum.photos/seed/grp7/128/128', name: 'Jasur Kamolov' },
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
