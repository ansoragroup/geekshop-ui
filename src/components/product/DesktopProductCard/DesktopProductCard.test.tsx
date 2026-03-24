import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopProductCard } from './DesktopProductCard';

const defaultProps = {
  image: '/img/gpu1.jpg',
  title: 'RTX 4060 8GB',
  price: 8_900_000,
};

describe('DesktopProductCard', () => {
  it('renders the product title', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText('RTX 4060 8GB')).toBeInTheDocument();
  });

  it('renders the product image', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/img/gpu1.jpg');
    expect(img).toHaveAttribute('alt', 'RTX 4060 8GB');
  });

  it('renders with role button and tabIndex 0', () => {
    render(<DesktopProductCard {...defaultProps} />);
    const card = screen.getByRole('button', { name: /RTX 4060/i });
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: /RTX 4060/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button', { name: /RTX 4060/i }).focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Space key press', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductCard {...defaultProps} onClick={onClick} />);
    screen.getByRole('button', { name: /RTX 4060/i }).focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders discount text when provided', () => {
    render(<DesktopProductCard {...defaultProps} originalPrice={12_000_000} discount="-26%" />);
    expect(screen.getByText('-26%')).toBeInTheDocument();
  });

  it('renders current price with currency', () => {
    render(<DesktopProductCard {...defaultProps} />);
    expect(screen.getByText(/8.900.000.*UZS/)).toBeInTheDocument();
  });

  it('renders original price with strikethrough when provided', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} originalPrice={12_000_000} />,
    );
    expect(container.querySelector('[class*="originalPrice"]')).toBeInTheDocument();
  });

  it('renders discount percent next to original price', () => {
    render(
      <DesktopProductCard {...defaultProps} originalPrice={12_000_000} discount="-26%" />,
    );
    expect(screen.getByText('-26%')).toBeInTheDocument();
  });

  it('renders rating when provided', () => {
    render(<DesktopProductCard {...defaultProps} rating={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders purchase count when provided', () => {
    render(<DesktopProductCard {...defaultProps} purchaseCount={120} />);
    expect(screen.getByText(/120 купили/)).toBeInTheDocument();
  });

  it('renders reviewCount as purchase count for backward compat', () => {
    render(<DesktopProductCard {...defaultProps} reviewCount={1234} />);
    expect(screen.getByText(/1.234 купили/)).toBeInTheDocument();
  });

  it('renders badges on image when provided', () => {
    render(
      <DesktopProductCard
        {...defaultProps}
        badges={[
          { label: 'SALE', variant: 'sale' },
          { label: 'ТОП', variant: 'top' },
        ]}
      />,
    );
    expect(screen.getByText('SALE')).toBeInTheDocument();
    expect(screen.getByText('ТОП')).toBeInTheDocument();
  });

  it('renders legacy badge format', () => {
    render(
      <DesktopProductCard
        {...defaultProps}
        badges={[
          { label: 'ORIGINAL', color: 'green' },
          { label: 'ARZON NARX', color: 'blue' },
        ]}
      />,
    );
    expect(screen.getByText('ORIGINAL')).toBeInTheDocument();
    expect(screen.getByText('ARZON NARX')).toBeInTheDocument();
  });

  it('renders recommended label when enabled', () => {
    render(<DesktopProductCard {...defaultProps} recommended />);
    expect(screen.getByText('Рекомендуем')).toBeInTheDocument();
  });

  it('renders custom recommended text', () => {
    render(<DesktopProductCard {...defaultProps} recommended recommendedText="Bestseller" />);
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
  });

  it('renders delivery text when provided', () => {
    render(<DesktopProductCard {...defaultProps} deliveryText="до 30 дней, бесплатно" />);
    expect(screen.getByText('до 30 дней, бесплатно')).toBeInTheDocument();
  });

  it('renders default delivery text when freeShipping', () => {
    render(<DesktopProductCard {...defaultProps} freeShipping />);
    expect(screen.getByText('до 30 дней, бесплатно')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductCard {...defaultProps} className="my-card" />,
    );
    expect(container.firstElementChild?.className).toContain('my-card');
  });

  it('renders custom currency', () => {
    render(<DesktopProductCard {...defaultProps} currency="USD" />);
    expect(screen.getByText(/USD/)).toBeInTheDocument();
  });
});
