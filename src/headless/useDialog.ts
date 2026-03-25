import { useCallback, useId } from 'react';
import { useControllableState } from '../hooks/useControllableState';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface UseDialogOptions {
  /** Controlled open state */
  isOpen?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Dialog role: "dialog" or "alertdialog" */
  role?: 'dialog' | 'alertdialog';
  /** ID of the element that labels the dialog (for aria-labelledby) */
  titleId?: string;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to restore focus on close */
  restoreFocus?: boolean;
}

export interface UseDialogReturn {
  overlayProps: {
    role: 'presentation';
    onClick: () => void;
  };
  dialogProps: {
    ref: React.RefObject<HTMLElement | null>;
    role: 'dialog' | 'alertdialog';
    'aria-modal': 'true';
    'aria-labelledby'?: string;
    tabIndex: -1;
    onClick: (e: React.MouseEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  };
  closeButtonProps: {
    'aria-label': 'Close';
    onClick: () => void;
    type: 'button';
  };
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export function useDialog(options: UseDialogOptions = {}): UseDialogReturn {
  const {
    isOpen: controlledOpen,
    defaultOpen,
    onOpenChange,
    role: dialogRole = 'dialog',
    titleId,
    closeOnOverlayClick = true,
    restoreFocus = true,
  } = options;

  const generatedTitleId = useId();

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  });

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const containerRef = useFocusTrap<HTMLElement>(isOpen, {
    onEscape: close,
    restoreFocus,
  });

  const overlayProps = {
    role: 'presentation' as const,
    onClick: () => {
      if (closeOnOverlayClick) close();
    },
  };

  const resolvedTitleId = titleId ?? generatedTitleId;

  const dialogProps = {
    ref: containerRef,
    role: dialogRole,
    'aria-modal': 'true' as const,
    ...(titleId !== undefined ? { 'aria-labelledby': resolvedTitleId } : {}),
    tabIndex: -1 as const,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      e.stopPropagation();
    },
  };

  const closeButtonProps = {
    'aria-label': 'Close' as const,
    onClick: close,
    type: 'button' as const,
  };

  return {
    overlayProps,
    dialogProps,
    closeButtonProps,
    isOpen,
    open,
    close,
  };
}

/** Alias for useDialog */
export const useModal = useDialog;
export type { UseDialogOptions as UseModalOptions };
export type { UseDialogReturn as UseModalReturn };
