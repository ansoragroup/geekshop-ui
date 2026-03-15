import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Steps } from './Steps';

const defaultItems = [
  { title: "To'lov" },
  { title: 'Yuborish' },
  { title: 'Yetkazish' },
  { title: 'Baholash' },
];

describe('Steps', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all step titles', () => {
    render(<Steps current={0} items={defaultItems} />);
    expect(screen.getByText("To'lov")).toBeInTheDocument();
    expect(screen.getByText('Yuborish')).toBeInTheDocument();
    expect(screen.getByText('Yetkazish')).toBeInTheDocument();
    expect(screen.getByText('Baholash')).toBeInTheDocument();
  });

  it('has role="list" on root', () => {
    render(<Steps current={0} items={defaultItems} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders listitems for each step', () => {
    render(<Steps current={0} items={defaultItems} />);
    const listitems = screen.getAllByRole('listitem');
    expect(listitems).toHaveLength(4);
  });

  it('marks active step with aria-current="step"', () => {
    render(<Steps current={1} items={defaultItems} />);
    const listitems = screen.getAllByRole('listitem');
    expect(listitems[1]).toHaveAttribute('aria-current', 'step');
    expect(listitems[0]).not.toHaveAttribute('aria-current');
    expect(listitems[2]).not.toHaveAttribute('aria-current');
  });

  it('renders step descriptions when provided', () => {
    render(
      <Steps
        current={0}
        items={[
          { title: "To'lov", description: "Muvaffaqiyatli to'landi" },
          { title: 'Yuborish' },
        ]}
      />,
    );
    expect(screen.getByText("Muvaffaqiyatli to'landi")).toBeInTheDocument();
  });

  it('does not render descriptions when not provided', () => {
    const { container } = render(<Steps current={0} items={defaultItems} />);
    const descriptions = container.querySelectorAll('[class*="description"]');
    expect(descriptions).toHaveLength(0);
  });

  it('applies horizontal direction by default', () => {
    const { container } = render(<Steps current={0} items={defaultItems} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('direction-horizontal');
  });

  it('applies vertical direction when specified', () => {
    const { container } = render(<Steps current={0} items={defaultItems} direction="vertical" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('direction-vertical');
  });

  it('applies size-sm class when size is sm', () => {
    const { container } = render(<Steps current={0} items={defaultItems} size="sm" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('size-sm');
  });

  it('applies size-md class by default', () => {
    const { container } = render(<Steps current={0} items={defaultItems} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('size-md');
  });

  it('renders custom icon when provided', () => {
    render(
      <Steps
        current={0}
        items={[{ title: 'Step 1', icon: <span data-testid="custom-icon">X</span> }]}
      />,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Steps current={0} items={defaultItems} className="my-steps" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-steps');
  });

  it('renders checkmark SVG for completed steps', () => {
    const { container } = render(<Steps current={2} items={defaultItems} />);
    const listitems = container.querySelectorAll('[class*="step"]');
    // First two steps should have SVG checkmarks (completed)
    const completedSteps = Array.from(listitems).filter((el) =>
      el.className.includes('status-completed'),
    );
    expect(completedSteps).toHaveLength(2);
    completedSteps.forEach((step) => {
      expect(step.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('renders connector lines between steps', () => {
    const { container } = render(<Steps current={1} items={defaultItems} />);
    const connectors = container.querySelectorAll('[class*="connector"]');
    // 3 connectors for 4 steps (no connector before first step)
    expect(connectors).toHaveLength(3);
  });

  it('has aria-label on root', () => {
    render(<Steps current={0} items={defaultItems} />);
    expect(screen.getByLabelText('Progress steps')).toBeInTheDocument();
  });
});
