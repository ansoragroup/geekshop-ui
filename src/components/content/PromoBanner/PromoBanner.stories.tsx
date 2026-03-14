import type { Meta, StoryObj } from '@storybook/react-vite';
import PromoBanner from './PromoBanner';

const DiscountIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L20.24 6.24L26 4.64L25.36 10.56L30 14.24L25.76 18.48L27.36 24.24L21.44 23.6L17.76 28.24L14.48 23.04L8.56 24.64L10.16 18.72L4.48 15.04L9.68 11.76L8.08 5.84L14.04 7.44L16 2Z" />
  </svg>
);

const NewIcon = () => (
  <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L19.09 9.26L26 10.27L21 15.14L22.18 22.02L16 18.77L9.82 22.02L11 15.14L6 10.27L12.91 9.26L16 3Z" />
  </svg>
);

const meta: Meta<typeof PromoBanner> = {
  title: 'Content/PromoBanner',
  component: PromoBanner,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '12px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PromoBanner>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Aksiya',
        subtitle: '50% gacha chegirma',
        tag: '-50%',
        gradient: 'linear-gradient(135deg, #07C160 0%, #4CD964 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'Yangi kelganlar',
        subtitle: 'Eng so\'nggi mahsulotlar',
        tag: 'NEW',
        gradient: 'linear-gradient(135deg, #1890FF 0%, #40A9FF 100%)',
        icon: <NewIcon />,
      },
    ],
  },
};

export const ThreeCards: Story = {
  args: {
    items: [
      {
        title: 'GPU Aksiya',
        subtitle: 'RTX seriyasi',
        tag: '-30%',
        gradient: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
        icon: <DiscountIcon />,
      },
      {
        title: 'SSD Aksiya',
        subtitle: 'NVMe tezkor',
        tag: '-20%',
        gradient: 'linear-gradient(135deg, #722ED1 0%, #B37FEB 100%)',
        icon: <DiscountIcon />,
      },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    items: [
      {
        title: 'Kupon olish',
        subtitle: 'Maxsus chegirmalar',
        tag: 'KUPON',
        gradient: 'linear-gradient(135deg, #F5222D 0%, #FF7875 100%)',
      },
      {
        title: 'Top mahsulotlar',
        subtitle: 'Eng ko\'p sotilgan',
        tag: 'TOP',
        gradient: 'linear-gradient(135deg, #FA8C16 0%, #FFC069 100%)',
      },
    ],
  },
};
