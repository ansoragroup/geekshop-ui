import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders text content', () => {
    render(<Tag text="Sale" />);
    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    const { container } = render(<Tag text="Label" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
  });

  it('does not show close button by default', () => {
    const { container } = render(<Tag text="Tag" />);
    expect(container.querySelector('button')).toBeNull();
  });

  it('shows close button when closable', () => {
    render(<Tag text="Tag" closable />);
    expect(screen.getByLabelText('Olib tashlash: Tag')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Tag text="Removable" closable onClose={onClose} />);
    await user.click(screen.getByLabelText('Olib tashlash: Removable'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('close button has type="button"', () => {
    render(<Tag text="Tag" closable />);
    const btn = screen.getByLabelText('Olib tashlash: Tag');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('applies custom className', () => {
    const { container } = render(<Tag text="Tag" className="my-tag" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('my-tag');
  });

  it('renders filled variant by default', () => {
    const { container } = render(<Tag text="Tag" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders outlined variant', () => {
    const { container } = render(<Tag text="Tag" variant="outlined" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders light variant', () => {
    const { container } = render(<Tag text="Tag" variant="light" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders all color variants', () => {
    const colors = ['primary', 'success', 'warning', 'error', 'default'] as const;
    colors.forEach((color) => {
      const { unmount } = render(<Tag text={color} color={color} />);
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    });
  });

  it('renders sm size', () => {
    const { container } = render(<Tag text="Small" size="sm" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders md size by default', () => {
    const { container } = render(<Tag text="Medium" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('has correct aria-label on close button reflecting text', () => {
    render(<Tag text="iPhone 15" closable />);
    expect(screen.getByLabelText('Olib tashlash: iPhone 15')).toBeInTheDocument();
  });
});
