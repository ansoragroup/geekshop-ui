import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopOrderSummary } from './DesktopOrderSummary';

const defaultProps = {
  subtotal: 14_700_000,
  total: 16_464_000,
};

describe('DesktopOrderSummary', () => {
  it('renders the Order Summary heading', () => {
    render(<DesktopOrderSummary {...defaultProps} />);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('displays formatted subtotal', () => {
    render(<DesktopOrderSummary {...defaultProps} />);
    expect(screen.getByText(/14.700.000/)).toBeInTheDocument();
  });

  it('displays formatted total', () => {
    render(<DesktopOrderSummary {...defaultProps} />);
    expect(screen.getByText(/16.464.000/)).toBeInTheDocument();
  });

  it('shows Free when shipping is 0', () => {
    render(<DesktopOrderSummary {...defaultProps} shipping={0} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('shows shipping price when not free', () => {
    render(<DesktopOrderSummary {...defaultProps} shipping={50_000} />);
    expect(screen.getByText(/50.000/)).toBeInTheDocument();
  });

  it('shows tax when provided', () => {
    render(<DesktopOrderSummary {...defaultProps} tax={1_764_000} />);
    expect(screen.getByText('Tax')).toBeInTheDocument();
    expect(screen.getByText(/1.764.000/)).toBeInTheDocument();
  });

  it('shows discount when provided', () => {
    render(<DesktopOrderSummary {...defaultProps} discount={3_000_000} />);
    expect(screen.getByText('Discount')).toBeInTheDocument();
    expect(screen.getByText(/-3.000.000/)).toBeInTheDocument();
  });

  it('shows item count when provided', () => {
    render(<DesktopOrderSummary {...defaultProps} itemCount={5} />);
    expect(screen.getByText('(5 items)')).toBeInTheDocument();
  });

  it('calls onCheckout when CTA is clicked', async () => {
    const onCheckout = vi.fn();
    const user = userEvent.setup();
    render(<DesktopOrderSummary {...defaultProps} onCheckout={onCheckout} />);
    await user.click(screen.getByRole('button', { name: 'Proceed to Checkout' }));
    expect(onCheckout).toHaveBeenCalledOnce();
  });

  it('uses custom CTA text', () => {
    render(<DesktopOrderSummary {...defaultProps} ctaText="Place Order" />);
    expect(screen.getByRole('button', { name: 'Place Order' })).toBeInTheDocument();
  });

  it('disables button when loading', () => {
    render(<DesktopOrderSummary {...defaultProps} loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders trust badges when provided', () => {
    const trustBadges = [
      { icon: 'shipping' as const, text: 'Free shipping on orders over 100k' },
      { icon: 'secure' as const, text: 'Secure checkout' },
    ];
    render(<DesktopOrderSummary {...defaultProps} trustBadges={trustBadges} />);
    expect(screen.getByText('Free shipping on orders over 100k')).toBeInTheDocument();
    expect(screen.getByText('Secure checkout')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopOrderSummary {...defaultProps} className="my-summary" />,
    );
    expect(container.firstElementChild?.className).toContain('my-summary');
  });
});
