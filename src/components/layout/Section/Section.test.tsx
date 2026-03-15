import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Section } from './Section';

describe('Section', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(<Section>Section Content</Section>);
    expect(screen.getByText('Section Content')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(<Section title="My Section">Content</Section>);
    expect(screen.getByText('My Section')).toBeInTheDocument();
  });

  it('renders title as h3 element', () => {
    render(<Section title="Title Here">Content</Section>);
    const heading = screen.getByText('Title Here');
    expect(heading.tagName).toBe('H3');
  });

  it('does not render header when no title', () => {
    const { container } = render(<Section>Content only</Section>);
    const h3 = container.querySelector('h3');
    expect(h3).toBeNull();
  });

  it('applies custom padding to body', () => {
    const { container } = render(<Section padding="24px">Content</Section>);
    // The body is the last child of the section root
    const section = container.firstElementChild as HTMLElement;
    const body = section.lastElementChild as HTMLElement;
    expect(body.style.padding).toBe('24px');
  });

  it('does not apply padding style when not specified', () => {
    const { container } = render(<Section>Content</Section>);
    const section = container.firstElementChild as HTMLElement;
    const body = section.lastElementChild as HTMLElement;
    expect(body.style.padding).toBe('');
  });

  it('renders without children', () => {
    const { container } = render(<Section title="Empty Section" />);
    expect(container.firstElementChild).toBeTruthy();
    expect(screen.getByText('Empty Section')).toBeInTheDocument();
  });

  it('renders both title and children together', () => {
    render(
      <Section title="Products" padding="16px">
        <div>Product List</div>
      </Section>,
    );
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Product List')).toBeInTheDocument();
  });
});
