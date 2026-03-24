import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopInstallmentCalculator } from './DesktopInstallmentCalculator';
import type { DesktopInstallmentOption } from './DesktopInstallmentCalculator';

const options: DesktopInstallmentOption[] = [
  { months: 3, rate: 0 },
  { months: 6, rate: 0 },
  { months: 12, rate: 5 },
  { months: 24, rate: 12 },
];

const price = 1200000;

describe('DesktopInstallmentCalculator', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('Installment plan')).toBeInTheDocument();
  });

  it('renders all month option buttons', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('3 mo')).toBeInTheDocument();
    expect(screen.getByText('6 mo')).toBeInTheDocument();
    expect(screen.getByText('12 mo')).toBeInTheDocument();
    expect(screen.getByText('24 mo')).toBeInTheDocument();
  });

  it('renders payment info section', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('Monthly payment')).toBeInTheDocument();
    expect(screen.getByText('Total amount')).toBeInTheDocument();
  });

  it('renders accepted payments section', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('Accepted:')).toBeInTheDocument();
  });

  it('renders default bank logos', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('UzCard')).toBeInTheDocument();
    expect(screen.getByText('Humo')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
  });

  it('renders custom payment logos', () => {
    render(
      <DesktopInstallmentCalculator
        price={price}
        options={options}
        paymentLogos={<span data-testid="custom-logos">PayMe</span>}
      />,
    );
    expect(screen.getByTestId('custom-logos')).toBeInTheDocument();
    expect(screen.queryByText('UzCard')).not.toBeInTheDocument();
  });

  // ─── 0% badge ───────────────────────────────────────────────────────

  it('shows 0% markup badge when selected plan has rate 0', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    // Default is first option (3 months, 0% rate)
    expect(screen.getByText('0% markup')).toBeInTheDocument();
  });

  it('hides 0% badge when selected plan has non-zero rate', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} defaultMonths={12} />);
    expect(screen.queryByText('0% markup')).not.toBeInTheDocument();
  });

  // ─── Markup row visibility ──────────────────────────────────────────

  it('does not show Markup row for 0% plans', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} defaultMonths={3} />);
    expect(screen.queryByText('Markup')).not.toBeInTheDocument();
  });

  it('shows Markup row with rate for non-0% plans', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} defaultMonths={12} />);
    expect(screen.getByText('Markup')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  // ─── Month selection ────────────────────────────────────────────────

  it('selects first option by default', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    const btn3mo = screen.getByText('3 mo').closest('button')!;
    expect(btn3mo).toHaveAttribute('aria-selected', 'true');
  });

  it('selects defaultMonths option', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} defaultMonths={6} />);
    const btn6mo = screen.getByText('6 mo').closest('button')!;
    expect(btn6mo).toHaveAttribute('aria-selected', 'true');
    const btn3mo = screen.getByText('3 mo').closest('button')!;
    expect(btn3mo).toHaveAttribute('aria-selected', 'false');
  });

  it('changes selection on click and calls onChange', () => {
    const handler = vi.fn();
    render(<DesktopInstallmentCalculator price={price} options={options} onChange={handler} />);
    fireEvent.click(screen.getByText('12 mo'));
    expect(handler).toHaveBeenCalledWith(options[2]);
    const btn12mo = screen.getByText('12 mo').closest('button')!;
    expect(btn12mo).toHaveAttribute('aria-selected', 'true');
  });

  // ─── Payment calculations ──────────────────────────────────────────

  it('calculates monthly payment for 0% plan correctly', () => {
    // 1,200,000 / 3 = 400,000 → formatted "400 000"
    render(<DesktopInstallmentCalculator price={price} options={[{ months: 3, rate: 0 }]} />);
    expect(screen.getByText('400 000')).toBeInTheDocument();
  });

  it('calculates total amount for 0% plan (equals price)', () => {
    render(<DesktopInstallmentCalculator price={price} options={[{ months: 3, rate: 0 }]} />);
    expect(screen.getByText('1 200 000')).toBeInTheDocument();
  });

  it('appends currency suffix when provided', () => {
    render(
      <DesktopInstallmentCalculator
        price={price}
        options={[{ months: 3, rate: 0 }]}
        labels={{ currencySuffix: 'UZS' }}
      />,
    );
    expect(screen.getByText('400 000 UZS')).toBeInTheDocument();
    expect(screen.getByText('1 200 000 UZS')).toBeInTheDocument();
  });

  // ─── Labels / i18n ──────────────────────────────────────────────────

  it('uses default labels', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByText('Installment plan')).toBeInTheDocument();
    expect(screen.getByText('Monthly payment')).toBeInTheDocument();
    expect(screen.getByText('Total amount')).toBeInTheDocument();
    expect(screen.getByText('Accepted:')).toBeInTheDocument();
  });

  it('applies custom labels', () => {
    render(
      <DesktopInstallmentCalculator
        price={price}
        options={options}
        labels={{
          title: 'Muddatli tolov',
          monthSuffix: 'oy',
          monthlyPayment: 'Oylik tolov',
          totalAmount: 'Jami summa',
          zeroBadge: '0% ustama',
          acceptedPayments: 'Qabul qilinadi:',
        }}
      />,
    );
    expect(screen.getByText('Muddatli tolov')).toBeInTheDocument();
    expect(screen.getByText('3 oy')).toBeInTheDocument();
    expect(screen.getByText('Oylik tolov')).toBeInTheDocument();
    expect(screen.getByText('Jami summa')).toBeInTheDocument();
    expect(screen.getByText('0% ustama')).toBeInTheDocument();
    expect(screen.getByText('Qabul qilinadi:')).toBeInTheDocument();
  });

  // ─── Keyboard navigation ───────────────────────────────────────────

  it('navigates months with ArrowRight', () => {
    const handler = vi.fn();
    render(<DesktopInstallmentCalculator price={price} options={options} onChange={handler} />);
    const btn3mo = screen.getByText('3 mo').closest('button')!;
    fireEvent.keyDown(btn3mo, { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith(options[1]); // 6 months
  });

  it('navigates months with ArrowLeft', () => {
    const handler = vi.fn();
    render(
      <DesktopInstallmentCalculator price={price} options={options} defaultMonths={6} onChange={handler} />,
    );
    const btn6mo = screen.getByText('6 mo').closest('button')!;
    fireEvent.keyDown(btn6mo, { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith(options[0]); // 3 months
  });

  it('does not go below first option with ArrowLeft', () => {
    const handler = vi.fn();
    render(<DesktopInstallmentCalculator price={price} options={options} onChange={handler} />);
    const btn3mo = screen.getByText('3 mo').closest('button')!;
    fireEvent.keyDown(btn3mo, { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith(options[0]); // stays at first
  });

  it('does not go beyond last option with ArrowRight', () => {
    const handler = vi.fn();
    render(
      <DesktopInstallmentCalculator price={price} options={options} defaultMonths={24} onChange={handler} />,
    );
    const btn24mo = screen.getByText('24 mo').closest('button')!;
    fireEvent.keyDown(btn24mo, { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith(options[3]); // stays at last
  });

  // ─── Accessibility ──────────────────────────────────────────────────

  it('month selector has listbox role and aria-label', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    expect(screen.getByRole('listbox', { name: 'Payment term' })).toBeInTheDocument();
  });

  it('month buttons have option role', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(4);
  });

  it('only selected month has tabIndex 0', () => {
    render(<DesktopInstallmentCalculator price={price} options={options} />);
    const opts = screen.getAllByRole('option');
    expect(opts[0]).toHaveAttribute('tabIndex', '0'); // selected (3 mo)
    expect(opts[1]).toHaveAttribute('tabIndex', '-1');
    expect(opts[2]).toHaveAttribute('tabIndex', '-1');
    expect(opts[3]).toHaveAttribute('tabIndex', '-1');
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(
      <DesktopInstallmentCalculator price={price} options={options} className="custom" />,
    );
    expect(container.firstElementChild?.className).toContain('custom');
  });

  it('spreads rest props', () => {
    render(
      <DesktopInstallmentCalculator price={price} options={options} data-testid="calc" />,
    );
    expect(screen.getByTestId('calc')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopInstallmentCalculator.displayName).toBe('DesktopInstallmentCalculator');
  });

  // ─── minPayment override ────────────────────────────────────────────

  it('uses minPayment when provided in option', () => {
    const optionsWithMin: DesktopInstallmentOption[] = [
      { months: 6, rate: 0, minPayment: 250000 },
    ];
    render(<DesktopInstallmentCalculator price={price} options={optionsWithMin} />);
    // monthly = 250,000 → "250 000", total = 250,000 * 6 = 1,500,000 → "1 500 000"
    expect(screen.getByText('250 000')).toBeInTheDocument();
    expect(screen.getByText('1 500 000')).toBeInTheDocument();
  });
});
