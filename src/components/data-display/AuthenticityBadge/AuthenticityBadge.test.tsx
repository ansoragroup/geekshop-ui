import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { AuthenticityBadge } from './AuthenticityBadge';

describe('AuthenticityBadge', () => {
  afterEach(() => {
    cleanup();
  });

  // Inline tests
  it('renders inline verified badge', () => {
    render(<AuthenticityBadge status="verified" />);
    expect(screen.getByText('Tekshirilgan')).toBeInTheDocument();
  });

  it('renders inline pending badge', () => {
    render(<AuthenticityBadge status="pending" />);
    expect(screen.getByText('Tekshirilmoqda')).toBeInTheDocument();
  });

  it('renders inline unverified badge', () => {
    render(<AuthenticityBadge status="unverified" />);
    expect(screen.getByText('Tekshirilmagan')).toBeInTheDocument();
  });

  it('has role="status"', () => {
    render(<AuthenticityBadge status="verified" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has appropriate aria-label', () => {
    render(<AuthenticityBadge status="verified" />);
    expect(screen.getByLabelText('Tekshirilgan GeekShop Verify')).toBeInTheDocument();
  });

  it('renders verifier name', () => {
    render(<AuthenticityBadge status="verified" verifiedBy="Poizon Auth" />);
    expect(screen.getByText('Poizon Auth')).toBeInTheDocument();
  });

  it('defaults verifier to GeekShop Verify', () => {
    render(<AuthenticityBadge status="verified" />);
    expect(screen.getByText('GeekShop Verify')).toBeInTheDocument();
  });

  // Card tests
  it('renders card variant', () => {
    const { container } = render(
      <AuthenticityBadge status="verified" type="card" />,
    );
    expect(container.firstElementChild?.className).toContain('card');
  });

  it('renders verifiedDate in card variant', () => {
    render(
      <AuthenticityBadge
        status="verified"
        type="card"
        verifiedDate="2026-03-15"
      />,
    );
    expect(screen.getByText('2026-03-15')).toBeInTheDocument();
  });

  it('does not render date when not provided in card', () => {
    const { container } = render(
      <AuthenticityBadge status="verified" type="card" />,
    );
    expect(container.querySelector('[class*="cardDate"]')).toBeNull();
  });

  it('applies status-verified class', () => {
    const { container } = render(<AuthenticityBadge status="verified" />);
    expect(container.firstElementChild?.className).toContain('status-verified');
  });

  it('applies status-pending class', () => {
    const { container } = render(<AuthenticityBadge status="pending" />);
    expect(container.firstElementChild?.className).toContain('status-pending');
  });

  it('applies status-unverified class', () => {
    const { container } = render(<AuthenticityBadge status="unverified" />);
    expect(container.firstElementChild?.className).toContain('status-unverified');
  });

  it('renders shield icon SVG', () => {
    const { container } = render(<AuthenticityBadge status="verified" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders large shield icon in card variant', () => {
    const { container } = render(
      <AuthenticityBadge status="verified" type="card" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AuthenticityBadge status="verified" className="my-badge" />,
    );
    expect(container.firstElementChild?.className).toContain('my-badge');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<AuthenticityBadge ref={ref} status="verified" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
