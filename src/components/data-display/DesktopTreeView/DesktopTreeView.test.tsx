import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DesktopTreeView } from './DesktopTreeView';
import type { TreeNode } from '../TreeView';

const sampleNodes: TreeNode[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      { id: 'phones', label: 'Phones', children: [{ id: 'iphone', label: 'iPhone' }] },
      { id: 'laptops', label: 'Laptops' },
    ],
  },
  { id: 'clothing', label: 'Clothing' },
];

describe('DesktopTreeView', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with role="tree"', () => {
    render(<DesktopTreeView nodes={sampleNodes} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('renders tree items with role="treeitem"', () => {
    render(<DesktopTreeView nodes={sampleNodes} />);
    const items = screen.getAllByRole('treeitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('renders node labels', () => {
    render(<DesktopTreeView nodes={sampleNodes} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('expands on chevron click', async () => {
    const user = userEvent.setup();
    render(<DesktopTreeView nodes={sampleNodes} />);
    await user.click(screen.getByLabelText('Expand Electronics'));
    expect(screen.getByText('Phones')).toBeInTheDocument();
  });

  it('uses defaultExpandedIds', () => {
    render(<DesktopTreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    expect(screen.getByText('Phones')).toBeInTheDocument();
  });

  it('sets aria-expanded on parent nodes', () => {
    render(<DesktopTreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    const item = screen.getByText('Electronics').closest('[role="treeitem"]');
    expect(item).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-level on nodes', () => {
    render(<DesktopTreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    const item = screen.getByText('Electronics').closest('[role="treeitem"]');
    expect(item).toHaveAttribute('aria-level', '1');
    const phonesItem = screen.getByText('Phones').closest('[role="treeitem"]');
    expect(phonesItem).toHaveAttribute('aria-level', '2');
  });

  it('navigates with ArrowDown key', async () => {
    const user = userEvent.setup();
    render(<DesktopTreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    const firstItem = screen.getByText('Electronics').closest('[role="treeitem"]')!;
    firstItem.focus();
    await user.keyboard('{ArrowDown}');
    // Focus should move to Phones
    const phonesItem = screen.getByText('Phones').closest('[role="treeitem"]');
    expect(document.activeElement).toBe(phonesItem);
  });

  it('navigates with ArrowUp key', async () => {
    const user = userEvent.setup();
    render(<DesktopTreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    // Focus the second item first
    const phonesItem = screen.getByText('Phones').closest('[role="treeitem"]')!;
    phonesItem.focus();
    // Trigger arrow up through the tree's key handler
    await user.keyboard('{ArrowUp}');
    const elecItem = screen.getByText('Electronics').closest('[role="treeitem"]');
    expect(document.activeElement).toBe(elecItem);
  });

  it('expands on ArrowRight when collapsed', async () => {
    const onExpandChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopTreeView nodes={sampleNodes} onExpandChange={onExpandChange} />);
    const item = screen.getByText('Electronics').closest('[role="treeitem"]')!;
    item.focus();
    await user.keyboard('{ArrowRight}');
    expect(onExpandChange).toHaveBeenCalledWith(['electronics']);
  });

  it('collapses on ArrowLeft when expanded', async () => {
    const onExpandChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopTreeView
        nodes={sampleNodes}
        defaultExpandedIds={['electronics']}
        onExpandChange={onExpandChange}
      />
    );
    const item = screen.getByText('Electronics').closest('[role="treeitem"]')!;
    item.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onExpandChange).toHaveBeenCalled();
  });

  it('toggles selection with Enter key', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopTreeView nodes={sampleNodes} selectable onSelectionChange={onSelectionChange} />
    );
    const item = screen.getByText('Clothing').closest('[role="treeitem"]')!;
    item.focus();
    await user.keyboard('{Enter}');
    expect(onSelectionChange).toHaveBeenCalledWith(['clothing']);
  });

  it('toggles checkbox with Space key', async () => {
    const onCheckChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopTreeView nodes={sampleNodes} showCheckboxes onCheckChange={onCheckChange} />);
    const item = screen.getByText('Clothing').closest('[role="treeitem"]')!;
    item.focus();
    await user.keyboard(' ');
    expect(onCheckChange).toHaveBeenCalledWith(['clothing']);
  });

  it('renders checkboxes when showCheckboxes is true', () => {
    render(<DesktopTreeView nodes={sampleNodes} showCheckboxes />);
    expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
  });

  it('sets aria-disabled on disabled nodes', () => {
    const nodes: TreeNode[] = [{ id: 'd1', label: 'Disabled', disabled: true }];
    render(<DesktopTreeView nodes={nodes} />);
    expect(screen.getByRole('treeitem')).toHaveAttribute('aria-disabled', 'true');
  });

  it('spreads rest props onto root', () => {
    const { container } = render(<DesktopTreeView nodes={sampleNodes} data-testid="dtree" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'dtree');
  });

  it('filters by searchQuery', () => {
    render(<DesktopTreeView nodes={sampleNodes} searchQuery="Clothing" />);
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
  });
});
