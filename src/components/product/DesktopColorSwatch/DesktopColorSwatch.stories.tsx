import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DesktopColorSwatch } from './DesktopColorSwatch';

const meta = {
  title: 'Product/DesktopColorSwatch',
  component: DesktopColorSwatch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Rang',
    options: [
      { value: 'black', color: '#1A1A1A', label: 'Qora' },
      { value: 'white', color: '#FAFAFA', label: 'Oq' },
      { value: 'blue', color: '#005BFF', label: "Ko'k" },
      { value: 'red', color: '#FF3B30', label: 'Qizil' },
      { value: 'green', color: '#07C160', label: 'Yashil' },
    ],
    selected: 'black',
  },
};

export const PhoneCases: Story = {
  name: 'Telefon g\'ilof ranglari',
  args: {
    label: 'Rang tanlang',
    options: [
      { value: 'titanium-gray', color: '#8E8E93', label: 'Titanium' },
      { value: 'midnight', color: '#1C1C1E', label: 'Midnight' },
      { value: 'starlight', color: '#F5E6CC', label: 'Starlight' },
      { value: 'purple', color: '#7B2BFC', label: 'Binafsha' },
      { value: 'orange', color: '#FF5000', label: 'To\'q sariq' },
      { value: 'pink', color: '#FF6B8A', label: 'Pushti' },
    ],
    selected: 'titanium-gray',
  },
};

export const MaterialSwatches: Story = {
  name: 'Material/Pattern',
  args: {
    label: 'Material',
    options: [
      { value: 'leather', image: 'https://picsum.photos/seed/mat-leather/80/80', label: 'Teri' },
      { value: 'fabric', image: 'https://picsum.photos/seed/mat-fabric/80/80', label: 'Mato' },
      { value: 'metal', image: 'https://picsum.photos/seed/mat-metal/80/80', label: 'Metall' },
      { value: 'wood', image: 'https://picsum.photos/seed/mat-wood/80/80', label: "Yog'och" },
    ],
    selected: 'leather',
  },
};

export const Interactive: Story = {
  name: 'Interactive (controlled)',
  render: () => {
    const [selected, setSelected] = useState('black');
    return (
      <div>
        <DesktopColorSwatch
          label="Rang"
          options={[
            { value: 'black', color: '#1A1A1A', label: 'Qora' },
            { value: 'white', color: '#FAFAFA', label: 'Oq' },
            { value: 'blue', color: '#005BFF', label: "Ko'k" },
            { value: 'gold', color: '#C8A951', label: 'Oltin' },
          ]}
          selected={selected}
          onChange={setSelected}
        />
        <p style={{ marginTop: 16, fontSize: 14, color: '#666' }}>
          Tanlangan: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};
