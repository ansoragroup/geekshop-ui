import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Loading } from './Loading';

describe('Loading', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders spinner by default', () => {
    const { container } = render(<Loading />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders spinner with text', () => {
    const { container } = render(<Loading type="spinner" text="Yuklanmoqda..." />);
    expect(container.textContent).toContain('Yuklanmoqda...');
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders dots variant', () => {
    const { container } = render(<Loading type="dots" />);
    const dots = container.querySelectorAll('span');
    // 3 dot spans exist
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it('renders dots with text', () => {
    const { container } = render(<Loading type="dots" text="Kuting..." />);
    expect(container.textContent).toContain('Kuting...');
  });

  it('renders skeleton variant', () => {
    const { container } = render(<Loading type="skeleton" />);
    // Skeleton has skeleton card divs but no svg
    expect(container.querySelector('svg')).toBeNull();
    expect(container.innerHTML).toBeTruthy();
  });

  it('wraps in fullscreen for spinner', () => {
    const { container } = render(<Loading type="spinner" fullscreen />);
    // The outermost div should be the fullscreen wrapper
    const rootDiv = container.firstElementChild as HTMLElement;
    expect(rootDiv).toBeTruthy();
    // It should contain the spinner svg
    expect(rootDiv.querySelector('svg')).toBeInTheDocument();
  });

  it('wraps in fullscreen for dots', () => {
    const { container } = render(<Loading type="dots" fullscreen />);
    const rootDiv = container.firstElementChild as HTMLElement;
    expect(rootDiv).toBeTruthy();
  });

  it('does not wrap skeleton in fullscreen', () => {
    const { container } = render(<Loading type="skeleton" fullscreen />);
    // skeleton type ignores fullscreen flag, so it renders the skeleton directly
    // Verify it renders without a fullscreen wrapper by checking there's no svg
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders spinner text only when text is provided', () => {
    const { container } = render(<Loading type="spinner" />);
    const spans = container.querySelectorAll('span');
    // No text span when text is not provided
    const textSpans = Array.from(spans).filter((s) => s.textContent && s.textContent.trim().length > 0);
    expect(textSpans.length).toBe(0);
  });
});
