import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the calendar grid', () => {
    render(<Calendar />);
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('shows month and year in header', () => {
    render(<Calendar value={new Date(2026, 2, 16)} locale="uz" />);
    expect(screen.getByText('Mart 2026')).toBeInTheDocument();
  });

  it('shows day headers (Monday first by default)', () => {
    render(<Calendar locale="uz" />);
    expect(screen.getByText('Du')).toBeInTheDocument();
    expect(screen.getByText('Ya')).toBeInTheDocument();
  });

  it('shows day headers starting with Sunday when firstDayOfWeek=0', () => {
    render(<Calendar locale="en" firstDayOfWeek={0} />);
    const headers = screen.getAllByText(/^(Su|Mo|Tu|We|Th|Fr|Sa)$/);
    expect(headers[0]).toHaveTextContent('Su');
  });

  it('navigates to previous month', async () => {
    const user = userEvent.setup();
    render(<Calendar value={new Date(2026, 2, 16)} locale="uz" />);

    const prevBtn = screen.getByLabelText('Previous month');
    await user.click(prevBtn);
    expect(screen.getByText('Fevral 2026')).toBeInTheDocument();
  });

  it('navigates to next month', async () => {
    const user = userEvent.setup();
    render(<Calendar value={new Date(2026, 2, 16)} locale="uz" />);

    const nextBtn = screen.getByLabelText('Next month');
    await user.click(nextBtn);
    expect(screen.getByText('Aprel 2026')).toBeInTheDocument();
  });

  it('highlights today', () => {
    render(<Calendar />);
    // Find today's date cell
    const todayCell = screen.getAllByRole('gridcell').find(
      (cell) => cell.getAttribute('aria-current') === 'date',
    );
    expect(todayCell).toBeInTheDocument();
  });

  it('marks selected date', () => {
    render(<Calendar value={new Date(2026, 2, 16)} />);
    const selected = screen.getAllByRole('gridcell').filter(
      (cell) => cell.getAttribute('aria-selected') === 'true',
    );
    expect(selected).toHaveLength(1);
  });

  it('calls onChange in single mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar value={new Date(2026, 2, 16)} onChange={onChange} mode="single" />);

    const day20 = screen.getByLabelText(/20 Mart 2026/);
    await user.click(day20);

    expect(onChange).toHaveBeenCalledTimes(1);
    const dates = onChange.mock.calls[0][0] as Date[];
    expect(dates).toHaveLength(1);
    expect(dates[0].getDate()).toBe(20);
  });

  it('toggles dates in multiple mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar onChange={onChange} mode="multiple" value={new Date(2026, 2, 16)} />);

    // Select another date
    const day10 = screen.getByLabelText(/10 Mart 2026/);
    await user.click(day10);

    expect(onChange).toHaveBeenCalledTimes(1);
    const dates = onChange.mock.calls[0][0] as Date[];
    expect(dates).toHaveLength(2);
  });

  it('deselects date in multiple mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Calendar
        onChange={onChange}
        mode="multiple"
        value={[new Date(2026, 2, 10), new Date(2026, 2, 15)]}
      />,
    );

    // Click on already selected date
    const day10 = screen.getByLabelText(/10 Mart 2026/);
    await user.click(day10);

    expect(onChange).toHaveBeenCalledTimes(1);
    const dates = onChange.mock.calls[0][0] as Date[];
    expect(dates).toHaveLength(1);
    expect(dates[0].getDate()).toBe(15);
  });

  it('selects range in range mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Calendar onChange={onChange} mode="range" />);

    // First click: start
    const day10 = screen.getByLabelText(/^10 /);
    await user.click(day10);

    // Second click: end
    const day20 = screen.getByLabelText(/^20 /);
    await user.click(day20);

    // Second call should have the range
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as Date[];
    expect(lastCall).toHaveLength(2);
    expect(lastCall[0].getDate()).toBe(10);
    expect(lastCall[1].getDate()).toBe(20);
  });

  it('disables dates before min', () => {
    render(<Calendar min={new Date(2026, 2, 15)} value={new Date(2026, 2, 16)} />);
    const day5 = screen.getByLabelText(/^5 /);
    expect(day5).toBeDisabled();
  });

  it('disables dates after max', () => {
    render(<Calendar max={new Date(2026, 2, 20)} value={new Date(2026, 2, 16)} />);
    const day25 = screen.getByLabelText(/^25 /);
    expect(day25).toBeDisabled();
  });

  it('shows marked date dots', () => {
    const { container } = render(
      <Calendar
        value={new Date(2026, 2, 16)}
        markedDates={{
          '2026-03-10': { dot: true, color: '#FF3B30' },
        }}
      />,
    );
    const dots = container.querySelectorAll('[class*="dayDot"]');
    expect(dots.length).toBeGreaterThanOrEqual(1);
  });

  it('shows marked date labels', () => {
    render(
      <Calendar
        value={new Date(2026, 2, 16)}
        markedDates={{
          '2026-03-10': { dot: true, label: 'Sale' },
        }}
      />,
    );
    expect(screen.getByText('Sale')).toBeInTheDocument();
  });

  it('shows week numbers when enabled', () => {
    render(<Calendar showWeekNumber value={new Date(2026, 2, 16)} />);
    // Week number header
    expect(screen.getByText('#')).toBeInTheDocument();
  });

  it('displays in Russian locale', () => {
    render(<Calendar value={new Date(2026, 2, 16)} locale="ru" />);
    expect(screen.getByText(/\u041C\u0430\u0440\u0442 2026/)).toBeInTheDocument();
    expect(screen.getByText('\u041F\u043D')).toBeInTheDocument();
  });

  it('displays in English locale', () => {
    render(<Calendar value={new Date(2026, 2, 16)} locale="en" />);
    expect(screen.getByText('March 2026')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
  });

  it('previous and next month buttons are accessible', () => {
    render(<Calendar />);
    expect(screen.getByLabelText('Previous month')).toBeInTheDocument();
    expect(screen.getByLabelText('Next month')).toBeInTheDocument();
  });

  it('grid has accessible label', () => {
    render(<Calendar value={new Date(2026, 2, 16)} locale="uz" />);
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Mart 2026');
  });
});
