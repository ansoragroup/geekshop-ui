import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FlashDealStrip, type FlashDealItem } from './FlashDealStrip';

const sampleItems: FlashDealItem[] = [
  {
    id: '1',
    image: '/img/deal1.jpg',
    title: 'RTX 4060',
    price: 4_200_000,
    originalPrice: 5_800_000,
    discount: '-28%',
    soldPercent: 72,
  },
  {
    id: '2',
    image: '/img/deal2.jpg',
    title: 'Ryzen 5 7600X',
    price: 2_100_000,
    originalPrice: 3_200_000,
    discount: '-34%',
    soldPercent: 58,
  },
  {
    id: '3',
    image: '/img/deal3.jpg',
    title: 'Samsung 990 Pro',
    price: 3_400_000,
    originalPrice: 4_100_000,
    discount: '-17%',
    soldPercent: 45,
  },
];

const endTime = new Date(Date.now() + 3_600_000); // 1 hour from now

describe('FlashDealStrip', () => {
  it('renders the default title', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByText('FLASH DEALS')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} title="MEGA SALE" />);
    expect(screen.getByText('MEGA SALE')).toBeInTheDocument();
  });

  it('renders countdown timer', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByRole('timer')).toBeInTheDocument();
    expect(screen.getByText('Ends in:')).toBeInTheDocument();
  });

  it('renders all deal items', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByText('-28%')).toBeInTheDocument();
    expect(screen.getByText('-34%')).toBeInTheDocument();
    expect(screen.getByText('-17%')).toBeInTheDocument();
  });

  it('renders item images with alt text', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'RTX 4060');
  });

  it('renders sold percentage labels', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByText('72% sold')).toBeInTheDocument();
    expect(screen.getByText('58% sold')).toBeInTheDocument();
    expect(screen.getByText('45% sold')).toBeInTheDocument();
  });

  it('renders buy buttons for each item', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    const buyButtons = screen.getAllByText('BUY');
    expect(buyButtons).toHaveLength(3);
  });

  it('calls onBuy when buy button is clicked', async () => {
    const onBuy = vi.fn();
    const user = userEvent.setup();

    render(<FlashDealStrip items={sampleItems} endTime={endTime} onBuy={onBuy} />);
    const buyButtons = screen.getAllByText('BUY');
    await user.click(buyButtons[0]);

    expect(onBuy).toHaveBeenCalledOnce();
    expect(onBuy).toHaveBeenCalledWith(sampleItems[0]);
  });

  it('renders View All button when onViewAll is provided', () => {
    const onViewAll = vi.fn();
    render(<FlashDealStrip items={sampleItems} endTime={endTime} onViewAll={onViewAll} />);
    expect(screen.getByText(/View All/)).toBeInTheDocument();
  });

  it('does not render View All button when onViewAll is not provided', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.queryByText(/View All/)).not.toBeInTheDocument();
  });

  it('calls onViewAll when View All is clicked', async () => {
    const onViewAll = vi.fn();
    const user = userEvent.setup();

    render(<FlashDealStrip items={sampleItems} endTime={endTime} onViewAll={onViewAll} />);
    await user.click(screen.getByText(/View All/));

    expect(onViewAll).toHaveBeenCalledOnce();
  });

  it('renders scroll arrows', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  });

  it('renders price in compact format', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByText('4.2M')).toBeInTheDocument();
    expect(screen.getByText('2.1M')).toBeInTheDocument();
  });

  it('renders original price crossed out', () => {
    const { container } = render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    const originalPrices = container.querySelectorAll('[class*="cardOriginalPrice"]');
    expect(originalPrices.length).toBe(3);
  });

  it('applies custom className', () => {
    const { container } = render(
      <FlashDealStrip items={sampleItems} endTime={endTime} className="custom-strip" />,
    );
    expect(container.firstElementChild?.className).toContain('custom-strip');
  });

  it('buy buttons have accessible labels', () => {
    render(<FlashDealStrip items={sampleItems} endTime={endTime} />);
    expect(screen.getByLabelText('Buy RTX 4060')).toBeInTheDocument();
    expect(screen.getByLabelText('Buy Ryzen 5 7600X')).toBeInTheDocument();
  });
});
