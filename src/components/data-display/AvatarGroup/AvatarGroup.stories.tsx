import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Data Display/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: { type: 'number', min: 1, max: 10 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    max: 3,
    size: 'md',
    children: [
      <Avatar key={1} name="Aziz Karimov" size="md" />,
      <Avatar key={2} name="Nodira Sultonova" size="md" />,
      <Avatar key={3} name="Bekzod Rustamov" size="md" />,
      <Avatar key={4} name="Dilshod Toshmatov" size="md" />,
      <Avatar key={5} name="Sardor Usmonov" size="md" />,
    ],
  },
};

export const AllVisible: Story = {
  name: 'All Visible (No Overflow)',
  args: {
    size: 'md',
    children: [
      <Avatar key={1} name="Aziz Karimov" size="md" />,
      <Avatar key={2} name="Nodira Sultonova" size="md" />,
      <Avatar key={3} name="Bekzod Rustamov" size="md" />,
    ],
  },
};

export const SmallSize: Story = {
  args: {
    max: 4,
    size: 'sm',
    children: [
      <Avatar key={1} name="A K" size="sm" />,
      <Avatar key={2} name="N S" size="sm" />,
      <Avatar key={3} name="B R" size="sm" />,
      <Avatar key={4} name="D T" size="sm" />,
      <Avatar key={5} name="S U" size="sm" />,
      <Avatar key={6} name="M A" size="sm" />,
      <Avatar key={7} name="O B" size="sm" />,
      <Avatar key={8} name="R K" size="sm" />,
    ],
  },
};

export const LargeSize: Story = {
  args: {
    max: 3,
    size: 'lg',
    children: [
      <Avatar key={1} name="Aziz Karimov" size="lg" />,
      <Avatar key={2} name="Nodira Sultonova" size="lg" />,
      <Avatar key={3} name="Bekzod Rustamov" size="lg" />,
      <Avatar key={4} name="Dilshod Toshmatov" size="lg" />,
      <Avatar key={5} name="Sardor Usmonov" size="lg" />,
    ],
  },
};

export const WithImages: Story = {
  args: {
    max: 4,
    size: 'md',
    children: [
      <Avatar
        key={1}
        src="https://images.unsplash.com/photo-1542291026616-b53d31cf4641?w=100&h=100&fit=crop&auto=format"
        name="User 1"
        size="md"
      />,
      <Avatar
        key={2}
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format"
        name="User 2"
        size="md"
      />,
      <Avatar
        key={3}
        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&auto=format"
        name="User 3"
        size="md"
      />,
      <Avatar
        key={4}
        src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=100&h=100&fit=crop&auto=format"
        name="User 4"
        size="md"
      />,
      <Avatar
        key={5}
        src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&h=100&fit=crop&auto=format"
        name="User 5"
        size="md"
      />,
      <Avatar
        key={6}
        src="https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100&h=100&fit=crop&auto=format"
        name="User 6"
        size="md"
      />,
    ],
  },
};

export const ReviewersContext: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <AvatarGroup max={3} size="sm">
        <Avatar name="Aziz K" size="sm" />
        <Avatar name="Nodira S" size="sm" />
        <Avatar name="Bekzod R" size="sm" />
        <Avatar name="Dilshod T" size="sm" />
        <Avatar name="Sardor U" size="sm" />
      </AvatarGroup>
      <span style={{ fontSize: 13, color: '#666' }}>5 ta sharh</span>
    </div>
  ),
};
