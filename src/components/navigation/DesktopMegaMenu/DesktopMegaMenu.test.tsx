import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopMegaMenu } from './DesktopMegaMenu';
import type { MegaMenuCategory } from './DesktopMegaMenu';

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

const categories: MegaMenuCategory[] = [
  {
    label: 'Graphics Cards',
    subcategories: [{ label: 'RTX 5090' }, { label: 'RTX 4090' }],
  },
  {
    label: 'Processors',
    subcategories: [{ label: 'Ryzen 9' }, { label: 'Core i9' }],
  },
  {
    label: 'Monitors',
  },
];

describe('DesktopMegaMenu', () => {
  it('renders as a nav element with correct aria-label', () => {
    render(<DesktopMegaMenu categories={categories} />);
    expect(screen.getByRole('navigation', { name: 'Category navigation' })).toBeInTheDocument();
  });

  it('renders the All Categories trigger button', () => {
    render(<DesktopMegaMenu categories={categories} />);
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });

  it('shows dropdown on click', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.click(button);
    expect(screen.getByRole('menu', { name: 'Categories' })).toBeInTheDocument();
    // 'Graphics Cards' appears in both category list and subcategory title (active by default)
    expect(screen.getAllByText('Graphics Cards').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Processors')).toBeInTheDocument();
    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });

  it('shows subcategories for the active category', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.click(button);
    // First category is active by default
    expect(screen.getByText('RTX 5090')).toBeInTheDocument();
    expect(screen.getByText('RTX 4090')).toBeInTheDocument();
  });

  it('changes active category on hover', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.click(button);

    // Hover over Processors
    const processorsItem = screen.getByText('Processors').closest('li')!;
    fireEvent.mouseEnter(processorsItem);

    expect(screen.getByText('Ryzen 9')).toBeInTheDocument();
    expect(screen.getByText('Core i9')).toBeInTheDocument();
  });

  it('calls onCategoryClick when category is clicked', () => {
    const onCategoryClick = vi.fn();
    render(<DesktopMegaMenu categories={categories} onCategoryClick={onCategoryClick} />);

    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.click(button);

    // 'Graphics Cards' appears in both category list and subcategory title; click the category link
    fireEvent.click(screen.getAllByText('Graphics Cards')[0]);
    expect(onCategoryClick).toHaveBeenCalledWith(categories[0]);
  });

  it('trigger has correct aria attributes', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when dropdown is open', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens dropdown with Enter key', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('menu', { name: 'Categories' })).toBeInTheDocument();
  });

  it('closes dropdown with Escape key', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
    // Escape is handled via document-level keydown listener
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('navigates categories with ArrowDown/ArrowUp', () => {
    render(<DesktopMegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });

    // Default is index 0, press down to go to index 1
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    expect(screen.getByText('Ryzen 9')).toBeInTheDocument();

    // Press up to go back to index 0
    fireEvent.keyDown(button, { key: 'ArrowUp' });
    expect(screen.getByText('RTX 5090')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DesktopMegaMenu categories={categories} className="custom" />);
    expect(container.querySelector('nav')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<DesktopMegaMenu categories={categories} data-testid="mega-menu" />);
    expect(screen.getByTestId('mega-menu')).toBeInTheDocument();
  });

  it('accepts navItems prop without error', () => {
    render(
      <DesktopMegaMenu categories={categories} navItems={[{ label: 'Deals', href: '/deals' }]} />
    );
    // navItems prop is accepted but not rendered in current implementation
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
