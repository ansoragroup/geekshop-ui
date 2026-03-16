import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BackToTop } from './BackToTop';

describe('BackToTop', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    window.scrollTo = vi.fn();
  });

  it('renders a button with correct aria-label', () => {
    render(<BackToTop />);
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<BackToTop />);
    const button = screen.getByLabelText('Back to top');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('is hidden when scrollY is below threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    const { container } = render(<BackToTop threshold={300} />);
    const button = container.querySelector('button');
    expect(button?.className).toMatch(/hidden/);
  });

  it('becomes visible when scrollY exceeds threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    const { container } = render(<BackToTop threshold={300} />);

    // Simulate scroll event
    fireEvent.scroll(window);

    const button = container.querySelector('button');
    expect(button?.className).toMatch(/visible/);
  });

  it('calls window.scrollTo with smooth behavior on click', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<BackToTop smooth />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByLabelText('Back to top'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('calls window.scrollTo with instant behavior when smooth is false', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<BackToTop smooth={false} />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByLabelText('Back to top'));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('calls custom onClick handler', () => {
    const onClick = vi.fn();
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<BackToTop onClick={onClick} />);
    fireEvent.scroll(window);
    fireEvent.click(screen.getByLabelText('Back to top'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('uses custom threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    const { container } = render(<BackToTop threshold={100} />);
    fireEvent.scroll(window);
    const button = container.querySelector('button');
    expect(button?.className).toMatch(/hidden/);

    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    fireEvent.scroll(window);
    expect(button?.className).toMatch(/visible/);
  });

  it('applies custom className', () => {
    const { container } = render(<BackToTop className="custom" />);
    expect(container.querySelector('button')?.className).toContain('custom');
  });

  it('spreads rest props onto button element', () => {
    render(<BackToTop data-testid="back-to-top" />);
    expect(screen.getByTestId('back-to-top')).toBeInTheDocument();
  });

  it('cleans up scroll listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<BackToTop />);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListener.mockRestore();
  });
});
