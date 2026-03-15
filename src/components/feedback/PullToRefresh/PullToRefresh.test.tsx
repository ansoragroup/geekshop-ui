import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { PullToRefresh } from './PullToRefresh';

describe('PullToRefresh', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children content', () => {
    render(
      <PullToRefresh onRefresh={async () => {}}>
        <div>Child Content</div>
      </PullToRefresh>,
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <PullToRefresh ref={ref} onRefresh={async () => {}}>
        Content
      </PullToRefresh>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    const { container } = render(
      <PullToRefresh onRefresh={async () => {}} className="my-ptr">
        Content
      </PullToRefresh>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-ptr');
  });

  it('renders default arrow indicator initially', () => {
    const { container } = render(
      <PullToRefresh onRefresh={async () => {}}>
        Content
      </PullToRefresh>,
    );
    // The default arrow is an SVG
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('renders custom pullingContent when provided', () => {
    render(
      <PullToRefresh
        onRefresh={async () => {}}
        pullingContent={<span data-testid="custom-pull">Pull me</span>}
      >
        Content
      </PullToRefresh>,
    );
    expect(screen.getByTestId('custom-pull')).toBeInTheDocument();
  });

  it('does not crash with disabled prop', () => {
    const { container } = render(
      <PullToRefresh onRefresh={async () => {}} disabled>
        Content
      </PullToRefresh>,
    );
    expect(container.firstElementChild).toBeTruthy();
  });

  it('accepts custom threshold and maxPull values', () => {
    const onRefresh = vi.fn().mockResolvedValue(undefined);
    const { container } = render(
      <PullToRefresh onRefresh={onRefresh} threshold={50} maxPull={100}>
        Content
      </PullToRefresh>,
    );
    expect(container.firstElementChild).toBeTruthy();
  });
});
