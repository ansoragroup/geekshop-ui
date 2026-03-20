'use client';
import { cn } from '../../../utils/cn';
import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import styles from './FloatingBubble.module.scss';

export interface FloatingBubbleProps extends HTMLAttributes<HTMLDivElement> {
  /** Custom icon content */
  icon?: ReactNode;
  /** Badge count */
  badge?: number;
  /** Click handler */
  onClick?: () => void;
  /** Initial position (CSS pixels from right and bottom) */
  position?: { right: number; bottom: number };
  /** Dock to nearest edge when released */
  magnetic?: boolean;
}

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.964L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8.5" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="15.5" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const FloatingBubble = forwardRef<HTMLDivElement, FloatingBubbleProps>(
  (
    {
      icon,
      badge,
      onClick,
      position = { right: 16, bottom: 80 },
      magnetic = true,
      className = '',
      ...rest
    },
    ref,
  ) => {
    const [pos, setPos] = useState(position);
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<{
      startX: number;
      startY: number;
      startRight: number;
      startBottom: number;
      moved: boolean;
    } | null>(null);
    const bubbleRef = useRef<HTMLDivElement | null>(null);

    const handleStart = useCallback(
      (clientX: number, clientY: number) => {
        dragRef.current = {
          startX: clientX,
          startY: clientY,
          startRight: pos.right,
          startBottom: pos.bottom,
          moved: false,
        };
        setIsDragging(true);
      },
      [pos],
    );

    const handleMove = useCallback(
      (clientX: number, clientY: number) => {
        if (!dragRef.current) return;

        const dx = clientX - dragRef.current.startX;
        const dy = clientY - dragRef.current.startY;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          dragRef.current.moved = true;
        }

        setPos({
          right: Math.max(0, dragRef.current.startRight - dx),
          bottom: Math.max(0, dragRef.current.startBottom - dy),
        });
      },
      [],
    );

    const handleEnd = useCallback(() => {
      if (!dragRef.current) return;

      const wasMoved = dragRef.current.moved;
      dragRef.current = null;
      setIsDragging(false);

      if (!wasMoved) {
        onClick?.();
        return;
      }

      if (magnetic && bubbleRef.current) {
        const viewportWidth = window.innerWidth;
        const bubbleWidth = bubbleRef.current.offsetWidth;
        const currentLeft = viewportWidth - pos.right - bubbleWidth;

        setPos((prev) => ({
          ...prev,
          right: currentLeft < viewportWidth / 2 ? viewportWidth - bubbleWidth - 16 : 16,
        }));
      }
    }, [magnetic, onClick, pos.right]);

    useEffect(() => {
      if (!isDragging) return;

      const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
      const onMouseUp = () => handleEnd();
      const onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      };
      const onTouchEnd = () => handleEnd();

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onTouchEnd);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };
    }, [isDragging, handleMove, handleEnd]);

    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        bubbleRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={mergedRef}
        className={cn(styles.root, isDragging ? styles.dragging : '', className)}
        style={{
          right: pos.right,
          bottom: pos.bottom,
        }}
        role="button"
        tabIndex={0}
        aria-label="Customer support"
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <span className={styles.icon}>{icon ?? <ChatIcon />}</span>
        {badge != null && badge > 0 && (
          <span className={styles.badge}>
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
    );
  }
);

FloatingBubble.displayName = 'FloatingBubble';
