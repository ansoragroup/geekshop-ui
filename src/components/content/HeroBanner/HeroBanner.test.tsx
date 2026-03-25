import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { HeroBanner } from './HeroBanner';

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

describe('HeroBanner', () => {
  afterEach(cleanup);

  it('renders the title', () => {
    render(<HeroBanner title="Mega Sale" />);
    expect(screen.getByText('Mega Sale')).toBeInTheDocument();
  });

  it('renders the title as an h2', () => {
    render(<HeroBanner title="Mega Sale" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Mega Sale');
  });

  it('renders subtitle when provided', () => {
    render(<HeroBanner title="Sale" subtitle="50% off everything" />);
    expect(screen.getByText('50% off everything')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />);
    expect(container.querySelector('p')).not.toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<HeroBanner title="Sale" badge="HOT" />);
    expect(screen.getByText('HOT')).toBeInTheDocument();
  });

  it('does not render badge when not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />);
    expect(container.querySelector('[class*="badge"]')).not.toBeInTheDocument();
  });

  it('applies default gradient background', () => {
    const { container } = render(<HeroBanner title="Sale" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--gs-hero-bg')).toBe(
      'linear-gradient(135deg, var(--gs-color-primary, #FF5000) 0%, var(--gs-color-primary-light, #FF7A33) 100%)'
    );
  });

  it('applies custom gradient background', () => {
    const gradient = 'linear-gradient(90deg, #000 0%, #FFF 100%)';
    const { container } = render(<HeroBanner title="Sale" bgGradient={gradient} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--gs-hero-bg')).toBe(gradient);
  });

  it('renders background image when provided', () => {
    const { container } = render(<HeroBanner title="Sale" image="/banner.jpg" />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/banner.jpg');
    expect(img).toHaveAttribute('aria-hidden', 'true');
    expect(img).toHaveAttribute('alt', '');
  });

  it('does not render img when image is not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('has role="button" when onClick is provided', () => {
    render(<HeroBanner title="Sale" onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not have role="button" when onClick is not provided', () => {
    render(<HeroBanner title="Sale" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has tabIndex=0 when onClick is provided', () => {
    render(<HeroBanner title="Sale" onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<HeroBanner title="Sale" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<HeroBanner title="Sale" onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick on Space key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<HeroBanner title="Sale" onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalled();
  });
});
