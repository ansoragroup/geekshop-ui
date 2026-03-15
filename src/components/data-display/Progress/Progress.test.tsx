import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  afterEach(() => {
    cleanup();
  });

  // Linear tests
  it('renders linear progress by default', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-valuenow to the provided value', () => {
    render(<Progress value={75} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });

  it('sets aria-valuemin and aria-valuemax', () => {
    render(<Progress value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps value to 0-100 range', () => {
    const { rerender } = render(<Progress value={-10} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<Progress value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('shows label when showLabel is true', () => {
    render(<Progress value={65} showLabel />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does not show label when showLabel is false', () => {
    const { container } = render(<Progress value={65} />);
    expect(container.querySelector('[class*="Label"]')).toBeNull();
  });

  it('shows custom label', () => {
    render(<Progress value={100} showLabel label="Complete" />);
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  it('applies size-sm class', () => {
    const { container } = render(<Progress value={50} size="sm" />);
    expect(container.firstElementChild?.className).toContain('size-sm');
  });

  it('applies size-lg class', () => {
    const { container } = render(<Progress value={50} size="lg" />);
    expect(container.firstElementChild?.className).toContain('size-lg');
  });

  it('applies custom color to bar', () => {
    const { container } = render(<Progress value={50} color="#FF0000" />);
    const bar = container.querySelector('[class*="linearBar"]') as HTMLElement;
    expect(bar.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('applies custom trackColor', () => {
    const { container } = render(<Progress value={50} trackColor="#EEE" />);
    const track = container.querySelector('[class*="linearTrack"]') as HTMLElement;
    expect(track.style.backgroundColor).toBe('rgb(238, 238, 238)');
  });

  // Circular tests
  it('renders circular variant', () => {
    const { container } = render(<Progress value={50} variant="circular" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders circular with label', () => {
    render(<Progress value={72} variant="circular" showLabel />);
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('applies custom color to circular bar', () => {
    const { container } = render(<Progress value={50} variant="circular" color="#07C160" />);
    const circles = container.querySelectorAll('circle');
    const bar = circles[1] as SVGCircleElement;
    expect(bar.style.stroke).toBeTruthy();
    // Browser normalizes hex to rgb
    expect(bar.style.stroke === '#07C160' || bar.style.stroke === 'rgb(7, 193, 96)').toBe(true);
  });

  it('applies custom className', () => {
    const { container } = render(<Progress value={50} className="my-progress" />);
    expect(container.firstElementChild?.className).toContain('my-progress');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Progress ref={ref} value={50} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
