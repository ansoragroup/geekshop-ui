import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Dropdown } from './Dropdown';
import type { DropdownItem } from './Dropdown';

const items: DropdownItem[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

const itemsWithDisabled: DropdownItem[] = [
  { label: 'Enabled', value: 'enabled' },
  { label: 'Disabled', value: 'disabled', disabled: true },
];

const Trigger = () => <span>Open Menu</span>;

describe('Dropdown', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders trigger element', () => {
    render(<Dropdown items={items} trigger={<Trigger />} />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('does not show menu initially', () => {
    render(<Dropdown items={items} trigger={<Trigger />} />);
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('opens menu on trigger click', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('closes menu on second trigger click', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.click(screen.getByText('Open Menu'));
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown items={items} trigger={<Trigger />} onSelect={onSelect} />);

    await user.click(screen.getByText('Open Menu'));
    await user.click(screen.getByText('Option B'));

    expect(onSelect).toHaveBeenCalledWith('b');
  });

  it('closes menu after item selection', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} onSelect={vi.fn()} />);

    await user.click(screen.getByText('Open Menu'));
    await user.click(screen.getByText('Option A'));

    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('shows checkmark on selected value', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} value="b" trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));

    const optionB = screen.getByText('Option B').closest('[role="option"]') as HTMLElement;
    expect(optionB).toHaveAttribute('aria-selected', 'true');
  });

  it('marks disabled items with aria-disabled', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={itemsWithDisabled} trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));

    const disabledItem = screen.getByText('Disabled').closest('[role="option"]') as HTMLElement;
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onSelect for disabled items', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown items={itemsWithDisabled} trigger={<Trigger />} onSelect={onSelect} />);

    await user.click(screen.getByText('Open Menu'));
    // Disabled items have pointer-events: none in CSS but we test via the click handler guard
    const disabledItem = screen.getByText('Disabled').closest('[role="option"]') as HTMLElement;
    // The click handler checks for disabled, so it should not fire onSelect
    await user.click(disabledItem);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('trigger has combobox role and aria-expanded', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');

    await user.click(combobox);
    expect(combobox).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens menu on Enter key on trigger', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    const combobox = screen.getByRole('combobox');
    combobox.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens menu on Space key on trigger', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    const combobox = screen.getByRole('combobox');
    combobox.focus();
    await user.keyboard(' ');

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('navigates with ArrowDown/ArrowUp keys', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    // Open menu
    await user.click(screen.getByText('Open Menu'));

    const listbox = screen.getByRole('listbox');

    // Navigate down
    await user.keyboard('{ArrowDown}');

    // The first option should be focused
    const options = listbox.querySelectorAll('[role="option"]');
    expect(document.activeElement).toBe(options[0]);

    // Navigate to second
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(options[1]);

    // Navigate up
    await user.keyboard('{ArrowUp}');
    expect(document.activeElement).toBe(options[0]);
  });

  it('wraps navigation at boundaries', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));
    const options = screen.getByRole('listbox').querySelectorAll('[role="option"]');

    // Focus last item
    await user.keyboard('{ArrowDown}'); // item 0
    await user.keyboard('{ArrowDown}'); // item 1
    await user.keyboard('{ArrowDown}'); // item 2
    await user.keyboard('{ArrowDown}'); // wraps to item 0

    expect(document.activeElement).toBe(options[0]);
  });

  it('selects item with Enter key', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown items={items} trigger={<Trigger />} onSelect={onSelect} />);

    await user.click(screen.getByText('Open Menu'));
    await user.keyboard('{ArrowDown}'); // focus first item
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledWith('a');
  });

  it('closes menu on Escape key', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} trigger={<Trigger />} />);

    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).toBeNull();
  });

  it('supports controlled open state', () => {
    const onOpenChange = vi.fn();
    render(
      <Dropdown items={items} trigger={<Trigger />} open={true} onOpenChange={onOpenChange} />,
    );
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Dropdown ref={ref} items={items} trigger={<Trigger />} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <Dropdown items={items} trigger={<Trigger />} data-testid="dropdown" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute('data-testid')).toBe('dropdown');
  });

  it('merges custom className', () => {
    const { container } = render(
      <Dropdown items={items} trigger={<Trigger />} className="custom-dd" />,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain('custom-dd');
  });
});
