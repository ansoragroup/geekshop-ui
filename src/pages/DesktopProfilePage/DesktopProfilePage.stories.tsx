import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopProfilePage } from './DesktopProfilePage';

const meta = {
  title: 'Pages (Desktop)/DesktopProfilePage',
  component: DesktopProfilePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'Alisher Karimov',
    userEmail: 'alisher@mail.uz',
    userPhone: '+998 90 123 45 67',
  },
};

export const FemaleUser: Story = {
  args: {
    userName: 'Nodira Rustamova',
    userEmail: 'nodira.rustamova@geekshop.uz',
    userPhone: '+998 93 456 78 90',
  },
};

export const NewUser: Story = {
  name: 'New User (Minimal Info)',
  args: {
    userName: 'Firdavs Toshmatov',
    userEmail: 'firdavs@mail.uz',
    userPhone: '+998 97 000 11 22',
  },
};

export const BusinessUser: Story = {
  args: {
    userName: 'Dilmurod Xasanov',
    userEmail: 'dilmurod.xasanov@ansora.group',
    userPhone: '+998 71 200 33 44',
  },
};

export const LongName: Story = {
  name: 'Long Name & Email',
  args: {
    userName: 'Abdulaziz Mukhammadiyev-Karimjonov',
    userEmail: 'abdulaziz.mukhammadiyev-karimjonov@university.edu.uz',
    userPhone: '+998 90 987 65 43',
  },
};
