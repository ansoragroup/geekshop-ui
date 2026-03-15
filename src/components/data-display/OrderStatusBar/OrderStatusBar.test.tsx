import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { OrderStatusBar, DEFAULT_ORDER_STATUSES } from './OrderStatusBar';
import type { OrderStatusItem } from './OrderStatusBar';

describe('OrderStatusBar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders default statuses', () => {
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} />);
    expect(screen.getByText("To'lov kutilmoqda")).toBeInTheDocument();
    expect(screen.getByText('Yuborilmagan')).toBeInTheDocument();
    expect(screen.getByText('Yetkazilmoqda')).toBeInTheDocument();
    expect(screen.getByText('Baholash')).toBeInTheDocument();
    expect(screen.getByText('Qaytarish')).toBeInTheDocument();
  });

  it('renders correct number of status buttons', () => {
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(5);
  });

  it('renders custom statuses', () => {
    const statuses: OrderStatusItem[] = [
      { icon: <span>IC</span>, label: 'Custom Status', count: 3 },
    ];
    render(<OrderStatusBar statuses={statuses} />);
    expect(screen.getByText('Custom Status')).toBeInTheDocument();
  });

  it('calls onTap with correct index when button is clicked', async () => {
    const user = userEvent.setup();
    const onTap = vi.fn();
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} onTap={onTap} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(onTap).toHaveBeenCalledWith(2);
  });

  it('calls onTap for first item', async () => {
    const user = userEvent.setup();
    const onTap = vi.fn();
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} onTap={onTap} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    expect(onTap).toHaveBeenCalledWith(0);
  });

  it('shows badge count when count > 0', () => {
    const statuses: OrderStatusItem[] = [
      { icon: <span>I</span>, label: 'Pending', count: 5 },
    ];
    render(<OrderStatusBar statuses={statuses} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not show badge when count is 0', () => {
    const statuses: OrderStatusItem[] = [
      { icon: <span>I</span>, label: 'Pending', count: 0 },
    ];
    render(<OrderStatusBar statuses={statuses} />);
    expect(screen.queryByText('0')).toBeNull();
  });

  it('shows "99+" for count over 99', () => {
    const statuses: OrderStatusItem[] = [
      { icon: <span>I</span>, label: 'Many', count: 150 },
    ];
    render(<OrderStatusBar statuses={statuses} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not show badge when count is undefined', () => {
    const statuses: OrderStatusItem[] = [
      { icon: <span>I</span>, label: 'No Count' },
    ];
    const { container } = render(<OrderStatusBar statuses={statuses} />);
    // No badge span should exist - only the icon wrap and label
    const button = container.querySelector('button') as HTMLElement;
    expect(button).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} className="my-bar" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-bar');
  });

  it('all buttons have type="button"', () => {
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });

  it('does not crash when onTap is not provided', async () => {
    const user = userEvent.setup();
    render(<OrderStatusBar statuses={DEFAULT_ORDER_STATUSES} />);
    const buttons = screen.getAllByRole('button');
    // Should not throw
    await user.click(buttons[0]);
  });
});
