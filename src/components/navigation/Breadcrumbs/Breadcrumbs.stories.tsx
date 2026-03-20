import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Graphics Cards', href: '/components/gpus' },
      { label: 'RTX 5090 Founders Edition' },
    ],
  },
};

export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'My Orders' },
    ],
  },
};

export const WithCollapse: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Electronics', href: '/electronics' },
      { label: 'Computers', href: '/electronics/computers' },
      { label: 'Components', href: '/electronics/computers/components' },
      { label: 'Graphics Cards', href: '/electronics/computers/components/gpus' },
      { label: 'NVIDIA GeForce RTX 5090' },
    ],
    maxItems: 4,
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Peripherals', href: '/peripherals' },
      { label: 'Keyboards', href: '/peripherals/keyboards' },
      { label: 'Mechanical Keyboards' },
    ],
    separator: '>',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Home clicked') },
      { label: 'Category', onClick: () => alert('Category clicked') },
      { label: 'Current Page' },
    ],
  },
};
