import type { Meta, StoryObj } from '@storybook/react-vite';
import { Empty, emptyIcons } from './Empty';

const meta = {
  title: 'Feedback/Empty',
  component: Empty,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 375, background: '#fff', borderRadius: 12, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Ma\'lumot topilmadi',
    description: 'Hozircha bu yerda hech narsa yo\'q',
  },
};

export const EmptyCart: Story = {
  args: {
    icon: emptyIcons.cart,
    title: 'Savat bo\'sh',
    description: 'Mahsulotlarni ko\'rib chiqing va savatga qo\'shing',
    actionText: 'Xarid qilish',
    onAction: () => alert('Navigating to shop...'),
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: emptyIcons.search,
    title: 'Hech narsa topilmadi',
    description: 'Boshqa kalit so\'z bilan qidirib ko\'ring',
  },
};

export const NoOrders: Story = {
  args: {
    title: 'Buyurtmalar yo\'q',
    description: 'Siz hali hech qanday buyurtma bermagansiz',
    actionText: 'Do\'konga o\'tish',
    onAction: () => alert('Navigating to shop...'),
  },
};

export const WithAction: Story = {
  args: {
    title: 'Ulanish xatosi',
    description: 'Internetga ulanishni tekshiring va qayta urinib ko\'ring',
    actionText: 'Qayta yuklash',
    onAction: () => alert('Reloading...'),
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
        <h4 style={{ fontSize: 12, color: '#999', marginBottom: 8, textAlign: 'center' }}>Bo'sh savat</h4>
        <Empty
          icon={emptyIcons.cart}
          title="Savat bo'sh"
          description="Mahsulotlarni ko'rib chiqing"
          actionText="Xarid qilish"
          onAction={() => {}}
        />
      </div>
      <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
        <h4 style={{ fontSize: 12, color: '#999', marginBottom: 8, textAlign: 'center' }}>Qidiruv natijasi yo'q</h4>
        <Empty
          icon={emptyIcons.search}
          title="Hech narsa topilmadi"
          description="Boshqa kalit so'z bilan qidirib ko'ring"
        />
      </div>
    </div>
  ),
};
