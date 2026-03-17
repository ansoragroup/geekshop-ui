import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopProductGrid } from './DesktopProductGrid';
import type { DesktopProductGridItem, SortOption } from './DesktopProductGrid';

const defaultProducts: DesktopProductGridItem[] = [
  {
    id: '1',
    images: ['/img/prod1.jpg'],
    title: 'RTX 4060 GPU',
    shopName: 'TechZone',
    price: 8_900_000,
  },
  {
    id: '2',
    images: ['/img/prod2.jpg'],
    title: 'Ryzen 7 CPU',
    shopName: 'ComputerWorld',
    price: 6_350_000,
  },
  {
    id: '3',
    images: ['/img/prod3.jpg'],
    title: 'Samsung SSD 1TB',
    shopName: 'DigitalPlaza',
    price: 1_290_000,
  },
];

const defaultSortOptions: SortOption[] = [
  { id: 'relevance', label: 'Relevance' },
  { id: 'price', label: 'Price' },
];

const defaultProps = {
  products: defaultProducts,
  sortOptions: defaultSortOptions,
  activeSortId: 'relevance',
};

describe('DesktopProductGrid', () => {
  it('renders products in grid mode', () => {
    render(<DesktopProductGrid {...defaultProps} />);
    expect(screen.getByText('RTX 4060 GPU')).toBeInTheDocument();
    expect(screen.getByText('Ryzen 7 CPU')).toBeInTheDocument();
    expect(screen.getByText('Samsung SSD 1TB')).toBeInTheDocument();
  });

  it('renders sort option buttons', () => {
    render(<DesktopProductGrid {...defaultProps} />);
    expect(screen.getByText('Relevance')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
  });

  it('calls onSortChange when sort button is clicked', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductGrid {...defaultProps} onSortChange={onSortChange} />);
    await user.click(screen.getByText('Price'));

    expect(onSortChange).toHaveBeenCalledWith('price');
  });

  it('marks active sort button with aria-pressed', () => {
    render(<DesktopProductGrid {...defaultProps} />);

    const relevanceBtn = screen.getByText('Relevance').closest('button')!;
    const priceBtn = screen.getByText('Price').closest('button')!;

    expect(relevanceBtn).toHaveAttribute('aria-pressed', 'true');
    expect(priceBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onViewModeChange when view toggle is clicked', async () => {
    const onViewModeChange = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductGrid {...defaultProps} onViewModeChange={onViewModeChange} />);
    await user.click(screen.getByLabelText('List view'));

    expect(onViewModeChange).toHaveBeenCalledWith('list');
  });

  it('calls onColumnsChange when column toggle is clicked', async () => {
    const onColumnsChange = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductGrid {...defaultProps} onColumnsChange={onColumnsChange} />);
    await user.click(screen.getByLabelText('4 columns'));

    expect(onColumnsChange).toHaveBeenCalledWith(4);
  });

  it('renders ProductListItem in list mode', () => {
    render(<DesktopProductGrid {...defaultProps} viewMode="list" />);
    // In list mode, ProductListItem renders product titles as h3
    expect(screen.getByText('RTX 4060 GPU')).toBeInTheDocument();
    expect(screen.getByText('Ryzen 7 CPU')).toBeInTheDocument();
  });

  it('hides column toggle in list mode', () => {
    render(<DesktopProductGrid {...defaultProps} viewMode="list" />);
    expect(screen.queryByLabelText('4 columns')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('5 columns')).not.toBeInTheDocument();
  });

  it('shows correct count text', () => {
    render(<DesktopProductGrid {...defaultProps} totalCount={195} />);
    expect(screen.getByText('Showing 1-3 of 195')).toBeInTheDocument();
  });

  it('shows product count as total when totalCount not provided', () => {
    render(<DesktopProductGrid products={defaultProducts} />);
    expect(screen.getByText('Showing 1-3 of 3')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductGrid {...defaultProps} className="my-grid" />,
    );
    expect(container.firstElementChild?.className).toContain('my-grid');
  });

  it('renders view mode toggle with aria labels', () => {
    render(<DesktopProductGrid {...defaultProps} />);
    expect(screen.getByLabelText('Grid view')).toBeInTheDocument();
    expect(screen.getByLabelText('List view')).toBeInTheDocument();
  });

  it('marks active view button with aria-pressed', () => {
    render(<DesktopProductGrid {...defaultProps} viewMode="grid" />);
    expect(screen.getByLabelText('Grid view')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('List view')).toHaveAttribute('aria-pressed', 'false');
  });

  it('marks active column button with aria-pressed', () => {
    render(<DesktopProductGrid {...defaultProps} columns={4} />);
    expect(screen.getByLabelText('4 columns')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('5 columns')).toHaveAttribute('aria-pressed', 'false');
  });
});
