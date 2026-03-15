import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { StockIndicator } from './StockIndicator';

describe('StockIndicator', () => {
  afterEach(cleanup);

  // Bar variant
  it('renders bar variant by default', () => {
    const { container } = render(<StockIndicator total={100} sold={50} />);
    expect(container.querySelector('[class*="barRoot"]')).toBeInTheDocument();
  });

  it('displays sold percentage in bar text', () => {
    render(<StockIndicator total={100} sold={85} />);
    expect(screen.getByText(/85% sotildi/)).toBeInTheDocument();
  });

  it('shows urgency text when remaining is below threshold', () => {
    render(<StockIndicator total={20} sold={17} urgencyThreshold={5} />);
    expect(screen.getByText(/Faqat 3 ta qoldi!/)).toBeInTheDocument();
  });

  it('sets bar fill width based on sold percentage', () => {
    const { container } = render(<StockIndicator total={100} sold={75} />);
    const fill = container.querySelector('[class*="barFill"]') as HTMLElement;
    expect(fill.style.width).toBe('75%');
  });

  it('caps bar fill at 100%', () => {
    const { container } = render(<StockIndicator total={10} sold={15} />);
    const fill = container.querySelector('[class*="barFill"]') as HTMLElement;
    expect(fill.style.width).toBe('100%');
  });

  it('applies urgency class when remaining is below threshold', () => {
    const { container } = render(<StockIndicator total={10} sold={8} urgencyThreshold={5} />);
    const className = (container.firstChild as HTMLElement).className;
    expect(className).toMatch(/barUrgent/);
  });

  // Text variant
  it('renders text variant', () => {
    const { container } = render(<StockIndicator total={100} sold={50} variant="text" />);
    expect(container.querySelector('[class*="textRoot"]')).toBeInTheDocument();
  });

  it('shows urgency text in text variant', () => {
    render(<StockIndicator total={10} sold={9} variant="text" urgencyThreshold={5} />);
    expect(screen.getByText(/Faqat 1 ta qoldi!/)).toBeInTheDocument();
  });

  // Badge variant
  it('renders badge variant', () => {
    const { container } = render(<StockIndicator total={15} sold={12} variant="badge" />);
    expect(container.querySelector('[class*="badge"]')).toBeInTheDocument();
  });

  it('shows sold out text when remaining is 0', () => {
    render(<StockIndicator total={10} sold={10} variant="badge" />);
    expect(screen.getByText(/Mavjud emas/)).toBeInTheDocument();
  });

  // Accessibility
  it('has role="status" for bar variant', () => {
    render(<StockIndicator total={100} sold={50} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="status" for text variant', () => {
    render(<StockIndicator total={100} sold={50} variant="text" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has role="status" for badge variant', () => {
    render(<StockIndicator total={100} sold={50} variant="badge" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-label describing stock status', () => {
    render(<StockIndicator total={100} sold={85} />);
    const el = screen.getByRole('status');
    expect(el).toHaveAttribute('aria-label');
    expect(el.getAttribute('aria-label')).toContain('85%');
  });

  // Props
  it('hides count text when showCount is false', () => {
    render(<StockIndicator total={100} sold={50} showCount={false} />);
    expect(screen.queryByText(/sotildi/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <StockIndicator total={100} sold={50} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });
});
