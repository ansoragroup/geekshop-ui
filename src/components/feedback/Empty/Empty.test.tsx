import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Empty, emptyIcons } from './Empty';

describe('Empty', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default title', () => {
    render(<Empty />);
    expect(screen.getByText("Ma'lumot topilmadi")).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<Empty title="Savatingiz bo'sh" />);
    expect(screen.getByText("Savatingiz bo'sh")).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Empty description="Mahsulot qo'shing" />);
    expect(screen.getByText("Mahsulot qo'shing")).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<Empty />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('renders action button when both actionText and onAction are provided', () => {
    const onAction = vi.fn();
    render(<Empty actionText="Xarid qilish" onAction={onAction} />);
    expect(screen.getByText('Xarid qilish')).toBeInTheDocument();
  });

  it('does not render action button when only actionText is provided', () => {
    render(<Empty actionText="Xarid qilish" />);
    expect(screen.queryByText('Xarid qilish')).toBeNull();
  });

  it('does not render action button when only onAction is provided', () => {
    const onAction = vi.fn();
    const { container } = render(<Empty onAction={onAction} />);
    expect(container.querySelector('button')).toBeNull();
  });

  it('calls onAction when action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<Empty actionText="Xarid qilish" onAction={onAction} />);
    await user.click(screen.getByText('Xarid qilish'));
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('renders default icon when no icon prop is given', () => {
    const { container } = render(<Empty />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders custom icon when icon prop is given', () => {
    render(<Empty icon={<span data-testid="custom-icon">Custom</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders preset cart icon', () => {
    const { container } = render(<Empty icon={emptyIcons.cart} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders preset search icon', () => {
    const { container } = render(<Empty icon={emptyIcons.search} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders all parts together', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <Empty
        title="Bo'sh"
        description="Hech narsa topilmadi"
        actionText="Qayta urinish"
        onAction={onAction}
        icon={emptyIcons.search}
      />,
    );
    expect(screen.getByText("Bo'sh")).toBeInTheDocument();
    expect(screen.getByText('Hech narsa topilmadi')).toBeInTheDocument();
    const btn = screen.getByText('Qayta urinish');
    await user.click(btn);
    expect(onAction).toHaveBeenCalledOnce();
  });
});
