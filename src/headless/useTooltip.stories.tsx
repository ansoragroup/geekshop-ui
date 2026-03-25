'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTooltip } from './useTooltip';

function TooltipDemo() {
  const { triggerProps, tooltipProps, floatingStyle, isVisible } = useTooltip({
    placement: 'top',
  });

  return (
    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          {...triggerProps}
          style={{
            padding: '8px 16px',
            border: '1px solid #ccc',
            borderRadius: 4,
            cursor: 'pointer',
            background: 'white',
          }}
        >
          Hover or focus me
        </button>
        {isVisible && (
          <div
            {...tooltipProps}
            style={{
              ...floatingStyle,
              background: '#333',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 12,
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            This is a tooltip
          </div>
        )}
      </div>
    </div>
  );
}

function ControlledTooltipDemo() {
  const [visible, setVisible] = useState(false);
  const { triggerProps, tooltipProps, floatingStyle, isVisible } = useTooltip({
    isVisible: visible,
    onVisibleChange: setVisible,
    placement: 'bottom',
  });

  return (
    <div style={{ padding: '40px' }}>
      <p>Controlled visible: {isVisible ? 'true' : 'false'}</p>
      <button onClick={() => setVisible(!visible)} style={{ marginBottom: 16 }}>
        Toggle tooltip
      </button>
      <div style={{ position: 'relative', display: 'inline-block', marginLeft: 12 }}>
        <span
          {...triggerProps}
          style={{ padding: '4px 8px', border: '1px dashed #999', borderRadius: 4 }}
        >
          Target element
        </span>
        {isVisible && (
          <div
            {...tooltipProps}
            style={{
              ...floatingStyle,
              background: '#333',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: 12,
              whiteSpace: 'nowrap',
            }}
          >
            Controlled tooltip content
          </div>
        )}
      </div>
    </div>
  );
}

const meta = {
  title: 'Headless/useTooltip',
  tags: ['autodocs'],
  component: TooltipDemo,
} satisfies Meta<typeof TooltipDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledTooltipDemo /> };
