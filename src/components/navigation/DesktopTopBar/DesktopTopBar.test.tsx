import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopTopBar } from './DesktopTopBar';

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

describe('DesktopTopBar', () => {
  it('renders as a nav element with correct aria-label', () => {
    render(<DesktopTopBar />);
    expect(screen.getByRole('navigation', { name: 'Utility navigation' })).toBeInTheDocument();
  });

  it('renders left items', () => {
    render(
      <DesktopTopBar
        leftItems={[
          <span key="1">Welcome!</span>,
          <a key="2" href="/help">
            Help
          </a>,
        ]}
      />
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('renders right items', () => {
    render(
      <DesktopTopBar rightItems={[<button key="1">EN</button>, <button key="2">$ USD</button>]} />
    );
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('$ USD')).toBeInTheDocument();
  });

  it('renders both left and right items', () => {
    render(
      <DesktopTopBar
        leftItems={[<span key="l">Left</span>]}
        rightItems={[<span key="r">Right</span>]}
      />
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DesktopTopBar className="custom" />);
    expect(container.querySelector('nav')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<DesktopTopBar data-testid="topbar" />);
    expect(screen.getByTestId('topbar')).toBeInTheDocument();
  });

  it('renders nothing in left/right when arrays are empty', () => {
    const { container } = render(<DesktopTopBar leftItems={[]} rightItems={[]} />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    // Content div should exist but no left/right children
    expect(nav?.querySelectorAll('[class*="left"]')).toHaveLength(0);
    expect(nav?.querySelectorAll('[class*="right"]')).toHaveLength(0);
  });
});
