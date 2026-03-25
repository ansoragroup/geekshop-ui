import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DatePicker } from './DatePicker';

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

describe('DatePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger button', () => {
    render(<DatePicker />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<DatePicker label="Date of Birth" />);
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('displays formatted date when value is provided', () => {
    render(<DatePicker value={new Date(2026, 2, 16)} format="dd.MM.yyyy" />);
    expect(screen.getByText('16.03.2026')).toBeInTheDocument();
  });

  it('opens bottom sheet with calendar on click', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('shows day headers', async () => {
    const user = userEvent.setup();
    render(<DatePicker locale="uz" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Du')).toBeInTheDocument();
    expect(screen.getByText('Ya')).toBeInTheDocument();
  });

  it('shows month and year in header', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 2, 16)} locale="uz" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Mart 2026')).toBeInTheDocument();
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 2, 16)} locale="uz" />);

    await user.click(screen.getByRole('button'));
    const prevBtn = screen.getByLabelText('Previous month');
    await user.click(prevBtn);
    expect(screen.getByText('Fevral 2026')).toBeInTheDocument();
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 2, 16)} locale="uz" />);

    await user.click(screen.getByRole('button'));
    const nextBtn = screen.getByLabelText('Next month');
    await user.click(nextBtn);
    expect(screen.getByText('Aprel 2026')).toBeInTheDocument();
  });

  it('calls onChange when a day is selected and confirmed', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DatePicker onChange={onChange} value={new Date(2026, 2, 16)} />);

    await user.click(screen.getByRole('button'));

    // Click day 20
    const day20 = screen.getByLabelText(/20.*2026/);
    await user.click(day20);

    // Confirm
    const confirmBtn = screen.getByText('Select');
    await user.click(confirmBtn);

    expect(onChange).toHaveBeenCalledTimes(1);
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getDate()).toBe(20);
    expect(calledDate.getMonth()).toBe(2);
    expect(calledDate.getFullYear()).toBe(2026);
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<DatePicker error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('disables dates before min', async () => {
    const user = userEvent.setup();
    render(<DatePicker min={new Date(2026, 2, 15)} value={new Date(2026, 2, 16)} />);

    await user.click(screen.getByRole('button'));
    // Day 10 should be disabled
    const day10 = screen.getByLabelText(/10.*2026/);
    expect(day10).toBeDisabled();
  });

  it('disables dates after max', async () => {
    const user = userEvent.setup();
    render(<DatePicker max={new Date(2026, 2, 20)} value={new Date(2026, 2, 16)} />);

    await user.click(screen.getByRole('button'));
    // Day 25 should be disabled
    const day25 = screen.getByLabelText(/25.*2026/);
    expect(day25).toBeDisabled();
  });

  it('highlights today', async () => {
    const user = userEvent.setup();
    const today = new Date();
    render(<DatePicker value={today} />);

    await user.click(screen.getByRole('button'));
    const todayCell = screen.getByLabelText(
      new RegExp(`${today.getDate()}.*${today.getFullYear()}`)
    );
    expect(todayCell).toHaveAttribute('aria-current', 'date');
  });

  it('sets aria-haspopup on trigger', () => {
    render(<DatePicker />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('sets aria-expanded based on open state', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes sheet when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close');
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes sheet when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const overlay = screen.getByRole('presentation');
    await user.click(overlay);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays in Russian locale', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 2, 16)} locale="ru" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText(/\u041C\u0430\u0440\u0442 2026/)).toBeInTheDocument();
    expect(screen.getByText('\u041F\u043D')).toBeInTheDocument();
  });

  it('displays in English locale', async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2026, 2, 16)} locale="en" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('March 2026')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
  });

  it('supports custom format', () => {
    render(<DatePicker value={new Date(2026, 2, 16)} format="yyyy-MM-dd" />);
    expect(screen.getByText('2026-03-16')).toBeInTheDocument();
  });

  it('accepts string value', () => {
    render(<DatePicker value="2026-03-16" format="dd.MM.yyyy" />);
    expect(screen.getByText('16.03.2026')).toBeInTheDocument();
  });

  it('confirm button is disabled when no date selected', async () => {
    const user = userEvent.setup();
    render(<DatePicker />);

    await user.click(screen.getByRole('button'));
    const confirmBtn = screen.getByText('Select');
    expect(confirmBtn).toBeDisabled();
  });
});
