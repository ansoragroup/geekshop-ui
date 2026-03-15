import type { Meta, StoryObj } from '@storybook/react-vite';
import { OnboardingPage } from './OnboardingPage';

const meta = {
  title: 'Pages/OnboardingPage',
  component: OnboardingPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof OnboardingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** First slide: "Millionlab mahsulotlar" with package emoji */
export const Slide1: Story = {
  args: {
    initialSlide: 0,
  },
};

/** Second slide: "Eng yaxshi narxlar" with money bag emoji */
export const Slide2: Story = {
  args: {
    initialSlide: 1,
  },
};

/** Third (last) slide: "Xavfsiz xaridlar" — shows "Boshlash" (Get Started) button */
export const Slide3: Story = {
  args: {
    initialSlide: 2,
  },
};
