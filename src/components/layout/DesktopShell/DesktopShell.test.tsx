import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { DesktopShell } from './DesktopShell';

describe('DesktopShell', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders main content', () => {
    render(<DesktopShell>Main content</DesktopShell>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders topBar when provided', () => {
    render(
      <DesktopShell topBar={<div>Top bar</div>}>Content</DesktopShell>,
    );
    expect(screen.getByText('Top bar')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(
      <DesktopShell header={<div>Header</div>}>Content</DesktopShell>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <DesktopShell footer={<div>Footer</div>}>Content</DesktopShell>,
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders sidebar when provided', () => {
    render(
      <DesktopShell sidebar={<div>Sidebar</div>}>Content</DesktopShell>,
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('does not render topBar/header/footer/sidebar when not provided', () => {
    const { container } = render(<DesktopShell>Content</DesktopShell>);
    expect(container.querySelector('aside')).toBeNull();
  });

  it('renders sidebar in an aside element', () => {
    const { container } = render(
      <DesktopShell sidebar={<div>Sidebar</div>}>Content</DesktopShell>,
    );
    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
    expect(aside?.textContent).toBe('Sidebar');
  });

  it('renders children in a main element', () => {
    const { container } = render(<DesktopShell>Main area</DesktopShell>);
    const main = container.querySelector('main');
    expect(main).toBeTruthy();
    expect(main?.textContent).toBe('Main area');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <DesktopShell data-testid="shell" aria-label="shell">Content</DesktopShell>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('shell');
    expect(el.getAttribute('aria-label')).toBe('shell');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<DesktopShell ref={ref}>Content</DesktopShell>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <DesktopShell className="custom-class">Content</DesktopShell>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('custom-class');
  });
});
