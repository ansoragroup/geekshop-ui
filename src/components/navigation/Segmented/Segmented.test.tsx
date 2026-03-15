import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Segmented } from './Segmented';

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('Segmented', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all options', () => {
    render(<Segmented options={options} />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('renders with role="tablist"', () => {
    render(<Segmented options={options} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders each option as a tab', () => {
    render(<Segmented options={options} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('selects the first option by default', () => {
    render(<Segmented options={options} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('selects defaultValue when provided', () => {
    render(<Segmented options={options} defaultValue="b" />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when a tab is clicked', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Segmented options={options} onChange={onChange} />);
    await user.click(screen.getByText('Option B'));

    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('does not call onChange for disabled options', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];

    render(<Segmented options={opts} onChange={onChange} />);
    await user.click(screen.getByText('B'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-disabled on disabled options', () => {
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];

    render(<Segmented options={opts} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('navigates with ArrowRight key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Segmented options={options} onChange={onChange} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('navigates with ArrowLeft key', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Segmented options={options} defaultValue="c" onChange={onChange} />);
    const tabs = screen.getAllByRole('tab');
    tabs[2].focus();
    await user.keyboard('{ArrowLeft}');

    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('skips disabled options during keyboard navigation', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
      { value: 'c', label: 'C' },
    ];

    render(<Segmented options={opts} onChange={onChange} />);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');

    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('renders icons when provided', () => {
    const opts = [
      { value: 'a', label: 'A', icon: <span data-testid="icon-a">*</span> },
      { value: 'b', label: 'B' },
    ];

    render(<Segmented options={opts} />);
    expect(screen.getByTestId('icon-a')).toBeInTheDocument();
  });

  it('only selected tab has tabIndex 0', () => {
    render(<Segmented options={options} defaultValue="b" />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabindex', '-1');
    expect(tabs[1]).toHaveAttribute('tabindex', '0');
    expect(tabs[2]).toHaveAttribute('tabindex', '-1');
  });

  it('supports custom className', () => {
    const { container } = render(
      <Segmented options={options} className="my-segmented" />,
    );
    expect(container.firstChild).toHaveClass('my-segmented');
  });
});
