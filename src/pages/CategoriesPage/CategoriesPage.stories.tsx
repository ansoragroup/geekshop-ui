import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoriesPage } from './CategoriesPage';

const meta = {
  title: 'Pages/CategoriesPage',
  component: CategoriesPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CategoriesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default categories page with GPU sidebar active, subcategories, and waterfall product grid */
export const Default: Story = {
  args: {
    showSearch: false,
  },
};

/** Categories page with search bar enabled for finding products */
export const WithSearch: Story = {
  args: {
    showSearch: true,
  },
};

/** GPU category — showing NVIDIA, AMD Radeon, Intel Arc subcategories */
export const GPUCategory: Story = {
  args: {
    showSearch: false,
  },
};

/** CPU category with AMD Ryzen, Intel Core, Server CPU subcategories */
export const CPUCategory: Story = {
  args: {
    showSearch: false,
  },
  play: async ({ canvasElement }) => {
    // Find and click the CPU sidebar item
    const sidebarItems = canvasElement.querySelectorAll(
      '[class*="sidebar"] [role="tab"], [class*="sidebar"] button, [class*="Sidebar"] [role="tab"]'
    );
    if (sidebarItems[1] instanceof HTMLElement) {
      sidebarItems[1].click();
    }
  },
};

/** Monitor category with Gaming, Office, Ultrawide subcategories */
export const MonitorCategory: Story = {
  args: {
    showSearch: false,
  },
  play: async ({ canvasElement }) => {
    const sidebarItems = canvasElement.querySelectorAll(
      '[class*="sidebar"] [role="tab"], [class*="sidebar"] button, [class*="Sidebar"] [role="tab"]'
    );
    if (sidebarItems[2] instanceof HTMLElement) {
      sidebarItems[2].click();
    }
  },
};

/** Categories page with search bar and TabBar navigation */
export const FullLayout: Story = {
  args: {
    showSearch: true,
  },
};
