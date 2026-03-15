import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Grid } from './Grid';

describe('Grid', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('defaults to 2 columns', () => {
    const { container } = render(
      <Grid>
        <div>A</div>
        <div>B</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  it('renders with custom columns', () => {
    const { container } = render(
      <Grid columns={3}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  it('defaults to 8px gap', () => {
    const { container } = render(
      <Grid>
        <div>A</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gap).toBe('8px');
  });

  it('renders with custom gap', () => {
    const { container } = render(
      <Grid gap="16px">
        <div>A</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gap).toBe('16px');
  });

  it('renders with 1 column', () => {
    const { container } = render(
      <Grid columns={1}>
        <div>A</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(1, 1fr)');
  });

  it('renders with 4 columns and custom gap', () => {
    const { container } = render(
      <Grid columns={4} gap="12px">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
      </Grid>,
    );
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
    expect(grid.style.gap).toBe('12px');
  });

  it('renders without children', () => {
    const { container } = render(<Grid />);
    expect(container.firstElementChild).toBeTruthy();
  });
});
