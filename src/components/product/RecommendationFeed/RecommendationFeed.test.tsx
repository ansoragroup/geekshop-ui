import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RecommendationFeed, type RecommendationTab } from './RecommendationFeed';

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

const tabs: RecommendationTab[] = [
  { key: 'all', label: 'All' },
  { key: 'gpus', label: 'GPUs' },
  { key: 'cpus', label: 'CPUs' },
];

const ProductStub = ({ title }: { title: string }) => <div data-testid="product">{title}</div>;

describe('RecommendationFeed', () => {
  it('renders section title', () => {
    render(
      <RecommendationFeed tabs={tabs} title="Recommended">
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByText('Recommended')).toBeInTheDocument();
  });

  it('renders default title when not provided', () => {
    render(
      <RecommendationFeed tabs={tabs}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByText('Recommended For You')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <RecommendationFeed tabs={tabs} icon={<span data-testid="icon">I</span>}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders all tabs', () => {
    render(
      <RecommendationFeed tabs={tabs}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements).toHaveLength(3);
    expect(tabElements[0]).toHaveTextContent('All');
    expect(tabElements[1]).toHaveTextContent('GPUs');
  });

  it('first tab is active by default', () => {
    render(
      <RecommendationFeed tabs={tabs}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('supports controlled activeTab', () => {
    render(
      <RecommendationFeed tabs={tabs} activeTab="gpus">
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    const tabElements = screen.getAllByRole('tab');
    expect(tabElements[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onTabChange when tab clicked', () => {
    const onTabChange = vi.fn();
    render(
      <RecommendationFeed tabs={tabs} onTabChange={onTabChange}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    fireEvent.click(screen.getAllByRole('tab')[1]);
    expect(onTabChange).toHaveBeenCalledWith('gpus');
  });

  it('renders children in the grid', () => {
    render(
      <RecommendationFeed tabs={tabs}>
        <ProductStub title="P1" />
        <ProductStub title="P2" />
        <ProductStub title="P3" />
      </RecommendationFeed>
    );
    expect(screen.getAllByTestId('product')).toHaveLength(3);
  });

  it('renders Load More button when hasMore is true', () => {
    render(
      <RecommendationFeed tabs={tabs} hasMore>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByText('Load More Products')).toBeInTheDocument();
  });

  it('does not render Load More when hasMore is false', () => {
    render(
      <RecommendationFeed tabs={tabs} hasMore={false}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.queryByText('Load More Products')).not.toBeInTheDocument();
  });

  it('calls onLoadMore when Load More is clicked', () => {
    const onLoadMore = vi.fn();
    render(
      <RecommendationFeed tabs={tabs} hasMore onLoadMore={onLoadMore}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    fireEvent.click(screen.getByText('Load More Products'));
    expect(onLoadMore).toHaveBeenCalledOnce();
  });

  it('shows loading text when loading is true', () => {
    render(
      <RecommendationFeed tabs={tabs} hasMore loading>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RecommendationFeed tabs={tabs} className="custom">
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('spreads rest props', () => {
    render(
      <RecommendationFeed tabs={tabs} data-testid="feed">
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByTestId('feed')).toBeInTheDocument();
  });

  it('renders tablist with correct aria-label', () => {
    render(
      <RecommendationFeed tabs={tabs}>
        <ProductStub title="P1" />
      </RecommendationFeed>
    );
    expect(screen.getByRole('tablist', { name: 'Category filter' })).toBeInTheDocument();
  });
});
