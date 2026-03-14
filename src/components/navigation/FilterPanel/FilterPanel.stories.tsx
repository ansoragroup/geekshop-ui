import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FilterPanel } from './FilterPanel';
import type { FilterPanelProps, FilterValues } from './FilterPanel';

const meta: Meta<typeof FilterPanel> = {
  title: 'Navigation/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
  },
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

const gpuFilterGroups = [
  {
    key: 'brand',
    title: 'Brend',
    type: 'checkbox' as const,
    options: [
      { value: 'nvidia', label: 'NVIDIA', count: 45 },
      { value: 'amd', label: 'AMD', count: 28 },
      { value: 'intel', label: 'Intel Arc', count: 12 },
      { value: 'msi', label: 'MSI', count: 34 },
      { value: 'asus', label: 'ASUS', count: 31 },
      { value: 'gigabyte', label: 'Gigabyte', count: 27 },
    ],
  },
  {
    key: 'price',
    title: 'Narx oraligi',
    type: 'priceRange' as const,
  },
  {
    key: 'availability',
    title: 'Mavjudligi',
    type: 'checkbox' as const,
    options: [
      { value: 'in_stock', label: 'Sotuvda bor', count: 89 },
      { value: 'pre_order', label: 'Oldindan buyurtma', count: 15 },
      { value: 'delivery', label: 'Yetkazib berish bilan', count: 72 },
    ],
  },
];

function InteractiveFilterPanel(props: Partial<FilterPanelProps>) {
  const [visible, setVisible] = useState(true);
  const [values, setValues] = useState<FilterValues>(props.values || {});

  return (
    <div style={{ height: '844px', background: '#F5F5F5', position: 'relative' }}>
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          style={{
            margin: 16,
            padding: '12px 24px',
            background: '#FF5000',
            color: '#FFF',
            border: 'none',
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Filtrni ochish
        </button>
      )}
      <FilterPanel
        filterGroups={gpuFilterGroups}
        values={values}
        visible={visible}
        onClose={() => setVisible(false)}
        onApply={(v) => { setValues(v); setVisible(false); alert(JSON.stringify(v, null, 2)); }}
        onReset={() => setValues({})}
        {...props}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <InteractiveFilterPanel />,
};

export const WithPreselected: Story = {
  render: () => (
    <InteractiveFilterPanel
      values={{
        brand: ['nvidia', 'asus'],
        price: { min: '500000', max: '5000000' },
        availability: ['in_stock'],
      }}
    />
  ),
};

export const ProcessorFilters: Story = {
  render: () => (
    <InteractiveFilterPanel
      filterGroups={[
        {
          key: 'brand',
          title: 'Brend',
          type: 'checkbox',
          options: [
            { value: 'intel', label: 'Intel', count: 38 },
            { value: 'amd', label: 'AMD', count: 24 },
          ],
        },
        {
          key: 'series',
          title: 'Seriya',
          type: 'checkbox',
          options: [
            { value: 'i9', label: 'Core i9', count: 8 },
            { value: 'i7', label: 'Core i7', count: 12 },
            { value: 'i5', label: 'Core i5', count: 10 },
            { value: 'r9', label: 'Ryzen 9', count: 6 },
            { value: 'r7', label: 'Ryzen 7', count: 9 },
            { value: 'r5', label: 'Ryzen 5', count: 11 },
          ],
        },
        {
          key: 'price',
          title: 'Narx oraligi',
          type: 'priceRange',
        },
        {
          key: 'availability',
          title: 'Mavjudligi',
          type: 'checkbox',
          options: [
            { value: 'in_stock', label: 'Sotuvda bor', count: 42 },
            { value: 'pre_order', label: 'Oldindan buyurtma', count: 8 },
          ],
        },
      ]}
    />
  ),
};

export const MinimalFilters: Story = {
  render: () => (
    <InteractiveFilterPanel
      filterGroups={[
        {
          key: 'price',
          title: 'Narx oraligi',
          type: 'priceRange',
        },
        {
          key: 'availability',
          title: 'Mavjudligi',
          type: 'checkbox',
          options: [
            { value: 'in_stock', label: 'Sotuvda bor' },
            { value: 'discount', label: 'Chegirmada' },
          ],
        },
      ]}
    />
  ),
};
