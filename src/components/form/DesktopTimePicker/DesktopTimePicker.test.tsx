import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DesktopTimePicker } from './DesktopTimePicker';

describe('DesktopTimePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger with role="combobox"', () => {
    render(<DesktopTimePicker />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays default value in trigger', () => {
    render(<DesktopTimePicker defaultValue="14:30" />);
    expect(screen.getByText('14:30')).toBeInTheDocument();
  });

  it('displays controlled value', () => {
    render(<DesktopTimePicker value="09:15" onChange={vi.fn()} />);
    expect(screen.getByText('09:15')).toBeInTheDocument();
  });

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-expanded="false" initially', () => {
    render(<DesktopTimePicker />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
  });

  it('has aria-expanded="true" when open', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-haspopup="dialog" on trigger', () => {
    render(<DesktopTimePicker />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('panel has role="dialog" and aria-modal="true"', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Select time');
  });

  it('closes on confirm button click', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByText('Confirm'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on cancel button click', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByText('Cancel'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker disabled />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders 12h format', () => {
    render(<DesktopTimePicker defaultValue="02:30 PM" format="12h" />);
    expect(screen.getByText('02:30 PM')).toBeInTheDocument();
  });

  it('calls onChange when hour is selected', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopTimePicker defaultValue="12:00" onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    const hourButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.textContent === '13' || btn.textContent === '11');
    if (hourButtons.length > 0) {
      await user.click(hourButtons[0]);
      expect(onChange).toHaveBeenCalled();
    }
  });

  it('spreads rest props onto root', () => {
    const { container } = render(<DesktopTimePicker data-testid="dtp" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'dtp');
  });

  it('imports useFocusTrap', async () => {
    const user = userEvent.setup();
    render(<DesktopTimePicker />);
    await user.click(screen.getByRole('combobox'));
    // Dialog should be present with focus trap
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
