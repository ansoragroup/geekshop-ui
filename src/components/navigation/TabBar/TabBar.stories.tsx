import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TabBar } from './TabBar';
import type { TabBarProps } from './TabBar';

const meta = {
  title: 'Navigation/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '390px', height: '844px', position: 'relative', overflow: 'hidden', background: '#F5F5F5' }}>
        <div style={{ padding: 16, color: '#666', fontSize: 14 }}>
          <p>Page content area</p>
          <p style={{ marginTop: 8, fontSize: 12, color: '#999' }}>The tab bar is fixed at the bottom.</p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* Interactive wrapper to enable tab switching */
function InteractiveTabBar(props: Partial<TabBarProps> & { initialTab?: string }) {
  const { initialTab = 'home', ...rest } = props;
  const [active, setActive] = useState(initialTab);
  return <TabBar activeKey={active} onChange={setActive} {...rest} />;
}

export const Default: Story = {
  render: () => <InteractiveTabBar />,
};

export const HomeActive: Story = {
  args: {
    activeKey: 'home',
    onChange: () => {},
  },
};

export const CategoriesActive: Story = {
  args: {
    activeKey: 'categories',
    onChange: () => {},
  },
};

export const CartWithBadge: Story = {
  render: () => {
    const items = [
      { key: 'home', label: 'Bosh sahifa', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5L12 3l9 7.5" /><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 3L3 10.5V19a2 2 0 002 2h4v-6h6v6h4a2 2 0 002-2v-8.5L12 3z" /></svg> },
      { key: 'categories', label: 'Kategoriyalar', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
      { key: 'cart', label: 'Savat', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h12l1.5 14H4.5L6 6z" /><path d="M9 6V4a3 3 0 016 0v2" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12l1.5 14H4.5L6 6z" /></svg>, badge: 5 },
      { key: 'profile', label: 'Profil', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg> },
    ];
    return <InteractiveTabBar initialTab="cart" items={items} />;
  },
};

export const CartBadge99Plus: Story = {
  render: () => {
    const items = [
      { key: 'home', label: 'Bosh sahifa', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10.5L12 3l9 7.5" /><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L3 10.5V19a2 2 0 002 2h4v-6h6v6h4a2 2 0 002-2v-8.5L12 3z" /></svg> },
      { key: 'categories', label: 'Kategoriyalar', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg> },
      { key: 'cart', label: 'Savat', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6h12l1.5 14H4.5L6 6z" /><path d="M9 6V4a3 3 0 016 0v2" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12l1.5 14H4.5L6 6z" /></svg>, badge: 150 },
      { key: 'profile', label: 'Profil', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>, activeIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg> },
    ];
    return <InteractiveTabBar initialTab="home" items={items} />;
  },
};

export const SwitchTabsTest: Story = {
  args: {
    activeKey: 'home',
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Verify tablist is rendered
    const tablist = canvas.getByRole('tablist');
    await expect(tablist).toBeInTheDocument();

    // Verify Home is initially active
    const homeTab = canvas.getByRole('tab', { name: /bosh sahifa/i });
    await expect(homeTab).toHaveAttribute('aria-selected', 'true');

    // Click on Kategoriyalar tab
    const categoriesTab = canvas.getByRole('tab', { name: /kategoriyalar/i });
    await userEvent.click(categoriesTab);
    await expect(args.onChange).toHaveBeenCalledWith('categories');

    // Click on Savat tab
    const cartTab = canvas.getByRole('tab', { name: /savat/i });
    await userEvent.click(cartTab);
    await expect(args.onChange).toHaveBeenCalledWith('cart');

    // Click on Profil tab
    const profileTab = canvas.getByRole('tab', { name: /profil/i });
    await userEvent.click(profileTab);
    await expect(args.onChange).toHaveBeenCalledWith('profile');

    // Verify onChange was called 3 times
    await expect(args.onChange).toHaveBeenCalledTimes(3);
  },
};
