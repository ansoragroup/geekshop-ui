import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('does not show tooltip by default', () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(
      <Tooltip content="Tooltip text" trigger="hover">
        <button>Trigger</button>
      </Tooltip>,
    );
    await act(async () => {
      fireEvent.mouseEnter(screen.getByText('Trigger').parentElement!);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Tooltip text" trigger="hover">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByText('Trigger').parentElement!;
    await act(async () => {
      fireEvent.mouseEnter(trigger);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await act(async () => {
      fireEvent.mouseLeave(trigger);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on click with click trigger', async () => {
    render(
      <Tooltip content="Click tooltip" trigger="click">
        <button>Click me</button>
      </Tooltip>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Click me').parentElement!);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('toggles tooltip on click trigger', async () => {
    render(
      <Tooltip content="Click tooltip" trigger="click">
        <button>Click me</button>
      </Tooltip>,
    );
    const trigger = screen.getByText('Click me').parentElement!;
    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(trigger);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(
      <Tooltip content="Escape me" trigger="click">
        <button>Trigger</button>
      </Tooltip>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Trigger').parentElement!);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' });
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('calls onVisibleChange', async () => {
    const onVisibleChange = vi.fn();
    render(
      <Tooltip content="Tooltip" trigger="click" onVisibleChange={onVisibleChange}>
        <button>Trigger</button>
      </Tooltip>,
    );
    await act(async () => {
      fireEvent.click(screen.getByText('Trigger').parentElement!);
    });
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  it('shows tooltip on focus with hover trigger', async () => {
    render(
      <Tooltip content="Focus tooltip" trigger="hover">
        <button>Trigger</button>
      </Tooltip>,
    );
    await act(async () => {
      fireEvent.focus(screen.getByText('Trigger').parentElement!);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('applies placement class', async () => {
    const { container } = render(
      <Tooltip content="Tooltip" placement="bottom" visible>
        <button>Trigger</button>
      </Tooltip>,
    );
    const tooltip = container.querySelector('[class*="tooltip"]');
    expect(tooltip?.className).toContain('placement-bottom');
  });

  it('renders ReactNode content', async () => {
    render(
      <Tooltip content={<strong>Bold text</strong>} visible>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByText('Bold text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Tooltip content="Tooltip" className="my-tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(container.firstElementChild?.className).toContain('my-tooltip');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Tooltip ref={ref} content="Tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
