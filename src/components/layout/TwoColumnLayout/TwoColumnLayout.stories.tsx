import type { Meta, StoryObj } from '@storybook/react-vite';
import { TwoColumnLayout } from './TwoColumnLayout';

const meta = {
  title: 'Layout/TwoColumnLayout',
  component: TwoColumnLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 1200, padding: 24, margin: '0 auto', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwoColumnLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Filtrlar</div>
    {['Narx', 'Brend', 'Rang', 'O\'lcham', 'Reyting'].map((filter) => (
      <div key={filter} style={{ padding: '10px 0', fontSize: 13, color: '#666', borderBottom: '1px solid #f0f0f0' }}>
        {filter}
      </div>
    ))}
  </div>
);

const MainContent = ({ count = 8 }: { count?: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
    {Array.from({ length: count }, (_, i) => (
      <div key={i} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}>
        <div style={{ width: '100%', aspectRatio: '1', background: '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          {i + 1}
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 13, color: '#1A1A1A', marginBottom: 4 }}>Mahsulot #{i + 1}</div>
          <div style={{ fontSize: 14, color: '#FF0000', fontWeight: 700 }}>
            {((i + 1) * 500_000).toLocaleString('ru-RU').replace(/,/g, ' ')} so'm
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    sidebar: <SidebarContent />,
    children: <MainContent />,
  },
};

export const SidebarRight: Story = {
  args: {
    sidebar: <SidebarContent />,
    sidebarPosition: 'right',
    children: <MainContent />,
  },
};

export const CustomWidths: Story = {
  args: {
    sidebar: <SidebarContent />,
    sidebarWidth: 300,
    gap: 32,
    children: <MainContent count={6} />,
  },
};

export const StickySidebar: Story = {
  args: {
    sidebar: <SidebarContent />,
    stickyTop: 24,
    children: <MainContent count={20} />,
  },
};
