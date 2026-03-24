import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopSaleHits } from './DesktopSaleHits';
import type { SaleHitItem } from './DesktopSaleHits';

const sampleItems: SaleHitItem[] = [
  {
    id: '1',
    image: 'https://example.com/img1.jpg',
    title: 'Wireless Earbuds',
    price: 49999,
    originalPrice: 89999,
    discount: '-44%',
    currency: 'UZS',
  },
  {
    id: '2',
    image: 'https://example.com/img2.jpg',
    title: 'Phone Case',
    price: 15000,
  },
  {
    id: '3',
    image: 'https://example.com/img3.jpg',
    title: 'USB Cable',
    price: 8000,
    originalPrice: 12000,
    discount: '-33%',
  },
];

describe('DesktopSaleHits', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByRole('region', { name: 'Sale Hits' })).toBeInTheDocument();
  });

  it('renders as a section element with aria-label', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    const section = screen.getByRole('region', { name: 'Sale Hits' });
    expect(section.tagName).toBe('SECTION');
  });

  it('renders default title "Sale Hits"', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByText('Sale Hits')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<DesktopSaleHits items={sampleItems} title="Hot Deals" />);
    expect(screen.getByText('Hot Deals')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<DesktopSaleHits items={sampleItems} subtitle="Limited time only" />);
    expect(screen.getByText('Limited time only')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<DesktopSaleHits items={sampleItems} />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders default HOT icon when no icon prop', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByText('HOT')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(<DesktopSaleHits items={sampleItems} icon={<span data-testid="fire">FIRE</span>} />);
    expect(screen.getByTestId('fire')).toBeInTheDocument();
    expect(screen.queryByText('HOT')).not.toBeInTheDocument();
  });

  // ─── Items rendering ───────────────────────────────────────────────

  it('renders all items', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByText('Wireless Earbuds')).toBeInTheDocument();
    expect(screen.getByText('Phone Case')).toBeInTheDocument();
    expect(screen.getByText('USB Cable')).toBeInTheDocument();
  });

  it('renders item images with alt text', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Wireless Earbuds');
    expect(images[1]).toHaveAttribute('alt', 'Phone Case');
  });

  it('renders formatted prices', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    // formatNumber(49999) = "49 999", plus currency "UZS"
    expect(screen.getByText(/49 999/)).toBeInTheDocument();
  });

  it('renders original price and discount badge when available', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByText(/89 999/)).toBeInTheDocument();
    expect(screen.getByText('-44%')).toBeInTheDocument();
  });

  it('renders currency suffix when provided', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByText(/UZS/)).toBeInTheDocument();
  });

  // ─── View All button ───────────────────────────────────────────────

  it('renders "More" button when onViewAll is provided', () => {
    render(<DesktopSaleHits items={sampleItems} onViewAll={() => {}} />);
    expect(screen.getByText('More')).toBeInTheDocument();
  });

  it('renders custom viewAllText', () => {
    render(<DesktopSaleHits items={sampleItems} onViewAll={() => {}} viewAllText="See All" />);
    expect(screen.getByText('See All')).toBeInTheDocument();
  });

  it('does not render "More" button when onViewAll is not provided', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.queryByText('More')).not.toBeInTheDocument();
  });

  it('calls onViewAll when "More" button is clicked', () => {
    const handler = vi.fn();
    render(<DesktopSaleHits items={sampleItems} onViewAll={handler} />);
    fireEvent.click(screen.getByText('More'));
    expect(handler).toHaveBeenCalledOnce();
  });

  // ─── Scroll arrows ─────────────────────────────────────────────────

  it('renders right scroll arrow by default (canScrollRight = true)', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  });

  it('does not render left scroll arrow initially (canScrollLeft = false)', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
  });

  it('uses custom scroll aria-labels', () => {
    render(
      <DesktopSaleHits
        items={sampleItems}
        scrollLeftAriaLabel="Oldingi"
        scrollRightAriaLabel="Keyingi"
      />,
    );
    expect(screen.getByLabelText('Keyingi')).toBeInTheDocument();
  });

  // ─── Card click / keyboard ──────────────────────────────────────────

  it('calls item onClick when card is clicked', () => {
    const handler = vi.fn();
    const items = [{ ...sampleItems[0], onClick: handler }];
    render(<DesktopSaleHits items={items} />);
    fireEvent.click(screen.getByText('Wireless Earbuds').closest('[role="button"]')!);
    expect(handler).toHaveBeenCalledOnce();
  });

  it('cards have role="button" and tabIndex=0', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    const card = screen.getByText('Wireless Earbuds').closest('[role="button"]')!;
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('card keyboard Enter triggers onClick', () => {
    const handler = vi.fn();
    const items = [{ ...sampleItems[0], onClick: handler }];
    render(<DesktopSaleHits items={items} />);
    const card = screen.getByText('Wireless Earbuds').closest('[role="button"]')!;
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(handler).toHaveBeenCalledOnce();
  });

  it('card keyboard Space triggers onClick', () => {
    const handler = vi.fn();
    const items = [{ ...sampleItems[0], onClick: handler }];
    render(<DesktopSaleHits items={items} />);
    const card = screen.getByText('Wireless Earbuds').closest('[role="button"]')!;
    fireEvent.keyDown(card, { key: ' ' });
    expect(handler).toHaveBeenCalledOnce();
  });

  // ─── renderCard slot ────────────────────────────────────────────────

  it('uses renderCard when provided', () => {
    const renderCard = vi.fn((item: SaleHitItem) => (
      <div data-testid={`custom-card-${item.id}`}>{item.title}</div>
    ));
    render(<DesktopSaleHits items={sampleItems} renderCard={renderCard} />);
    expect(renderCard).toHaveBeenCalledTimes(3);
    expect(screen.getByTestId('custom-card-1')).toBeInTheDocument();
  });

  it('renderCard receives item and index', () => {
    const renderCard = vi.fn(() => <div />);
    render(<DesktopSaleHits items={sampleItems} renderCard={renderCard} />);
    expect(renderCard).toHaveBeenCalledWith(sampleItems[0], 0);
    expect(renderCard).toHaveBeenCalledWith(sampleItems[1], 1);
    expect(renderCard).toHaveBeenCalledWith(sampleItems[2], 2);
  });

  // ─── imageFit prop ──────────────────────────────────────────────────

  it('applies contain imageFit to images', () => {
    render(<DesktopSaleHits items={sampleItems} imageFit="contain" />);
    const img = screen.getAllByRole('img')[0];
    expect(img.style.objectFit).toBe('contain');
  });

  it('does not add objectFit style when imageFit is cover (default)', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    const img = screen.getAllByRole('img')[0];
    expect(img.style.objectFit).toBe('');
  });

  // ─── CSS custom property for cardWidth ──────────────────────────────

  it('sets --card-width CSS variable', () => {
    const { container } = render(<DesktopSaleHits items={sampleItems} cardWidth={200} />);
    const section = container.querySelector('section')!;
    expect(section.style.getPropertyValue('--card-width')).toBe('200px');
  });

  it('applies background style when provided', () => {
    const { container } = render(
      <DesktopSaleHits items={sampleItems} background="linear-gradient(red, blue)" />,
    );
    const section = container.querySelector('section')!;
    expect(section.style.background).toBe('linear-gradient(red, blue)');
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<DesktopSaleHits items={sampleItems} className="my-class" />);
    expect(container.querySelector('section')?.className).toContain('my-class');
  });

  it('spreads rest props', () => {
    render(<DesktopSaleHits items={sampleItems} data-testid="sale-hits" />);
    expect(screen.getByTestId('sale-hits')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopSaleHits.displayName).toBe('DesktopSaleHits');
  });

  // ─── Images have lazy loading ───────────────────────────────────────

  it('images have lazy loading attributes', () => {
    render(<DesktopSaleHits items={sampleItems} />);
    const img = screen.getAllByRole('img')[0];
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('decoding', 'async');
  });
});
