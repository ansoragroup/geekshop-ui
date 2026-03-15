import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DeliveryCard } from './DeliveryCard';

const defaultProps = {
  carrier: 'FedEx Express',
  trackingNumber: 'FX1234567890',
  status: 'inTransit' as const,
};

describe('DeliveryCard', () => {
  afterEach(cleanup);

  it('renders carrier name', () => {
    render(<DeliveryCard {...defaultProps} />);
    expect(screen.getByText('FedEx Express')).toBeInTheDocument();
  });

  it('renders tracking number', () => {
    render(<DeliveryCard {...defaultProps} />);
    expect(screen.getByText(/FX1234567890/)).toBeInTheDocument();
  });

  it('renders status label for pending', () => {
    render(<DeliveryCard {...defaultProps} status="pending" />);
    expect(screen.getByText('Tayyor qilinmoqda')).toBeInTheDocument();
  });

  it('renders status label for shipped', () => {
    render(<DeliveryCard {...defaultProps} status="shipped" />);
    expect(screen.getByText('Yuborildi')).toBeInTheDocument();
  });

  it('renders status label for inTransit', () => {
    render(<DeliveryCard {...defaultProps} status="inTransit" />);
    expect(screen.getByText("Yo'lda")).toBeInTheDocument();
  });

  it('renders status label for delivered', () => {
    render(<DeliveryCard {...defaultProps} status="delivered" />);
    expect(screen.getByText('Yetkazildi')).toBeInTheDocument();
  });

  it('renders estimated date when provided', () => {
    render(<DeliveryCard {...defaultProps} estimatedDate="2026-03-18" />);
    expect(screen.getByText(/2026-03-18/)).toBeInTheDocument();
  });

  it('renders last update when provided', () => {
    render(<DeliveryCard {...defaultProps} lastUpdate="2 soat oldin" />);
    expect(screen.getByText(/2 soat oldin/)).toBeInTheDocument();
  });

  it('renders last location when provided', () => {
    render(<DeliveryCard {...defaultProps} lastLocation="Toshkent" />);
    expect(screen.getByText('Toshkent')).toBeInTheDocument();
  });

  it('renders progress bar with correct aria attributes', () => {
    render(<DeliveryCard {...defaultProps} status="inTransit" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '2');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '3');
  });

  it('renders track button when onTrack provided', () => {
    render(<DeliveryCard {...defaultProps} onTrack={() => {}} />);
    expect(screen.getByRole('button', { name: /Kuzatish/ })).toBeInTheDocument();
  });

  it('does not render track button when onTrack not provided', () => {
    render(<DeliveryCard {...defaultProps} />);
    expect(screen.queryByRole('button', { name: /Kuzatish/ })).not.toBeInTheDocument();
  });

  it('calls onTrack when track button clicked', async () => {
    const onTrack = vi.fn();
    const user = userEvent.setup();
    render(<DeliveryCard {...defaultProps} onTrack={onTrack} />);
    await user.click(screen.getByRole('button', { name: /Kuzatish/ }));
    expect(onTrack).toHaveBeenCalledTimes(1);
  });

  it('renders copy button when onCopy provided', () => {
    render(<DeliveryCard {...defaultProps} onCopy={() => {}} />);
    expect(screen.getByRole('button', { name: /Nusxa/ })).toBeInTheDocument();
  });

  it('calls onCopy when copy button clicked', async () => {
    const onCopy = vi.fn();
    const user = userEvent.setup();
    render(<DeliveryCard {...defaultProps} onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: /Nusxa/ }));
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<DeliveryCard {...defaultProps} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});
