import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { QRCode } from './QRCode';

describe('QRCode', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with a value', () => {
    render(<QRCode value="https://geekshop.uz" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders an SVG element', () => {
    const { container } = render(<QRCode value="https://geekshop.uz" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies the correct size', () => {
    render(<QRCode value="test" size={150} />);
    const img = screen.getByRole('img');
    expect(img.style.width).toBe('150px');
    expect(img.style.height).toBe('150px');
  });

  it('applies default size of 200', () => {
    render(<QRCode value="test" />);
    const img = screen.getByRole('img');
    expect(img.style.width).toBe('200px');
    expect(img.style.height).toBe('200px');
  });

  it('renders with custom foreground color', () => {
    const { container } = render(<QRCode value="test" color="#FF0000" />);
    const rects = container.querySelectorAll('rect[fill="#FF0000"]');
    expect(rects.length).toBeGreaterThan(0);
  });

  it('renders with custom background color', () => {
    const { container } = render(<QRCode value="test" bgColor="#F0F0F0" />);
    const bgRect = container.querySelector('rect[fill="#F0F0F0"]');
    expect(bgRect).toBeInTheDocument();
  });

  it('renders logo when provided', () => {
    const { container } = render(
      <QRCode value="test" logo="https://example.com/logo.png" />,
    );
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.src).toBe('https://example.com/logo.png');
  });

  it('does not render logo when not provided', () => {
    const { container } = render(<QRCode value="test" />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(0);
  });

  it('has aria-label with the value', () => {
    render(<QRCode value="https://geekshop.uz" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'QR code: https://geekshop.uz');
  });

  it('applies custom className', () => {
    const { container } = render(<QRCode value="test" className="my-qr" />);
    expect(container.firstElementChild?.className).toContain('my-qr');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<QRCode ref={ref} value="test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders empty div for empty value', () => {
    const { container } = render(<QRCode value="" />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });

  it('renders with different error levels', () => {
    const { container: l } = render(<QRCode value="test" errorLevel="L" />);
    const { container: h } = render(<QRCode value="test" errorLevel="H" />);
    // Both should render QR codes, but H has more modules
    expect(l.querySelector('svg')).toBeInTheDocument();
    expect(h.querySelector('svg')).toBeInTheDocument();
  });

  it('uses higher error correction when logo is present', () => {
    const { container } = render(
      <QRCode value="test" errorLevel="L" logo="https://example.com/logo.png" />,
    );
    // Should still render (internally uses H when logo present)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
