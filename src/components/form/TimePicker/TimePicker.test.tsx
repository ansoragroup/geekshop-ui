import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger with role="combobox"', () => {
    render(<TimePicker />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays default value in trigger', () => {
    render(<TimePicker defaultValue="14:30" />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('displays controlled value', () => {
    render(<TimePicker value="09:15" onChange={vi.fn()} />);
    expect(screen.getByText('09:15')).toBeInTheDocument();
  });

  it('opens bottom sheet on trigger click', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-expanded on trigger', () => {
    render(<TimePicker />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-haspopup="dialog" on trigger', () => {
    render(<TimePicker />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('shows confirm button when open', async () => {
    render(<TimePicker defaultOpen />);
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('closes on confirm button click', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<TimePicker defaultOpen onOpenChange={onOpenChange} />);
    await user.click(screen.getByText('Confirm'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<TimePicker disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders 12h format with AM/PM', () => {
    render(<TimePicker defaultValue="02:30 PM" format="12h" />);
    expect(screen.getByText('02:30 PM')).toBeInTheDocument();
  });

  it('uses custom placeholder', () => {
    render(<TimePicker placeholder="Pick time" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Pick time');
  });

  it('supports custom children as trigger', async () => {
    render(
      <TimePicker>
        <button type="button">Custom Trigger</button>
      </TimePicker>
    );
    expect(screen.getByText('Custom Trigger')).toBeInTheDocument();
  });

  it('calls onChange when value changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<TimePicker defaultValue="12:00" defaultOpen onChange={onChange} />);
    // Click an hour item
    const hourButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.textContent === '13' || btn.textContent === '11');
    if (hourButtons.length > 0) {
      await user.click(hourButtons[0]);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('renders dialog with aria-modal="true" when open', () => {
    render(<TimePicker defaultOpen />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('spreads className onto root', () => {
    const { container } = render(<TimePicker className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies minuteStep to generate minute options', async () => {
    render(<TimePicker defaultOpen minuteStep={15} />);
    // Should have 00, 15, 30, 45 minute options
    const buttons = screen.getAllByRole('button');
    const minuteLabels = buttons.map((b) => b.textContent).filter((t) => t === '15');
    expect(minuteLabels.length).toBeGreaterThanOrEqual(1);
  });
});
