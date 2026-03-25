import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroBanner } from './HeroBanner';

const meta = {
  title: 'Content/HeroBanner',
  component: HeroBanner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    bgGradient: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof HeroBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Noutbuk Festival',
    subtitle: 'Eng yaxshi narxlar faqat bugun!',
    badge: 'HOT',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
  },
};

export const WithImage: Story = {
  args: {
    title: 'GPU Mega Aksiya',
    subtitle: 'RTX 4070 & 4080 chegirmada',
    badge: 'HOT',
    bgGradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
    image:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&h=400&fit=crop&auto=format',
  },
};

export const GreenPromo: Story = {
  args: {
    title: 'Bahor Aksiyasi',
    subtitle: '50% gacha chegirmalar',
    bgGradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
  },
};

export const BlueTech: Story = {
  args: {
    title: 'Yangi Intel Core Ultra',
    subtitle: 'Eng kuchli protsessorlar yetib keldi',
    badge: 'NEW',
    bgGradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
  },
};

export const NoBadge: Story = {
  args: {
    title: 'Monitor Haftaligi',
    subtitle: '4K va 2K monitorlar maxsus narxlarda',
    bgGradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
  },
};
