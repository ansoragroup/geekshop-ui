import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Chip } from './Chip';

describe('Chip', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with label text', () => {
    render(<Chip label="Electronics" />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('renders as option role when onSelect is provided', () => {
    render(<Chip label="Test" onSelect={() => {}} />);
    expect(screen.getByRole('option')).toBeInTheDocument();
  });

  it('shows aria-selected=false by default', () => {
    render(<Chip label="Test" onSelect={() => {}} />);
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
  });

  it('shows aria-selected=true when selected', () => {
    render(<Chip label="Test" selected onSelect={() => {}} />);
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onSelect when clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<Chip label="Test" onSelect={onSelect} />);
    await user.click(screen.getByRole('option'));

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('calls onSelect on Enter key', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<Chip label="Test" onSelect={onSelect} />);
    const chip = screen.getByRole('option');
    chip.focus();
    await user.keyboard('{Enter}');

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('calls onSelect on Space key', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<Chip label="Test" onSelect={onSelect} />);
    const chip = screen.getByRole('option');
    chip.focus();
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('does not call onSelect when disabled', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(<Chip label="Test" disabled onSelect={onSelect} />);
    await user.click(screen.getByText('Test'));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('renders delete button when deletable', () => {
    render(<Chip label="Test" deletable onDelete={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(<Chip label="RTX 4090" deletable onDelete={onDelete} />);
    await user.click(screen.getByRole('button'));

    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('does not call onDelete when disabled', () => {
    const onDelete = vi.fn();

    render(<Chip label="Test" deletable disabled onDelete={onDelete} />);
    // Button is disabled, userEvent won't click disabled buttons by default
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(onDelete).not.toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    render(<Chip label="Featured" icon={<span data-testid="star">*</span>} />);
    expect(screen.getByTestId('star')).toBeInTheDocument();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Chip label="Test" disabled onSelect={() => {}} />);
    expect(screen.getByRole('option')).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not render delete button when not deletable', () => {
    render(<Chip label="Test" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('delete button has proper aria-label', () => {
    render(<Chip label="RTX 4090" deletable onDelete={() => {}} />);
    // Default fallback: key is returned as-is when no provider
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label');
  });

  it('supports custom className', () => {
    const { container } = render(<Chip label="Test" className="my-chip" />);
    expect(container.firstChild).toHaveClass('my-chip');
  });
});
