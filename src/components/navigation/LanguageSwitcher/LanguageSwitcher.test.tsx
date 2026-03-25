import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { LanguageSwitcher } from './LanguageSwitcher';

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

describe('LanguageSwitcher', () => {
  // === Inline variant ===
  describe('inline variant', () => {
    it('renders a radiogroup', () => {
      render(<LanguageSwitcher variant="inline" defaultValue="uz" />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('renders all three language options', () => {
      render(<LanguageSwitcher variant="inline" defaultValue="uz" />);
      const radios = screen.getAllByRole('radio');
      expect(radios).toHaveLength(3);
    });

    it('renders short labels (UZ, RU, EN)', () => {
      render(<LanguageSwitcher variant="inline" defaultValue="uz" />);
      expect(screen.getByText('UZ')).toBeInTheDocument();
      expect(screen.getByText('RU')).toBeInTheDocument();
      expect(screen.getByText('EN')).toBeInTheDocument();
    });

    it('marks the default value as checked', () => {
      render(<LanguageSwitcher variant="inline" defaultValue="ru" />);
      const ruRadio = screen.getByRole('radio', { name: /Русский/i });
      expect(ruRadio).toHaveAttribute('aria-checked', 'true');

      const uzRadio = screen.getByRole('radio', { name: /O'zbek/i });
      expect(uzRadio).toHaveAttribute('aria-checked', 'false');
    });

    it('calls onChange when a language is clicked', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<LanguageSwitcher variant="inline" defaultValue="uz" onChange={onChange} />);
      await user.click(screen.getByText('RU'));

      expect(onChange).toHaveBeenCalledWith('ru');
    });

    it('supports controlled mode', () => {
      render(<LanguageSwitcher variant="inline" value="en" />);
      const enRadio = screen.getByRole('radio', { name: /English/i });
      expect(enRadio).toHaveAttribute('aria-checked', 'true');
    });

    it('navigates with arrow keys', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<LanguageSwitcher variant="inline" defaultValue="uz" onChange={onChange} />);

      const uzRadio = screen.getByRole('radio', { name: /O'zbek/i });
      uzRadio.focus();

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('ru');

      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('en');

      // Wraps around
      await user.keyboard('{ArrowRight}');
      expect(onChange).toHaveBeenCalledWith('uz');
    });

    it('has aria-label on the radiogroup', () => {
      render(<LanguageSwitcher variant="inline" defaultValue="uz" />);
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Language');
    });

    it('applies sm size class', () => {
      const { container } = render(
        <LanguageSwitcher variant="inline" defaultValue="uz" size="sm" />
      );
      expect(container.firstElementChild?.className).toMatch(/sm/);
    });
  });

  // === Dropdown variant ===
  describe('dropdown variant', () => {
    it('renders a trigger button', () => {
      render(<LanguageSwitcher variant="dropdown" defaultValue="uz" />);
      const trigger = screen.getByRole('button', { name: /Language: O'zbek/i });
      expect(trigger).toBeInTheDocument();
    });

    it('shows selected language name in trigger', () => {
      render(<LanguageSwitcher variant="dropdown" defaultValue="ru" />);
      expect(screen.getByText('Русский')).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
      const user = userEvent.setup();
      render(<LanguageSwitcher variant="dropdown" defaultValue="uz" />);

      await user.click(screen.getByRole('button', { name: /Language/i }));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('selects an option from dropdown', async () => {
      const onChange = vi.fn();
      const user = userEvent.setup();

      render(<LanguageSwitcher variant="dropdown" defaultValue="uz" onChange={onChange} />);

      await user.click(screen.getByRole('button', { name: /Language/i }));
      await user.click(screen.getByRole('radio', { name: /English/i }));

      expect(onChange).toHaveBeenCalledWith('en');
    });

    it('closes dropdown after selection', async () => {
      const user = userEvent.setup();

      render(<LanguageSwitcher variant="dropdown" defaultValue="uz" />);

      await user.click(screen.getByRole('button', { name: /Language/i }));
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();

      await user.click(screen.getByRole('radio', { name: /English/i }));
      expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    });

    it('has aria-haspopup and aria-expanded on trigger', async () => {
      const user = userEvent.setup();
      render(<LanguageSwitcher variant="dropdown" defaultValue="uz" />);

      const trigger = screen.getByRole('button', { name: /Language/i });
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  // === General ===
  it('spreads rest props onto root element', () => {
    render(<LanguageSwitcher variant="inline" defaultValue="uz" data-testid="lang-switch" />);
    expect(screen.getByTestId('lang-switch')).toBeInTheDocument();
  });
});
