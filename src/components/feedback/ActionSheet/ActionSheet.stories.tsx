import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionSheet } from './ActionSheet';
import { Button } from '../../form/Button';

const meta = {
  title: 'Feedback/ActionSheet',
  component: ActionSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 390, height: 600, position: 'relative', background: '#F5F5F5', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show ActionSheet</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          actions={[
            { name: 'Ulashish', onClick: () => console.log('Share') },
            { name: 'Saqlash', onClick: () => console.log('Save') },
            { name: 'Habar berish', onClick: () => console.log('Report') },
          ]}
        />
      </>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show ActionSheet</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Mahsulot bilan nima qilmoqchisiz?"
          description="Tanlangan amalni qaytarib bo'lmaydi"
          actions={[
            { name: 'Tahrirlash' },
            { name: "O'chirish", color: '#FF3B30' },
          ]}
        />
      </>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Share Options</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Ulashish"
          actions={[
            { name: 'Telegram', description: 'Kontaktlaringizga yuboring' },
            { name: 'Instagram', description: 'Stories yoki postga ulashing' },
            { name: 'Havolani nusxalash', description: 'Clipboard ga nusxalash' },
          ]}
        />
      </>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Show Actions</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          actions={[
            { name: 'Buyurtma berish', onClick: () => console.log('Order') },
            { name: "Chegirma qo'llash", disabled: true },
            { name: "Bekor qilish", color: '#FF3B30' },
          ]}
        />
      </>
    );
  },
};

export const DangerActions: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)} variant="danger">Delete Account</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Hisobni o'chirish"
          description="Bu amalni qaytarib bo'lmaydi. Barcha ma'lumotlaringiz o'chiriladi."
          actions={[
            { name: "O'chirish", color: '#FF3B30' },
          ]}
        />
      </>
    );
  },
};

export const ProductActions: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <>
        <Button onClick={() => setVisible(true)}>Mahsulot amallari</Button>
        <ActionSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="iPhone 15 Pro Max"
          actions={[
            { name: 'Savatga qo\'shish' },
            { name: 'Sevimlilar' },
            { name: 'Solishtirish' },
            { name: 'Ulashish' },
          ]}
        />
      </>
    );
  },
};
