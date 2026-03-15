import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { ReviewCard } from './ReviewCard';

describe('ReviewCard', () => {
  afterEach(() => {
    cleanup();
  });

  const baseProps = {
    user: { name: 'Ali Valiyev', avatar: 'https://example.com/avatar.jpg' },
    rating: 4,
    content: 'Ajoyib mahsulot, juda yoqdi!',
    date: '2024-01-15',
  };

  it('renders user name', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('Ali Valiyev')).toBeInTheDocument();
  });

  it('renders review date', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('renders review content', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.getByText('Ajoyib mahsulot, juda yoqdi!')).toBeInTheDocument();
  });

  it('renders rating stars', () => {
    const { container } = render(<ReviewCard {...baseProps} />);
    // Rating component renders SVG stars
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders variant text when provided', () => {
    render(<ReviewCard {...baseProps} variant="Qora, 256GB" />);
    expect(screen.getByText(/Qora, 256GB/)).toBeInTheDocument();
  });

  it('does not render variant when not provided', () => {
    render(<ReviewCard {...baseProps} />);
    expect(screen.queryByText(/Varianti:/)).toBeNull();
  });

  it('renders review images when provided', () => {
    const images = ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'];
    render(<ReviewCard {...baseProps} images={images} />);
    expect(screen.getByAltText('Rasm 1')).toBeInTheDocument();
    expect(screen.getByAltText('Rasm 2')).toBeInTheDocument();
  });

  it('does not render images section when no images', () => {
    const { container } = render(<ReviewCard {...baseProps} />);
    const imgs = container.querySelectorAll('img');
    // Only the avatar img, no review images
    expect(imgs.length).toBe(1);
  });

  it('does not render images section for empty array', () => {
    const { container } = render(<ReviewCard {...baseProps} images={[]} />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(1); // Only avatar
  });

  it('renders avatar for user', () => {
    const { container } = render(<ReviewCard {...baseProps} />);
    const avatarImg = container.querySelector('img');
    expect(avatarImg).toBeInTheDocument();
  });

  it('renders without user avatar', () => {
    const props = {
      ...baseProps,
      user: { name: 'Test User' },
    };
    render(<ReviewCard {...props} />);
    // Avatar should show initials fallback
    expect(screen.getByText('TU')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<ReviewCard {...baseProps} className="my-review" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-review');
  });

  it('renders variant with prefix text', () => {
    render(<ReviewCard {...baseProps} variant="128GB" />);
    expect(screen.getByText('Varianti: 128GB')).toBeInTheDocument();
  });
});
