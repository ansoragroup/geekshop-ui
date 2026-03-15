import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Container } from './Container';

describe('Container', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(<Container>Page Content</Container>);
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('renders a div element', () => {
    const { container } = render(<Container>Content</Container>);
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('does not add navbar/tabbar classes by default', () => {
    const { container } = render(<Container>Content</Container>);
    const el = container.firstElementChild as HTMLElement;
    // Default: hasNavbar=false, hasTabbar=false
    // Only the base container class should be present
    const classNames = el.className.split(/\s+/).filter(Boolean);
    expect(classNames.length).toBe(1);
  });

  it('adds navbar class when hasNavbar is true', () => {
    const { container } = render(<Container hasNavbar>Content</Container>);
    const el = container.firstElementChild as HTMLElement;
    const classNames = el.className.split(/\s+/).filter(Boolean);
    expect(classNames.length).toBe(2);
  });

  it('adds tabbar class when hasTabbar is true', () => {
    const { container } = render(<Container hasTabbar>Content</Container>);
    const el = container.firstElementChild as HTMLElement;
    const classNames = el.className.split(/\s+/).filter(Boolean);
    expect(classNames.length).toBe(2);
  });

  it('adds both navbar and tabbar classes', () => {
    const { container } = render(<Container hasNavbar hasTabbar>Content</Container>);
    const el = container.firstElementChild as HTMLElement;
    const classNames = el.className.split(/\s+/).filter(Boolean);
    expect(classNames.length).toBe(3);
  });

  it('renders without children', () => {
    const { container } = render(<Container />);
    expect(container.firstElementChild).toBeTruthy();
  });
});
