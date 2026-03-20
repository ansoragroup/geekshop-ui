import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FloatingToolbar, type FloatingToolbarItem } from './FloatingToolbar';

const TestIcon = () => <span data-testid="icon">icon</span>;

const items: FloatingToolbarItem[] = [
  { icon: <TestIcon />, label: 'Chat', onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Orders', onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Cart', badge: 3, onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Back to Top', showOnScroll: true, onClick: vi.fn() },
];

describe('FloatingToolbar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders toolbar with correct role', () => {
    render(<FloatingToolbar items={items} />);
    expect(screen.getByRole('toolbar', { name: 'Quick actions' })).toBeInTheDocument();
  });

  it('renders all non-scroll items as visible buttons', () => {
    render(<FloatingToolbar items={items} />);
    expect(screen.getByLabelText('Chat')).toBeInTheDocument();
    expect(screen.getByLabelText('Orders')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
  });

  it('renders badge count', () => {
    render(<FloatingToolbar items={items} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders 99+ for badge > 99', () => {
    const itemsHighBadge: FloatingToolbarItem[] = [
      { icon: <TestIcon />, label: 'Cart', badge: 150 },
    ];
    render(<FloatingToolbar items={itemsHighBadge} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render badge when badge is 0', () => {
    const itemsZeroBadge: FloatingToolbarItem[] = [
      { icon: <TestIcon />, label: 'Cart', badge: 0 },
    ];
    render(<FloatingToolbar items={itemsZeroBadge} />);
    expect(screen.queryByLabelText(/items/)).not.toBeInTheDocument();
  });

  it('calls onClick when item is clicked', () => {
    const onClick = vi.fn();
    render(
      <FloatingToolbar items={[{ icon: <TestIcon />, label: 'Chat', onClick }]} />,
    );
    fireEvent.click(screen.getByLabelText('Chat'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('hides showOnScroll items when not scrolled', () => {
    const { container } = render(<FloatingToolbar items={items} />);
    const backToTop = screen.getByLabelText('Back to Top');
    expect(backToTop.className).toMatch(/itemHidden/);
    expect(backToTop).toHaveAttribute('tabIndex', '-1');
  });

  it('shows showOnScroll items after scroll threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<FloatingToolbar items={items} scrollThreshold={300} />);
    fireEvent.scroll(window);
    const backToTop = screen.getByLabelText('Back to Top');
    expect(backToTop.className).not.toMatch(/itemHidden/);
  });

  it('renders label text for each item', () => {
    render(<FloatingToolbar items={items} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('applies right position class by default', () => {
    const { container } = render(<FloatingToolbar items={items} />);
    expect(container.firstChild).toHaveClass('right');
  });

  it('applies left position class', () => {
    const { container } = render(<FloatingToolbar items={items} position="left" />);
    expect(container.firstChild).toHaveClass('left');
  });

  it('applies custom className', () => {
    const { container } = render(
      <FloatingToolbar items={items} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('spreads rest props', () => {
    render(<FloatingToolbar items={items} data-testid="floating" />);
    expect(screen.getByTestId('floating')).toBeInTheDocument();
  });

  it('cleans up scroll listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<FloatingToolbar items={items} />);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListener.mockRestore();
  });
});
