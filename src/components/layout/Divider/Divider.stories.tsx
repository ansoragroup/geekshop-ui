import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'inset', 'withText'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    variant: 'full',
  },
};

export const Inset: Story = {
  args: {
    variant: 'inset',
  },
};

export const WithText: Story = {
  args: {
    variant: 'withText',
    text: 'yoki',
  },
};

export const Vertical: Story = {
  args: {
    vertical: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', fontSize: 14 }}>
        <span style={{ color: '#666' }}>Narx bo'yicha</span>
        <Story />
        <span style={{ color: '#666' }}>Yangilik</span>
        <Story />
        <span style={{ color: '#666' }}>Ommabop</span>
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Full</p>
        <Divider variant="full" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Inset</p>
        <Divider variant="inset" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>With Text</p>
        <Divider variant="withText" text="yoki" />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Vertical</p>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 14 }}>
          <span style={{ color: '#666' }}>Element 1</span>
          <Divider vertical />
          <span style={{ color: '#666' }}>Element 2</span>
          <Divider vertical />
          <span style={{ color: '#666' }}>Element 3</span>
        </div>
      </div>
    </div>
  ),
};

export const InListContext: Story = {
  render: () => (
    <div>
      {['Brend', 'Narx', 'Rang', 'Hajm'].map((item, i, arr) => (
        <div key={item}>
          <div style={{ padding: '14px 0', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{item}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          {i < arr.length - 1 && <Divider variant="full" />}
        </div>
      ))}
    </div>
  ),
};
