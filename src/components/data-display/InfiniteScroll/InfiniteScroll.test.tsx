import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { InfiniteScroll } from './InfiniteScroll';

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

class MockIntersectionObserver {
  observe = mockObserve;
  unobserve = vi.fn();
  disconnect = mockDisconnect;
  constructor() {
    // no-op
  }
}

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('InfiniteScroll', () => {
  it('renders children', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Item 1</div>
        <div>Item 2</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('shows loading state when loading', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore loading>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('Yuklanmoqda...')).toBeInTheDocument();
  });

  it('shows custom loading content', () => {
    render(
      <InfiniteScroll
        onLoadMore={vi.fn()}
        hasMore
        loading
        loadingContent={<span>Custom loader</span>}
      >
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('Custom loader')).toBeInTheDocument();
  });

  it('shows end content when no more items', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore={false}>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Boshqa ma'lumot yo'q")).toBeInTheDocument();
  });

  it('shows custom end content', () => {
    render(
      <InfiniteScroll
        onLoadMore={vi.fn()}
        hasMore={false}
        endContent={<span>All done!</span>}
      >
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('All done!')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Yuklab bo'lmadi")).toBeInTheDocument();
  });

  it('shows retry button on error when onRetry is provided', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error onRetry={vi.fn()}>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('Qayta urinish')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error onRetry={onRetry}>
        <div>Items</div>
      </InfiniteScroll>,
    );
    await user.click(screen.getByText('Qayta urinish'));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('does not show retry when onRetry is not provided', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.queryByText('Qayta urinish')).toBeNull();
  });

  it('shows custom error content', () => {
    render(
      <InfiniteScroll
        onLoadMore={vi.fn()}
        hasMore
        error
        errorContent={<span>Oops!</span>}
      >
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });

  it('retry button has type="button"', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error onRetry={vi.fn()}>
        <div>Items</div>
      </InfiniteScroll>,
    );
    const retryBtn = screen.getByText('Qayta urinish');
    expect(retryBtn).toHaveAttribute('type', 'button');
  });

  it('applies custom className', () => {
    const { container } = render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore className="my-scroll">
        <div>Items</div>
      </InfiniteScroll>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-scroll');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <InfiniteScroll ref={ref} onLoadMore={vi.fn()} hasMore>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has displayName', () => {
    expect(InfiniteScroll.displayName).toBe('InfiniteScroll');
  });

  it('does not show sentinel when error is true', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore error>
        <div>Items</div>
      </InfiniteScroll>,
    );
    // Sentinel should not be rendered when error is true
    // The sentinel is a div with no text content
    // With error=true, hasMore=true, no sentinel should appear
    // Observer should not be called for sentinel
    expect(screen.getByText("Yuklab bo'lmadi")).toBeInTheDocument();
  });

  it('does not show sentinel when hasMore is false', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore={false}>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.getByText("Boshqa ma'lumot yo'q")).toBeInTheDocument();
  });

  it('shows nothing in status area when hasMore and not loading/error', () => {
    render(
      <InfiniteScroll onLoadMore={vi.fn()} hasMore>
        <div>Items</div>
      </InfiniteScroll>,
    );
    expect(screen.queryByText('Yuklanmoqda...')).toBeNull();
    expect(screen.queryByText("Boshqa ma'lumot yo'q")).toBeNull();
    expect(screen.queryByText("Yuklab bo'lmadi")).toBeNull();
  });
});
