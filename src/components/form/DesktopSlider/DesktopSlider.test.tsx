import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DesktopSlider } from './DesktopSlider';

describe('DesktopSlider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with role="slider"', () => {
    render(<DesktopSlider aria-label="Test" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with correct default aria attributes', () => {
    render(<DesktopSlider aria-label="Volume" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('uses defaultValue for initial state', () => {
    render(<DesktopSlider defaultValue={42} aria-label="Test" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '42');
  });

  it('uses controlled value', () => {
    render(<DesktopSlider value={75} onChange={vi.fn()} aria-label="Test" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders two thumbs in range mode', () => {
    render(<DesktopSlider range defaultValue={[20, 80]} aria-label="Range" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('sets aria-disabled when disabled', () => {
    render(<DesktopSlider disabled aria-label="Disabled" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('increases value on ArrowRight key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('decreases value on ArrowLeft key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('jumps to min on Home key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('jumps to max on End key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('does not respond to keyboard when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} disabled onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects step for keyboard navigation', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopSlider defaultValue={50} step={10} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('renders marks when provided', () => {
    const { container } = render(
      <DesktopSlider
        marks={[
          { value: 0, label: 'Min' },
          { value: 100, label: 'Max' },
        ]}
        aria-label="Test"
      />
    );
    expect(container.querySelector('[class*="markLabel"]')).toBeInTheDocument();
  });

  it('renders tooltip element', () => {
    const { container } = render(<DesktopSlider defaultValue={50} aria-label="Test" />);
    expect(container.querySelector('[class*="tooltip"]')).toBeInTheDocument();
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(<DesktopSlider aria-label="Test" data-testid="dslider" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'dslider');
  });

  it('supports vertical orientation', () => {
    render(<DesktopSlider orientation="vertical" aria-label="Vertical" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
