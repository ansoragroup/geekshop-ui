import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders dot badge by default', () => {
    const { container } = render(<Badge />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge).toBeTruthy();
    expect(badge.tagName).toBe('SPAN');
  });

  it('renders count badge with number', () => {
    render(<Badge type="count" content={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('caps count at max value with "+"', () => {
    render(<Badge type="count" content={150} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('shows exact count when at max', () => {
    render(<Badge type="count" content={99} max={99} />);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('uses custom max value', () => {
    render(<Badge type="count" content={15} max={10} />);
    expect(screen.getByText('10+')).toBeInTheDocument();
  });

  it('renders text badge', () => {
    render(<Badge type="text" content="NEW" />);
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('renders nothing for count badge with no content and no children', () => {
    const { container } = render(<Badge type="count" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders nothing for count badge with 0 count and no children', () => {
    const { container } = render(<Badge type="count" content={0} />);
    expect(container.innerHTML).toBe('');
  });

  it('hides badge but shows children for count=0', () => {
    render(
      <Badge type="count" content={0}>
        <span>Icon</span>
      </Badge>,
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    // No badge number should be visible
    expect(screen.queryByText('0')).toBeNull();
  });

  it('wraps children with badge overlay', () => {
    render(
      <Badge type="dot">
        <span data-testid="child">Notification</span>
      </Badge>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies custom className to wrapper', () => {
    const { container } = render(
      <Badge type="dot" className="my-badge">
        <span>Child</span>
      </Badge>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain('my-badge');
  });

  it('applies customColor as backgroundColor', () => {
    const { container } = render(<Badge type="dot" customColor="#FF00FF" />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge.style.backgroundColor).toBe('rgb(255, 0, 255)');
  });

  it('does not apply customColor when not provided', () => {
    const { container } = render(<Badge type="dot" />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge.style.backgroundColor).toBe('');
  });

  it('renders dot badge with no text content', () => {
    const { container } = render(<Badge type="dot" />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge.textContent).toBe('');
  });

  it('renders count badge with negative content as hidden', () => {
    const { container } = render(<Badge type="count" content={-1} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders text badge with empty string content', () => {
    const { container } = render(<Badge type="text" content="" />);
    const badge = container.firstElementChild as HTMLElement;
    expect(badge).toBeTruthy();
  });
});
