import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CurrencySwitcher } from './CurrencySwitcher';

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

describe('CurrencySwitcher', () => {
  // === Inline variant ===
  describe('inline variant', () => {
    it('renders a radiogroup', () => {
      render(<CurrencySwitcher variant="inline" defaultValue="UZS" />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders all four currency options', () => {
      render(<CurrencySwitcher variant="inline" defaultValue="UZS" />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(4);
    });

    it('renders currency codes (UZS, USD, RUB, EUR)', () => {
      render(<CurrencySwitcher variant="inline" defaultValue="UZS" />);
      expect(screen.getByText('UZS')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('RUB')).toBeInTheDocument();
      expect(screen.getByText('EUR')).toBeInTheDocument();
    });

    it('marks the default value as checked', () => {
      render(<CurrencySwitcher variant="inline" defaultValue="USD" />);
      const usdRadio = screen.getByRole('radio', { name: /USD/i });
      expect(usdRadio).toHaveAttribute('aria-checked', 'true');

      const uzsRadio = screen.getByRole('radio', { name: /UZS/i });
      expect(uzsRadio).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onChange when a currency is clicked', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<CurrencySwitcher variant="inline" defaultValue="UZS" onChange={onChange} />);
      await user.click(screen.getByText('EUR'));

      expect(onChange).toHaveBeenCalledWith('EUR');
    });

    it('supports controlled mode', () => {
      render(<CurrencySwitcher variant="inline" value="RUB" />);
      const rubRadio = screen.getByRole('radio', { name: /RUB/i });
      expect(rubRadio).toHaveAttribute('aria-checked', 'true');
    });

    it('navigates with arrow keys', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<CurrencySwitcher variant="inline" defaultValue="UZS" onChange={onChange} />);

      const uzsRadio = screen.getByRole('radio', { name: /UZS/i });
      uzsRadio.focus();

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('USD');

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('RUB');

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('EUR');

      // Wraps around
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('UZS');
    });

    it('has aria-label on the radiogroup', () => {
      render(<CurrencySwitcher variant="inline" defaultValue="UZS" />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Currency');
    });

    it('applies sm size class', () => {
      const { container } = render(
        <CurrencySwitcher variant="inline" defaultValue="UZS" size="sm" />
      );
      expect(container.firstElementChild?.className).toMatch(/sm/);
    });
  });

  // === Dropdown variant ===
  describe('dropdown variant', () => {
    it('renders a trigger button', () => {
      render(<CurrencySwitcher variant="dropdown" defaultValue="UZS" />);
      const trigger = screen.getByRole('button', { name: /Currency: UZS/i });
      expect(trigger).toBeInTheDocument();
    });

    it('shows selected currency label in trigger', () => {
      render(<CurrencySwitcher variant="dropdown" defaultValue="USD" />);
      expect(screen.getByText('USD ($)')).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<CurrencySwitcher variant="dropdown" defaultValue="UZS" />);

      await user.click(screen.getByRole('button', { name: /Currency/i }));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('selects an option from dropdown', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<CurrencySwitcher variant="dropdown" defaultValue="UZS" onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /Currency/i }));
      await user.click(screen.getByRole('radio', { name: /EUR/i }));

      expect(onChange).toHaveBeenCalledWith('EUR');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup();

      render(<CurrencySwitcher variant="dropdown" defaultValue="UZS" />);

      await user.click(screen.getByRole('button', { name: /Currency/i }));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();

      await user.click(screen.getByRole('radio', { name: /EUR/i }));
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('has aria-haspopup and aria-expanded on trigger', async () => {
      const user = userEvent.setup();
      render(<CurrencySwitcher variant="dropdown" defaultValue="UZS" />);

      const trigger = screen.getByRole('button', { name: /Currency/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  // === General ===
  it('spreads rest props onto root element', () => {
    render(<CurrencySwitcher variant="inline" defaultValue="UZS" data-testid="currency-switch" />);
    expect(screen.getByTestId('currency-switch')).toBeInTheDocument();
  });
});
