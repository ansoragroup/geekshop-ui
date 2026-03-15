import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Swipe } from './Swipe';
import type { SwipeAction } from './Swipe';

describe('Swipe', () => {
  afterEach(() => {
    cleanup();
  });

  const leftActions: SwipeAction[] = [
    { key: 'pin', label: 'Pin', onClick: vi.fn() },
  ];

  const rightActions: SwipeAction[] = [
    { key: 'delete', label: 'Delete', backgroundColor: '#FF3B30', onClick: vi.fn() },
    { key: 'archive', label: 'Archive', onClick: vi.fn() },
  ];

  it('renders children content', () => {
    render(<Swipe>Swipe Content</Swipe>);
    expect(screen.getByText('Swipe Content')).toBeInTheDocument();
  });

  it('has role="group" and aria-roledescription="swipeable"', () => {
    render(<Swipe>Content</Swipe>);
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-roledescription', 'swipeable');
  });

  it('renders left action buttons when leftActions provided', () => {
    render(<Swipe leftActions={leftActions}>Content</Swipe>);
    expect(screen.getByText('Pin')).toBeInTheDocument();
  });

  it('renders right action buttons when rightActions provided', () => {
    render(<Swipe rightActions={rightActions}>Content</Swipe>);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Archive')).toBeInTheDocument();
  });

  it('does not render left actions div when no leftActions', () => {
    const { container } = render(<Swipe>Content</Swipe>);
    // No action buttons should be present
    expect(container.querySelectorAll('button').length).toBe(0);
  });

  it('applies custom className', () => {
    const { container } = render(<Swipe className="my-swipe">Content</Swipe>);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-swipe');
  });

  it('applies custom backgroundColor to left action', () => {
    const actions: SwipeAction[] = [
      { key: 'mark', label: 'Mark', backgroundColor: '#00FF00', onClick: vi.fn() },
    ];
    render(<Swipe leftActions={actions}>Content</Swipe>);
    const btn = screen.getByText('Mark');
    expect(btn.style.backgroundColor).toBe('rgb(0, 255, 0)');
  });

  it('applies custom color to right action', () => {
    const actions: SwipeAction[] = [
      { key: 'del', label: 'Del', color: '#000000', onClick: vi.fn() },
    ];
    render(<Swipe rightActions={actions}>Content</Swipe>);
    const btn = screen.getByText('Del');
    expect(btn.style.color).toBe('rgb(0, 0, 0)');
  });

  it('defaults right action button color to white', () => {
    const actions: SwipeAction[] = [
      { key: 'del', label: 'Del', onClick: vi.fn() },
    ];
    render(<Swipe rightActions={actions}>Content</Swipe>);
    const btn = screen.getByText('Del');
    expect(btn.style.color).toBe('rgb(255, 255, 255)');
  });

  it('sets left actions width based on count', () => {
    const actions: SwipeAction[] = [
      { key: 'a', label: 'A', onClick: vi.fn() },
      { key: 'b', label: 'B', onClick: vi.fn() },
    ];
    const { container } = render(<Swipe leftActions={actions}>Content</Swipe>);
    // leftWidth = 2 * 72 = 144
    const actionsDiv = container.querySelector('[aria-hidden]') as HTMLElement;
    expect(actionsDiv.style.width).toBe('144px');
  });

  it('sets action buttons as type="button"', () => {
    const { container } = render(<Swipe rightActions={rightActions}>Content</Swipe>);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
    });
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Swipe ref={ref}>Content</Swipe>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has displayName', () => {
    expect(Swipe.displayName).toBe('Swipe');
  });
});
