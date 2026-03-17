import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopDealCard } from './DesktopDealCard';

const defaultProps = {
  image: '/deal.jpg',
  title: 'RTX 4060 8GB',
  price: 8_900_000,
  originalPrice: 12_000_000,
  discount: 26,
};

describe('DesktopDealCard', () => {
  it('renders the product title', () => {
    render(<DesktopDealCard {...defaultProps} />);
    expect(screen.getByText('RTX 4060 8GB')).toBeInTheDocument();
  });

  it('renders the product image with alt text', () => {
    render(<DesktopDealCard {...defaultProps} />);
    const img = screen.getByAltText('RTX 4060 8GB');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/deal.jpg');
  });

  it('renders formatted current price', () => {
    render(<DesktopDealCard {...defaultProps} />);
    expect(screen.getByText(/8.900.000/)).toBeInTheDocument();
  });

  it('renders formatted original price with strikethrough', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} />);
    const original = container.querySelector('[class*="originalPrice"]');
    expect(original).toBeInTheDocument();
    expect(original?.textContent).toMatch(/12.000.000/);
  });

  it('renders discount badge on image', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} />);
    const badge = container.querySelector('[class*="discountBadge"]');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe('-26%');
  });

  it('renders discount tag in price row', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} />);
    const tag = container.querySelector('[class*="discountTag"]');
    expect(tag).toBeInTheDocument();
    expect(tag?.textContent).toBe('-26%');
  });

  it('renders progress bar when soldPercent is provided', () => {
    render(<DesktopDealCard {...defaultProps} soldPercent={68} />);
    expect(screen.getByText('68% sold')).toBeInTheDocument();
  });

  it('does not render progress bar when soldPercent is 0', () => {
    render(<DesktopDealCard {...defaultProps} soldPercent={0} />);
    expect(screen.queryByText(/% sold/)).not.toBeInTheDocument();
  });

  it('does not render progress bar when soldPercent is not provided', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} />);
    expect(container.querySelector('[class*="progressBar"]')).not.toBeInTheDocument();
  });

  it('clamps progress fill width at 100%', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} soldPercent={120} />);
    const fill = container.querySelector('[class*="progressFill"]');
    expect(fill).toHaveStyle({ width: '100%' });
  });

  it('renders rating stars when provided', () => {
    render(<DesktopDealCard {...defaultProps} rating={4} />);
    expect(screen.getByLabelText(/Rating: 4 out of 5/)).toBeInTheDocument();
  });

  it('renders review count when provided', () => {
    render(<DesktopDealCard {...defaultProps} rating={4} reviewCount={234} />);
    expect(screen.getByText('(234 reviews)')).toBeInTheDocument();
  });

  it('does not render rating row when rating is not provided', () => {
    const { container } = render(<DesktopDealCard {...defaultProps} />);
    expect(container.querySelector('[class*="ratingRow"]')).not.toBeInTheDocument();
  });

  it('renders countdown when endTime is provided', () => {
    const future = new Date(Date.now() + 3_600_000);
    render(<DesktopDealCard {...defaultProps} endTime={future} />);
    expect(screen.getByText('remaining')).toBeInTheDocument();
  });

  it('does not render countdown when endTime is not provided', () => {
    render(<DesktopDealCard {...defaultProps} />);
    expect(screen.queryByText('remaining')).not.toBeInTheDocument();
  });

  it('renders Buy Now button', () => {
    render(<DesktopDealCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Buy/i })).toBeInTheDocument();
  });

  it('calls onBuy when Buy Now is clicked', async () => {
    const onBuy = vi.fn();
    const user = userEvent.setup();
    render(<DesktopDealCard {...defaultProps} onBuy={onBuy} />);
    await user.click(screen.getByRole('button', { name: /Buy/i }));
    expect(onBuy).toHaveBeenCalledOnce();
  });

  it('calls onClick when card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopDealCard {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByText('RTX 4060 8GB'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not propagate click from Buy button to card onClick', async () => {
    const onClick = vi.fn();
    const onBuy = vi.fn();
    const user = userEvent.setup();
    render(<DesktopDealCard {...defaultProps} onClick={onClick} onBuy={onBuy} />);
    // Use getAllByRole since both the card (role=button) and Buy Now button match
    const buttons = screen.getAllByRole('button', { name: /Buy/i });
    const buyButton = buttons.find((b) => b.tagName === 'BUTTON')!;
    await user.click(buyButton);
    expect(onBuy).toHaveBeenCalledOnce();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopDealCard {...defaultProps} className="my-deal" />,
    );
    expect(container.firstElementChild?.className).toContain('my-deal');
  });

  it('has role button and tabIndex when onClick is provided', () => {
    render(<DesktopDealCard {...defaultProps} onClick={vi.fn()} />);
    const buttons = screen.getAllByRole('button');
    // First button is the card itself (role="button"), second is Buy Now
    const card = buttons.find((b) => b.getAttribute('tabindex') === '0' && b.className.includes('root'));
    expect(card).toBeTruthy();
  });

  it('does not have role button when onClick is not provided', () => {
    render(<DesktopDealCard {...defaultProps} />);
    // Only the Buy Now button should exist
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toBe('Buy Now');
  });
});
