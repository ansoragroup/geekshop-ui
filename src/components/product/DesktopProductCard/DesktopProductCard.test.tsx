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

  it('renders with role button and tabIndex 0', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const card = screen.getByRole('button', { name: /RTX 4060/i });
    expect(card).toHaveAttribute('tabindex', '0');
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

  it('calls onClick on Space key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button', { name: /RTX 4060/i }).focus();
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders discount badge when provided', () => {
    render(<DesktopProductCard {...defaultProps} discount="-26%" />);
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

  it('renders discount percent next to original price', () => {
    render(
      <DesktopProductCard {...defaultProps} originalPrice={12_000_000} discount="-26%" />,
    );
    const discountElements = screen.getAllByText('-26%');
    expect(discountElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders rating and review count when provided', () => {
    render(<DesktopProductCard {...defaultProps} rating={4.5} reviewCount={1234} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(1 234)')).toBeInTheDocument();
  });

  it('renders installment price when provided', () => {
    render(<DesktopProductCard {...defaultProps} installmentPrice={742000} />);
    expect(screen.getByText(/742.000/)).toBeInTheDocument();
  });

  it('renders badges at bottom of image when provided', () => {
    render(
      <DesktopProductCard
        {...defaultProps}
        badges={[
          { label: 'ORIGINAL', color: 'green' },
          { label: 'ARZON NARX', color: 'blue' },
        ]}
      />,
    );
    expect(screen.getByText('ORIGINAL')).toBeInTheDocument();
    expect(screen.getByText('ARZON NARX')).toBeInTheDocument();
  });

  it('renders CTA button with default text', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText('Savatga')).toBeInTheDocument();
  });

  it('renders CTA button with custom text', () => {
    render(<DesktopProductCard {...defaultProps} ctaText="Ertaga" />);
    expect(screen.getByText('Ertaga')).toBeInTheDocument();
  });

  it('calls onAddToCart when CTA button is clicked', async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onAddToCart={onAddToCart} />);
    await user.click(screen.getByText('Savatga'));

    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it('renders wishlist button with correct label when not wishlisted', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument();
  });

  it('renders wishlist button with correct label when wishlisted', () => {
    render(<DesktopProductCard {...defaultProps} isWishlisted />);
    expect(screen.getByLabelText('Remove from wishlist')).toBeInTheDocument();
  });

  it('calls onWishlist when wishlist button is clicked', async () => {
    const onWishlist = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onWishlist={onWishlist} />);
    await user.click(screen.getByLabelText('Add to wishlist'));

    expect(onWishlist).toHaveBeenCalledOnce();
  });

  it('renders delivery text when provided', () => {
    render(<DesktopProductCard {...defaultProps} deliveryText="Ertaga" />);
    expect(screen.getByText('Ertaga')).toBeInTheDocument();
  });

  it('renders free shipping text when enabled and no delivery text', () => {
    render(<DesktopProductCard {...defaultProps} freeShipping />);
    expect(screen.getByText('Bepul yetkazib berish')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} className="my-card" />,
    );
    expect(container.firstElementChild?.className).toContain('my-card');
  });

  it('applies custom CTA color via style', () => {
    render(<DesktopProductCard {...defaultProps} ctaColor="#7B2BFC" />);
    const ctaBtn = screen.getByText('Savatga').closest('button');
    expect(ctaBtn).toHaveStyle({ background: '#7B2BFC' });
  });
});
