import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Variants ---
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Sotib olish',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Savatga',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'O\'chirish',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Batafsil',
  },
};

// --- Sizes ---
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Kichik',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'O\'rta',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Katta',
  },
};

export const FullWidth: Story = {
  args: {
    size: 'full',
    children: 'Hozir sotib olish',
  },
};

// --- States ---
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Yuklanmoqda',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Mavjud emas',
  },
};

// --- Action bar style ---
export const ActionBarButtons: Story = {
  name: 'Action Bar (Sotib olish + Savatga)',
  render: () => (
    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
      <Button variant="secondary" size="lg" block>
        Savatga
      </Button>
      <Button variant="primary" size="lg" block>
        Sotib olish
      </Button>
    </div>
  ),
};

// --- All variants ---
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="text">Text</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <Button size="full">Full Width</Button>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </div>
    </div>
  ),
};

// --- Polymorphic `as` prop ---
export const AsAnchor: Story = {
  name: 'As Anchor (<a>)',
  render: () => (
    <Button as="a" href="#" target="_blank" rel="noopener noreferrer">
      Link Button
    </Button>
  ),
};

// --- E-commerce patterns ---
export const BuyNow: Story = {
  name: 'Buy Now (Taobao style)',
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="secondary" size="lg">
        Savatga qo'shish
      </Button>
      <Button variant="primary" size="lg">
        Hozir sotib olish
      </Button>
    </div>
  ),
};
