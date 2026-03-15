import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { SocialProof } from './SocialProof';

describe('SocialProof', () => {
  afterEach(cleanup);

  // Text variant
  it('renders text variant by default', () => {
    const { container } = render(<SocialProof count={100} />);
    expect(container.querySelector('[class*="textRoot"]')).toBeInTheDocument();
  });

  it('renders count in text', () => {
    render(<SocialProof count={243} period="bugun" />);
    expect(screen.getByText(/243 kishi bugun sotib oldi/)).toBeInTheDocument();
  });

  it('formats large counts with K suffix', () => {
    render(<SocialProof count={15600} />);
    expect(screen.getByText(/16K/)).toBeInTheDocument();
  });

  it('formats 1K-10K counts with decimal', () => {
    render(<SocialProof count={5400} variant="badge" />);
    expect(screen.getByText('5.4K')).toBeInTheDocument();
  });

  it('renders avatars when provided', () => {
    const { container } = render(
      <SocialProof
        count={100}
        avatars={['https://example.com/a.jpg', 'https://example.com/b.jpg']}
      />,
    );
    const imgs = container.querySelectorAll('[class*="avatar"]');
    // 2 avatar images
    expect(imgs.length).toBeGreaterThanOrEqual(2);
  });

  it('limits avatars to maxAvatars', () => {
    const { container } = render(
      <SocialProof
        count={100}
        avatars={['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg']}
        maxAvatars={3}
      />,
    );
    const imgs = container.querySelectorAll('img[class*="avatar"]');
    expect(imgs.length).toBe(3);
  });

  it('shows overflow count when avatars exceed maxAvatars', () => {
    const { container } = render(
      <SocialProof
        count={100}
        avatars={['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg']}
        maxAvatars={3}
      />,
    );
    const overflow = container.querySelector('[class*="avatarOverflow"]');
    expect(overflow).toHaveTextContent('+2');
  });

  // Toast variant
  it('renders toast variant with buyer name', () => {
    render(
      <SocialProof
        count={1}
        variant="toast"
        buyerName="Sardor A."
        timeAgo="2 min"
        avatars={['https://example.com/sardor.jpg']}
      />,
    );
    expect(screen.getByText(/Sardor A. 2 min oldin sotib oldi/)).toBeInTheDocument();
  });

  it('renders toast with aria-live for live updates', () => {
    render(<SocialProof count={1} variant="toast" buyerName="Ali" timeAgo="1 min" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('renders toast avatar when buyer name and avatars provided', () => {
    const { container } = render(
      <SocialProof
        count={1}
        variant="toast"
        buyerName="Ali"
        timeAgo="1 min"
        avatars={['https://example.com/ali.jpg']}
      />,
    );
    const img = container.querySelector('img[class*="toastAvatar"]');
    expect(img).toBeInTheDocument();
  });

  // Badge variant
  it('renders badge variant', () => {
    const { container } = render(<SocialProof count={500} variant="badge" />);
    expect(container.querySelector('[class*="badge"]')).toBeInTheDocument();
  });

  it('renders badge with count', () => {
    render(<SocialProof count={500} variant="badge" />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  // Accessibility
  it('has role="status" on text variant', () => {
    render(<SocialProof count={100} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="status" on badge variant', () => {
    render(<SocialProof count={100} variant="badge" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  // Props
  it('applies custom className', () => {
    const { container } = render(<SocialProof count={100} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders without period', () => {
    render(<SocialProof count={100} />);
    expect(screen.getByText(/100 kishi sotib oldi/)).toBeInTheDocument();
  });
});
