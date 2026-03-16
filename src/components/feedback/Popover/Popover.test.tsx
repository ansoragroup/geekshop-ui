import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Popover } from './Popover';

describe('Popover', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(
      <Popover content="Popover content">
        <button>Trigger</button>
      </Popover>,
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not show popover by default', () => {
    render(
      <Popover content="Popover content">
        <button>Trigger</button>
      </Popover>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows popover on click', async () => {
    render(
      <Popover content="Click popover" trigger="click">
        <button>Click me</button>
      </Popover>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Click me').parentElement!);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Click popover')).toBeInTheDocument();
  });

  it('toggles popover on click', async () => {
    render(
      <Popover content="Toggle content" trigger="click">
        <button>Toggle</button>
      </Popover>,
    );
    const trigger = screen.getByText('Toggle').parentElement!;
    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows popover on hover', async () => {
    render(
      <Popover content="Hover content" trigger="hover">
        <button>Hover me</button>
      </Popover>,
    );
    await act(async () => {
      fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('hides popover on mouse leave', async () => {
    render(
      <Popover content="Hover content" trigger="hover">
        <button>Hover</button>
      </Popover>,
    );
    const trigger = screen.getByText('Hover').parentElement!;
    await act(async () => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseLeave(trigger);
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(
      <Popover content="Escape me" trigger="click">
        <button>Trigger</button>
      </Popover>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Trigger').parentElement!);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onVisibleChange', async () => {
    const onVisibleChange = vi.fn();
    render(
      <Popover content="Content" trigger="click" onVisibleChange={onVisibleChange}>
        <button>Trigger</button>
      </Popover>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Trigger').parentElement!);
    });
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  it('renders with arrow by default', async () => {
    const { container } = render(
      <Popover content="With arrow" visible>
        <button>Trigger</button>
      </Popover>,
    );
    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).toBeInTheDocument();
  });

  it('hides arrow when arrow=false', async () => {
    const { container } = render(
      <Popover content="No arrow" arrow={false} visible>
        <button>Trigger</button>
      </Popover>,
    );
    const arrow = container.querySelector('[aria-hidden="true"]');
    expect(arrow).not.toBeInTheDocument();
  });

  it('renders ReactNode content', async () => {
    render(
      <Popover content={<strong>Bold content</strong>} visible>
        <button>Trigger</button>
      </Popover>,
    );
    expect(screen.getByText('Bold content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Popover content="Content" className="my-popover">
        <button>Trigger</button>
      </Popover>,
    );
    expect(container.firstElementChild?.className).toContain('my-popover');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Popover ref={ref} content="Content">
        <button>Trigger</button>
      </Popover>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('shows on focus with hover trigger', async () => {
    render(
      <Popover content="Focus popover" trigger="hover">
        <button>Trigger</button>
      </Popover>,
    );
    await act(async () => {
      fireEvent.focus(screen.getByText('Trigger').parentElement!);
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('applies placement class', async () => {
    const { container } = render(
      <Popover content="Content" placement="top" visible>
        <button>Trigger</button>
      </Popover>,
    );
    const popover = container.querySelector('[class*="popover"]');
    expect(popover?.className).toContain('placement-top');
  });
});
