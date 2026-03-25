import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Rating } from './Rating';

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

describe('Rating', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders star elements', () => {
    const { container } = render(<Rating value={3} />);
    const svgs = container.querySelectorAll('svg');
    // 5 stars by default
    expect(svgs.length).toBe(5);
  });

  it('renders the correct number of stars based on max', () => {
    const { container } = render(<Rating value={2} max={10} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(10);
  });

  it('displays the numeric value text', () => {
    render(<Rating value={4.6} />);
    expect(screen.getByText('4.6')).toBeInTheDocument();
  });

  it('displays count text when count is provided', () => {
    render(<Rating value={4.2} count={87} />);
    expect(screen.getByText(/87/)).toBeInTheDocument();
  });

  it('does not display count text when showCount is false', () => {
    const { container } = render(<Rating value={4.2} count={87} showCount={false} />);
    expect(container.querySelector('[class*="countNumber"]')).not.toBeInTheDocument();
  });

  it('renders full stars for integer values', () => {
    const { container } = render(<Rating value={3} />);
    // Full stars use fill="var(--gs-color-star-filled, #FFC107)" and have no clipPath element
    // Empty stars use fill="var(--gs-color-star-empty, #E0E0E0)"
    const svgs = container.querySelectorAll('svg');
    let fullCount = 0;
    svgs.forEach((svg) => {
      const fill = svg.getAttribute('fill');
      if (fill && fill.includes('#FFC107') && !svg.querySelector('clipPath')) {
        fullCount++;
      }
    });
    expect(fullCount).toBe(3);
  });

  it('renders half star for .5 values', () => {
    const { container } = render(<Rating value={3.5} />);
    // A half star has a <clipPath> element
    const clipPaths = container.querySelectorAll('clipPath');
    expect(clipPaths.length).toBe(1);
  });

  it('generates unique SVG clip IDs across instances', () => {
    const { container } = render(
      <div>
        <Rating value={2.5} />
        <Rating value={3.5} />
      </div>
    );

    const clipPaths = container.querySelectorAll('clipPath');
    const ids = Array.from(clipPaths).map((cp) => cp.getAttribute('id'));

    // All IDs should be unique
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('renders empty stars for value 0', () => {
    const { container } = render(<Rating value={0} />);
    // All 5 stars should be empty (fill includes #E0E0E0 on the svg)
    const svgs = container.querySelectorAll('svg');
    let emptyCount = 0;
    svgs.forEach((svg) => {
      const fill = svg.getAttribute('fill');
      if (fill && fill.includes('#E0E0E0')) {
        emptyCount++;
      }
    });
    expect(emptyCount).toBe(5);
  });

  it('renders all full stars for max value', () => {
    const { container } = render(<Rating value={5} />);
    const svgs = container.querySelectorAll('svg');
    let fullCount = 0;
    svgs.forEach((svg) => {
      const fill = svg.getAttribute('fill');
      if (fill && fill.includes('#FFC107')) {
        fullCount++;
      }
    });
    expect(fullCount).toBe(5);
  });

  it('applies custom className', () => {
    const { container } = render(<Rating value={3} className="my-rating" />);
    expect(container.firstElementChild?.className).toContain('my-rating');
  });
});
