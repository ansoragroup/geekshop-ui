import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import styles from './CategorySidebar.module.scss';

export interface CategoryItem {
  key: string;
  label: string;
  icon: ReactNode;
}

export interface CategorySidebarProps extends HTMLAttributes<HTMLDivElement> {
  /** Currently active category key */
  activeKey: string;
  /** Callback when a category is selected */
  onChange: (key: string) => void;
  /** Custom categories (defaults to GeekShop categories) */
  items?: CategoryItem[];
}

/* ---------- inline SVG icons for each category ---------- */

const GpuIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="M6 6V4M10 6V4M14 6V4M18 6V4" />
  </svg>
);

const CpuIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const LaptopIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v8H4V6z" />
    <path d="M2 18h20" />
  </svg>
);

const RamIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="8" width="20" height="8" rx="1" />
    <path d="M6 8V6M10 8V6M14 8V6M18 8V6" />
    <path d="M6 16v2M10 16v2M14 16v2M18 16v2" />
  </svg>
);

const SsdIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <path d="M7 10h4M7 14h2" />
  </svg>
);

const MotherboardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="7" y="7" width="4" height="4" rx="0.5" />
    <rect x="14" y="7" width="3" height="3" rx="0.5" />
    <path d="M7 15h10M7 18h6" />
  </svg>
);

const PeripheryIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 17a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2" />
    <path d="M8 21h8" />
    <rect x="9" y="17" width="6" height="4" rx="1" />
  </svg>
);

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { key: 'gpu', label: 'Videokartalar', icon: <GpuIcon /> },
  { key: 'cpu', label: 'Protsessorlar', icon: <CpuIcon /> },
  { key: 'monitor', label: 'Monitorlar', icon: <MonitorIcon /> },
  { key: 'laptop', label: 'Noutbuklar', icon: <LaptopIcon /> },
  { key: 'ram', label: 'Operativ xotira', icon: <RamIcon /> },
  { key: 'storage', label: 'SSD/HDD', icon: <SsdIcon /> },
  { key: 'motherboard', label: 'Ona platalar', icon: <MotherboardIcon /> },
  { key: 'periphery', label: 'Periferiya', icon: <PeripheryIcon /> },
];

export const CategorySidebar = forwardRef<HTMLDivElement, CategorySidebarProps>(
  ({ activeKey, onChange, items = DEFAULT_CATEGORIES, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.sidebar} ${className ?? ''}`}
        role="tablist"
        aria-orientation="vertical"
        {...rest}
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              className={`${styles.item} ${isActive ? styles.active : ''}`}
              onClick={() => onChange(item.key)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  }
);

CategorySidebar.displayName = 'CategorySidebar';
