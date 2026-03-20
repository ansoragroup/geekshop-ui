import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopPaymentMethodCard } from './DesktopPaymentMethodCard';

const defaultMethod = {
  id: '1',
  type: 'visa' as const,
  label: 'Visa',
  lastFour: '4242',
  expiryDate: '12/27',
};

describe('DesktopPaymentMethodCard', () => {
  it('renders the card label', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} />);
    expect(screen.getByText('Visa')).toBeInTheDocument();
  });

  it('renders last four digits', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} />);
    expect(screen.getByText(/4242/)).toBeInTheDocument();
  });

  it('renders expiry date', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} />);
    expect(screen.getByText(/12\/27/)).toBeInTheDocument();
  });

  it('calls onSelect when radio is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopPaymentMethodCard method={defaultMethod} onSelect={onSelect} />);
    await user.click(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('shows selected state', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} selected />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onDelete when delete is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DesktopPaymentMethodCard method={defaultMethod} onDelete={onDelete} />);
    await user.click(screen.getByLabelText('Delete payment method: Visa'));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('shows Default badge when isDefault is true', () => {
    const method = { ...defaultMethod, isDefault: true };
    render(<DesktopPaymentMethodCard method={method} />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('does not show Default badge when isDefault is false', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} />);
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });

  it('hides radio when selectable is false', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} selectable={false} />);
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  });

  it('does not render delete button when onDelete is not provided', () => {
    render(<DesktopPaymentMethodCard method={defaultMethod} />);
    expect(screen.queryByLabelText(/Delete payment method/)).not.toBeInTheDocument();
  });

  it('renders cash payment without last four or expiry', () => {
    const cashMethod = {
      id: '2',
      type: 'cash' as const,
      label: 'Cash on Delivery',
    };
    render(<DesktopPaymentMethodCard method={cashMethod} />);
    expect(screen.getByText('Cash on Delivery')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopPaymentMethodCard method={defaultMethod} className="my-payment" />,
    );
    expect(container.firstElementChild?.className).toContain('my-payment');
  });

  it('handles keyboard selection on radio', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopPaymentMethodCard method={defaultMethod} onSelect={onSelect} />);
    const radio = screen.getByRole('radio');
    radio.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
