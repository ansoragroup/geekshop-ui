import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CouponCard } from './CouponCard';

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

describe('CouponCard', () => {
  afterEach(cleanup);

  it('renders discount text', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />);
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('renders coupon code', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />);
    expect(screen.getByText('SALE10')).toBeInTheDocument();
  });

  it('renders code label', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />);
    expect(screen.getByText('Code:')).toBeInTheDocument();
  });

  it('renders expiry date', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />);
    expect(screen.getByText('Expires: 2025-12-31')).toBeInTheDocument();
  });

  it('renders "Use" button', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />);
    expect(screen.getByText('Use')).toBeInTheDocument();
  });

  it('calls onUse when "Use" button is clicked', async () => {
    const onUse = vi.fn();
    const user = userEvent.setup();
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" onUse={onUse} />);
    await user.click(screen.getByText('Use'));
    expect(onUse).toHaveBeenCalledOnce();
  });

  it('renders min amount when provided', () => {
    render(<CouponCard discount="-15%" code="MIN100" expiryDate="2025-06-30" minAmount={100000} />);
    expect(screen.getByText(/from 100/)).toBeInTheDocument();
  });

  it('does not render min amount when not provided', () => {
    render(<CouponCard discount="-15%" code="NO_MIN" expiryDate="2025-06-30" />);
    expect(screen.queryByText(/from \d/)).not.toBeInTheDocument();
  });

  it('applies custom background color to left part', () => {
    const { container } = render(
      <CouponCard discount="-20%" code="COLOR" expiryDate="2025-12-31" color="#00FF00" />
    );
    const leftPart = container.querySelector('[class*="leftPart"]') as HTMLElement;
    expect(leftPart.style.getPropertyValue('--gs-coupon-bg')).toBe('#00FF00');
  });

  it('applies default color to left part', () => {
    const { container } = render(
      <CouponCard discount="-20%" code="DEFAULT" expiryDate="2025-12-31" />
    );
    const leftPart = container.querySelector('[class*="leftPart"]') as HTMLElement;
    expect(leftPart.style.getPropertyValue('--gs-coupon-bg')).toBe(
      'var(--gs-color-primary, #FF5000)'
    );
  });

  it('renders large discount values', () => {
    render(<CouponCard discount="50 000" code="BIG" expiryDate="2025-12-31" />);
    expect(screen.getByText('50 000')).toBeInTheDocument();
  });
});
