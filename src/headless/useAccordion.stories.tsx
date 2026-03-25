'use client';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useAccordion } from './useAccordion';

function AccordionDemo({
  allowMultiple = false,
  defaultExpanded,
}: {
  allowMultiple?: boolean;
  defaultExpanded?: string[];
}) {
  const sections = ['section1', 'section2', 'section3'];
  const { items } = useAccordion({
    items: sections,
    allowMultiple,
    defaultExpandedKeys: defaultExpanded,
  });

  const labels: Record<string, string> = {
    section1: 'What is your return policy?',
    section2: 'How long does shipping take?',
    section3: 'Do you ship internationally?',
  };

  const content: Record<string, string> = {
    section1: 'You can return any item within 30 days of purchase for a full refund.',
    section2: 'Standard shipping takes 3-5 business days. Express shipping is available.',
    section3: 'Yes, we ship to over 50 countries worldwide.',
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={sections[i]} style={{ borderBottom: '1px solid #eee' }}>
          <button
            {...item.triggerProps}
            style={{
              width: '100%',
              padding: '12px 16px',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: item.isOpen ? 600 : 400,
            }}
          >
            {item.isOpen ? '▼' : '▶'} {labels[sections[i]]}
          </button>
          <div {...item.panelProps} style={{ padding: item.isOpen ? '0 16px 12px' : 0 }}>
            {item.isOpen && <p style={{ margin: 0 }}>{content[sections[i]]}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ControlledAccordionDemo() {
  const [expanded, setExpanded] = useState<string[]>(['section1']);
  const sections = ['section1', 'section2', 'section3'];
  const { items } = useAccordion({
    items: sections,
    expandedKeys: expanded,
    onExpandedKeysChange: setExpanded,
  });

  return (
    <div>
      <p>Expanded: {expanded.join(', ') || 'none'}</p>
      {items.map((item, i) => (
        <div key={sections[i]} style={{ borderBottom: '1px solid #eee' }}>
          <button
            {...item.triggerProps}
            style={{
              width: '100%',
              padding: '12px',
              textAlign: 'left',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {item.isOpen ? '▼' : '▶'} Section {i + 1}
          </button>
          <div {...item.panelProps}>
            {item.isOpen && <p style={{ padding: '0 12px 12px' }}>Content for section {i + 1}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Headless/useAccordion',
  tags: ['autodocs'],
  component: AccordionDemo,
} satisfies Meta<typeof AccordionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Controlled: Story = { render: () => <ControlledAccordionDemo /> };
export const AllowMultiple: Story = { args: { allowMultiple: true } };
export const DefaultExpanded: Story = { args: { defaultExpanded: ['section2'] } };
