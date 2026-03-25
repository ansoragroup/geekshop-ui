'use client';
import { forwardRef, useState, useCallback, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import styles from './TreeView.module.scss';

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
  icon?: ReactNode;
  hasChildren?: boolean;
}

export interface TreeViewProps extends HTMLAttributes<HTMLDivElement> {
  nodes: TreeNode[];
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandChange?: (ids: string[]) => void;
  selectedIds?: string[];
  defaultSelectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  selectable?: boolean;
  multiSelect?: boolean;
  showCheckboxes?: boolean;
  checkedIds?: string[];
  defaultCheckedIds?: string[];
  onCheckChange?: (ids: string[]) => void;
  loadChildren?: (id: string) => Promise<TreeNode[]>;
  searchQuery?: string;
}

function matchesSearch(node: TreeNode, query: string): boolean {
  if (!query) return true;
  const lower = query.toLowerCase();
  if (node.label.toLowerCase().includes(lower)) return true;
  if (node.children) {
    return node.children.some((child) => matchesSearch(child, lower));
  }
  return false;
}

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={cn(styles.chevron, expanded && styles.chevronExpanded)}
  >
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6l2.5 2.5 4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface TreeNodeRowProps {
  node: TreeNode;
  depth: number;
  expandedIds: string[];
  selectedIds: string[];
  checkedIds: string[];
  selectable: boolean;
  showCheckboxes: boolean;
  loadingIds: Set<string>;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  onCheck: (id: string) => void;
  searchQuery: string;
  dynamicChildren: Map<string, TreeNode[]>;
}

