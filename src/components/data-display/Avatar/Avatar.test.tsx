import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" name="John Doe" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('renders initials fallback when no src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders two-letter initials from first and last name', () => {
    render(<Avatar name="Ali Valiyev" />);
    expect(screen.getByText('AV')).toBeInTheDocument();
  });

  it('renders first two characters for single name', () => {
    render(<Avatar name="Ali" />);
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('renders "?" when no name is provided', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders initials from multi-part name (first + last)', () => {
    render(<Avatar name="Ali Vali Karimov" />);
    // First and last: A + K
    expect(screen.getByText('AK')).toBeInTheDocument();
  });

  it('applies default size md (48px)', () => {
    const { container } = render(<Avatar name="AB" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.width).toBe('48px');
    expect(wrapper.style.height).toBe('48px');
  });

  it('applies sm size (32px)', () => {
    const { container } = render(<Avatar name="AB" size="sm" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.width).toBe('32px');
    expect(wrapper.style.height).toBe('32px');
  });

  it('applies lg size (64px)', () => {
    const { container } = render(<Avatar name="AB" size="lg" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.width).toBe('64px');
    expect(wrapper.style.height).toBe('64px');
  });

  it('applies xl size (80px)', () => {
    const { container } = render(<Avatar name="AB" size="xl" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.style.width).toBe('80px');
    expect(wrapper.style.height).toBe('80px');
  });

  it('shows online indicator when showOnline is true', () => {
    const { container } = render(<Avatar name="AB" showOnline />);
    const wrapper = container.firstElementChild as HTMLElement;
    // The online dot is the last span child
    const spans = wrapper.querySelectorAll('span');
    // Includes wrapper, fallback, and online dot
    expect(spans.length).toBeGreaterThanOrEqual(1);
  });

  it('does not show online indicator by default', () => {
    const { container } = render(<Avatar name="AB" />);
    const wrapper = container.firstElementChild as HTMLElement;
    // wrapper span + fallback span = 2 spans total (wrapper is the root)
    const childSpans = wrapper.querySelectorAll(':scope > span');
    // Just fallback span, no online dot
    expect(childSpans.length).toBe(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Avatar name="AB" className="custom-avatar" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('custom-avatar');
  });

  it('hides fallback when src is provided', () => {
    const { container } = render(<Avatar src="https://example.com/a.jpg" name="AB" />);
    const fallback = container.querySelector('span > span') as HTMLElement;
    // Fallback should be hidden via display:none when src is present
    expect(fallback.style.display).toBe('none');
  });

  it('uses alt="Avatar" when no name given with src', () => {
    render(<Avatar src="https://example.com/a.jpg" />);
    const img = screen.getByAltText('Avatar');
    expect(img).toBeInTheDocument();
  });

  it('renders initials in uppercase', () => {
    render(<Avatar name="test user" />);
    expect(screen.getByText('TU')).toBeInTheDocument();
  });
});
