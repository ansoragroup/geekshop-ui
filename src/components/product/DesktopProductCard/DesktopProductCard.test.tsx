import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopProductCard } from './DesktopProductCard';

const defaultProps = {
  images: ['/img/gpu1.jpg', '/img/gpu2.jpg', '/img/gpu3.jpg'],
  title: 'RTX 4060 8GB',
  shopName: 'TechZone',
  price: 8_900_000,
};

describe('DesktopProductCard', () => {
  it('renders the product title', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText('RTX 4060 8GB')).toBeInTheDocument();
  });

  it('renders the shop name', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText('TechZone')).toBeInTheDocument();
  });

  it('renders the product image', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu1.jpg');
    expect(img).toHaveAttribute('alt', 'RTX 4060 8GB');
  });

  it('renders with role button and tabIndex 0', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Space key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button').focus();
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

  it('renders rating stars when rating is provided', () => {
    render(<DesktopProductCard {...defaultProps} rating={4.5} />);
    expect(screen.getByLabelText(/Rating: 4.5 out of 5/)).toBeInTheDocument();
  });

  it('renders sold count when provided', () => {
    render(<DesktopProductCard {...defaultProps} soldCount="234" />);
    expect(screen.getByText('234 sold')).toBeInTheDocument();
  });

  it('renders installment price when provided', () => {
    render(<DesktopProductCard {...defaultProps} installmentPrice="742 000" />);
    expect(screen.getByText(/742 000\/mo/)).toBeInTheDocument();
  });

  it('renders free shipping badge when enabled', () => {
    render(<DesktopProductCard {...defaultProps} freeShipping />);
    expect(screen.getByText('Free shipping')).toBeInTheDocument();
  });

  it('shows carousel arrows on hover when multiple images exist', async () => {
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} />);

    await user.hover(screen.getByRole('button'));

    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('shows quick action buttons on hover', async () => {
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} />);

    await user.hover(screen.getByRole('button'));

    expect(screen.getByLabelText('Add to cart')).toBeInTheDocument();
    expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument();
    expect(screen.getByLabelText('Compare')).toBeInTheDocument();
    expect(screen.getByLabelText('Quick view')).toBeInTheDocument();
  });

  it('calls onAddToCart when cart action is clicked', async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onAddToCart={onAddToCart} />);
    await user.hover(screen.getByRole('button'));
    await user.click(screen.getByLabelText('Add to cart'));

    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it('calls onWishlist when wishlist action is clicked', async () => {
    const onWishlist = vi.fn();
    const user = userEvent.setup();

    render(<DesktopProductCard {...defaultProps} onWishlist={onWishlist} />);
    await user.hover(screen.getByRole('button'));
    await user.click(screen.getByLabelText('Add to wishlist'));

    expect(onWishlist).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} className="my-card" />,
    );
    expect(container.firstElementChild?.className).toContain('my-card');
  });

  it('does not render carousel arrows for single image', async () => {
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} images={['/img/single.jpg']} />);

    await user.hover(screen.getByRole('button'));

    expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument();
  });

  it('navigates to next image when right arrow is clicked', async () => {
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} />);

    await user.hover(screen.getByRole('button'));
    await user.click(screen.getByLabelText('Next image'));

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu2.jpg');
  });

  it('navigates to previous image when left arrow is clicked', async () => {
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} />);

    await user.hover(screen.getByRole('button'));
    // Go to last image (wraps around)
    await user.click(screen.getByLabelText('Previous image'));

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu3.jpg');
  });
});
