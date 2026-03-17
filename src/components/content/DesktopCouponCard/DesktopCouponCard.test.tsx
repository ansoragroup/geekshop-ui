import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopCouponCard } from './DesktopCouponCard';

const defaultProps = {
  discount: "50,000 so'm",
  code: 'GEEK50K',
};

describe('DesktopCouponCard', () => {
  it('renders the discount text', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.getByText("50,000 so'm")).toBeInTheDocument();
  });

  it('renders the OFF label', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.getByText('OFF')).toBeInTheDocument();
  });

  it('renders the coupon code', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.getByText('GEEK50K')).toBeInTheDocument();
  });

  it('renders the code label', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.getByText('Code:')).toBeInTheDocument();
  });

  it('renders the Apply button', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Apply coupon GEEK50K/i })).toBeInTheDocument();
  });

  it('calls onApply when Apply button is clicked', async () => {
    const onApply = vi.fn();
    const user = userEvent.setup();
    render(<DesktopCouponCard {...defaultProps} onApply={onApply} />);
    await user.click(screen.getByRole('button', { name: /Apply/i }));
    expect(onApply).toHaveBeenCalledOnce();
  });

  it('shows Applied badge with checkmark when applied is true', () => {
    render(<DesktopCouponCard {...defaultProps} applied />);
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Apply/i })).not.toBeInTheDocument();
  });

  it('renders minAmount when provided', () => {
    render(
      <DesktopCouponCard
        {...defaultProps}
        minAmount="Orders over 500,000 so'm"
      />,
    );
    expect(screen.getByText("Orders over 500,000 so'm")).toBeInTheDocument();
  });

  it('does not render minAmount when not provided', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.queryByText(/Orders over/)).not.toBeInTheDocument();
  });

  it('renders categories joined by bullet', () => {
    render(
      <DesktopCouponCard
        {...defaultProps}
        categories={['Electronics', 'Gadgets']}
      />,
    );
    expect(screen.getByText(/Electronics.*Gadgets/)).toBeInTheDocument();
  });

  it('renders expiry date when provided', () => {
    render(
      <DesktopCouponCard {...defaultProps} expiryDate="31 Mar 2026" />,
    );
    expect(screen.getByText(/Exp: 31 Mar 2026/)).toBeInTheDocument();
  });

  it('does not render expiry when not provided', () => {
    render(<DesktopCouponCard {...defaultProps} />);
    expect(screen.queryByText(/Exp:/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopCouponCard {...defaultProps} className="my-coupon" />,
    );
    expect(container.firstElementChild?.className).toContain('my-coupon');
  });

  it('applies orange color variant by default', () => {
    const { container } = render(<DesktopCouponCard {...defaultProps} />);
    const block = container.querySelector('[class*="discountBlock"]');
    expect(block?.className).toContain('color-orange');
  });

  it('applies red color variant', () => {
    const { container } = render(
      <DesktopCouponCard {...defaultProps} color="red" />,
    );
    const block = container.querySelector('[class*="discountBlock"]');
    expect(block?.className).toContain('color-red');
  });

  it('applies green color variant', () => {
    const { container } = render(
      <DesktopCouponCard {...defaultProps} color="green" />,
    );
    const block = container.querySelector('[class*="discountBlock"]');
    expect(block?.className).toContain('color-green');
  });

  it('applies blue color variant', () => {
    const { container } = render(
      <DesktopCouponCard {...defaultProps} color="blue" />,
    );
    const block = container.querySelector('[class*="discountBlock"]');
    expect(block?.className).toContain('color-blue');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <DesktopCouponCard {...defaultProps} data-testid="coupon-card" />,
    );
    expect(container.querySelector('[data-testid="coupon-card"]')).toBeInTheDocument();
  });
});
