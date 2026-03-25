'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useSelect, useCombobox } from './useSelect';
import type { SelectOption } from './useSelect';

const fruits: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragon Fruit' },
  { value: 'elderberry', label: 'Elderberry' },
];

function SelectDemo() {
  const { triggerProps, listboxProps, optionProps, isOpen, selectedValue, activeIndex } = useSelect(
    {
      options: fruits,
    }
  );

  const selectedLabel = fruits.find((f) => f.value === selectedValue)?.label ?? 'Select a fruit...';

  return (
    <div style={{ position: 'relative', width: 240 }}>
      <button
        {...triggerProps}
        style={{
          width: '100%',
          padding: '8px 12px',
          textAlign: 'left',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: 'white',
          cursor: 'pointer',
        }}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <ul
          {...listboxProps}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #ccc',
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {fruits.map((fruit, i) => (
            <li
              key={fruit.value}
              {...optionProps(fruit)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                background:
                  i === activeIndex
                    ? '#f0f0f0'
                    : fruit.value === selectedValue
                    ? '#e8e8e8'
                    : 'transparent',
              }}
            >
              {fruit.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ControlledSelectDemo() {
  const [value, setValue] = useState('cherry');
  const { triggerProps, listboxProps, optionProps, isOpen, activeIndex } = useSelect({
    options: fruits,
    selectedValue: value,
    onSelectionChange: setValue,
  });

  return (
    <div style={{ position: 'relative', width: 240 }}>
      <p>Controlled value: {value}</p>
      <button
        {...triggerProps}
        style={{
          width: '100%',
          padding: '8px 12px',
          textAlign: 'left',
          border: '1px solid #ccc',
          borderRadius: 4,
          background: 'white',
          cursor: 'pointer',
        }}
      >
        {fruits.find((f) => f.value === value)?.label ?? 'Select...'}
      </button>
      {isOpen && (
        <ul
          {...listboxProps}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #ccc',
            borderRadius: 4,
            background: 'white',
          }}
        >
          {fruits.map((fruit, i) => (
            <li
              key={fruit.value}
              {...optionProps(fruit)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                background: i === activeIndex ? '#f0f0f0' : 'transparent',
              }}
            >
              {fruit.label} {fruit.value === value ? ' (selected)' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ComboboxDemo() {
  const allFruits = [...fruits];
  const { inputProps, listboxProps, optionProps, isOpen, inputValue, activeIndex } = useCombobox({
    options: allFruits.filter((f) =>
      f.label.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
    ),
  });

  // Re-derive filtered for render
  const filtered = allFruits.filter((f) =>
    f.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div style={{ position: 'relative', width: 240 }}>
      <input
        {...inputProps}
        placeholder="Search fruits..."
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      {isOpen && filtered.length > 0 && (
        <ul
          {...listboxProps}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            border: '1px solid #ccc',
            borderRadius: 4,
            background: 'white',
          }}
        >
          {filtered.map((fruit, i) => (
            <li
              key={fruit.value}
              {...optionProps(fruit)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                background: i === activeIndex ? '#f0f0f0' : 'transparent',
              }}
            >
              {fruit.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const meta = {
  title: 'Headless/useSelect',
  tags: ['autodocs'],
  component: SelectDemo,
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledSelectDemo /> };
export const Combobox: Story = { render: () => <ComboboxDemo /> };
