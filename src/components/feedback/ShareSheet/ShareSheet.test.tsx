import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { ShareSheet } from './ShareSheet';

describe('ShareSheet', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders when visible', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('does not render when not visible', () => {
    render(<ShareSheet visible={false} onClose={() => {}} url="https://example.com" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all default platforms', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" />);
    expect(screen.getByLabelText('Telegram')).toBeInTheDocument();
    expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('SMS')).toBeInTheDocument();
  });

  it('renders only specified platforms', () => {
    render(
      <ShareSheet
        visible
        onClose={() => {}}
        url="https://example.com"
        platforms={['telegram', 'whatsapp']}
      />,
    );
    expect(screen.getByLabelText('Telegram')).toBeInTheDocument();
    expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
    expect(screen.queryByLabelText('Twitter')).not.toBeInTheDocument();
  });

  it('renders copy link button by default', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" />);
    expect(screen.getByText('Havolani nusxalash')).toBeInTheDocument();
  });

  it('hides copy link when showCopyLink is false', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" showCopyLink={false} />);
    expect(screen.queryByText('Havolani nusxalash')).not.toBeInTheDocument();
  });

  it('calls onShare when platform is clicked', () => {
    const onShare = vi.fn();
    // Mock window.open to prevent actual navigation
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(
      <ShareSheet
        visible
        onClose={() => {}}
        url="https://example.com"
        onShare={onShare}
        platforms={['telegram']}
      />,
    );
    fireEvent.click(screen.getByLabelText('Telegram'));
    expect(onShare).toHaveBeenCalledWith('telegram');
    openSpy.mockRestore();
  });

  it('calls onClose when platform is clicked', () => {
    const onClose = vi.fn();
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(
      <ShareSheet
        visible
        onClose={onClose}
        url="https://example.com"
        platforms={['telegram']}
      />,
    );
    fireEvent.click(screen.getByLabelText('Telegram'));
    expect(onClose).toHaveBeenCalled();
    openSpy.mockRestore();
  });

  it('has aria-modal="true"', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the title', () => {
    render(<ShareSheet visible onClose={() => {}} url="https://example.com" />);
    expect(screen.getByText('Ulashish')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ShareSheet visible onClose={() => {}} url="https://example.com" className="my-sheet" />,
    );
    expect(container.firstElementChild?.className).toContain('my-sheet');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<ShareSheet ref={ref} visible onClose={() => {}} url="https://example.com" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(<ShareSheet visible onClose={onClose} url="https://example.com" />);
    // Click the overlay (the presentation role element)
    fireEvent.click(screen.getByRole('presentation'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when sheet content is clicked', () => {
    const onClose = vi.fn();
    render(<ShareSheet visible onClose={onClose} url="https://example.com" />);
    fireEvent.click(screen.getByRole('dialog'));
    // onClose should not be called from content click
    expect(onClose).not.toHaveBeenCalled();
  });
});
