import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Skeleton, ProductCardSkeleton } from './Skeleton';

describe('Skeleton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders a single text skeleton by default', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
    expect(el.tagName).toBe('DIV');
  });

  it('renders multiple lines for text variant with lines > 1', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    // Should render a wrapper with 3 child divs
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children.length).toBe(3);
  });

  it('renders last line at 60% width for multi-line', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    const wrapper = container.firstElementChild as HTMLElement;
    const lastLine = wrapper.children[2] as HTMLElement;
    expect(lastLine.style.width).toBe('60%');
  });

  it('renders single element for text variant with lines=1', () => {
    const { container } = render(<Skeleton variant="text" lines={1} />);
    const el = container.firstElementChild as HTMLElement;
    // Should be a single div, not a group wrapper
    expect(el.children.length).toBe(0);
  });

  it('renders circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders rounded variant', () => {
    const { container } = render(<Skeleton variant="rounded" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('applies width as px when number', () => {
    const { container } = render(<Skeleton width={200} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('200px');
  });

  it('applies width as string when string', () => {
    const { container } = render(<Skeleton width="50%" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.width).toBe('50%');
  });

  it('applies height as px when number', () => {
    const { container } = render(<Skeleton height={100} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.height).toBe('100px');
  });

  it('applies height as string when string', () => {
    const { container } = render(<Skeleton height="5rem" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.height).toBe('5rem');
  });

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="my-skeleton" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('my-skeleton');
  });

  it('applies custom style', () => {
    const { container } = render(<Skeleton style={{ opacity: 0.5 }} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.opacity).toBe('0.5');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has displayName', () => {
    expect(Skeleton.displayName).toBe('Skeleton');
  });
});

describe('ProductCardSkeleton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders product card skeleton structure', () => {
    const { container } = render(<ProductCardSkeleton />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeTruthy();
    // Should contain child Skeleton elements
    expect(root.children.length).toBeGreaterThan(0);
  });

  it('applies custom className', () => {
    const { container } = render(<ProductCardSkeleton className="custom-card" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('custom-card');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ProductCardSkeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has displayName', () => {
    expect(ProductCardSkeleton.displayName).toBe('ProductCardSkeleton');
  });
});
