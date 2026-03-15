import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { FloatingBubble } from './FloatingBubble';

describe('FloatingBubble', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default chat icon', () => {
    const { container } = render(<FloatingBubble />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has role="button"', () => {
    render(<FloatingBubble />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label', () => {
    render(<FloatingBubble />);
    expect(screen.getByLabelText('Customer support')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<FloatingBubble badge={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ for badge over 99', () => {
    render(<FloatingBubble badge={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render badge when 0', () => {
    const { container } = render(<FloatingBubble badge={0} />);
    expect(container.querySelector('[class*="badge"]')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.mouseDown(screen.getByRole('button'), { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(window);
    expect(onClick).toHaveBeenCalled();
  });

  it('responds to Enter key', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
  });

  it('responds to Space key', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });

  it('renders custom icon', () => {
    render(<FloatingBubble icon={<span data-testid="custom-icon">X</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom position', () => {
    render(<FloatingBubble position={{ right: 24, bottom: 100 }} />);
    const bubble = screen.getByRole('button');
    expect(bubble.style.right).toBe('24px');
    expect(bubble.style.bottom).toBe('100px');
  });

  it('applies custom className', () => {
    render(<FloatingBubble className="my-bubble" />);
    expect(screen.getByRole('button').className).toContain('my-bubble');
  });

  it('has tabIndex for keyboard focus', () => {
    render(<FloatingBubble />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FloatingBubble ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
