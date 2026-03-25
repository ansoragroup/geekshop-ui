import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ActionBar } from './ActionBar';

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

describe('ActionBar', () => {
  afterEach(cleanup);

  it('renders all five buttons', () => {
    render(<ActionBar />);
    expect(screen.getByLabelText('Contact')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Add to cart')).toBeInTheDocument();
    expect(screen.getByText('Buy now')).toBeInTheDocument();
  });

  it('renders favorite button with "add" label when not favorite', () => {
    render(<ActionBar isFavorite={false} />);
    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
  });

  it('renders favorite button with "remove" label when favorite', () => {
    render(<ActionBar isFavorite />);
    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });

  it('does not show badge when cartCount is 0', () => {
    render(<ActionBar cartCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows badge with cart count when > 0', () => {
    render(<ActionBar cartCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ when cartCount exceeds 99', () => {
    render(<ActionBar cartCount={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('shows exact count at 99', () => {
    render(<ActionBar cartCount={99} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('calls onChat when chat button clicked', async () => {
    const onChat = vi.fn();
    const user = userEvent.setup();
    render(<ActionBar onChat={onChat} />);
    await user.click(screen.getByLabelText('Contact'));
    expect(onChat).toHaveBeenCalledOnce();
  });

  it('calls onCart when cart button clicked', async () => {
    const onCart = vi.fn();
    const user = userEvent.setup();
    render(<ActionBar onCart={onCart} />);
    await user.click(screen.getByLabelText('Cart'));
    expect(onCart).toHaveBeenCalledOnce();
  });

  it('calls onFavorite when favorite button clicked', async () => {
    const onFavorite = vi.fn();
    const user = userEvent.setup();
    render(<ActionBar onFavorite={onFavorite} />);
    await user.click(screen.getByLabelText('Add to favorites'));
    expect(onFavorite).toHaveBeenCalledOnce();
  });

  it('calls onAddToCart when "Add to cart" button clicked', async () => {
    const onAddToCart = vi.fn();
    const user = userEvent.setup();
    render(<ActionBar onAddToCart={onAddToCart} />);
    await user.click(screen.getByText('Add to cart'));
    expect(onAddToCart).toHaveBeenCalledOnce();
  });

  it('calls onBuyNow when "Buy now" button clicked', async () => {
    const onBuyNow = vi.fn();
    const user = userEvent.setup();
    render(<ActionBar onBuyNow={onBuyNow} />);
    await user.click(screen.getByText('Buy now'));
    expect(onBuyNow).toHaveBeenCalledOnce();
  });

  it('fills heart SVG red when isFavorite is true', () => {
    const { container } = render(<ActionBar isFavorite />);
    const heartPath = container.querySelector(
      'button[aria-label="Remove from favorites"] svg path'
    );
    expect(heartPath).toHaveAttribute('fill', 'var(--gs-color-price, #FF0000)');
  });

  it('does not fill heart when isFavorite is false', () => {
    const { container } = render(<ActionBar isFavorite={false} />);
    const heartPath = container.querySelector('button[aria-label="Add to favorites"] svg path');
    expect(heartPath).toHaveAttribute('fill', 'none');
  });

  it('renders icon labels for Contact, Cart, Favorite', () => {
    render(<ActionBar />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });
});
