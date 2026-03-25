'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTabs } from './useTabs';

function TabsDemo() {
  const tabs = ['overview', 'specs', 'reviews'];
  const { tabListProps, tabProps, panelProps, activeKey } = useTabs({
    tabs,
    defaultActiveKey: 'overview',
  });

  const content: Record<string, string> = {
    overview: 'Product overview with description and key features.',
    specs: 'Technical specifications: weight, dimensions, materials.',
    reviews: 'Customer reviews and ratings from verified buyers.',
  };

  return (
    <div>
      <div {...tabListProps} style={{ display: 'flex', borderBottom: '2px solid #eee' }}>
        {tabs.map((key) => {
          const tp = tabProps(key);
          return (
            <button
              key={key}
              {...tp}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                borderBottom: key === activeKey ? '2px solid #333' : '2px solid transparent',
                fontWeight: key === activeKey ? 600 : 400,
                marginBottom: -2,
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          );
        })}
      </div>
      {tabs.map((key) => (
        <div key={key} {...panelProps(key)} style={{ padding: 16 }}>
          {content[key]}
        </div>
      ))}
    </div>
  );
}

function ControlledTabsDemo() {
  const [activeKey, setActiveKey] = useState('tab2');
  const tabs = ['tab1', 'tab2', 'tab3'];
  const { tabListProps, tabProps, panelProps } = useTabs({
    tabs,
    activeKey,
    onChange: setActiveKey,
  });

  return (
    <div>
      <p>Active: {activeKey}</p>
      <div {...tabListProps} style={{ display: 'flex', gap: 4 }}>
        {tabs.map((key) => {
          const tp = tabProps(key);
          return (
            <button
              key={key}
              {...tp}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: '4px 4px 0 0',
                background: key === activeKey ? 'white' : '#f5f5f5',
                cursor: 'pointer',
              }}
            >
              Tab {key.replace('tab', '')}
            </button>
          );
        })}
      </div>
      {tabs.map((key) => (
        <div
          key={key}
          {...panelProps(key)}
          style={{ padding: 16, border: '1px solid #ccc', borderTop: 'none' }}
        >
          Content for {key}
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Headless/useTabs',
  tags: ['autodocs'],
  component: TabsDemo,
} satisfies Meta<typeof TabsDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledTabsDemo /> };
