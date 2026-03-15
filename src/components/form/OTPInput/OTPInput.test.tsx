import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OTPInput } from './OTPInput';

describe('OTPInput', () => {
  it('renders with default 6 boxes', () => {
    render(<OTPInput />);
    const input = screen.getByLabelText('OTP code input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('maxLength', '6');
  });

  it('renders with custom length', () => {
    render(<OTPInput length={4} />);
    const input = screen.getByLabelText('OTP code input');
    expect(input).toHaveAttribute('maxLength', '4');
  });

  it('displays defaultValue in boxes', () => {
    const { container } = render(<OTPInput defaultValue="123" />);
    const filledBoxes = container.querySelectorAll('[class*="filled"]');
    expect(filledBoxes.length).toBe(3);
  });

  it('calls onChange when digits are typed', async () => {
    const onChange = vi.fn();
    render(<OTPInput onChange={onChange} />);
    const input = screen.getByLabelText('OTP code input');

    await userEvent.type(input, '4');
    expect(onChange).toHaveBeenCalledWith('4');
  });

  it('calls onComplete when all digits are entered', async () => {
    const onComplete = vi.fn();
    render(<OTPInput length={4} onComplete={onComplete} />);
    const input = screen.getByLabelText('OTP code input');

    await userEvent.type(input, '4289');
    expect(onComplete).toHaveBeenCalledWith('4289');
  });

  it('ignores non-digit characters', async () => {
    const onChange = vi.fn();
    render(<OTPInput onChange={onChange} />);
    const input = screen.getByLabelText('OTP code input');

    // Simulate typing letters via fireEvent to bypass the keyDown prevention
    fireEvent.change(input, { target: { value: 'abc' } });
    // onChange should be called with empty string since non-digits are stripped
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('shows error state and message', () => {
    render(<OTPInput error errorMessage="Invalid code" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid code');
  });

  it('does not show error message without error prop', () => {
    render(<OTPInput errorMessage="Invalid code" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('renders masked digits', () => {
    const { container } = render(<OTPInput defaultValue="123" mask />);
    const filledBoxes = container.querySelectorAll('[class*="filled"]');
    filledBoxes.forEach((box) => {
      expect(box.textContent).toBe('\u2022');
    });
  });

  it('does not accept input when disabled', () => {
    render(<OTPInput disabled />);
    const input = screen.getByLabelText('OTP code input');
    expect(input).toBeDisabled();
  });

  it('supports paste of full OTP', async () => {
    const onComplete = vi.fn();
    render(<OTPInput onComplete={onComplete} />);
    const input = screen.getByLabelText('OTP code input');

    fireEvent.paste(input, {
      clipboardData: { getData: () => '428917' },
    });
    expect(onComplete).toHaveBeenCalledWith('428917');
  });

  it('supports controlled value', () => {
    const { container, rerender } = render(<OTPInput value="12" />);
    let filledBoxes = container.querySelectorAll('[class*="filled"]');
    expect(filledBoxes.length).toBe(2);

    rerender(<OTPInput value="1234" />);
    filledBoxes = container.querySelectorAll('[class*="filled"]');
    expect(filledBoxes.length).toBe(4);
  });

  it('has proper a11y attributes', () => {
    render(<OTPInput />);
    const input = screen.getByLabelText('OTP code input');
    expect(input).toHaveAttribute('type', 'tel');
    expect(input).toHaveAttribute('inputMode', 'numeric');
    expect(input).toHaveAttribute('autoComplete', 'one-time-code');
  });

  it('supports custom aria-label', () => {
    render(<OTPInput aria-label="Enter verification code" />);
    expect(screen.getByLabelText('Enter verification code')).toBeInTheDocument();
  });

  it('focuses input when box is clicked', async () => {
    const { container } = render(<OTPInput />);
    const boxesContainer = container.querySelector('[class*="boxes"]')!;

    await userEvent.click(boxesContainer);
    const input = screen.getByLabelText('OTP code input');
    expect(document.activeElement).toBe(input);
  });
});
