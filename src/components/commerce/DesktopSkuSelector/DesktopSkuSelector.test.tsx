import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopSkuSelector } from './DesktopSkuSelector';

const defaultProps = {
  variants: [
    {
      name: 'Color',
      options: [
        { value: 'Black' },
        { value: 'White' },
        { value: 'Blue' },
      ],
    },
    {
      name: 'Storage',
      options: [
        { value: '128GB' },
        { value: '256GB' },
        { value: '512GB' },
      ],
    },
  ],
  selectedValues: { Color: 'Black', Storage: '256GB' },
};

describe('DesktopSkuSelector', () => {
  it('renders variant group labels', () => {
    render(<DesktopSkuSelector {...defaultProps} />);
    expect(screen.getByText(/Color:/)).toBeInTheDocument();
    expect(screen.getByText(/Storage:/)).toBeInTheDocument();
  });

  it('renders all option chips', () => {
    render(<DesktopSkuSelector {...defaultProps} />);
    // Selected values appear twice (label + chip), so use getAllByText for those
    expect(screen.getAllByText('Black').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('128GB')).toBeInTheDocument();
    expect(screen.getAllByText('256GB').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('512GB')).toBeInTheDocument();
  });

  it('marks selected options with aria-checked', () => {
    render(<DesktopSkuSelector {...defaultProps} />);
    const blackOption = screen.getByRole('radio', { name: 'Color: Black' });
    expect(blackOption).toHaveAttribute('aria-checked', 'true');
    const whiteOption = screen.getByRole('radio', { name: 'Color: White' });
    expect(whiteOption).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onSelect when option is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSkuSelector {...defaultProps} onSelect={onSelect} />);
    await user.click(screen.getByRole('radio', { name: 'Color: White' }));
    expect(onSelect).toHaveBeenCalledWith('Color', 'White');
  });

  it('does not call onSelect for disabled options', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    const variants = [
      {
        name: 'Color',
        options: [
          { value: 'Black' },
          { value: 'Red', disabled: true },
        ],
      },
    ];
    render(<DesktopSkuSelector variants={variants} onSelect={onSelect} />);
    await user.click(screen.getByRole('radio', { name: 'Color: Red' }));
    expect(onSelect).not.toHaveBeenCalled();
  }];

  it('does not call onSelect for out-of-stock options', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    const variants = [
      {
        name: 'Size',
        options: [
          { value: 'S' },
          { value: 'L', outOfStock: true },
        ],
      },
    ];
    render(<DesktopSkuSelector variants={variants} onSelect={onSelect} />);
    await user.click(screen.getByRole('radio', { name: 'Size: L (out of stock)' }));
    expect(onSelect).not.toHaveBeenCalled();
  }];

  it('shows stock count', () => {
    render(<DesktopSkuSelector {...defaultProps} stock={24} />);
    expect(screen.getByText('24 available')).toBeInTheDocument();
  });

  it('shows Out of stock when stock is 0', () => {
    render(<DesktopSkuSelector {...defaultProps} stock={0} />);
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });

  it('shows price', () => {
    render(<DesktopSkuSelector {...defaultProps} price={8_900_000} />);
    expect(screen.getByText(/8.900.000/)).toBeInTheDocument();
  });

  it('renders preview image when provided', () => {
    render(<DesktopSkuSelector {...defaultProps} image="/preview.jpg" />);
    const img = screen.getByAltText('Selected variant preview');
    expect(img).toHaveAttribute('src', '/preview.jpg');
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopSkuSelector {...defaultProps} className="my-sku" />,
    );
    expect(container.firstElementChild?.className).toContain('my-sku');
  });

  it('handles keyboard selection on options', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSkuSelector {...defaultProps} onSelect={onSelect} />);
    const blueOption = screen.getByRole('radio', { name: 'Color: Blue' });
    blueOption.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('Color', 'Blue');
  });

  it('shows selected value text next to label', () => {
    render(<DesktopSkuSelector {...defaultProps} />);
    // Selected values appear in both the label area and the chip — verify at least 2 instances
    expect(screen.getAllByText('Black')).toHaveLength(2);
    expect(screen.getAllByText('256GB')).toHaveLength(2);
  });
});
