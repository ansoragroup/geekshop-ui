import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('DIV');
  });

  it('renders vertical divider', () => {
    const { container } = render(<Divider vertical />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.tagName).toBe('SPAN');
  });

  it('renders full variant by default', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders inset variant', () => {
    const { container } = render(<Divider variant="inset" />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toBeTruthy();
  });

  it('renders withText variant with text', () => {
    render(<Divider variant="withText" text="or" />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });

  it('renders withText variant with line elements', () => {
    const { container } = render(<Divider variant="withText" text="divider text" />);
    // Should have a wrapper div with 3 children: line, text, line
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.children.length).toBe(3);
    // Middle child should contain the text
    expect(wrapper.children[1].textContent).toBe('divider text');
  });

  it('renders horizontal when withText variant has no text', () => {
    const { container } = render(<Divider variant="withText" />);
    const el = container.firstElementChild as HTMLElement;
    // Falls through to horizontal rendering since text is falsy
    expect(el.tagName).toBe('DIV');
  });

  it('vertical prop takes precedence over variant', () => {
    const { container } = render(<Divider vertical variant="withText" text="test" />);
    const el = container.firstElementChild as HTMLElement;
    // vertical returns early as a span
    expect(el.tagName).toBe('SPAN');
  });
});
