import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchBar } from './SearchBar';
import type { SearchBarProps } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Navigation/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'iPhone13' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '360px', padding: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

function InteractiveSearchBar(props: Partial<SearchBarProps>) {
  const [val, setVal] = useState(props.value ?? '');
  return (
    <SearchBar
      value={val}
      onChange={setVal}
      onSearch={() => alert(`Search: ${val}`)}
      placeholder="Mahsulot qidirish..."
      {...props}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveSearchBar />,
};

export const WithCamera: Story = {
  render: () => <InteractiveSearchBar onCamera={() => alert('Camera clicked')} />,
};

export const FilledVariant: Story = {
  render: () => <InteractiveSearchBar variant="filled" onCamera={() => {}} />,
};

export const WithValue: Story = {
  render: () => <InteractiveSearchBar value="RTX 4090" />,
};

export const ReadOnly: Story = {
  render: () => (
    <SearchBar
      readOnly
      placeholder="Mahsulot qidirish..."
      onClick={() => alert('Navigate to search page')}
      onCamera={() => alert('Camera clicked')}
    />
  ),
};

export const Compact: Story = {
  render: () => <InteractiveSearchBar compact onCamera={() => {}} />,
  decorators: [
    (Story) => (
      <div style={{ width: '280px', padding: 8, background: '#FF5000', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Default with orange border</p>
        <InteractiveSearchBar onCamera={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Filled (grey bg)</p>
        <InteractiveSearchBar variant="filled" onCamera={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Compact (for NavBar)</p>
        <InteractiveSearchBar compact onCamera={() => {}} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Read-only (tappable)</p>
        <SearchBar readOnly placeholder="Mahsulot qidirish..." onClick={() => {}} />
      </div>
    </div>
  ),
};
