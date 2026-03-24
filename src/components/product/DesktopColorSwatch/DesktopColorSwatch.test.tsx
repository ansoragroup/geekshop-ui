import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopColorSwatch } from './DesktopColorSwatch';
import type { DesktopColorSwatchOption } from './DesktopColorSwatch';

const colorOptions: DesktopColorSwatchOption[] = [
  { value: 'red', color: '#FF0000', label: 'Red' },
  { value: 'blue', color: '#0000FF', label: 'Blue' },
  { value: 'green', color: '#00FF00', label: 'Green' },
];

const imageOptions: DesktopColorSwatchOption[] = [
  { value: 'wood', image: 'https://example.com/wood.jpg', label: 'Wooden' },
  { value: 'marble', image: 'https://example.com/marble.jpg', label: 'Marble' },
];

describe('DesktopColorSwatch', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    expect(screen.getByRole('listbox', { name: 'Color selection' })).toBeInTheDocument();
  });

  it('renders label text when provided', () => {
    render(<DesktopColorSwatch options={colorOptions} label="Choose color" />);
    expect(screen.getByText('Choose color')).toBeInTheDocument();
  });

  it('uses label as listbox aria-label when provided', () => {
    render(<DesktopColorSwatch options={colorOptions} label="Pick a color" />);
    expect(screen.getByRole('listbox', { name: 'Pick a color' })).toBeInTheDocument();
  });

  it('uses "Color selection" as default listbox aria-label', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    expect(screen.getByRole('listbox', { name: 'Color selection' })).toBeInTheDocument();
  });

  it('renders all option buttons', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    const opts = screen.getAllByRole('option');
    expect(opts).toHaveLength(3);
  });

  it('renders option labels below swatches', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
    expect(screen.getByText('Green')).toBeInTheDocument();
  });

  it('renders color swatches with backgroundColor', () => {
    const { container } = render(<DesktopColorSwatch options={colorOptions} />);
    const colorSpans = container.querySelectorAll('[class*="swatchColor"]');
    expect(colorSpans).toHaveLength(3);
    expect((colorSpans[0] as HTMLElement).style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('renders image swatches with img elements', () => {
    render(<DesktopColorSwatch options={imageOptions} />);
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toHaveAttribute('src', 'https://example.com/wood.jpg');
  });

  // ─── Selection ──────────────────────────────────────────────────────

  it('marks selected option with aria-selected', () => {
    render(<DesktopColorSwatch options={colorOptions} selected="blue" />);
    const opts = screen.getAllByRole('option');
    expect(opts[0]).toHaveAttribute('aria-selected', 'false');
    expect(opts[1]).toHaveAttribute('aria-selected', 'true');
    expect(opts[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange on click', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} onChange={handler} />);
    fireEvent.click(screen.getByLabelText('Blue'));
    expect(handler).toHaveBeenCalledWith('blue');
  });

  it('renders checkmark on selected swatch', () => {
    const { container } = render(<DesktopColorSwatch options={colorOptions} selected="red" />);
    const checkmarks = container.querySelectorAll('[class*="checkmark"]');
    expect(checkmarks).toHaveLength(1);
  });

  // ─── Keyboard navigation ───────────────────────────────────────────

  it('navigates with ArrowRight', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[0], { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith('blue');
  });

  it('navigates with ArrowLeft', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} selected="blue" onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[1], { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith('red');
  });

  it('does not go below 0 with ArrowLeft on first', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[0], { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith('red'); // stays at first
  });

  it('does not go beyond last with ArrowRight', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} selected="green" onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[2], { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith('green'); // stays at last
  });

  it('selects on Enter key', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[1], { key: 'Enter' });
    expect(handler).toHaveBeenCalledWith('blue');
  });

  it('selects on Space key', () => {
    const handler = vi.fn();
    render(<DesktopColorSwatch options={colorOptions} onChange={handler} />);
    const opts = screen.getAllByRole('option');
    fireEvent.keyDown(opts[1], { key: ' ' });
    expect(handler).toHaveBeenCalledWith('blue');
  });

  // ─── tabIndex roving ───────────────────────────────────────────────

  it('only selected option has tabIndex 0', () => {
    render(<DesktopColorSwatch options={colorOptions} selected="blue" />);
    const opts = screen.getAllByRole('option');
    expect(opts[0]).toHaveAttribute('tabIndex', '-1');
    expect(opts[1]).toHaveAttribute('tabIndex', '0');
    expect(opts[2]).toHaveAttribute('tabIndex', '-1');
  });

  it('first option has tabIndex 0 when none selected', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    const opts = screen.getAllByRole('option');
    expect(opts[0]).toHaveAttribute('tabIndex', '0');
    expect(opts[1]).toHaveAttribute('tabIndex', '-1');
  });

  // ─── Aria labels ────────────────────────────────────────────────────

  it('options have aria-label from option label', () => {
    render(<DesktopColorSwatch options={colorOptions} />);
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
    expect(screen.getByLabelText('Blue')).toBeInTheDocument();
    expect(screen.getByLabelText('Green')).toBeInTheDocument();
  });

  it('falls back to value for aria-label when no label', () => {
    const opts = [{ value: 'purple', color: '#800080' }];
    render(<DesktopColorSwatch options={opts} />);
    expect(screen.getByLabelText('purple')).toBeInTheDocument();
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(
      <DesktopColorSwatch options={colorOptions} className="custom" />,
    );
    expect(container.firstElementChild?.className).toContain('custom');
  });

  it('spreads rest props', () => {
    render(<DesktopColorSwatch options={colorOptions} data-testid="swatch" />);
    expect(screen.getByTestId('swatch')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopColorSwatch.displayName).toBe('DesktopColorSwatch');
  });
});