const TreeNodeRow = ({
  node,
  depth,
  expandedIds,
  selectedIds,
  checkedIds,
  selectable,
  showCheckboxes,
  loadingIds,
  onToggleExpand,
  onSelect,
  onCheck,
  searchQuery,
  dynamicChildren,
}: TreeNodeRowProps) => {
  const hasKids = !!(node.children?.length || node.hasChildren || dynamicChildren.has(node.id));
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedIds.includes(node.id);
  const isChecked = checkedIds.includes(node.id);
  const isLoading = loadingIds.has(node.id);

  if (searchQuery && !matchesSearch(node, searchQuery)) {
    return null;
  }

  const children = dynamicChildren.get(node.id) || node.children;

  return (
    <>
      <div
        className={cn(
          styles.nodeRow,
          isSelected && styles.nodeRowSelected,
          node.disabled && styles.nodeRowDisabled
        )}
        style={{ paddingLeft: depth * 20 }}
        role="treeitem"
        aria-expanded={hasKids ? isExpanded : undefined}
        aria-selected={isSelected}
        aria-disabled={node.disabled}
        aria-level={depth + 1}
        tabIndex={node.disabled ? -1 : 0}
        onClick={() => {
          if (node.disabled) return;
          if (selectable) onSelect(node.id);
        }}
        onKeyDown={(e) => {
          if (node.disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (showCheckboxes) {
              onCheck(node.id);
            } else if (selectable) {
              onSelect(node.id);
            } else if (hasKids) {
              onToggleExpand(node.id);
            }
          }
        }}
      >
        {hasKids ? (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(node.id);
            }}
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
            tabIndex={-1}
          >
            <ChevronIcon expanded={isExpanded} />
          </button>
        ) : (
          <span className={styles.leafBullet}>
            <span className={styles.leafDot} />
          </span>
        )}

        {showCheckboxes && (
          <button
            type="button"
            className={cn(styles.checkbox, isChecked && styles.checkboxChecked)}
            onClick={(e) => {
              e.stopPropagation();
              if (!node.disabled) onCheck(node.id);
            }}
            role="checkbox"
            aria-checked={isChecked}
            aria-disabled={node.disabled}
            tabIndex={-1}
          >
            {isChecked && <CheckIcon />}
          </button>
        )}

        {node.icon && <span className={styles.nodeIcon}>{node.icon}</span>}
        <span className={styles.nodeLabel}>{node.label}</span>
      </div>

      {isLoading && (
        <div className={styles.loadingRow} style={{ paddingLeft: (depth + 1) * 20 }}>
          <div className={styles.skeleton} />
          <div className={styles.skeleton} style={{ width: '60%' }} />
        </div>
      )}

      {isExpanded &&
        children &&
        children.map((child) => (
          <TreeNodeRow
            key={child.id}
            node={child}
            depth={depth + 1}
            expandedIds={expandedIds}
            selectedIds={selectedIds}
            checkedIds={checkedIds}
            selectable={selectable}
            showCheckboxes={showCheckboxes}
            loadingIds={loadingIds}
            onToggleExpand={onToggleExpand}
            onSelect={onSelect}
            onCheck={onCheck}
            searchQuery={searchQuery}
            dynamicChildren={dynamicChildren}
          />
        ))}
    </>
  );
};

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  (
    {
      nodes,
      expandedIds: controlledExpandedIds,
      defaultExpandedIds,
      onExpandChange,
      selectedIds: controlledSelectedIds,
      defaultSelectedIds,
      onSelectionChange,
      selectable = false,
      multiSelect = false,
      showCheckboxes = false,
      checkedIds: controlledCheckedIds,
      defaultCheckedIds,
      onCheckChange,
      loadChildren,
      searchQuery = '',
      className,
      ...rest
    },
    ref
  ) => {
    const [expandedIds, setExpandedIds] = useControllableState<string[]>({
      value: controlledExpandedIds,
      defaultValue: defaultExpandedIds ?? [],
      onChange: onExpandChange,
    });

    const [selectedIds, setSelectedIds] = useControllableState<string[]>({
      value: controlledSelectedIds,
      defaultValue: defaultSelectedIds ?? [],
      onChange: onSelectionChange,
    });

    const [checkedIds, setCheckedIds] = useControllableState<string[]>({
      value: controlledCheckedIds,
      defaultValue: defaultCheckedIds ?? [],
      onChange: onCheckChange,
    });

    const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
    const [dynamicChildren, setDynamicChildren] = useState<Map<string, TreeNode[]>>(new Map());

    const handleToggleExpand = useCallback(
      async (id: string) => {
        const isExpanding = !expandedIds.includes(id);
        const newIds = isExpanding ? [...expandedIds, id] : expandedIds.filter((eid) => eid !== id);
        setExpandedIds(newIds);

        if (isExpanding && loadChildren && !dynamicChildren.has(id)) {
          // Find the node to check if it needs loading
          const findNode = (nodes: TreeNode[]): TreeNode | undefined => {
            for (const n of nodes) {
              if (n.id === id) return n;
              if (n.children) {
                const found = findNode(n.children);
                if (found) return found;
              }
            }
            return undefined;
          };
          const node = findNode(nodes);
          if (node && node.hasChildren && (!node.children || node.children.length === 0)) {
            setLoadingIds((prev) => new Set(prev).add(id));
            try {
              const children = await loadChildren(id);
              setDynamicChildren((prev) => new Map(prev).set(id, children));
            } finally {
              setLoadingIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
              });
            }
          }
        }
      },
      [expandedIds, setExpandedIds, loadChildren, dynamicChildren, nodes]
    );

    const handleSelect = useCallback(
      (id: string) => {
        if (multiSelect) {
          const newIds = selectedIds.includes(id)
            ? selectedIds.filter((sid) => sid !== id)
            : [...selectedIds, id];
          setSelectedIds(newIds);
        } else {
          setSelectedIds(selectedIds.includes(id) ? [] : [id]);
        }
      },
      [multiSelect, selectedIds, setSelectedIds]
    );

    const handleCheck = useCallback(
      (id: string) => {
        if (checkedIds.includes(id)) {
          setCheckedIds(checkedIds.filter((cid) => cid !== id));
        } else {
          setCheckedIds([...checkedIds, id]);
        }
      },
      [checkedIds, setCheckedIds]
    );

    return (
      <div ref={ref} className={cn(styles.root, className)} role="tree" {...rest}>
        {nodes.map((node) => (
          <TreeNodeRow
            key={node.id}
            node={node}
            depth={0}
            expandedIds={expandedIds}
            selectedIds={selectedIds}
            checkedIds={checkedIds}
            selectable={selectable}
            showCheckboxes={showCheckboxes}
            loadingIds={loadingIds}
            onToggleExpand={handleToggleExpand}
            onSelect={handleSelect}
            onCheck={handleCheck}
            searchQuery={searchQuery}
            dynamicChildren={dynamicChildren}
          />
        ))}
      </div>
    );
  }
);

TreeView.displayName = 'TreeView';
