import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopOrderStatusBar, type DesktopOrderStep } from './DesktopOrderStatusBar';

const meta = {
  title: 'Data Display (Desktop)/DesktopOrderStatusBar',
  component: DesktopOrderStatusBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 900, padding: 24, background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopOrderStatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentStep: 2,
    steps: [
      { label: 'Order Placed', status: 'completed', date: '14 Mar, 10:30' },
      { label: 'Processing', status: 'completed', date: '14 Mar, 11:00' },
      { label: 'Shipped', status: 'active', date: '15 Mar, 09:00' },
      { label: 'In Transit', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    currentStep: 4,
    steps: [
      { label: 'Order Placed', status: 'completed', date: '14 Mar, 10:30' },
      { label: 'Processing', status: 'completed', date: '14 Mar, 11:00' },
      { label: 'Shipped', status: 'completed', date: '15 Mar, 09:00' },
      { label: 'In Transit', status: 'completed', date: '16 Mar, 14:00' },
      { label: 'Delivered', status: 'completed', date: '17 Mar, 10:00' },
    ],
  },
};

export const JustStarted: Story = {
  args: {
    currentStep: 0,
    steps: [
      { label: 'Payment', status: 'active' },
      { label: 'Confirmed', status: 'pending' },
      { label: 'Packed', status: 'pending' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const ThreeSteps: Story = {
  args: {
    currentStep: 1,
    steps: [
      { label: 'Ordered', status: 'completed', date: '12 Mar' },
      { label: 'Shipping', status: 'active', date: '14 Mar' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const SixSteps: Story = {
  name: 'Six Steps (Extended Flow)',
  args: {
    currentStep: 3,
    steps: [
      { label: 'Ordered', status: 'completed', date: '10 Mar, 14:22' },
      { label: 'Payment Confirmed', status: 'completed', date: '10 Mar, 14:25' },
      { label: 'Warehouse Processing', status: 'completed', date: '11 Mar, 08:00' },
      { label: 'Dispatched', status: 'active', date: '11 Mar, 16:30' },
      { label: 'Out for Delivery', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const TwoStepsOnly: Story = {
  name: 'Two Steps (Minimal)',
  args: {
    currentStep: 0,
    steps: [
      { label: 'Processing', status: 'active', date: '25 Mar, 09:15' },
      { label: 'Complete', status: 'pending' },
    ],
  },
};

export const AllPending: Story = {
  name: 'All Pending (Payment Awaited)',
  args: {
    currentStep: -1,
    steps: [
      { label: 'Awaiting Payment', status: 'pending' },
      { label: 'Confirmed', status: 'pending' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const WithLongLabels: Story = {
  name: 'Long Step Labels',
  args: {
    currentStep: 2,
    steps: [
      { label: 'Order Received and Confirmed', status: 'completed', date: '20 Mar, 11:00' },
      { label: 'Quality Inspection Passed', status: 'completed', date: '21 Mar, 09:30' },
      { label: 'Handed to Courier Service', status: 'active', date: '22 Mar, 14:00' },
      { label: 'At Regional Sorting Center', status: 'pending' },
      { label: 'Delivered to Recipient Address', status: 'pending' },
    ],
  },
};

export const ReturnFlow: Story = {
  name: 'Return — Refund Flow',
  args: {
    currentStep: 2,
    steps: [
      { label: 'Return Requested', status: 'completed', date: '18 Mar, 10:00' },
      { label: 'Return Approved', status: 'completed', date: '18 Mar, 14:30' },
      { label: 'Package Picked Up', status: 'active', date: '19 Mar, 11:00' },
      { label: 'Received at Warehouse', status: 'pending' },
      { label: 'Refund Processed', status: 'pending' },
    ],
  },
};

export const PreorderFlow: Story = {
  name: 'Pre-order Flow',
  args: {
    currentStep: 1,
    steps: [
      { label: 'Pre-order Placed', status: 'completed', date: '1 Mar 2026' },
      { label: 'Awaiting Stock', status: 'active', date: 'Expected: 28 Mar' },
      { label: 'Processing', status: 'pending' },
      { label: 'Shipped', status: 'pending' },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const InteractiveStepProgression: Story = {
  name: 'Interactive: Step Progression',
  render: () => {
    const allSteps: DesktopOrderStep[] = [
      { label: 'Order Placed', status: 'pending' as const, date: '25 Mar, 10:00' },
      { label: 'Confirmed', status: 'pending' as const, date: '25 Mar, 10:05' },
      { label: 'Packed', status: 'pending' as const, date: '25 Mar, 14:00' },
      { label: 'Shipped', status: 'pending' as const },
      { label: 'Delivered', status: 'pending' as const },
    ];

    const [currentStep, setCurrentStep] = useState(0);

    const steps = allSteps.map((step, i) => ({
      ...step,
      status: (i < currentStep
        ? 'completed'
        : i === currentStep
        ? 'active'
        : 'pending') as DesktopOrderStep['status'],
    }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <DesktopOrderStatusBar steps={steps} currentStep={currentStep} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            type="button"
            disabled={currentStep <= 0}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: currentStep <= 0 ? '#f5f5f5' : '#fff',
              cursor: currentStep <= 0 ? 'default' : 'pointer',
              fontSize: 13,
              color: currentStep <= 0 ? '#ccc' : '#333',
            }}
          >
            Previous Step
          </button>
          <button
            type="button"
            disabled={currentStep >= allSteps.length - 1}
            onClick={() => setCurrentStep((prev) => Math.min(allSteps.length - 1, prev + 1))}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              background: currentStep >= allSteps.length - 1 ? '#ccc' : '#FF5000',
              color: '#fff',
              cursor: currentStep >= allSteps.length - 1 ? 'default' : 'pointer',
              fontSize: 13,
            }}
          >
            Next Step
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(0)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Reset
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, color: '#999' }}>
          Step {currentStep + 1} of {allSteps.length}: {steps[currentStep].label}
        </div>
      </div>
    );
  },
};

export const CustomIcons: Story = {
  name: 'Custom Step Icons',
  args: {
    currentStep: 2,
    steps: [
      {
        label: 'Payment',
        status: 'completed',
        date: '20 Mar',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect
              x="2"
              y="4"
              width="12"
              height="8"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M2 7h12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ),
      },
      {
        label: 'Packed',
        status: 'completed',
        date: '21 Mar',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect
              x="2"
              y="3"
              width="12"
              height="10"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M6 3v10M2 8h12" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        ),
      },
      {
        label: 'Shipped',
        status: 'active',
        date: '22 Mar',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 7h3l2 3v2h-5V7z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="4" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="12" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        ),
      },
      { label: 'Delivered', status: 'pending' },
    ],
  },
};

export const MidwayDelivery: Story = {
  name: 'Midway Through Delivery',
  args: {
    currentStep: 3,
    steps: [
      { label: 'Ordered', status: 'completed', date: '18 Mar, 09:12' },
      { label: 'Confirmed', status: 'completed', date: '18 Mar, 09:15' },
      { label: 'Packed', status: 'completed', date: '18 Mar, 16:40' },
      { label: 'In Transit', status: 'active', date: '19 Mar, 06:00' },
      { label: 'Delivered', status: 'pending', date: 'Est. 21 Mar' },
    ],
  },
};
