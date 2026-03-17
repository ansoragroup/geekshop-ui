import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopCartItem } from './DesktopCartItem';

const defaultProps = {
  image: '/img/gpu.jpg',
  title: 'MSI RTX 4060 8GB',
  price: 17_800_000,
  quantity: 2,
};

describe('DesktopCartItem', () => {
  it('renders the product title', () => {
    render(<DesktopCartItem {...defaultProps} />);
    expect(screen.getByText('MSI RTX 4060 8GB')).toBeInTheDocument();
  });

  it('renders the product image', () => {
    render(<DesktopCartItem {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu.jpg');
    expect(img).toHaveAttribute('alt', 'MSI RTX 4060 8GB');
  });

  it('renders the formatted price', () => {
    render(<DesktopCartItem {...defaultProps} />);
    expect(screen.getByText(/17.800.000/)).toBeInTheDocument();
  });

  it('toggles checkbox on click', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopCartItem {...defaultProps} selected={false} onSelect={onSelect} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onSelect).toHaveBeenCalledWith(true);
  });

  it('shows checked state when selected', () => {
    render(<DesktopCartItem {...defaultProps} selected />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DesktopCartItem {...defaultProps} onDelete={onDelete} />);
    await user.click(screen.getByLabelText('Delete MSI RTX 4060 8GB'));
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('shows variant text when provided', () => {
    render(<DesktopCartItem {...defaultProps} variant="Black / 256GB" />);
    expect(screen.getByText('Black / 256GB')).toBeInTheDocument();
  });

  it('shows In Stock when inStock is true', () => {
    render(<DesktopCartItem {...defaultProps} inStock />);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('shows Out of Stock when inStock is false', () => {
    render(<DesktopCartItem {...defaultProps} inStock={false} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });

  it('shows Free Shipping badge when enabled', () => {
    render(<DesktopCartItem {...defaultProps} freeShipping />);
    expect(screen.getByText('Free Shipping')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopCartItem {...defaultProps} className="my-cart-item" />,
    );
    expect(container.firstElementChild?.className).toContain('my-cart-item');
  });

  it('handles keyboard interaction on checkbox', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopCartItem {...defaultProps} selected={false} onSelect={onSelect} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith(true);
  });

  it('handles keyboard interaction on delete', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<DesktopCartItem {...defaultProps} onDelete={onDelete} />);
    const deleteBtn = screen.getByLabelText('Delete MSI RTX 4060 8GB');
    deleteBtn.focus();
    await user.keyboard('{Enter}');
    expect(onDelete).toHaveBeenCalledOnce();
  });
});
