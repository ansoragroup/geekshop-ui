import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { DesktopGrid } from './DesktopGrid';

describe('DesktopGrid', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(
      <DesktopGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </DesktopGrid>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('defaults to 4 columns with 24px gap', () => {
    const { container } = render(
      <DesktopGrid>
        <div>A</div>
      </DesktopGrid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
    expect(grid.style.gap).toBe('24px');
  });

  it('renders with custom fixed columns', () => {
    const { container } = render(
      <DesktopGrid columns={3}>
        <div>A</div>
      </DesktopGrid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('renders with auto columns and default minColumnWidth', () => {
    const { container } = render(
      <DesktopGrid columns="auto">
        <div>A</div>
      </DesktopGrid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fill, minmax(240px, 1fr))');
  });

  it('renders with auto columns and custom minColumnWidth', () => {
    const { container } = render(
      <DesktopGrid columns="auto" minColumnWidth={300}>
        <div>A</div>
      </DesktopGrid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(auto-fill, minmax(300px, 1fr))');
  });

  it('renders with custom gap', () => {
    const { container } = render(
      <DesktopGrid gap={16}>
        <div>A</div>
      </DesktopGrid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gap).toBe('16px');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <DesktopGrid data-testid="dg" aria-label="grid">
        <div>A</div>
      </DesktopGrid>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('dg');
    expect(el.getAttribute('aria-label')).toBe('grid');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <DesktopGrid ref={ref}>
        <div>A</div>
      </DesktopGrid>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <DesktopGrid className="custom">
        <div>A</div>
      </DesktopGrid>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('custom');
  });

  it('renders without children', () => {
    const { container } = render(<DesktopGrid />);
    expect(container.firstElementChild).toBeTruthy();
  });
});
