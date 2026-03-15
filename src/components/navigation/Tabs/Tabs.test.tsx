import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Tabs } from './Tabs';
import type { TabItem } from './Tabs';

const defaultItems: TabItem[] = [
  { key: 'tab1', label: 'Tab One', children: <div>Content 1</div> },
  { key: 'tab2', label: 'Tab Two', children: <div>Content 2</div> },
  { key: 'tab3', label: 'Tab Three', children: <div>Content 3</div> },
];

describe('Tabs', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders all tab labels', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Tab Three')).toBeInTheDocument();
  });

  it('has role="tablist" on tab bar', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tab buttons with role="tab"', () => {
    render(<Tabs items={defaultItems} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('shows first tab content by default', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('shows content for defaultActiveKey', () => {
    render(<Tabs items={defaultItems} defaultActiveKey="tab2" />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('switches content on tab click', () => {
    render(<Tabs items={defaultItems} />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('marks active tab with aria-selected', () => {
    render(<Tabs items={defaultItems} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(tabs[1]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs items={defaultItems} onChange={onChange} />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('does not switch to disabled tab', () => {
    const items: TabItem[] = [
      { key: 'tab1', label: 'Tab One', children: <div>Content 1</div> },
      { key: 'tab2', label: 'Tab Two', children: <div>Content 2</div>, disabled: true },
    ];
    render(<Tabs items={items} />);
    fireEvent.click(screen.getByText('Tab Two'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('renders badge on tab', () => {
    const items: TabItem[] = [
      { key: 'tab1', label: 'Tab One', badge: 5, children: <div>Content</div> },
    ];
    render(<Tabs items={items} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ for badges over 99', () => {
    const items: TabItem[] = [
      { key: 'tab1', label: 'Tab One', badge: 150, children: <div>Content</div> },
    ];
    render(<Tabs items={items} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('applies line variant class by default', () => {
    const { container } = render(<Tabs items={defaultItems} />);
    expect(container.firstElementChild?.className).toContain('variant-line');
  });

  it('applies card variant class', () => {
    const { container } = render(<Tabs items={defaultItems} variant="card" />);
    expect(container.firstElementChild?.className).toContain('variant-card');
  });

  it('has tabpanel role on content', () => {
    render(<Tabs items={defaultItems} />);
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Tabs items={defaultItems} className="my-tabs" />);
    expect(container.firstElementChild?.className).toContain('my-tabs');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<Tabs ref={ref} items={defaultItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
