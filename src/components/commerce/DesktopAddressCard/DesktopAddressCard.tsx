import { useCallback } from 'react';
import styles from './DesktopAddressCard.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopAddress {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
  isDefault?: boolean;
  label?: string;
}

export interface DesktopAddressCardProps {
  /** Address data */
  address: DesktopAddress;
  /** Whether this address is selected */
  selected?: boolean;
  /** Whether the address can be selected */
  selectable?: boolean;
  /** Whether the address can be edited */
  editable?: boolean;
  /** Whether the address can be deleted */
  deletable?: boolean;
  /** Called when address is selected */
  onSelect?: () => void;
  /** Called when edit is clicked */
  onEdit?: () => void;
  /** Called when delete is clicked */
  onDelete?: () => void;
  /** Additional CSS class */
  className?: string;
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopAddressCard = ({
  address,
  selected = false,
  selectable = true,
  editable = true,
  deletable = true,
  onSelect,
  onEdit,
  onDelete,
  className = '',
}: DesktopAddressCardProps) => {
  const handleSelect = useCallback(() => {
    if (selectable) {
      onSelect?.();
    }
  }, [selectable, onSelect]);

  const handleSelectKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && selectable) {
        e.preventDefault();
        onSelect?.();
      }
    },
    [selectable, onSelect],
  );

  const handleEditKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEdit?.();
      }
    },
    [onEdit],
  );

  const handleDeleteKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onDelete?.();
      }
    },
    [onDelete],
  );

  const rootClass = [
    styles.root,
    selected && styles.selected,
    className,
  ].filter(Boolean).join(' ');

  const fullAddress = [
    address.street,
    [address.city, address.region].filter(Boolean).join(', '),
    address.postalCode,
  ].filter(Boolean).join('\n');

  return (
    <div className={rootClass}>
      {/* Radio Button */}
      {selectable && (
        <div
          className={`${styles.radio} ${selected ? styles.radioChecked : ''}`}
          role="radio"
          aria-checked={selected}
          aria-label={`Select address: ${address.name}`}
          tabIndex={0}
          onClick={handleSelect}
          onKeyDown={handleSelectKeyDown}
        >
          {selected && <div className={styles.radioDot} />}
        </div>
      )}

      {/* Content */}
      <div className={styles.content}>
        {/* First row: label + name + phone */}
        <div className={styles.headerRow}>
          {address.label && (
            <span className={styles.label}>{address.label}</span>
          )}
          <span className={styles.name}>{address.name}</span>
          <span className={styles.separator} aria-hidden="true">&bull;</span>
          <span className={styles.phone}>{address.phone}</span>
        </div>

        {/* Address lines */}
        <div className={styles.addressLines}>
          <span>{address.street}</span>
          <span>
            {[address.city, address.region].filter(Boolean).join(', ')}
            {address.postalCode && ` ${address.postalCode}`}
          </span>
        </div>

        {/* Default badge */}
        {address.isDefault && (
          <span className={styles.defaultBadge}>Default</span>
        )}
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {editable && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={onEdit}
            onKeyDown={handleEditKeyDown}
            aria-label={`Edit address: ${address.name}`}
          >
            <EditIcon />
            <span>Edit</span>
          </button>
        )}
        {deletable && (
          <button
            type="button"
            className={`${styles.actionBtn} ${styles.deleteAction}`}
            onClick={onDelete}
            onKeyDown={handleDeleteKeyDown}
            aria-label={`Delete address: ${address.name}`}
          >
            <DeleteIcon />
            <span>Delete</span>
          </button>
        )}
      </div>
    </div>
  );
};

DesktopAddressCard.displayName = 'DesktopAddressCard';
