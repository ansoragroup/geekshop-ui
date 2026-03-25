import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeSwitcher } from './ThemeSwitcher';
import { THEME_PRESET_NAMES } from '../../../theme/presets';

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

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    // Reset any inline styles on root
    document.documentElement.style.cssText = '';
    delete document.documentElement.dataset.gsPreset;
  });

  it('renders a radiogroup with correct aria-label', () => {
    render(<ThemeSwitcher defaultValue="default" />);
    const group = screen.getByRole('radiogroup');
    expect(group).toBeInTheDocument();
    expect(group).toHaveAttribute('aria-label', 'Theme preset');
  });

  it('renders all 7 theme options', () => {
    render(<ThemeSwitcher defaultValue="default" />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(7);
  });

  it('renders with correct aria-labels', () => {
    render(<ThemeSwitcher defaultValue="default" />);
    expect(screen.getByRole('radio', { name: /GeekShop Orange/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Teal Tech/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Classic Red/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Warm Gold/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Fresh Green/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Monochrome/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Dark Mode/i })).toBeInTheDocument();
  });

  it('marks the default value as checked', () => {
    render(<ThemeSwitcher defaultValue="teal" />);
    const tealRadio = screen.getByRole('radio', { name: /Teal Tech/i });
    expect(tealRadio).toHaveAttribute('aria-checked', 'true');

    const defaultRadio = screen.getByRole('radio', { name: /GeekShop Orange/i });
    expect(defaultRadio).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when a theme is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="default" onChange={onChange} applyOnChange={false} />);
    await user.click(screen.getByRole('radio', { name: /Classic Red/i }));

    expect(onChange).toHaveBeenCalledWith('red');
  });

  it('supports controlled mode', () => {
    render(<ThemeSwitcher value="green" />);
    const greenRadio = screen.getByRole('radio', { name: /Fresh Green/i });
    expect(greenRadio).toHaveAttribute('aria-checked', 'true');
  });

  it('applies theme to document when applyOnChange is true (default)', async () => {
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="default" />);
    await user.click(screen.getByRole('radio', { name: /Teal Tech/i }));

    expect(document.documentElement.style.getPropertyValue('--gs-color-primary')).toBe('#00CBCC');
    expect(document.documentElement.dataset.gsPreset).toBe('teal');
  });

  it('does NOT apply theme to document when applyOnChange is false', async () => {
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="default" applyOnChange={false} />);
    await user.click(screen.getByRole('radio', { name: /Teal Tech/i }));

    expect(document.documentElement.style.getPropertyValue('--gs-color-primary')).toBe('');
    expect(document.documentElement.dataset.gsPreset).toBeUndefined();
  });

  it('navigates with arrow keys', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="default" onChange={onChange} applyOnChange={false} />);

    const group = screen.getByRole('radiogroup');
    group.focus();

    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('teal');

    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('red');
  });

  it('wraps around with arrow keys', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="dark" onChange={onChange} applyOnChange={false} />);

    const group = screen.getByRole('radiogroup');
    group.focus();

    // ArrowRight from last item wraps to first
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('default');
  });

  it('navigates backward with ArrowLeft', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ThemeSwitcher defaultValue="default" onChange={onChange} applyOnChange={false} />);

    const group = screen.getByRole('radiogroup');
    group.focus();

    // ArrowLeft from first item wraps to last
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('applies sm size class', () => {
    const { container } = render(<ThemeSwitcher defaultValue="default" size="sm" />);
    expect(container.firstElementChild?.className).toMatch(/sm/);
  });

  it('applies md size class by default', () => {
    const { container } = render(<ThemeSwitcher defaultValue="default" />);
    expect(container.firstElementChild?.className).toMatch(/md/);
  });

  it('spreads rest props onto root element', () => {
    render(<ThemeSwitcher defaultValue="default" data-testid="theme-switch" />);
    expect(screen.getByTestId('theme-switch')).toBeInTheDocument();
  });

  it('renders correct number of presets matching THEME_PRESET_NAMES', () => {
    render(<ThemeSwitcher defaultValue="default" />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(THEME_PRESET_NAMES.length);
  });

  it('shows checkmark only on active swatch', () => {
    const { container } = render(<ThemeSwitcher defaultValue="red" />);
    // Only the active swatch should contain an SVG (checkmark)
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(1);
    // The SVG should be inside the red swatch
    const redRadio = screen.getByRole('radio', { name: /Classic Red/i });
    expect(redRadio.querySelector('svg')).toBeInTheDocument();
  });
});
