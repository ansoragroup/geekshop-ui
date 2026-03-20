import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { DesktopContainer } from './DesktopContainer';

describe('DesktopContainer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(<DesktopContainer>Content here</DesktopContainer>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('applies default max-width and padding as CSS custom properties', () => {
    const { container } = render(<DesktopContainer>Content</DesktopContainer>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--dc-max-width')).toBe('1200px');
    expect(el.style.getPropertyValue('--dc-padding')).toBe('24px');
  });

  it('applies custom maxWidth and padding', () => {
    const { container } = render(
      <DesktopContainer maxWidth={800} padding={32}>Content</DesktopContainer>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--dc-max-width')).toBe('800px');
    expect(el.style.getPropertyValue('--dc-padding')).toBe('32px');
  });

  it('wraps children in inner div when fullWidth is true', () => {
    const { container } = render(
      <DesktopContainer fullWidth>Content</DesktopContainer>,
    );
    const root = container.firstElementChild as HTMLElement;
    const inner = root.firstElementChild as HTMLElement;
    expect(inner).toBeTruthy();
    expect(inner.textContent).toBe('Content');
  });

  it('does not wrap children in inner div when fullWidth is false', () => {
    const { container } = render(
      <DesktopContainer>Direct content</DesktopContainer>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.textContent).toBe('Direct content');
    // No inner wrapper — the text node is directly inside root
    expect(root.children.length).toBe(0);
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <DesktopContainer data-testid="dc" aria-label="container">Content</DesktopContainer>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('dc');
    expect(el.getAttribute('aria-label')).toBe('container');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DesktopContainer ref={ref}>Content</DesktopContainer>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <DesktopContainer className="custom">Content</DesktopContainer>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('custom');
  });
});
