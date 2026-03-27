import type { Meta, StoryObj } from '@storybook/react-vite';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import type { MegaMenuCategory } from './DesktopMegaMenu';

// ─── Inline SVG category icons ──────────────────────────────────────────────

const MonitorIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const CpuIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </svg>
);

const SmartphoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const CameraIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const GamepadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </svg>
);

const ShirtIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 1.93L3 10l5 2V21h8V12l5-2-.72-4.54a2 2 0 00-1.34-1.93z" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const WrenchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

const BookIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
  </svg>
);

// ─── Data Sets ──────────────────────────────────────────────────────────────

const fullCategories: MegaMenuCategory[] = [
  {
    label: 'Graphics Cards',
    icon: <MonitorIcon />,
    href: '/gpu',
    subcategories: [
      { label: 'RTX 5090', href: '/gpu/rtx5090' },
      { label: 'RTX 5080', href: '/gpu/rtx5080' },
      { label: 'RTX 5070 Ti', href: '/gpu/rtx5070ti' },
      { label: 'RTX 5070', href: '/gpu/rtx5070' },
      { label: 'RTX 4090', href: '/gpu/rtx4090' },
      { label: 'RTX 4080 Super', href: '/gpu/rtx4080s' },
      { label: 'RTX 4070 Ti', href: '/gpu/rtx4070ti' },
      { label: 'RX 9070 XT', href: '/gpu/rx9070xt' },
      { label: 'RX 7900 XTX', href: '/gpu/rx7900xtx' },
      { label: 'Intel Arc B580', href: '/gpu/arcb580' },
    ],
  },
  {
    label: 'Processors',
    icon: <CpuIcon />,
    href: '/cpu',
    subcategories: [
      { label: 'Ryzen 9 9950X' },
      { label: 'Ryzen 7 9800X3D' },
      { label: 'Ryzen 5 9600X' },
      { label: 'Core Ultra 9 285K' },
      { label: 'Core i9-14900K' },
      { label: 'Core i7-14700K' },
      { label: 'Core i5-14600K' },
    ],
  },
  {
    label: 'Smartphones',
    icon: <SmartphoneIcon />,
    href: '/phones',
    subcategories: [
      { label: 'iPhone 16 Pro Max' },
      { label: 'iPhone 16 Pro' },
      { label: 'Samsung Galaxy S25 Ultra' },
      { label: 'Samsung Galaxy Z Fold 6' },
      { label: 'Google Pixel 9 Pro' },
      { label: 'OnePlus 13' },
      { label: 'Xiaomi 15 Pro' },
    ],
  },
  {
    label: 'Audio & Headphones',
    icon: <HeadphonesIcon />,
    href: '/audio',
    subcategories: [
      { label: 'Wireless Earbuds' },
      { label: 'Over-ear Headphones' },
      { label: 'Studio Monitors' },
      { label: 'Soundbars' },
      { label: 'Portable Speakers' },
      { label: 'DACs & Amplifiers' },
    ],
  },
  {
    label: 'Cameras & Photo',
    icon: <CameraIcon />,
    href: '/cameras',
    subcategories: [
      { label: 'Mirrorless Cameras' },
      { label: 'DSLR Cameras' },
      { label: 'Action Cameras' },
      { label: 'Lenses' },
      { label: 'Tripods & Stabilizers' },
      { label: 'Memory Cards' },
    ],
  },
  {
    label: 'Gaming',
    icon: <GamepadIcon />,
    href: '/gaming',
    subcategories: [
      { label: 'PlayStation 5' },
      { label: 'Xbox Series X' },
      { label: 'Nintendo Switch 2' },
      { label: 'Steam Deck' },
      { label: 'Gaming Chairs' },
      { label: 'VR Headsets' },
    ],
  },
  {
    label: 'Fashion & Apparel',
    icon: <ShirtIcon />,
    href: '/fashion',
    subcategories: [
      { label: "Men's Clothing" },
      { label: "Women's Clothing" },
      { label: 'Shoes' },
      { label: 'Watches' },
      { label: 'Bags & Wallets' },
    ],
  },
  {
    label: 'Home & Living',
    icon: <HomeIcon />,
    href: '/home',
    subcategories: [
      { label: 'Furniture' },
      { label: 'Lighting' },
      { label: 'Kitchen Appliances' },
      { label: 'Smart Home' },
      { label: 'Bedding' },
    ],
  },
  {
    label: 'Tools & Hardware',
    icon: <WrenchIcon />,
    href: '/tools',
    subcategories: [
      { label: 'Power Tools' },
      { label: 'Hand Tools' },
      { label: 'Measurement' },
      { label: 'Safety Equipment' },
    ],
  },
  {
    label: 'Books & Stationery',
    icon: <BookIcon />,
    href: '/books',
    subcategories: [
      { label: 'Textbooks' },
      { label: 'Fiction' },
      { label: 'Non-Fiction' },
      { label: 'Notebooks & Planners' },
    ],
  },
];

