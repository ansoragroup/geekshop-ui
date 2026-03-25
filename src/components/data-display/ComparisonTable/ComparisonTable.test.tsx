import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ComparisonTable } from './ComparisonTable';
import type { ComparisonProduct, ComparisonSpec } from './ComparisonTable';

const products: ComparisonProduct[] = [
  { id: 'a', name: 'Product A', image: 'a.jpg', price: 100000 },
  { id: 'b', name: 'Product B', image: 'b.jpg', price: 200000 },
];

const specs: ComparisonSpec[] = [
  { key: 'ram', label: 'RAM', values: { a: 8, b: 16 }, unit: 'GB', higherIsBetter: true },
  { key: 'screen', label: 'Screen', values: { a: '6.1"', b: '6.7"' } },
  { key: 'nfc', label: 'NFC', values: { a: true, b: false } },
];

describe('ComparisonTable', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders product names', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('renders product images', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('alt', 'Product A');
    expect(images[1]).toHaveAttribute('alt', 'Product B');
  });

  it('renders spec labels', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByText('RAM')).toBeInTheDocument();
    expect(screen.getByText('Screen')).toBeInTheDocument();
    expect(screen.getByText('NFC')).toBeInTheDocument();
  });

  it('renders spec values with units', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByText('8 GB')).toBeInTheDocument();
    expect(screen.getByText('16 GB')).toBeInTheDocument();
  });

  it('renders boolean values as checkmark/cross', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByText('\u2713')).toBeInTheDocument();
    expect(screen.getByText('\u2717')).toBeInTheDocument();
  });

  it('highlights best values when highlightDifferences is true', () => {
    render(<ComparisonTable products={products} specs={specs} highlightDifferences />);
    // Product B has 16GB RAM which is better, so "Eng yaxshi" badge should appear
    const bestBadges = screen.getAllByText('Eng yaxshi');
    expect(bestBadges.length).toBeGreaterThan(0);
  });

  it('does not highlight when highlightDifferences is false', () => {
    render(<ComparisonTable products={products} specs={specs} highlightDifferences={false} />);
    expect(screen.queryByText('Eng yaxshi')).not.toBeInTheDocument();
  });

  it('renders remove buttons when onRemove is provided', () => {
    const onRemove = vi.fn();
    render(<ComparisonTable products={products.map((p) => ({ ...p, onRemove }))} specs={specs} />);
    const removeBtns = screen.getAllByLabelText(/O'chirish/);
    expect(removeBtns).toHaveLength(2);
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemoveA = vi.fn();
    const onRemoveB = vi.fn();
    render(
      <ComparisonTable
        products={[
          { ...products[0], onRemove: onRemoveA },
          { ...products[1], onRemove: onRemoveB },
        ]}
        specs={specs}
      />
    );
    const removeBtns = screen.getAllByLabelText(/O'chirish/);
    fireEvent.click(removeBtns[0]);
    expect(onRemoveA).toHaveBeenCalled();
  });

  it('has role="table"', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders row roles', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    const rows = screen.getAllByRole('row');
    // 1 header row + 3 spec rows
    expect(rows).toHaveLength(4);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ComparisonTable products={products} specs={specs} className="my-table" />
    );
    expect(container.firstElementChild?.className).toContain('my-table');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ComparisonTable ref={ref} products={products} specs={specs} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles missing spec values gracefully', () => {
    const specsWithMissing: ComparisonSpec[] = [
      { key: 'feature', label: 'Feature', values: { a: 'yes' } },
    ];
    render(<ComparisonTable products={products} specs={specsWithMissing} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders string spec values', () => {
    render(<ComparisonTable products={products} specs={specs} />);
    expect(screen.getByText('6.1"')).toBeInTheDocument();
    expect(screen.getByText('6.7"')).toBeInTheDocument();
  });
});
