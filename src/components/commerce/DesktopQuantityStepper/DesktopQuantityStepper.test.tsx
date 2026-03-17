import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopQuantityStepper } from './DesktopQuantityStepper';

describe('DesktopQuantityStepper', () => {
  it('renders decrement button, input, and increment button', () => {
    render(<DesktopQuantityStepper value={3} />);
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
  });

  it('displays the current value in the input', () => {
    render(<DesktopQuantityStepper value={5} />);
    expect(screen.getByLabelText('Quantity')).toHaveValue('5');
  });

  it('calls onChange with incremented value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={5} onChange={onChange} />);
    await user.click(screen.getByLabelText('Increase quantity'));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('calls onChange with decremented value', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={5} onChange={onChange} />);
    await user.click(screen.getByLabelText('Decrease quantity'));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('disables decrement button at min value', () => {
    render(<DesktopQuantityStepper value={1} min={1} />);
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
  });

  it('disables increment button at max value', () => {
    render(<DesktopQuantityStepper value={5} max={5} />);
    expect(screen.getByLabelText('Increase quantity')).toBeDisabled();
  });

  it('does not call onChange when decrementing at min', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={1} min={1} onChange={onChange} />);
    await user.click(screen.getByLabelText('Decrease quantity'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when incrementing at max', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={10} max={10} onChange={onChange} />);
    await user.click(screen.getByLabelText('Increase quantity'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables all controls when disabled', () => {
    render(<DesktopQuantityStepper value={5} disabled />);
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
    expect(screen.getByLabelText('Increase quantity')).toBeDisabled();
    expect(screen.getByLabelText('Quantity')).toBeDisabled();
  });

  it('clamps input value on blur when below min', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={5} min={1} max={99} onChange={onChange} />);
    const input = screen.getByLabelText('Quantity');
    await user.clear(input);
    await user.type(input, '0');
    await user.tab();
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('clamps input value on blur when above max', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={5} min={1} max={10} onChange={onChange} />);
    const input = screen.getByLabelText('Quantity');
    await user.clear(input);
    await user.type(input, '50');
    await user.tab();
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('confirms input value on Enter key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopQuantityStepper value={5} min={1} max={99} onChange={onChange} />);
    const input = screen.getByLabelText('Quantity');
    await user.clear(input);
    await user.type(input, '8');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith(8);
  });

  it('applies size class for sm', () => {
    const { container } = render(<DesktopQuantityStepper value={1} size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopQuantityStepper value={1} className="my-stepper" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain('my-stepper');
  });

  it('applies disabled class when disabled', () => {
    const { container } = render(<DesktopQuantityStepper value={1} disabled />);
    expect((container.firstChild as HTMLElement).className).toMatch(/disabled/);
  });
});
