import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('Select', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger button', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Select options={options} label="Category" />);
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(<Select options={options} placeholder="Select one" />);
    expect(screen.getByText('Select one')).toBeInTheDocument();
  });

  it('shows selected value label', () => {
    render(<Select options={options} value="b" />);
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('opens bottom sheet on click', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows all options in the sheet', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    await user.click(screen.getByRole('button'));
    const listOptions = screen.getAllByRole('option');
    expect(listOptions).toHaveLength(3);
  });

  it('calls onChange and closes on single select option click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Option B'));

    expect(onChange).toHaveBeenCalledWith('b');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={options} disabled />);

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<Select options={options} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('shows error with aria-describedby linking', () => {
    render(<Select options={options} error="Required" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-describedby');
  });

  it('sets aria-haspopup on trigger', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('sets aria-expanded based on open state', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  // Multiple select tests
  it('renders multi-select with confirm/cancel buttons', async () => {
    const user = userEvent.setup();
    render(<Select options={options} multiple />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('multiple select requires confirm to apply selection', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} multiple onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    // Select two options
    await user.click(screen.getByText('Option A'));
    await user.click(screen.getByText('Option C'));

    // onChange should not have been called yet
    expect(onChange).not.toHaveBeenCalled();

    // Click confirm - uses default locale translation key fallback
    const confirmBtn = screen.getByText('Tasdiqlash');
    await user.click(confirmBtn);

    expect(onChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('multiple select cancel discards changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} multiple onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Option A'));

    // Cancel - uses default locale translation key fallback
    const cancelBtn = screen.getByText('Bekor qilish');
    await user.click(cancelBtn);

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not select disabled options', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];

    render(<Select options={opts} onChange={onChange} />);
    await user.click(screen.getByRole('button'));
    // The disabled button shouldn't be clickable
    const disabledOption = screen.getByText('B').closest('button');
    expect(disabledOption).toBeDisabled();
  });

  it('closes sheet when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click overlay
    const overlay = screen.getByRole('presentation');
    await user.click(overlay);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows comma-separated labels for multi-select values', () => {
    render(<Select options={options} multiple value={['a', 'c']} />);
    expect(screen.getByText('Option A, Option C')).toBeInTheDocument();
  });
});
