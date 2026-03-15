import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ActionSheet } from './ActionSheet';

const defaultActions = [
  { name: 'Share', onClick: vi.fn() },
  { name: 'Save', onClick: vi.fn() },
  { name: 'Delete', color: '#FF3B30', onClick: vi.fn() },
];

describe('ActionSheet', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders when visible', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(<ActionSheet visible={false} onClose={() => {}} actions={defaultActions} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all action names', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    expect(screen.getByText('Share')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('renders title when provided', () => {
    render(
      <ActionSheet visible onClose={() => {}} title="Choose action" actions={defaultActions} />,
    );
    expect(screen.getByText('Choose action')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <ActionSheet visible onClose={() => {}} description="This is irreversible" actions={defaultActions} />,
    );
    expect(screen.getByText('This is irreversible')).toBeInTheDocument();
  });

  it('calls action onClick and closes on action click', () => {
    const onClose = vi.fn();
    const onClick = vi.fn();
    render(
      <ActionSheet
        visible
        onClose={onClose}
        actions={[{ name: 'Test', onClick }]}
      />,
    );
    fireEvent.click(screen.getByText('Test'));
    expect(onClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClick for disabled actions', () => {
    const onClick = vi.fn();
    render(
      <ActionSheet
        visible
        onClose={() => {}}
        actions={[{ name: 'Disabled', disabled: true, onClick }]}
      />,
    );
    fireEvent.click(screen.getByText('Disabled'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders cancel button by default', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    // Cancel button exists (text from i18n defaults to "Bekor qilish")
    // Action items have role="menuitem", cancel button has implicit role="button"
    expect(screen.getByText('Bekor qilish')).toBeInTheDocument();
  });

  it('calls onClose when cancel is clicked', () => {
    const onClose = vi.fn();
    render(
      <ActionSheet visible onClose={onClose} actions={defaultActions} cancelText="Cancel" />,
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('applies custom color to action', () => {
    render(
      <ActionSheet
        visible
        onClose={() => {}}
        actions={[{ name: 'Red', color: 'rgb(255, 0, 0)' }]}
      />,
    );
    const btn = screen.getByText('Red').closest('button');
    expect(btn?.style.color).toBe('rgb(255, 0, 0)');
  });

  it('has aria-modal="true"', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders action descriptions', () => {
    render(
      <ActionSheet
        visible
        onClose={() => {}}
        actions={[{ name: 'Share', description: 'Via link' }]}
      />,
    );
    expect(screen.getByText('Via link')).toBeInTheDocument();
  });

  it('renders menu role on actions container', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders menuitem role on each action', () => {
    render(<ActionSheet visible onClose={() => {}} actions={defaultActions} />);
    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems).toHaveLength(3);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ActionSheet visible onClose={() => {}} actions={defaultActions} className="my-sheet" />,
    );
    expect(container.firstElementChild?.className).toContain('my-sheet');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ActionSheet ref={ref} visible onClose={() => {}} actions={defaultActions} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
