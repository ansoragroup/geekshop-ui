import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ProductListItem } from './ProductListItem';

vi.mock('../../../i18n/GeekShopProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../i18n/GeekShopProvider')>();
  const { TRANSLATIONS } = await import('../../../i18n/translations');
  const { CURRENCY_CONFIGS } = await import('../../../i18n/currencies');
  const { formatWithConfig } = await import('../../../utils/formatPrice');
  const en = (TRANSLATIONS.en ?? {}) as Record<string, string>;
  return {
    ...actual,
    useGeekShop: () => ({
      locale: 'en' as const,
      currency: 'UZS' as const,
      platform: 'desktop' as const,
      t: (key, params) => {
        const tmpl = en[key];
        if (tmpl === undefined) return key;
        if (!params) return tmpl;
        return tmpl.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
      },
      formatPrice: (amount, options) => {
        const config = CURRENCY_CONFIGS[options?.currency ?? 'UZS'] ?? CURRENCY_CONFIGS.UZS;
        return formatWithConfig(amount, config, 'en', { showCurrency: options?.showCurrency });
      },
    }),
  };
});

const defaultProps = {
  image: 'https://example.com/gpu.jpg',
  title: 'NVIDIA GeForce RTX 4090',
  price: 24990000,
};

describe('ProductListItem', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with title and price', () => {
    render(<ProductListItem {...defaultProps} />);
    expect(screen.getByText('NVIDIA GeForce RTX 4090')).toBeInTheDocument();
    expect(screen.getByText(/24.*990.*000.*sum/)).toBeInTheDocument();
  });

  it('renders image with alt text', () => {
    render(<ProductListItem {...defaultProps} />);
    const img = screen.getByAltText('NVIDIA GeForce RTX 4090');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/gpu.jpg');
  });

  it('renders original price and discount when provided', () => {
    render(<ProductListItem {...defaultProps} originalPrice={29990000} discount={17} />);
    expect(screen.getByText(/29.*990.*000.*sum/)).toBeInTheDocument();
    expect(screen.getByText('-17%')).toBeInTheDocument();
  });

  it('does not render original price when not provided', () => {
    render(<ProductListItem {...defaultProps} />);
    const priceElements = screen.getAllByText(/sum/);
    // Only one price element (no strikethrough)
    expect(priceElements).toHaveLength(1);
  });

  it('renders rating stars', () => {
    render(<ProductListItem {...defaultProps} rating={4} reviewCount={100} />);
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument();
  });

  it('does not render rating when not provided', () => {
    render(<ProductListItem {...defaultProps} />);
    expect(screen.queryByText(/reviews/)).toBeNull();
  });

  it('shows "In stock" by default', () => {
    render(<ProductListItem {...defaultProps} />);
    expect(screen.getByText('In stock')).toBeInTheDocument();
  });

  it('shows "Out of stock" when inStock is false', () => {
    render(<ProductListItem {...defaultProps} inStock={false} />);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('shows free shipping text', () => {
    render(<ProductListItem {...defaultProps} freeShipping={true} />);
    expect(screen.getByText('Free shipping')).toBeInTheDocument();
  });

  it('does not show free shipping when not provided', () => {
    render(<ProductListItem {...defaultProps} />);
    expect(screen.queryByText('Free shipping')).toBeNull();
  });

  it('renders Add to Cart button when onAddToCart is provided', () => {
    render(<ProductListItem {...defaultProps} onAddToCart={vi.fn()} />);
    expect(screen.getByLabelText('Add to cart')).toBeInTheDocument();
  });

  it('renders Wishlist button when onWishlist is provided', () => {
    render(<ProductListItem {...defaultProps} onWishlist={vi.fn()} />);
    expect(screen.getByLabelText('Add to wishlist')).toBeInTheDocument();
  });

  it('calls onAddToCart when button is clicked', async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    render(<ProductListItem {...defaultProps} onAddToCart={onAddToCart} />);

    await user.click(screen.getByLabelText('Add to cart'));
    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it('calls onWishlist when button is clicked', async () => {
    const user = userEvent.setup();
    const onWishlist = vi.fn();
    render(<ProductListItem {...defaultProps} onWishlist={onWishlist} />);

    await user.click(screen.getByLabelText('Add to wishlist'));
    expect(onWishlist).toHaveBeenCalledOnce();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<ProductListItem {...defaultProps} onClick={onClick} />);

    await user.click(screen.getByText('NVIDIA GeForce RTX 4090'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onAddToCart = vi.fn();
    render(<ProductListItem {...defaultProps} onClick={onClick} onAddToCart={onAddToCart} />);

    await user.click(screen.getByLabelText('Add to cart'));
    expect(onAddToCart).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('disables Add to Cart when out of stock', () => {
    render(<ProductListItem {...defaultProps} inStock={false} onAddToCart={vi.fn()} />);
    const button = screen.getByLabelText('Add to cart');
    expect(button).toBeDisabled();
  });

  it('has role="button" on root', () => {
    const { container } = render(<ProductListItem {...defaultProps} />);
    const wrapper = container.firstElementChild as HTMLElement;
    const card = wrapper.firstElementChild as HTMLElement;
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('handles keyboard activation (Enter)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<ProductListItem {...defaultProps} onClick={onClick} />);

    const wrapper = container.firstElementChild as HTMLElement;
    const card = wrapper.firstElementChild as HTMLElement;
    card.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('handles keyboard activation (Space)', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(<ProductListItem {...defaultProps} onClick={onClick} />);

    const wrapper = container.firstElementChild as HTMLElement;
    const card = wrapper.firstElementChild as HTMLElement;
    card.focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ProductListItem ref={ref} {...defaultProps} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(<ProductListItem {...defaultProps} data-testid="list-item" />);
    const wrapper = container.firstElementChild as HTMLElement;
    const card = wrapper.firstElementChild as HTMLElement;
    expect(card.getAttribute('data-testid')).toBe('list-item');
  });

  it('merges custom className', () => {
    const { container } = render(<ProductListItem {...defaultProps} className="custom-item" />);
    const wrapper = container.firstElementChild as HTMLElement;
    const card = wrapper.firstElementChild as HTMLElement;
    expect(card.className).toContain('custom-item');
  });
});
