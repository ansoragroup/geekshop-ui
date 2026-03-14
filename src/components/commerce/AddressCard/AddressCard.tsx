import { forwardRef, useCallback } from 'react';
import styles from './AddressCard.module.scss';

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
  isDefault?: boolean;
  /** Label like "Home", "Work", etc. */
  label?: string;
}

export interface AddressCardProps {
  address: Address;
  /** Whether this card is currently selected */
  selected?: boolean;
  /** Show radio/checkmark for selection */
  selectable?: boolean;
  /** Show edit button */
  editable?: boolean;
  /** Show delete button */
  deletable?: boolean;
  onSelect?: (address: Address) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (address: Address) => void;
  /** Additional CSS class */
  className?: string;
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 7L6 10L11 4"
        stroke="#FFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M11.5 2.5L13.5 4.5L5 13H3V11L11.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 5H12M6.5 5V3.5C6.5 3.22386 6.72386 3 7 3H9C9.27614 3 9.5 3.22386 9.5 3.5V5M5 5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildAddressString(address: Address): string {
  const parts = [address.street, address.city];
  if (address.region) parts.push(address.region);
  if (address.postalCode) parts.push(address.postalCode);
  return parts.join(', ');
}

export const AddressCard = forwardRef<HTMLDivElement, AddressCardProps>(
  function AddressCard(
    {
      address,
      selected = false,
      selectable = false,
      editable = false,
      deletable = false,
      onSelect,
      onEdit,
      onDelete,
      className = '',
    },
    ref,
  ) {
    const handleSelect = useCallback(() => {
      onSelect?.(address);
    }, [onSelect, address]);

    const handleEdit = useCallback(() => {
      onEdit?.(address);
    }, [onEdit, address]);

    const handleDelete = useCallback(() => {
      onDelete?.(address);
    }, [onDelete, address]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (selectable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleSelect();
        }
      },
      [selectable, handleSelect],
    );

    const hasActions = editable || deletable;

    return (
      <div
        ref={ref}
        className={`${styles.root} ${selected ? styles.selected : ''} ${className}`}
        role={selectable ? 'option' : undefined}
        aria-selected={selectable ? selected : undefined}
        tabIndex={selectable ? 0 : undefined}
        onClick={selectable ? handleSelect : undefined}
        onKeyDown={selectable ? handleKeyDown : undefined}
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {selectable && (
              <span
                className={`${styles.radio} ${selected ? styles.radioSelected : ''}`}
              >
                {selected && <CheckIcon />}
              </span>
            )}
            <span className={styles.name}>{address.name}</span>
            {address.label && (
              <span className={styles.label}>{address.label}</span>
            )}
            {address.isDefault && (
              <span className={styles.defaultBadge}>Asosiy</span>
            )}
          </div>
          <span className={styles.phone}>{address.phone}</span>
        </div>

        <div className={styles.addressText}>
          {buildAddressString(address)}
        </div>

        {hasActions && (
          <div className={styles.actions}>
            {editable && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                aria-label="Tahrirlash"
              >
                <EditIcon />
                <span>Tahrirlash</span>
              </button>
            )}
            {deletable && (
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.actionDelete}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                aria-label="O'chirish"
              >
                <DeleteIcon />
                <span>O'chirish</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default AddressCard;
