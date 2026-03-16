import type { Meta, StoryObj } from '@storybook/react-vite';
import { MegaMenu } from './MegaMenu';
import type { MegaMenuCategory } from './MegaMenu';

const sampleCategories: MegaMenuCategory[] = [
  {
    label: 'Graphics Cards',
    subcategories: [
      { label: 'RTX 5090' },
      { label: 'RTX 5080' },
      { label: 'RTX 5070 Ti' },
      { label: 'RTX 5070' },
      { label: 'RTX 4090' },
      { label: 'RTX 4080 Super' },
      { label: 'RTX 4070 Ti' },
      { label: 'RX 9070 XT' },
      { label: 'RX 7900 XTX' },
      { label: 'Intel Arc B580' },
    ],
  },
  {
    label: 'Processors',
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
    label: 'Monitors',
    subcategories: [
      { label: '4K Gaming' },
      { label: '1440p 165Hz' },
      { label: 'Ultrawide' },
      { label: 'OLED' },
      { label: 'Professional' },
      { label: '27 inch' },
      { label: '32 inch' },
    ],
  },
  {
    label: 'Keyboards',
    subcategories: [
      { label: 'Mechanical' },
      { label: '60%' },
      { label: '75%' },
      { label: 'TKL' },
      { label: 'Full Size' },
      { label: 'Wireless' },
    ],
  },
  {
    label: 'Mice',
    subcategories: [
      { label: 'Gaming Mice' },
      { label: 'Wireless Gaming' },
      { label: 'Ergonomic' },
      { label: 'Lightweight' },
    ],
  },
  {
    label: 'Storage',
    subcategories: [
      { label: 'NVMe SSD' },
      { label: 'SATA SSD' },
      { label: 'HDD' },
      { label: 'External SSD' },
      { label: 'microSD' },
    ],
  },
  {
    label: 'Memory (RAM)',
    subcategories: [
      { label: 'DDR5' },
      { label: 'DDR4' },
      { label: '32GB Kits' },
      { label: '64GB Kits' },
    ],
  },
  {
    label: 'Power Supplies',
    subcategories: [
      { label: '1000W+' },
      { label: '850W' },
      { label: '750W' },
      { label: 'SFX' },
      { label: 'Modular' },
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
  title: 'Navigation/MegaMenu',
  component: MegaMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof MegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: sampleCategories,
    navItems,
  },
};

export const CategoriesOnly: Story = {
  args: {
    categories: sampleCategories,
  },
};

export const FewCategories: Story = {
  args: {
    categories: sampleCategories.slice(0, 3),
    navItems: navItems.slice(0, 2),
  },
};
