import { forwardRef, useCallback, type HTMLAttributes } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useGeekShop } from '../../../i18n';
import styles from './ActionSheet.module.scss';

export interface ActionSheetAction {
  /** Display name */
  name: string;
  /** Optional description text below the name */
  description?: string;
  /** Custom text color */
  color?: string;
  /** Disable this action */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
}

export interface ActionSheetProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the action sheet is visible */
  visible: boolean;
  /** Close handler */
  onClose: () => void;
  /** Optional title */
  title?: string;
  /** Optional description below title */
  description?: string;
  /** Action items */
  actions: ActionSheetAction[];
  /** Cancel button text (set to empty string to hide) */
  cancelText?: string;
}

export const ActionSheet = forwardRef<HTMLDivElement, ActionSheetProps>(
  (
    {
      visible,
      onClose,
      title,
      description,
      actions,
      cancelText,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useGeekShop();

    const sheetRef = useFocusTrap<HTMLDivElement>(visible, {
      onEscape: onClose,
    });

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        sheetRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, sheetRef],
    );

    if (!visible) return null;

    const resolvedCancelText = cancelText ?? t('common.cancel');

    const handleOverlayClick = () => {
      onClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const handleActionClick = (action: ActionSheetAction) => {
      if (action.disabled) return;
      action.onClick?.();
      onClose();
    };

    return (
      <div className={`${styles.overlay} ${className}`} onClick={handleOverlayClick} role="presentation">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={mergedRef}
          className={styles.sheet}
          onClick={handleContentClick}
          onKeyDown={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Actions'}
          tabIndex={-1}
          {...rest}
        >
          {(title || description) && (
            <div className={styles.header}>
              {title && <div className={styles.title}>{title}</div>}
              {description && <div className={styles.description}>{description}</div>}
            </div>
          )}

          <div className={styles.actions} role="menu">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`${styles.action} ${action.disabled ? styles.disabled : ''}`}
                style={action.color && !action.disabled ? { color: action.color } : undefined}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                role="menuitem"
                type="button"
              >
                <span className={styles.actionName}>{action.name}</span>
                {action.description && (
                  <span className={styles.actionDescription}>{action.description}</span>
                )}
              </button>
            ))}
          </div>

          {resolvedCancelText !== '' && (
            <div className={styles.cancelWrapper}>
              <button
                className={styles.cancelBtn}
                onClick={onClose}
                type="button"
              >
                {resolvedCancelText}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ActionSheet.displayName = 'ActionSheet';
