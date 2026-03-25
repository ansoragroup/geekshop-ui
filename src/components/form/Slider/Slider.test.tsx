import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Slider } from './Slider';

describe('Slider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with role="slider"', () => {
    render(<Slider aria-label="Test" />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with correct default aria attributes', () => {
    render(<Slider aria-label="Volume" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '0');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('uses defaultValue for initial state', () => {
    render(<Slider defaultValue={42} aria-label="Test" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '42');
  });

  it('uses controlled value', () => {
    render(<Slider value={75} onChange={vi.fn()} aria-label="Test" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders custom min and max', () => {
    render(<Slider min={10} max={200} defaultValue={50} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '200');
  });

  it('sets aria-disabled when disabled', () => {
    render(<Slider disabled aria-label="Disabled" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders two thumbs in range mode', () => {
    render(<Slider range defaultValue={[20, 80]} aria-label="Range" />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('renders vertical orientation', () => {
    render(<Slider orientation="vertical" aria-label="Vertical" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('increases value on ArrowRight key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('decreases value on ArrowLeft key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('jumps to min on Home key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{Home}');
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('jumps to max on End key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{End}');
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('does not respond to keyboard when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} disabled onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects step for keyboard navigation', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider defaultValue={50} step={10} onChange={onChange} aria-label="Test" />);
    const slider = screen.getByRole('slider');
    slider.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('supports custom aria-label', () => {
    render(<Slider aria-label="Brightness control" />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-label', 'Brightness control');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(<Slider aria-label="Test" data-testid="my-slider" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'my-slider');
  });

  it('renders marks when provided', () => {
    const { container } = render(
      <Slider
        marks={[
          { value: 0, label: 'Min' },
          { value: 100, label: 'Max' },
        ]}
        aria-label="Test"
      />
    );
    expect(container.querySelector('[class*="markLabel"]')).toBeInTheDocument();
  });

  it('clamps ArrowRight at max boundary in range mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Slider range value={[20, 100]} onChange={onChange} aria-label="Range" />);
    const sliders = screen.getAllByRole('slider');
    sliders[1].focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith([20, 100]);
  });
});
