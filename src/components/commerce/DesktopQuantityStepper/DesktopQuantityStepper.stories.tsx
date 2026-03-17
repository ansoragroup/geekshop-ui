import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DesktopQuantityStepper } from './DesktopQuantityStepper';

const meta = {
  title: 'Commerce (Desktop)/DesktopQuantityStepper',
  component: DesktopQuantityStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  argTypes: {
    onChange: { action: 'onChange' },
    size: { control: 'radio', options: ['sm', 'md'] },
    value: { control: { type: 'number', min: 0, max: 99 } },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => (
    <div style={{ width: 300, padding: 24 }}>
      <Story />
    </div>
  )],
} satisfies Meta<typeof DesktopQuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 1,
    min: 1,
    max: 99,
    size: 'md',
    onChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    min: 1,
    max: 99,
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    defaultValue: 2,
    min: 1,
    max: 20,
    size: 'sm',
    onChange: fn(),
  },
};

export const AtMaximum: Story = {
  args: {
    value: 5,
    min: 1,
    max: 5,
    size: 'md',
    onChange: fn(),
  },
};
