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
export const InTransit: Story = {
  name: 'In Transit',
};

/** Delivery with all timeline events showing the full journey */
export const FullTimeline: Story = {
  name: 'Full Timeline',
};

/** Package about to arrive — courier is nearby */
export const CourierNearby: Story = {
  name: 'Courier Nearby',
};

/** Default tracking page with contact courier CTA */
export const WithContactCourier: Story = {
  name: 'With Contact Courier',
};

/** Tracking page showing map placeholder and estimated delivery window */
export const MapAndEstimate: Story = {
  name: 'Map And Estimate',
};
