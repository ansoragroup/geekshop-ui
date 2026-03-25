'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useSlider } from './useSlider';

function SliderDemo() {
  const { trackProps, thumbProps, value, getPercentage } = useSlider({
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
  });

  const pct = getPercentage(value as number);

  return (
    <div style={{ padding: '40px 20px' }}>
      <p>Value: {value as number}</p>
      <div
        {...trackProps}
        style={{
          position: 'relative',
          height: 6,
          background: '#ddd',
          borderRadius: 3,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            background: '#333',
            borderRadius: 3,
          }}
        />
        <div
          {...thumbProps}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'white',
            border: '2px solid #333',
            cursor: 'grab',
          }}
        />
      </div>
    </div>
  );
}

function ControlledSliderDemo() {
  const [value, setValue] = useState<number>(30);
  const { trackProps, thumbProps, getPercentage } = useSlider({
    value,
    onChange: (v) => setValue(v as number),
    min: 0,
    max: 100,
  });

  const pct = getPercentage(value);

  return (
    <div style={{ padding: '40px 20px' }}>
      <p>Controlled value: {value}</p>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <div
        {...trackProps}
        style={{
          position: 'relative',
          height: 6,
          background: '#ddd',
          borderRadius: 3,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            background: '#333',
            borderRadius: 3,
          }}
        />
        <div
          {...thumbProps}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${pct}%`,
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: 'white',
            border: '2px solid #333',
            cursor: 'grab',
          }}
        />
      </div>
    </div>
  );
}

const meta = {
  title: 'Headless/useSlider',
  tags: ['autodocs'],
  component: SliderDemo,
} satisfies Meta<typeof SliderDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledSliderDemo /> };
