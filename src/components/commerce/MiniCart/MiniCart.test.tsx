import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MiniCart } from './MiniCart'

describe('MiniCart', () => {
  const sampleItems = [
    { id: '1', title: 'RTX 4070 Super', image: 'https://example.com/img.jpg', price: 8900000, quantity: 1, variant: '12GB' },
    { id: '2', title: 'Ryzen 7 7800X3D', image: 'https://example.com/img2.jpg', price: 5600000, quantity: 2 },
  ];

  // Rendering
  it('renders the trigger button', () => {
    render(<MiniCart />);
    expect(screen.getByRole('button', { name: 'Shopping cart' })).toBeInTheDocument();
  });

  it('shows badge with item count', () => {
    render(<MiniCart items={sampleItems} />);
    // 1 + 2 = 3 items
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show badge when cart is empty', () => {
    const { container } = render(<MiniCart items={[]} />);
    expect(container.querySelector('[class*="badge"]')).not.toBeInTheDocument();
  });

  it('renders custom trigger when provided', () => {
    render(<MiniCart trigger={<span data-testid="custom-trigger">Cart</span>} />);
    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
  });

  // Toggle
  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes dropdown on second click', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    const trigger = screen.getByRole('button', { name: 'Shopping cart' });
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Empty state
  it('shows empty state when no items', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={[]} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  // Items display
  it('shows cart items', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('RTX 4070 Super')).toBeInTheDocument();
    expect(screen.getByText('Ryzen 7 7800X3D')).toBeInTheDocument();
  });

  it('shows item count in header', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('Cart (3 items)')).toBeInTheDocument();
  });

  it('shows singular item label', async () => {
    const user = userEvent.setup();
    const singleItem = [{ id: '1', title: 'RTX 4070', image: 'img.jpg', price: 8900000, quantity: 1 }];
    render(<MiniCart items={singleItem} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('Cart (1 item)')).toBeInTheDocument();
  });

  it('shows item variant when provided', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('12GB')).toBeInTheDocument();
  });

  it('shows item quantity', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('x2')).toBeInTheDocument();
  });

  // Remove item
  it('shows remove button when onRemoveItem is provided', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} onRemoveItem={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByRole('button', { name: 'Remove RTX 4070 Super' })).toBeInTheDocument();
  });

  it('calls onRemoveItem with correct id', async () => {
    const onRemoveItem = vi.fn();
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} onRemoveItem={onRemoveItem} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    await user.click(screen.getByRole('button', { name: 'Remove RTX 4070 Super' }));
    expect(onRemoveItem).toHaveBeenCalledWith('1');
  });

  it('does not show remove button when onRemoveItem is not provided', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.queryByRole('button', { name: 'Remove RTX 4070 Super' })).not.toBeInTheDocument();
  });

  // Footer actions
  it('shows View Cart and Checkout buttons', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} onViewCart={vi.fn()} onCheckout={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByText('View Cart')).toBeInTheDocument();
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('calls onViewCart when View Cart is clicked', async () => {
    const onViewCart = vi.fn();
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} onViewCart={onViewCart} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    await user.click(screen.getByText('View Cart'));
    expect(onViewCart).toHaveBeenCalledOnce();
  });

  it('calls onCheckout when Checkout is clicked', async () => {
    const onCheckout = vi.fn();
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} onCheckout={onCheckout} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    await user.click(screen.getByText('Checkout'));
    expect(onCheckout).toHaveBeenCalledOnce();
  });

  // Close behaviors
  it('closes dropdown on Escape', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes dropdown on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">outside</div>
        <MiniCart items={sampleItems} />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'Shopping cart' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // Aria attributes
  it('has aria-haspopup on trigger', () => {
    render(<MiniCart />);
    expect(screen.getByRole('button', { name: 'Shopping cart' })).toHaveAttribute('aria-haspopup', 'true');
  });

  it('sets aria-expanded when open', async () => {
    const user = userEvent.setup();
    render(<MiniCart items={sampleItems} />);

    const trigger = screen.getByRole('button', { name: 'Shopping cart' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  // Props spreading
  it('spreads rest props onto root element', () => {
    render(<MiniCart data-testid="mini-cart" />);
    expect(screen.getByTestId('mini-cart')).toBeInTheDocument();
  });
});
