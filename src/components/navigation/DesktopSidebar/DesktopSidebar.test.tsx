import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopSidebar } from './DesktopSidebar';

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

describe('DesktopSidebar', () => {
  const sampleCategories = [
    { label: 'All Products', active: true },
    { label: 'GPUs', count: 42 },
    { label: 'Processors', count: 38 },
  ];

  const sampleBrands = [
    { label: 'ASUS', value: 'asus', checked: true },
    { label: 'MSI', value: 'msi', checked: false },
  ];

  // Rendering
  it('renders with navigation role', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    expect(screen.getByRole('navigation', { name: 'Filters' })).toBeInTheDocument();
  });

  it('renders empty state when no sections', () => {
    render(<DesktopSidebar />);
    expect(screen.getByText('No filters available')).toBeInTheDocument();
  });

  // Categories
  it('renders category section', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('GPUs')).toBeInTheDocument();
  });

  it('shows category count', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    expect(screen.getByText('(42)')).toBeInTheDocument();
    expect(screen.getByText('(38)')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    const activeBtn = screen.getByText('All Products').closest('button');
    expect(activeBtn).toHaveAttribute('aria-current', 'page');
  });

  it('calls onCategorySelect when category is clicked', async () => {
    const onCategorySelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSidebar categories={sampleCategories} onCategorySelect={onCategorySelect} />);

    await user.click(screen.getByText('GPUs'));
    expect(onCategorySelect).toHaveBeenCalledWith(sampleCategories[1]);
  });

  // Price range
  it('renders price range section', () => {
    render(<DesktopSidebar priceRange={{ min: 0, max: 50000000 }} />);
    expect(screen.getByText('Price Range')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum price')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum price')).toBeInTheDocument();
  });

  it('calls onPriceChange when min price changes', async () => {
    const onPriceChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopSidebar
        priceRange={{ min: 0, max: 50000000 }}
        selectedPriceRange={{ min: 0, max: 50000000 }}
        onPriceChange={onPriceChange}
      />
    );

    const minInput = screen.getByLabelText('Minimum price');
    await user.clear(minInput);
    await user.type(minInput, '1000000');
    expect(onPriceChange).toHaveBeenCalled();
  });

  it('calls onPriceChange when max price changes', async () => {
    const onPriceChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopSidebar
        priceRange={{ min: 0, max: 50000000 }}
        selectedPriceRange={{ min: 0, max: 50000000 }}
        onPriceChange={onPriceChange}
      />
    );

    const maxInput = screen.getByLabelText('Maximum price');
    await user.clear(maxInput);
    await user.type(maxInput, '10000000');
    expect(onPriceChange).toHaveBeenCalled();
  });

  // Brands
  it('renders brand section', () => {
    render(<DesktopSidebar brands={sampleBrands} />);
    expect(screen.getByText('Brands')).toBeInTheDocument();
    expect(screen.getByText('ASUS')).toBeInTheDocument();
    expect(screen.getByText('MSI')).toBeInTheDocument();
  });

  it('shows checked state for brands', () => {
    render(<DesktopSidebar brands={sampleBrands} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // ASUS
    expect(checkboxes[1]).not.toBeChecked(); // MSI
  });

  it('calls onBrandToggle when brand is toggled', async () => {
    const onBrandToggle = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSidebar brands={sampleBrands} onBrandToggle={onBrandToggle} />);

    await user.click(screen.getByText('MSI'));
    expect(onBrandToggle).toHaveBeenCalledWith('msi', true);
  });

  it('calls onBrandToggle with false when unchecking', async () => {
    const onBrandToggle = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSidebar brands={sampleBrands} onBrandToggle={onBrandToggle} />);

    await user.click(screen.getByText('ASUS'));
    expect(onBrandToggle).toHaveBeenCalledWith('asus', false);
  });

  // Rating
  it('renders rating section when onRatingChange is provided', () => {
    render(<DesktopSidebar onRatingChange={vi.fn()} />);
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('does not render rating section without onRatingChange', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    expect(screen.queryByText('Rating')).not.toBeInTheDocument();
  });

  it('renders rating options as radio group', () => {
    render(<DesktopSidebar onRatingChange={vi.fn()} />);
    expect(screen.getByRole('radiogroup', { name: 'Filter by rating' })).toBeInTheDocument();
  });

  it('highlights active rating', () => {
    render(<DesktopSidebar ratingFilter={4} onRatingChange={vi.fn()} />);
    const radio4 = screen.getByRole('radio', { name: '4 stars and up' });
    expect(radio4).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onRatingChange when rating is clicked', async () => {
    const onRatingChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSidebar onRatingChange={onRatingChange} />);

    await user.click(screen.getByRole('radio', { name: '3 stars and up' }));
    expect(onRatingChange).toHaveBeenCalledWith(3);
  });

  // Aria
  it('has aria-label on navigation', () => {
    render(<DesktopSidebar categories={sampleCategories} />);
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Filters');
  });

  // Props spreading
  it('spreads rest props onto root element', () => {
    render(<DesktopSidebar data-testid="desktop-sidebar" />);
    expect(screen.getByTestId('desktop-sidebar')).toBeInTheDocument();
  });
});
