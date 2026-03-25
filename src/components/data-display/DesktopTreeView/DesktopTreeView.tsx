'use client';
import { forwardRef, useState, useCallback, useRef, useEffect, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { useControllableState } from '../../../hooks/useControllableState';
import type { TreeNode } from '../TreeView';
import styles from './DesktopTreeView.module.scss';

export interface DesktopTreeViewProps extends HTMLAttributes<HTMLDivElement> {
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

function flattenVisible(
  nodes: TreeNode[],
  expandedIds: string[],
  searchQuery: string,
  dynamicChildren: Map<string, TreeNode[]>
): { node: TreeNode; depth: number }[] {
  const result: { node: TreeNode; depth: number }[] = [];
  function walk(items: TreeNode[], depth: number) {
    for (const node of items) {
      if (searchQuery && !matchesSearch(node, searchQuery)) continue;
      result.push({ node, depth });
      const children = dynamicChildren.get(node.id) || node.children;
      if (children && expandedIds.includes(node.id)) {
        walk(children, depth + 1);
      }
    }
  }
  walk(nodes, 0);
  return result;
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

export const DesktopTreeView = forwardRef<HTMLDivElement, DesktopTreeViewProps>(
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
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const visibleNodes = flattenVisible(nodes, expandedIds, searchQuery, dynamicChildren);

    useEffect(() => {
      if (focusedIndex >= 0 && focusedIndex < visibleNodes.length) {
        const id = visibleNodes[focusedIndex].node.id;
        const el = nodeRefs.current.get(id);
        el?.focus();
      }
    }, [focusedIndex, visibleNodes]);

    const handleToggleExpand = useCallback(
      async (id: string) => {
        const isExpanding = !expandedIds.includes(id);
        const newIds = isExpanding ? [...expandedIds, id] : expandedIds.filter((eid) => eid !== id);
        setExpandedIds(newIds);

        if (isExpanding && loadChildren && !dynamicChildren.has(id)) {
          const findNode = (ns: TreeNode[]): TreeNode | undefined => {
            for (const n of ns) {
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

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const idx = focusedIndex;
        if (idx < 0) return;
        const { node, depth } = visibleNodes[idx];
        const hasKids = !!(
          node.children?.length ||
          node.hasChildren ||
          dynamicChildren.has(node.id)
        );
        const isExpanded = expandedIds.includes(node.id);

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (idx < visibleNodes.length - 1) {
              setFocusedIndex(idx + 1);
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (idx > 0) {
              setFocusedIndex(idx - 1);
            }
            break;
          case 'ArrowRight':
            e.preventDefault();
            if (hasKids && !isExpanded) {
              handleToggleExpand(node.id);
            } else if (hasKids && isExpanded && idx < visibleNodes.length - 1) {
              setFocusedIndex(idx + 1);
            }
            break;
          case 'ArrowLeft':
            e.preventDefault();
            if (hasKids && isExpanded) {
              handleToggleExpand(node.id);
            } else if (depth > 0) {
              // Find parent
              for (let i = idx - 1; i >= 0; i--) {
                if (visibleNodes[i].depth < depth) {
                  setFocusedIndex(i);
                  break;
                }
              }
            }
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            if (showCheckboxes) {
              handleCheck(node.id);
            } else if (selectable) {
              handleSelect(node.id);
            } else if (hasKids) {
              handleToggleExpand(node.id);
            }
            break;
          default:
            break;
        }
      },
      [
        focusedIndex,
        visibleNodes,
        expandedIds,
        dynamicChildren,
        showCheckboxes,
        selectable,
        handleToggleExpand,
        handleSelect,
        handleCheck,
      ]
    );

    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        ref={ref}
        className={cn(styles.root, className)}
        role="tree"
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {visibleNodes.map(({ node, depth }, idx) => {
          const hasKids = !!(
            node.children?.length ||
            node.hasChildren ||
            dynamicChildren.has(node.id)
          );
          const isExpanded = expandedIds.includes(node.id);
          const isSelected = selectedIds.includes(node.id);
          const isChecked = checkedIds.includes(node.id);
          const isLoading = loadingIds.has(node.id);
          const isFocused = focusedIndex === idx;

          return (
            <div key={node.id}>
              <div
                ref={(el) => {
                  if (el) nodeRefs.current.set(node.id, el);
                }}
                className={cn(
                  styles.nodeRow,
                  isSelected && styles.nodeRowSelected,
                  isFocused && styles.nodeRowFocused,
                  node.disabled && styles.nodeRowDisabled
                )}
                style={{ paddingLeft: depth * 24 + 8 }}
                role="treeitem"
                aria-expanded={hasKids ? isExpanded : undefined}
                aria-selected={isSelected}
                aria-disabled={node.disabled}
                aria-level={depth + 1}
                tabIndex={idx === 0 && focusedIndex === -1 ? 0 : isFocused ? 0 : -1}
                onClick={() => {
                  if (node.disabled) return;
                  setFocusedIndex(idx);
                  if (selectable) handleSelect(node.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (node.disabled) return;
                    setFocusedIndex(idx);
                    if (showCheckboxes) handleCheck(node.id);
                    else if (selectable) handleSelect(node.id);
                  }
                }}
                onFocus={() => setFocusedIndex(idx)}
              >
                {hasKids ? (
                  <button
                    type="button"
                    className={styles.expandBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleExpand(node.id);
                    }}
                    aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
                    tabIndex={-1}
                  >
                    <ChevronIcon expanded={isExpanded} />
                  </button>
                ) : (
                  <span className={styles.leafSpacer} />
                )}

                {showCheckboxes && (
                  <button
                    type="button"
                    className={cn(styles.checkbox, isChecked && styles.checkboxChecked)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!node.disabled) handleCheck(node.id);
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
                <div className={styles.loadingRow} style={{ paddingLeft: (depth + 1) * 24 + 8 }}>
                  <div className={styles.skeleton} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

DesktopTreeView.displayName = 'DesktopTreeView';
