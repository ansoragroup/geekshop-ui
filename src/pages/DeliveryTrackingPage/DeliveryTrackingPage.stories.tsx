import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeliveryTrackingPage } from './DeliveryTrackingPage';

const meta = {
  title: 'Pages/DeliveryTrackingPage',
  component: DeliveryTrackingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof DeliveryTrackingPage>;

export default meta;
type Story = StoryObj<typeof DeliveryTrackingPage>;

/** Default: package in transit with courier on the way */
export const Default: Story = {};

/** In-transit delivery with full timeline visible */
export const InTransit: Story = {};

/** Delivery with all timeline events showing the full journey */
export const FullTimeline: Story = {};

/** Package about to arrive — courier is nearby */
export const CourierNearby: Story = {};

/** Default tracking page with contact courier CTA */
export const WithContactCourier: Story = {};

/** Tracking page showing map placeholder and estimated delivery window */
export const MapAndEstimate: Story = {};
