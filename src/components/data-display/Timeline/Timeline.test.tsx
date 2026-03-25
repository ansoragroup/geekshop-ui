import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Timeline } from './Timeline';
import type { TimelineItem } from './Timeline';

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

const defaultItems: TimelineItem[] = [
  { time: '15:30', title: 'Buyurtma yetkazildi', description: 'Toshkent', status: 'completed' },
  { time: '09:15', title: "Kuryer yo'lda", status: 'active' },
  { time: 'Mar 14', title: 'Omborda', status: 'pending' },
];

describe('Timeline', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all item titles', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('Buyurtma yetkazildi')).toBeInTheDocument();
    expect(screen.getByText("Kuryer yo'lda")).toBeInTheDocument();
    expect(screen.getByText('Omborda')).toBeInTheDocument();
  });

  it('has role="list" on root', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders listitems for each item', () => {
    render(<Timeline items={defaultItems} />);
    const listitems = screen.getAllByRole('listitem');
    expect(listitems).toHaveLength(3);
  });

  it('renders time when provided', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('15:30')).toBeInTheDocument();
    expect(screen.getByText('09:15')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByText('Toshkent')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<Timeline items={[{ title: 'Test', status: 'completed' }]} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0].querySelectorAll('[class*="description"]')).toHaveLength(0);
  });

  it('applies status classes correctly', () => {
    const { container } = render(<Timeline items={defaultItems} />);
    const itemElements = container.querySelectorAll('[class*="item"]');
    expect(itemElements[0].className).toContain('status-completed');
    expect(itemElements[1].className).toContain('status-active');
    expect(itemElements[2].className).toContain('status-pending');
  });

  it('defaults status to pending when not specified', () => {
    const { container } = render(<Timeline items={[{ title: 'No status' }]} />);
    const item = container.querySelector('[class*="item"]');
    expect(item?.className).toContain('status-pending');
  });

  it('renders items in reverse order when reverse is true', () => {
    render(<Timeline items={defaultItems} reverse />);
    const listitems = screen.getAllByRole('listitem');
    expect(listitems[0]).toHaveTextContent('Omborda');
    expect(listitems[2]).toHaveTextContent('Buyurtma yetkazildi');
  });

  it('renders custom icons when provided', () => {
    render(
      <Timeline
        items={[
          {
            title: 'With icon',
            status: 'completed',
            icon: <span data-testid="custom-icon">X</span>,
          },
        ]}
      />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('does not render connector line on last item', () => {
    const { container } = render(<Timeline items={defaultItems} />);
    const rails = container.querySelectorAll('[class*="rail"]');
    const lastRail = rails[rails.length - 1];
    expect(lastRail.querySelector('[class*="line"]')).toBeNull();
  });

  it('renders connector lines between items', () => {
    const { container } = render(<Timeline items={defaultItems} />);
    const lines = container.querySelectorAll('[class*="line"]');
    expect(lines).toHaveLength(2); // 3 items, 2 lines
  });

  it('applies custom className', () => {
    const { container } = render(<Timeline items={defaultItems} className="my-timeline" />);
    expect(container.firstElementChild?.className).toContain('my-timeline');
  });

  it('has aria-label on root', () => {
    render(<Timeline items={defaultItems} />);
    expect(screen.getByLabelText('Timeline')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Timeline ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
