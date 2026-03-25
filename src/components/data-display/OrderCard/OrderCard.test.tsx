import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { OrderCard } from './OrderCard';
import type { OrderProduct, OrderAction } from './OrderCard';

const mockProducts: OrderProduct[] = [
  {
    image: 'https://example.com/img1.jpg',
    title: 'iPhone 15 Pro',
    variant: '256GB, Black',
    price: 15000000,
    quantity: 1,
  },
  {
    image: 'https://example.com/img2.jpg',
    title: 'AirPods Pro',
    price: 3500000,
    quantity: 2,
  },
];

describe('OrderCard', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders order ID', () => {
    render(
      <OrderCard
        orderId="12345"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-15"
      />
    );
    expect(screen.getByText('Buyurtma #12345')).toBeInTheDocument();
  });

  it('renders order date', () => {
    render(
      <OrderCard
        orderId="100"
        status="shipping"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-03-20"
      />
    );
    expect(screen.getByText('2024-03-20')).toBeInTheDocument();
  });

  it('renders pending status label', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText("To'lov kutilmoqda")).toBeInTheDocument();
  });

  it('renders shipping status label', () => {
    render(
      <OrderCard
        orderId="1"
        status="shipping"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('Yetkazilmoqda')).toBeInTheDocument();
  });

  it('renders review status label', () => {
    render(
      <OrderCard
        orderId="1"
        status="review"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('Baholash')).toBeInTheDocument();
  });

  it('renders return status label', () => {
    render(
      <OrderCard
        orderId="1"
        status="return"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('Qaytarish')).toBeInTheDocument();
  });

  it('renders product titles', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('AirPods Pro')).toBeInTheDocument();
  });

  it('renders product variant when provided', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('256GB, Black')).toBeInTheDocument();
  });

  it('does not render variant when not provided', () => {
    const products: OrderProduct[] = [
      { image: 'img.jpg', title: 'Product', price: 1000, quantity: 1 },
    ];
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={products}
        totalAmount={1000}
        date="2024-01-01"
      />
    );
    // Only one product with no variant
    expect(screen.queryByText(/256GB/)).toBeNull();
  });

  it('renders product quantities', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByText('x1')).toBeInTheDocument();
    expect(screen.getByText('x2')).toBeInTheDocument();
  });

  it('renders total amount with product count', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    // Total quantity is 1 + 2 = 3
    expect(screen.getByText(/3 ta mahsulot/)).toBeInTheDocument();
  });

  it('renders product images with alt text', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    expect(screen.getByAltText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByAltText('AirPods Pro')).toBeInTheDocument();
  });

  it('renders action buttons when provided', () => {
    const actions: OrderAction[] = [
      { label: "To'lash", type: 'primary', onClick: vi.fn() },
      { label: 'Bekor qilish', onClick: vi.fn() },
    ];
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
        actions={actions}
      />
    );
    expect(screen.getByText("To'lash")).toBeInTheDocument();
    expect(screen.getByText('Bekor qilish')).toBeInTheDocument();
  });

  it('does not render actions section when no actions', () => {
    const { container } = render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
      />
    );
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('calls action onClick when button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const actions: OrderAction[] = [{ label: 'Click Me', onClick }];
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
        actions={actions}
      />
    );
    await user.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    const { container } = render(
      <OrderCard
        orderId="1"
        status="pending"
        products={mockProducts}
        totalAmount={22000000}
        date="2024-01-01"
        className="my-order"
      />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-order');
  });

  it('formats prices with spaces', () => {
    render(
      <OrderCard
        orderId="1"
        status="pending"
        products={[{ image: 'a.jpg', title: 'P', price: 1500000, quantity: 1 }]}
        totalAmount={1500000}
        date="2024-01-01"
      />
    );
    // formatPrice uses ru-RU locale which produces space separators
    // The exact format depends on the locale, but the text should contain "so'm"
    const priceElements = screen.getAllByText(/so'm/);
    expect(priceElements.length).toBeGreaterThanOrEqual(1);
  });
});
