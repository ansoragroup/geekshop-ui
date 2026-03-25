import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { TreeView, type TreeNode } from './TreeView';

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

describe('TreeView', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with role="tree"', () => {
    render(<TreeView nodes={sampleNodes} />);
    expect(screen.getByRole('tree')).toBeInTheDocument();
  });

  it('renders tree items with role="treeitem"', () => {
    render(<TreeView nodes={sampleNodes} />);
    const items = screen.getAllByRole('treeitem');
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('renders node labels', () => {
    render(<TreeView nodes={sampleNodes} />);
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
  });

  it('expands node on chevron click', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={sampleNodes} />);
    const expandBtn = screen.getByLabelText('Expand Electronics');
    await user.click(expandBtn);
    expect(screen.getByText('Phones')).toBeInTheDocument();
    expect(screen.getByText('Laptops')).toBeInTheDocument();
  });

  it('uses defaultExpandedIds', () => {
    render(<TreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    expect(screen.getByText('Phones')).toBeInTheDocument();
  });

  it('sets aria-expanded on parent nodes', () => {
    render(<TreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    const electronicsItem = screen.getByText('Electronics').closest('[role="treeitem"]');
    expect(electronicsItem).toHaveAttribute('aria-expanded', 'true');
  });

  it('sets aria-level on nodes', () => {
    render(<TreeView nodes={sampleNodes} defaultExpandedIds={['electronics']} />);
    const electronicsItem = screen.getByText('Electronics').closest('[role="treeitem"]');
    expect(electronicsItem).toHaveAttribute('aria-level', '1');
    const phonesItem = screen.getByText('Phones').closest('[role="treeitem"]');
    expect(phonesItem).toHaveAttribute('aria-level', '2');
  });

  it('calls onExpandChange when expanding', async () => {
    const onExpandChange = vi.fn();
    const user = userEvent.setup();
    render(<TreeView nodes={sampleNodes} onExpandChange={onExpandChange} />);
    await user.click(screen.getByLabelText('Expand Electronics'));
    expect(onExpandChange).toHaveBeenCalledWith(['electronics']);
  });

  it('supports selection with selectable prop', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TreeView
        nodes={sampleNodes}
        selectable
        defaultExpandedIds={['electronics']}
        onSelectionChange={onSelectionChange}
      />
    );
    await user.click(screen.getByText('Phones').closest('[role="treeitem"]')!);
    expect(onSelectionChange).toHaveBeenCalledWith(['phones']);
  });

  it('sets aria-selected on selected nodes', () => {
    render(<TreeView nodes={sampleNodes} selectable defaultSelectedIds={['clothing']} />);
    const item = screen.getByText('Clothing').closest('[role="treeitem"]');
    expect(item).toHaveAttribute('aria-selected', 'true');
  });

  it('renders checkboxes when showCheckboxes is true', () => {
    render(<TreeView nodes={sampleNodes} showCheckboxes defaultExpandedIds={['electronics']} />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('toggles checkbox on click', async () => {
    const onCheckChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TreeView
        nodes={sampleNodes}
        showCheckboxes
        defaultExpandedIds={['electronics']}
        onCheckChange={onCheckChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    expect(onCheckChange).toHaveBeenCalled();
  });

  it('sets aria-disabled on disabled nodes', () => {
    const disabledNodes: TreeNode[] = [
      { id: 'n1', label: 'Active' },
      { id: 'n2', label: 'Disabled', disabled: true },
    ];
    render(<TreeView nodes={disabledNodes} />);
    const disabledItem = screen.getByText('Disabled').closest('[role="treeitem"]');
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('toggles expand on Enter key', async () => {
    const user = userEvent.setup();
    render(<TreeView nodes={sampleNodes} />);
    const item = screen.getByText('Electronics').closest('[role="treeitem"]')!;
    item.focus();
    await user.keyboard('{Enter}');
    // Should have expanded — children visible
    expect(screen.getByText('Phones')).toBeInTheDocument();
  });

  it('spreads rest props onto root', () => {
    const { container } = render(<TreeView nodes={sampleNodes} data-testid="tree" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'tree');
  });

  it('filters nodes by searchQuery', () => {
    render(
      <TreeView nodes={sampleNodes} searchQuery="Clothing" defaultExpandedIds={['electronics']} />
    );
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    // Electronics does not match search
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
  });

  it('shows ancestor of matching search result', () => {
    render(
      <TreeView nodes={sampleNodes} searchQuery="Phones" defaultExpandedIds={['electronics']} />
    );
    // Electronics is ancestor of Phones, should be visible
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Phones')).toBeInTheDocument();
  });
});
