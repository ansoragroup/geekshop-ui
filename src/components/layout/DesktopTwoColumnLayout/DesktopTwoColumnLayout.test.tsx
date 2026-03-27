import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { DesktopTwoColumnLayout } from './DesktopTwoColumnLayout';

describe('DesktopTwoColumnLayout', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders sidebar and main content', () => {
    render(
      <DesktopTwoColumnLayout sidebar={<div>Sidebar</div>}>Main content</DesktopTwoColumnLayout>
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders sidebar in an aside element', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>}>Main</DesktopTwoColumnLayout>
    );
    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
    expect(aside?.textContent).toBe('Side');
  });

  it('applies default sidebar width and gap as CSS custom properties', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>}>Main</DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--tcl-sidebar-width')).toBe('240px');
    expect(el.style.getPropertyValue('--tcl-gap')).toBe('24px');
  });

  it('applies custom sidebarWidth as number', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} sidebarWidth={300}>
        Main
      </DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--tcl-sidebar-width')).toBe('300px');
  });

  it('applies custom sidebarWidth as string', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} sidebarWidth="25%">
        Main
      </DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--tcl-sidebar-width')).toBe('25%');
  });

  it('applies custom gap', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} gap={32}>
        Main
      </DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.getPropertyValue('--tcl-gap')).toBe('32px');
  });

  it('applies sticky positioning when stickyTop is set', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} stickyTop={80}>
        Main
      </DesktopTwoColumnLayout>
    );
    const aside = container.querySelector('aside') as HTMLElement;
    expect(aside.style.position).toBe('sticky');
    expect(aside.style.top).toBe('80px');
  });

  it('does not apply sticky positioning when stickyTop is not set', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>}>Main</DesktopTwoColumnLayout>
    );
    const aside = container.querySelector('aside') as HTMLElement;
    expect(aside.style.position).toBe('');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} data-testid="tcl" aria-label="layout">
        Main
      </DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('tcl');
    expect(el.getAttribute('aria-label')).toBe('layout');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <DesktopTwoColumnLayout ref={ref} sidebar={<div>Side</div>}>
        Main
      </DesktopTwoColumnLayout>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges custom className', () => {
    const { container } = render(
      <DesktopTwoColumnLayout sidebar={<div>Side</div>} className="my-class">
        Main
      </DesktopTwoColumnLayout>
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('my-class');
  });
});
