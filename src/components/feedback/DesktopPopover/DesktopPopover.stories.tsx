import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopPopover } from './DesktopPopover';

const meta = {
  title: 'Feedback (Desktop)/DesktopPopover',
  component: DesktopPopover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 600, padding: 120, display: 'flex', justifyContent: 'center', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerButton = ({ children }: { children: string }) => (
  <button
    type="button"
    style={{
      padding: '10px 20px',
      borderRadius: 8,
      border: '1px solid #ddd',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
    }}
  >
    {children}
  </button>
);

export const HoverBottom: Story = {
  args: {
    content: (
      <div>
        <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14 }}>Free Shipping</p>
        <p style={{ margin: 0, fontSize: 13, color: '#666' }}>Orders over 500,000 UZS qualify for free standard shipping within Tashkent.</p>
      </div>
    ),
    placement: 'bottom',
    trigger: 'hover',
    children: <TriggerButton>Hover me</TriggerButton>,
  },
};

export const ClickBottom: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#666' }}>Subtotal</span>
          <span style={{ fontSize: 13, fontWeight: 600 }}>23,700,000 UZS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#666' }}>Shipping</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#07C160' }}>Free</span>
        </div>
        <div style={{ borderTop: '1px solid #eee', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Total</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#FF0000' }}>23,700,000 UZS</span>
        </div>
      </div>
    ),
    placement: 'bottom',
    trigger: 'click',
    children: <TriggerButton>Click for summary</TriggerButton>,
  },
};

export const PlacementTop: Story = {
  args: {
    content: <span>This popover appears above the trigger element.</span>,
    placement: 'top',
    trigger: 'hover',
    children: <TriggerButton>Top Popover</TriggerButton>,
  },
};

export const PlacementLeft: Story = {
  args: {
    content: <span>Positioned to the left of the trigger.</span>,
    placement: 'left',
    trigger: 'hover',
    children: <TriggerButton>Left Popover</TriggerButton>,
  },
};

export const PlacementRight: Story = {
  args: {
    content: <span>Positioned to the right of the trigger.</span>,
    placement: 'right',
    trigger: 'hover',
    children: <TriggerButton>Right Popover</TriggerButton>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: '#FFF5F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FF5000" />
          </svg>
        </div>
        <div>
          <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14 }}>Gold Member Benefits</p>
          <p style={{ margin: 0, fontSize: 13, color: '#666', lineHeight: 1.5 }}>Enjoy exclusive discounts, priority shipping, and early access to flash sales.</p>
        </div>
      </div>
    ),
    placement: 'bottom',
    trigger: 'hover',
    children: <TriggerButton>Membership Info</TriggerButton>,
  },
};
