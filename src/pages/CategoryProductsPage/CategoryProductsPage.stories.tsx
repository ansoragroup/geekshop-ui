import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryProductsPage } from './CategoryProductsPage';

const meta = {
  title: 'Pages/CategoryProductsPage',
  component: CategoryProductsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'iPhone13' },
    backgrounds: { default: 'GeekShop Light' },
  },
} satisfies Meta<typeof CategoryProductsPage>;

export default meta;
type Story = StoryObj<typeof CategoryProductsPage>;

/** Default: Elektronika category with products, tab filters, and filter chips */
export const Default: Story = {
  args: {
    categoryName: 'Elektronika',
    showFilter: false,
  },
};

/** Category with filter panel overlay open */
export const WithFilter: Story = {
  args: {
    categoryName: 'Elektronika',
    showFilter: true,
  },
};

/** No results — empty category with no products found */
export const NoResults: Story = {
  args: {
    categoryName: 'Elektr jihozlar',
    empty: true,
  },
};

/** Loading state — infinite scroll spinner active */
export const Loading: Story = {
  args: {
    categoryName: 'Elektronika',
    loading: true,
  },
};

/** Videokartalar category — GPU products */
export const GPUCategory: Story = {
  name: 'GPU Category',
  args: {
    categoryName: 'Videokartalar',
    showFilter: false,
  },
};

/** Kompyuterlar category — computer products sorted by price (cheap first) */
export const CheapFirst: Story = {
  name: 'Cheap First',
  args: {
    categoryName: 'Kompyuterlar',
    showFilter: false,
  },
};
