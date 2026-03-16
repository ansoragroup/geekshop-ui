import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopHeader } from './DesktopHeader';

describe('DesktopHeader', () => {
  it('renders as a header element', () => {
    render(<DesktopHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders default logo text when no logo prop provided', () => {
    render(<DesktopHeader />);
    expect(screen.getByText('GeekShop')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    render(<DesktopHeader logo={<img alt="Custom Logo" />} />);
    expect(screen.getByAltText('Custom Logo')).toBeInTheDocument();
  });

  it('renders search input with placeholder', () => {
    render(<DesktopHeader searchPlaceholder="Find products..." />);
    expect(screen.getByPlaceholderText('Find products...')).toBeInTheDocument();
  });

  it('renders search input with aria-label', () => {
    render(<DesktopHeader />);
    expect(screen.getByLabelText('Search products')).toBeInTheDocument();
  });

  it('calls onSearchChange when typing', () => {
    const onSearchChange = vi.fn();
    render(<DesktopHeader onSearchChange={onSearchChange} searchValue="" />);
    const input = screen.getByLabelText('Search products');
    fireEvent.change(input, { target: { value: 'GPU' } });
    expect(onSearchChange).toHaveBeenCalledWith('GPU');
  });

  it('calls onSearch when form is submitted', () => {
    const onSearch = vi.fn();
    render(<DesktopHeader onSearch={onSearch} searchValue="RTX 4090" />);
    const form = screen.getByRole('search');
    fireEvent.submit(form);
    expect(onSearch).toHaveBeenCalledWith('RTX 4090');
  });

  it('renders cart badge with count', () => {
    render(<DesktopHeader cartCount={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart (3 items)')).toBeInTheDocument();
  });

  it('renders wishlist badge with count', () => {
    render(<DesktopHeader wishlistCount={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByLabelText('Wishlist (5 items)')).toBeInTheDocument();
  });

  it('shows 99+ for counts over 99', () => {
    render(<DesktopHeader cartCount={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render badge when count is 0', () => {
    render(<DesktopHeader cartCount={0} />);
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('calls onCartClick when cart button is clicked', () => {
    const onCartClick = vi.fn();
    render(<DesktopHeader onCartClick={onCartClick} />);
    fireEvent.click(screen.getByLabelText('Cart'));
    expect(onCartClick).toHaveBeenCalledOnce();
  });

  it('calls onWishlistClick when wishlist button is clicked', () => {
    const onWishlistClick = vi.fn();
    render(<DesktopHeader onWishlistClick={onWishlistClick} />);
    fireEvent.click(screen.getByLabelText('Wishlist'));
    expect(onWishlistClick).toHaveBeenCalledOnce();
  });

  it('calls onUserClick when user button is clicked', () => {
    const onUserClick = vi.fn();
    render(<DesktopHeader onUserClick={onUserClick} />);
    fireEvent.click(screen.getByLabelText('User account'));
    expect(onUserClick).toHaveBeenCalledOnce();
  });

  it('calls onLogoClick when logo is clicked', () => {
    const onLogoClick = vi.fn();
    render(<DesktopHeader onLogoClick={onLogoClick} />);
    fireEvent.click(screen.getByText('GeekShop'));
    expect(onLogoClick).toHaveBeenCalledOnce();
  });

  it('logo is keyboard accessible when onLogoClick is provided', () => {
    const onLogoClick = vi.fn();
    render(<DesktopHeader onLogoClick={onLogoClick} />);
    const logo = screen.getByText('GeekShop').closest('[role="button"]');
    expect(logo).toHaveAttribute('tabIndex', '0');
    fireEvent.keyDown(logo!, { key: 'Enter' });
    expect(onLogoClick).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    const { container } = render(<DesktopHeader className="custom" />);
    expect(container.querySelector('header')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<DesktopHeader data-testid="desktop-header" />);
    expect(screen.getByTestId('desktop-header')).toBeInTheDocument();
  });
});