const navItems = [
  { label: 'Deals', href: '#' },
  { label: 'New Arrivals', href: '#' },
  { label: 'Top Brands', href: '#' },
  { label: 'PC Builder', href: '#' },
  { label: 'Blog', href: '#' },
];

const meta = {
  title: 'Navigation (Desktop)/DesktopMegaMenu',
  component: DesktopMegaMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof DesktopMegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: all 10 categories with icons, subcategories, and nav items. */
export const Default: Story = {
  args: {
    categories: fullCategories,
    navItems,
  },
};

/** Categories only, no navigation bar items. */
export const CategoriesOnly: Story = {
  args: {
    categories: fullCategories,
  },
};

/** Minimal: 3 categories, 2 nav items. */
export const FewCategories: Story = {
  args: {
    categories: fullCategories.slice(0, 3),
    navItems: navItems.slice(0, 2),
  },
};

/** Full-featured: all props, custom trigger label, custom "View all" label, and all handlers. */
export const FullFeatured: Story = {
  args: {
    categories: fullCategories,
    navItems,
    triggerLabel: 'Browse All Categories',
    viewAllLabel: 'See everything',
    onCategoryClick: (cat) => console.log('Category:', cat.label),
    onSubcategoryClick: (cat, sub) => console.log(`${cat.label} > ${sub.label}`),
  },
};

/** Custom trigger icon with a different label. */
export const CustomTrigger: Story = {
  args: {
    categories: fullCategories.slice(0, 5),
    triggerLabel: 'Shop by Department',
    triggerIcon: <CpuIcon />,
    viewAllLabel: 'View all products',
  },
};

/** Categories without subcategories (flat list). */
export const FlatCategories: Story = {
  args: {
    categories: [
      { label: 'Flash Deals', icon: <GamepadIcon /> },
      { label: 'Best Sellers', icon: <MonitorIcon /> },
      { label: 'New Arrivals', icon: <SmartphoneIcon /> },
      { label: 'Clearance', icon: <ShirtIcon /> },
      { label: 'Gift Cards', icon: <BookIcon /> },
    ],
    navItems: [{ label: 'Help Center' }, { label: 'Contact Us' }],
  },
};

/** Many categories (10+) to test scrolling behavior. */
export const ManyCategories: Story = {
  args: {
    categories: [
      ...fullCategories,
      {
        label: 'Sports & Outdoors',
        icon: <GamepadIcon />,
        subcategories: [
          { label: 'Running Shoes' },
          { label: 'Camping Gear' },
          { label: 'Cycling' },
        ],
      },
      {
        label: 'Automotive',
        icon: <WrenchIcon />,
        subcategories: [
          { label: 'Car Electronics' },
          { label: 'Tires' },
          { label: 'Interior Accessories' },
        ],
      },
      {
        label: 'Health & Beauty',
        icon: <HeadphonesIcon />,
        subcategories: [
          { label: 'Skincare' },
          { label: 'Supplements' },
          { label: 'Personal Care' },
        ],
      },
    ],
    navItems: [
      { label: 'Flash Sale' },
      { label: 'Bundles' },
      { label: 'Gift Ideas' },
      { label: 'Compare' },
      { label: 'Brands A-Z' },
      { label: 'Blog' },
      { label: 'Help' },
    ],
  },
};

/** Single category with many subcategories. */
export const SingleCategoryManySubcategories: Story = {
  args: {
    categories: [
      {
        label: 'Electronics',
        icon: <MonitorIcon />,
        subcategories: [
          { label: 'Smartphones' },
          { label: 'Tablets' },
          { label: 'Laptops' },
          { label: 'Desktops' },
          { label: 'Monitors' },
          { label: 'TVs' },
          { label: 'Headphones' },
          { label: 'Speakers' },
          { label: 'Cameras' },
          { label: 'Drones' },
          { label: 'Wearables' },
          { label: 'Smart Home' },
          { label: 'Networking' },
          { label: 'Storage' },
          { label: 'Printers' },
          { label: 'Projectors' },
        ],
      },
    ],
  },
};

/** Categories with links (href) set for navigation. */
export const WithLinks: Story = {
  args: {
    categories: fullCategories.slice(0, 4).map((cat) => ({
      ...cat,
      href: `/category/${cat.label.toLowerCase().replace(/\s+/g, '-')}`,
      subcategories: cat.subcategories?.map((sub) => ({
        ...sub,
        href: `/category/${cat.label.toLowerCase().replace(/\s+/g, '-')}/${sub.label
          .toLowerCase()
          .replace(/\s+/g, '-')}`,
      })),
    })),
  },
};
