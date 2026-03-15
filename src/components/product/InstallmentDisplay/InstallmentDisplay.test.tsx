import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { InstallmentDisplay } from './InstallmentDisplay';

describe('InstallmentDisplay', () => {
  afterEach(cleanup);

  it('renders monthly payment amount', () => {
    render(<InstallmentDisplay totalPrice={1_200_000} months={12} />);
    // 1,200,000 / 12 = 100,000 per month
    expect(screen.getByText(/100[\s,.]?000\/oy/)).toBeInTheDocument();
  });

  it('renders month count', () => {
    render(<InstallmentDisplay totalPrice={1_200_000} months={12} />);
    expect(screen.getByText(/12 oy/)).toBeInTheDocument();
  });

  it('shows interest-free badge when interestFree is true', () => {
    render(<InstallmentDisplay totalPrice={1_200_000} months={12} interestFree />);
    expect(screen.getByText('Foizsiz')).toBeInTheDocument();
  });

  it('does not show interest-free badge when interestFree is false', () => {
    render(<InstallmentDisplay totalPrice={1_200_000} months={12} />);
    expect(screen.queryByText('Foizsiz')).not.toBeInTheDocument();
  });

  it('calculates 3-month installment correctly', () => {
    render(<InstallmentDisplay totalPrice={900_000} months={3} />);
    // 900,000 / 3 = 300,000 per month
    expect(screen.getByText(/300[\s,.]?000\/oy/)).toBeInTheDocument();
  });

  it('calculates 6-month installment correctly', () => {
    render(<InstallmentDisplay totalPrice={600_000} months={6} />);
    // 600,000 / 6 = 100,000 per month
    expect(screen.getByText(/100[\s,.]?000\/oy/)).toBeInTheDocument();
  });

  it('rounds up monthly payment for non-even division', () => {
    render(<InstallmentDisplay totalPrice={1_000_000} months={3} />);
    // 1,000,000 / 3 = 333,334 (ceil)
    expect(screen.getByText(/333[\s,.]?334\/oy/)).toBeInTheDocument();
  });

  it('renders credit card icon', () => {
    const { container } = render(<InstallmentDisplay totalPrice={1_200_000} months={12} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <InstallmentDisplay totalPrice={1_200_000} months={12} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
