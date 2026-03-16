import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { CascadePicker } from './CascadePicker';
import type { CascadeOption } from './CascadePicker';

const options: CascadeOption[] = [
  {
    value: 'region-a',
    label: 'Region A',
    children: [
      {
        value: 'district-1',
        label: 'District 1',
        children: [
          { value: 'area-x', label: 'Area X' },
          { value: 'area-y', label: 'Area Y' },
        ],
      },
      {
        value: 'district-2',
        label: 'District 2',
        children: [
          { value: 'area-z', label: 'Area Z' },
        ],
      },
    ],
  },
  {
    value: 'region-b',
    label: 'Region B',
    children: [
      {
        value: 'district-3',
        label: 'District 3',
        children: [
          { value: 'area-w', label: 'Area W' },
        ],
      },
    ],
  },
];

describe('CascadePicker', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger button', () => {
    render(<CascadePicker options={options} />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<CascadePicker options={options} label="Address" />);
    expect(screen.getByText('Address')).toBeInTheDocument();
  });

  it('shows placeholder when no value selected', () => {
    render(<CascadePicker options={options} placeholder="Select address" />);
    expect(screen.getByText('Select address')).toBeInTheDocument();
  });

  it('shows selected value labels joined by slash', () => {
    render(<CascadePicker options={options} value={['region-a', 'district-1', 'area-x']} />);
    expect(screen.getByText('Region A / District 1 / Area X')).toBeInTheDocument();
  });

  it('opens bottom sheet on click', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows first column options when opened', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} />);

    await user.click(screen.getByRole('button'));
    const listboxes = screen.getAllByRole('listbox');
    expect(listboxes.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Region A')).toBeInTheDocument();
    expect(screen.getByText('Region B')).toBeInTheDocument();
  });

  it('shows second column after selecting first column option', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));

    expect(screen.getByText('District 1')).toBeInTheDocument();
    expect(screen.getByText('District 2')).toBeInTheDocument();
  });

  it('shows third column after selecting second column option', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));
    await user.click(screen.getByText('District 1'));

    expect(screen.getByText('Area X')).toBeInTheDocument();
    expect(screen.getByText('Area Y')).toBeInTheDocument();
  });

  it('calls onChange with values and labels on confirm', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<CascadePicker options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));
    await user.click(screen.getByText('District 1'));
    await user.click(screen.getByText('Area X'));

    // Click confirm
    const confirmBtn = screen.getByText('Tasdiqlash');
    await user.click(confirmBtn);

    expect(onChange).toHaveBeenCalledWith(
      ['region-a', 'district-1', 'area-x'],
      ['Region A', 'District 1', 'Area X'],
    );
  });

  it('does not call onChange when closed without confirming', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<CascadePicker options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));

    // Close via overlay
    const overlay = screen.getByRole('presentation');
    await user.click(overlay);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} disabled />);

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(<CascadePicker options={options} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('sets aria-haspopup on trigger', () => {
    render(<CascadePicker options={options} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('sets aria-expanded based on open state', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} />);

    const trigger = screen.getByRole('button');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects level prop to limit columns', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} level={2} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));

    // Should show District 1 / District 2 but NOT area options column
    expect(screen.getByText('District 1')).toBeInTheDocument();
    const listboxes = screen.getAllByRole('listbox');
    expect(listboxes).toHaveLength(2);
  });

  it('does not select disabled options', async () => {
    const disabledOptions: CascadeOption[] = [
      {
        value: 'r',
        label: 'Region',
        children: [
          { value: 'd1', label: 'Enabled', children: [] },
          { value: 'd2', label: 'Disabled', disabled: true, children: [] },
        ],
      },
    ];
    const user = userEvent.setup();
    render(<CascadePicker options={disabledOptions} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region'));

    const disabledBtn = screen.getByText('Disabled').closest('button');
    expect(disabledBtn).toBeDisabled();
  });

  it('resets child selections when parent changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<CascadePicker options={options} onChange={onChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Region A'));
    await user.click(screen.getByText('District 1'));
    await user.click(screen.getByText('Area X'));

    // Now change region
    await user.click(screen.getByText('Region B'));

    // Confirm with only Region B selected
    const confirmBtn = screen.getByText('Tasdiqlash');
    await user.click(confirmBtn);

    expect(onChange).toHaveBeenCalledWith(
      ['region-b'],
      ['Region B'],
    );
  });

  it('shows partial selection display text', () => {
    render(<CascadePicker options={options} value={['region-a', 'district-1']} />);
    expect(screen.getByText('Region A / District 1')).toBeInTheDocument();
  });

  it('closes sheet when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<CascadePicker options={options} title="Pick Address" />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Yopish');
    await user.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
