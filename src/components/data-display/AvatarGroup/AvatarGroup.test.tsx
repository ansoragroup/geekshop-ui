import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroup } from './AvatarGroup';

describe('AvatarGroup', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all children when max is not set', () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    expect(screen.getByText('U1')).toBeInTheDocument();
    expect(screen.getByText('U2')).toBeInTheDocument();
    expect(screen.getByText('U3')).toBeInTheDocument();
  });

  it('shows overflow count when children exceed max', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
        <Avatar name="User 4" />
        <Avatar name="User 5" />
      </AvatarGroup>,
    );
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('shows only max avatars when overflow occurs', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    expect(screen.getByText('U1')).toBeInTheDocument();
    expect(screen.getByText('U2')).toBeInTheDocument();
    expect(screen.queryByText('U3')).toBeNull();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('does not show overflow when children equal max', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it('does not show overflow when children are less than max', () => {
    render(
      <AvatarGroup max={5}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
      </AvatarGroup>,
    );
    expect(screen.queryByText(/\+/)).toBeNull();
  });

  it('has role="group" on root', () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
      </AvatarGroup>,
    );
    expect(screen.getByRole('group')).toBeInTheDocument();
  });

  it('has aria-label with total count', () => {
    render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    expect(screen.getByLabelText('3 avatars')).toBeInTheDocument();
  });

  it('overflow element has aria-label with count', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    expect(screen.getByLabelText('+2 more')).toBeInTheDocument();
  });

  it('applies size-sm class', () => {
    const { container } = render(
      <AvatarGroup size="sm">
        <Avatar name="User 1" size="sm" />
      </AvatarGroup>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('size-sm');
  });

  it('applies size-lg class', () => {
    const { container } = render(
      <AvatarGroup size="lg">
        <Avatar name="User 1" size="lg" />
      </AvatarGroup>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('size-lg');
  });

  it('applies default size-md class', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="User 1" />
      </AvatarGroup>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('size-md');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AvatarGroup className="my-group">
        <Avatar name="User 1" />
      </AvatarGroup>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-group');
  });

  it('sets z-index on items for stacking order', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="User 1" />
        <Avatar name="User 2" />
        <Avatar name="User 3" />
      </AvatarGroup>,
    );
    const items = container.querySelectorAll('[class*="item"]');
    // First item should have highest z-index
    expect((items[0] as HTMLElement).style.zIndex).toBe('3');
    expect((items[1] as HTMLElement).style.zIndex).toBe('2');
    expect((items[2] as HTMLElement).style.zIndex).toBe('1');
  });
});
