import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Popup } from './Popup';

describe('Popup', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders nothing when visible is false', () => {
    const { container } = render(<Popup visible={false} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders when visible is true', () => {
    render(<Popup visible={true}>Content here</Popup>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('renders with role="dialog" and aria-modal="true"', () => {
    render(<Popup visible={true}>Test</Popup>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-label matching title prop', () => {
    render(<Popup visible={true} title="My Title">Content</Popup>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'My Title');
  });

  it('defaults aria-label to "Popup" when no title', () => {
    render(<Popup visible={true}>Content</Popup>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Popup');
  });

  it('renders title in the header', () => {
    render(<Popup visible={true} title="Popup Title">Body</Popup>);
    expect(screen.getByText('Popup Title')).toBeInTheDocument();
  });

  it('renders close button by default (closable=true)', () => {
    render(<Popup visible={true} title="Test">Body</Popup>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('does not render close button when closable is false', () => {
    render(<Popup visible={true} title="Test" closable={false}>Body</Popup>);
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Popup visible={true} title="Test" onClose={onClose}>Body</Popup>);
    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<Popup visible={true} onClose={onClose}>Body</Popup>);
    // The overlay is the outermost div
    const overlay = container.firstElementChild as HTMLElement;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when popup body is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Popup visible={true} onClose={onClose}>Body content</Popup>);
    await user.click(screen.getByText('Body content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders children in the body', () => {
    render(
      <Popup visible={true}>
        <div data-testid="child">Child Element</div>
      </Popup>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('does not render header when neither title nor closable', () => {
    const { container } = render(
      <Popup visible={true} closable={false}>Body only</Popup>,
    );
    // No header rendered
    const dialog = container.querySelector('[role="dialog"]') as HTMLElement;
    // The first child should be the body div, not a header
    expect(dialog.children.length).toBe(1);
  });
});
