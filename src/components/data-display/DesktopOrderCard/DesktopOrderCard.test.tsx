import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopOrderCard } from './DesktopOrderCard';

const defaultProps = {
  orderId: 'GS-2026-0047',
  status: 'delivered' as const,
  products: [
    { id: '1', image: '/img/p1.jpg', title: 'RTX 4060' },
    { id: '2', image: '/img/p2.jpg', title: 'Ryzen 7' },
    { id: '3', image: '/img/p3.jpg', title: 'SSD 1TB' },
  ],
  totalAmount: 23_700_000,
  date: '14 Mar 2026',
};

describe('DesktopOrderCard', () => {
  it('renders the order ID', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    expect(screen.getByText('Order #GS-2026-0047')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    expect(screen.getByText('14 Mar 2026')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    const badge = screen.getByTestId('status-badge');
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toContain('Delivered');
  });

  it('renders product images', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    expect(screen.getByAltText('RTX 4060')).toBeInTheDocument();
    expect(screen.getByAltText('Ryzen 7')).toBeInTheDocument();
    expect(screen.getByAltText('SSD 1TB')).toBeInTheDocument();
  });

  it('shows item count', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    expect(screen.getByText('3 items')).toBeInTheDocument();
  });

  it('shows singular "item" for single product', () => {
    render(
      <DesktopOrderCard
        {...defaultProps}
        products={[{ id: '1', image: '/img/p1.jpg', title: 'RTX 4060' }]}
      />,
    );
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  it('renders total amount', () => {
    render(<DesktopOrderCard {...defaultProps} />);
    expect(screen.getByText(/23.700.000/)).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(
      <DesktopOrderCard
        {...defaultProps}
        actions={[
          { id: 'track', label: 'Track Order', variant: 'primary' },
          { id: 'details', label: 'View Details', variant: 'secondary' },
        ]}
      />,
    );
    expect(screen.getByText('Track Order')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('calls onAction with correct action ID', async () => {
    const onAction = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopOrderCard
        {...defaultProps}
        actions={[
          { id: 'track', label: 'Track Order', variant: 'primary' },
          { id: 'details', label: 'View Details', variant: 'secondary' },
        ]}
        onAction={onAction}
      />,
    );

    await user.click(screen.getByText('Track Order'));
    expect(onAction).toHaveBeenCalledWith('track');

    await user.click(screen.getByText('View Details'));
    expect(onAction).toHaveBeenCalledWith('details');
  });

  it('renders danger variant action button', () => {
    const { container } = render(
      <DesktopOrderCard
        {...defaultProps}
        actions={[{ id: 'cancel', label: 'Cancel Order', variant: 'danger' }]}
      />,
    );
    expect(screen.getByText('Cancel Order')).toBeInTheDocument();
    expect(container.querySelector('[class*="actionDanger"]')).toBeInTheDocument();
  });

  it('shows overflow badge for many products', () => {
    const manyProducts = Array.from({ length: 8 }, (_, i) => ({
      id: `${i}`,
      image: `/img/p${i}.jpg`,
      title: `Product ${i + 1}`,
    }));
    render(<DesktopOrderCard {...defaultProps} products={manyProducts} />);
    expect(screen.getByText('+3')).toBeInTheDocument();
    expect(screen.getByText('8 items')).toBeInTheDocument();
  });

  it('does not render actions row when no actions provided', () => {
    const { container } = render(<DesktopOrderCard {...defaultProps} />);
    expect(container.querySelector('[class*="actionsRow"]')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopOrderCard {...defaultProps} className="my-order" />,
    );
    expect(container.firstElementChild?.className).toContain('my-order');
  });

  it('renders different status styles', () => {
    const statuses = ['pending', 'processing', 'shipping', 'delivered', 'cancelled', 'returned'] as const;
    for (const status of statuses) {
      const { container, unmount } = render(
        <DesktopOrderCard {...defaultProps} status={status} />,
      );
      expect(container.querySelector(`[class*="status_${status}"]`)).toBeInTheDocument();
      unmount();
    }
  });
});
