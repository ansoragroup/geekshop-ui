import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CategoryIcon } from './CategoryIcon';

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

const TestIcon = () => <svg data-testid="test-icon" />;

describe('CategoryIcon', () => {
  afterEach(cleanup);

  it('renders the label text', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />);
    expect(screen.getByText('Telefon')).toBeInTheDocument();
  });

  it('renders the icon element', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('applies default color to the circle background', () => {
    const { container } = render(<CategoryIcon icon={<TestIcon />} label="Telefon" />);
    const circle = container.querySelector('[class*="circle"]');
    expect(circle).toHaveStyle({ background: 'var(--gs-color-primary, #FF5000)15' });
  });

  it('applies custom color to the circle', () => {
    const { container } = render(
      <CategoryIcon icon={<TestIcon />} label="Telefon" color="#00FF00" />
    );
    const circle = container.querySelector('[class*="circle"]');
    expect(circle).toHaveStyle({ background: '#00FF0015' });
  });

  it('applies color to the icon wrapper', () => {
    const { container } = render(
      <CategoryIcon icon={<TestIcon />} label="Telefon" color="#0000FF" />
    );
    const iconWrapper = container.querySelector('[class*="iconWrapper"]');
    expect(iconWrapper).toHaveStyle({ color: '#0000FF' });
  });

  it('has role="button" when onClick is provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not have role="button" when onClick is not provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has tabIndex=0 when onClick is provided', () => {
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('does not have tabIndex when onClick is not provided', () => {
    const { container } = render(<CategoryIcon icon={<TestIcon />} label="Telefon" />);
    expect(container.firstChild).not.toHaveAttribute('tabindex');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('calls onClick on Space key', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<CategoryIcon icon={<TestIcon />} label="Telefon" onClick={onClick} />);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalled();
  });
});
