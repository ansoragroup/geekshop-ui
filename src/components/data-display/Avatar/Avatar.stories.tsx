import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#fff', borderRadius: 12, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- With image ---
export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/seed/user1/100/100',
    name: 'Aziz Karimov',
    size: 'md',
  },
};

// --- Initials fallback ---
export const Initials: Story = {
  args: {
    name: 'Nodira Sultonova',
    size: 'md',
  },
};

// --- All sizes ---
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar src="https://picsum.photos/seed/user-sm/100/100" name="User" size="sm" />
      <Avatar src="https://picsum.photos/seed/user-md/100/100" name="User" size="md" />
      <Avatar src="https://picsum.photos/seed/user-lg/100/100" name="User" size="lg" />
      <Avatar src="https://picsum.photos/seed/user-xl/100/100" name="User" size="xl" />
    </div>
  ),
};

// --- All sizes with initials ---
export const AllSizesInitials: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Aziz Karimov" size="sm" />
      <Avatar name="Nodira Sultonova" size="md" />
      <Avatar name="Bekzod Rustamov" size="lg" />
      <Avatar name="Dilshod Toshmatov" size="xl" />
    </div>
  ),
};

// --- Online indicator ---
export const Online: Story = {
  args: {
    src: 'https://picsum.photos/seed/online-user/100/100',
    name: 'Sardor Usmonov',
    size: 'lg',
    showOnline: true,
  },
};

// --- Online all sizes ---
export const OnlineAllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="AK" size="sm" showOnline />
      <Avatar name="NS" size="md" showOnline />
      <Avatar name="BR" size="lg" showOnline />
      <Avatar name="DT" size="xl" showOnline />
    </div>
  ),
};

// --- Broken image (fallback) ---
export const BrokenImage: Story = {
  name: 'Broken Image (Fallback)',
  args: {
    src: 'https://broken-url.example/404.jpg',
    name: 'Fallback User',
    size: 'lg',
  },
};

// --- Profile header context ---
export const ProfileHeader: Story = {
  name: 'Profile Page Header',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'linear-gradient(180deg, #FF5000 0%, #FF8A56 100%)', borderRadius: 12, width: 340 }}>
      <Avatar
        src="https://picsum.photos/seed/profile-user/100/100"
        name="Sardor Usmonov"
        size="xl"
        showOnline
      />
      <div>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Sardor Usmonov</div>
        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 2 }}>+998 90 123 45 67</div>
      </div>
    </div>
  ),
};
