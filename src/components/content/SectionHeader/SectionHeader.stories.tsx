import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionHeader from './SectionHeader';

const FireIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 1.5c.5 3.5-2 5-2 7.5a4 4 0 008 0c0-3-2.5-4.5-2.5-7.5 0 3 4.5 4.5 4.5 8a8 8 0 01-16 0c0-4.5 5-6 5-10.5 0 2.5 3 3 3 2.5z"
      fill="currentColor"
    />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 1l2.47 5.01L18 6.94l-4 3.9.94 5.5L10 13.77l-4.94 2.6.94-5.5-4-3.9 5.53-.93L10 1z"
      fill="currentColor"
    />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 1L4 12h5l-1 7 7-11h-5l1-7z" fill="currentColor" />
  </svg>
);

const meta = {
  title: 'Content/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '0 12px', background: '#FFF', borderRadius: '12px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onViewAll: { action: 'view all clicked' },
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Tavsiya etamiz',
    count: 20,
    icon: <FireIcon />,
  },
};

export const FlashDeals: Story = {
  args: {
    title: 'Flash chegirmalar',
    count: 8,
    icon: <BoltIcon />,
  },
};

export const TopRated: Story = {
  args: {
    title: 'Top mahsulotlar',
    count: 50,
    icon: <StarIcon />,
  },
};

export const WithoutCount: Story = {
  args: {
    title: 'Yangi kelganlar',
    icon: <StarIcon />,
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'Barcha kategoriyalar',
    count: 12,
  },
};

export const NoViewAll: Story = {
  args: {
    title: 'Bugungi takliflar',
    icon: <FireIcon />,
    onViewAll: undefined,
  },
};
