import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar, ShareIcon, HeartIcon, MoreIcon } from './NavBar';
import { SearchBar } from '../SearchBar/SearchBar';

const meta = {
  title: 'Navigation/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '390px', background: '#F5F5F5', minHeight: 200 }}>
        <Story />
        <div style={{ padding: 16, color: '#999', fontSize: 12 }}>
          Page content below the nav bar.
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Kategoriyalar',
    showBack: true,
    onBack: () => alert('Back'),
  },
};

export const WithRightActions: Story = {
  args: {
    title: 'Mahsulot',
    showBack: true,
    onBack: () => alert('Back'),
    rightActions: [
      { key: 'share', icon: <ShareIcon />, onClick: () => alert('Share'), ariaLabel: 'Ulashish' },
      { key: 'favorite', icon: <HeartIcon />, onClick: () => alert('Favorite'), ariaLabel: 'Sevimli' },
      { key: 'more', icon: <MoreIcon />, onClick: () => alert('More'), ariaLabel: 'Yana' },
    ],
  },
};

export const NoBack: Story = {
  args: {
    title: 'Bosh sahifa',
    showBack: false,
  },
};

export const GradientVariant: Story = {
  args: {
    title: 'GeekShop.uz',
    variant: 'gradient',
    showBack: false,
    rightActions: [
      { key: 'favorite', icon: <HeartIcon />, onClick: () => {}, ariaLabel: 'Sevimli' },
      { key: 'more', icon: <MoreIcon />, onClick: () => {}, ariaLabel: 'Yana' },
    ],
  },
};

export const GradientWithBack: Story = {
  args: {
    title: 'Aksiya',
    variant: 'gradient',
    showBack: true,
    onBack: () => alert('Back'),
    rightActions: [
      { key: 'share', icon: <ShareIcon />, onClick: () => {}, ariaLabel: 'Ulashish' },
    ],
  },
};

export const WithSearchBar: Story = {
  render: () => (
    <NavBar variant="gradient" showBack={false}>
      <SearchBar
        readOnly
        compact
        placeholder="Mahsulot qidirish..."
        onClick={() => alert('Navigate to search')}
        onCamera={() => alert('Camera')}
      />
    </NavBar>
  ),
};

export const WithSearchBarAndBack: Story = {
  render: () => (
    <NavBar variant="default" showBack onBack={() => alert('Back')}>
      <SearchBar
        compact
        placeholder="Mahsulot qidirish..."
        onCamera={() => alert('Camera')}
      />
    </NavBar>
  ),
};

export const LongTitle: Story = {
  args: {
    title: 'NVIDIA GeForce RTX 4090 Founders Edition 24GB',
    showBack: true,
    onBack: () => {},
    rightActions: [
      { key: 'share', icon: <ShareIcon />, onClick: () => {}, ariaLabel: 'Ulashish' },
      { key: 'more', icon: <MoreIcon />, onClick: () => {}, ariaLabel: 'Yana' },
    ],
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '390px', background: '#F5F5F5' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <p style={{ padding: '8px 12px', fontSize: 11, color: '#999' }}>Default</p>
        <NavBar title="Kategoriyalar" showBack onBack={() => {}} />
      </div>
      <div>
        <p style={{ padding: '8px 12px', fontSize: 11, color: '#999' }}>Default + actions</p>
        <NavBar
          title="Mahsulot"
          showBack
          onBack={() => {}}
          rightActions={[
            { key: 'share', icon: <ShareIcon />, onClick: () => {} },
            { key: 'fav', icon: <HeartIcon />, onClick: () => {} },
            { key: 'more', icon: <MoreIcon />, onClick: () => {} },
          ]}
        />
      </div>
      <div>
        <p style={{ padding: '8px 12px', fontSize: 11, color: '#999' }}>Gradient</p>
        <NavBar title="GeekShop.uz" variant="gradient" showBack={false} />
      </div>
      <div>
        <p style={{ padding: '8px 12px', fontSize: 11, color: '#999' }}>Gradient + search</p>
        <NavBar variant="gradient" showBack={false}>
          <SearchBar readOnly compact placeholder="Mahsulot qidirish..." onClick={() => {}} onCamera={() => {}} />
        </NavBar>
      </div>
    </div>
  ),
};
