import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ShopCard } from './ShopCard';

const props = {
  name: 'Test Shop',
  logo: 'https://example.com/logo.jpg',
  rating: 4.5,
  followersCount: 1200,
  productsCount: 50,
};

describe('ShopCard', () => {
  afterEach(cleanup);

  it('renders shop name', () => {
    render(<ShopCard {...props} />);
    expect(screen.getByText('Test Shop')).toBeInTheDocument();
  });

  it('renders shop logo', () => {
    render(<ShopCard {...props} />);
    expect(screen.getByAltText('Test Shop')).toBeInTheDocument();
  });

  it('renders rating with 1 decimal', () => {
    render(<ShopCard {...props} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders product count', () => {
    render(<ShopCard {...props} />);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('renders formatted follower count', () => {
    render(<ShopCard {...props} followersCount={12500} />);
    expect(screen.getByText('13K')).toBeInTheDocument();
  });

  it('renders response rate when provided', () => {
    render(<ShopCard {...props} responseRate={95} />);
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('does not render response rate when not provided', () => {
    const { container } = render(<ShopCard {...props} />);
    const dividers = container.querySelectorAll('[class*="statDivider"]');
    expect(dividers.length).toBe(1); // Only one divider between products and followers
  });

  it('shows follow button when not followed', () => {
    render(<ShopCard {...props} onFollow={() => {}} />);
    expect(screen.getByRole('button', { name: /Obuna$/i })).toBeInTheDocument();
  });

  it('shows following button when already followed', () => {
    render(<ShopCard {...props} isFollowed onFollow={() => {}} />);
    const btn = screen.getByRole('button', { name: /bo'lgan/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onFollow when follow button clicked', async () => {
    const onFollow = vi.fn();
    const user = userEvent.setup();
    render(<ShopCard {...props} onFollow={onFollow} />);
    await user.click(screen.getByRole('button', { name: /Obuna$/i }));
    expect(onFollow).toHaveBeenCalledTimes(1);
  });

  it('renders enter button when onEnter provided', () => {
    render(<ShopCard {...props} onEnter={() => {}} />);
    expect(screen.getByLabelText(/kirish/i)).toBeInTheDocument();
  });

  it('does not render enter button when onEnter not provided', () => {
    render(<ShopCard {...props} />);
    expect(screen.queryByLabelText(/kirish/i)).not.toBeInTheDocument();
  });

  it('calls onEnter when enter button clicked', async () => {
    const onEnter = vi.fn();
    const user = userEvent.setup();
    render(<ShopCard {...props} onEnter={onEnter} />);
    await user.click(screen.getByLabelText(/kirish/i));
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it('makes card clickable when onEnter is provided', () => {
    render(<ShopCard {...props} onEnter={() => {}} />);
    const card = screen.getAllByRole('button')[0];
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('responds to Enter key when onEnter provided', async () => {
    const onEnter = vi.fn();
    const user = userEvent.setup();
    render(<ShopCard {...props} onEnter={onEnter} />);
    const card = screen.getAllByRole('button')[0];
    card.focus();
    await user.keyboard('{Enter}');
    expect(onEnter).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<ShopCard {...props} className="my-class" />);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
