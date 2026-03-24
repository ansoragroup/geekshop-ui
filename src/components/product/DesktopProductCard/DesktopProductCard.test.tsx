import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopProductCard } from './DesktopProductCard';

const defaultProps = {
  image: '/img/gpu1.jpg',
  title: 'RTX 4060 8GB',
  price: 8_900_000,
};

describe('DesktopProductCard', () => {
  it('renders the product title', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText('RTX 4060 8GB')).toBeInTheDocument();
  });

  it('renders the product image', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu1.jpg');
    expect(img).toHaveAttribute('alt', 'RTX 4060 8GB');
  });

  it('renders with role button and tabIndex 0 for div', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const card = screen.getByRole('button', { name: /RTX 4060/i });
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('does not apply role=button when as="a"', () => {
    render(<DesktopProductCard {...defaultProps} as="a" href="/product" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /RTX 4060/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button', { name: /RTX 4060/i }).focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders discount text when provided', () => {
    render(<DesktopProductCard {...defaultProps} originalPrice={12_000_000} discount="-26%" />);
    expect(screen.getByText('-26%')).toBeInTheDocument();
  });

  it('renders current price', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText(/8.900.000/)).toBeInTheDocument();
  });

  it('renders original price with strikethrough when provided', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} originalPrice={12_000_000} />,
    );
    expect(container.querySelector('[class*="originalPrice"]')).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    render(<DesktopProductCard {...defaultProps} rating={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders purchase count with default label', () => {
    render(<DesktopProductCard {...defaultProps} purchaseCount={120} />);
    expect(screen.getByText(/120 purchased/)).toBeInTheDocument();
  });

  it('renders purchase count with custom label', () => {
    render(<DesktopProductCard {...defaultProps} purchaseCount={120} purchaseCountLabel="bought" />);
    expect(screen.getByText(/120 bought/)).toBeInTheDocument();
  });

  it('renders purchase count with function label', () => {
    render(<DesktopProductCard {...defaultProps} purchaseCount={120} purchaseCountLabel={(n) => `${n} sold`} />);
    expect(screen.getByText('120 sold')).toBeInTheDocument();
  });

  it('renders badges on image when provided', () => {
    render(
      <DesktopProductCard
        {...defaultProps}
        badges={[
          { label: 'SALE', variant: 'sale' },
          { label: 'TOP', variant: 'top' },
        ]}
      />,
    );
    expect(screen.getByText('SALE')).toBeInTheDocument();
    expect(screen.getByText('TOP')).toBeInTheDocument();
  });

  it('renders recommended label with default text', () => {
    render(<DesktopProductCard {...defaultProps} recommended />);
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('renders custom recommended text', () => {
    render(<DesktopProductCard {...defaultProps} recommended recommendedText="Bestseller" />);
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
  });

  it('renders delivery text when provided', () => {
    render(<DesktopProductCard {...defaultProps} deliveryText="Ships in 2 days" />);
    expect(screen.getByText('Ships in 2 days')).toBeInTheDocument();
  });

  it('renders free shipping label', () => {
    render(<DesktopProductCard {...defaultProps} freeShipping />);
    expect(screen.getByText('Free shipping')).toBeInTheDocument();
  });

  it('renders custom free shipping label', () => {
    render(<DesktopProductCard {...defaultProps} freeShipping freeShippingLabel="Бесплатная доставка" />);
    expect(screen.getByText('Бесплатная доставка')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} className="my-card" />,
    );
    expect(container.firstElementChild?.className).toContain('my-card');
  });

  it('renders currency suffix when provided', () => {
    render(<DesktopProductCard {...defaultProps} currency="USD" />);
    expect(screen.getByText(/USD/)).toBeInTheDocument();
  });

  it('applies imageFit prop', () => {
    render(<DesktopProductCard {...defaultProps} imageFit="contain" />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle({ objectFit: 'contain' });
  });
});
