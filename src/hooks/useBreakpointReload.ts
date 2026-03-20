import { useEffect, useRef } from 'react';

/**
 * Reloads the page when the viewport crosses a breakpoint threshold.
 *
 * On desktop (>= breakpoint), watches for resize below breakpoint and reloads.
 * On mobile (< breakpoint), watches for resize above breakpoint and reloads.
 *
 * Uses `window.matchMedia` for efficient detection (no resize event polling).
 * SSR safe: no-ops when `window` is undefined.
 *
 * @param breakpoint - The pixel width threshold (default: 1024)
 */
export function useBreakpointReload(breakpoint: number = 1024): void {
  const initialSide = useRef<'mobile' | 'desktop' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);

    // Record which side we started on
    if (initialSide.current === null) {
      initialSide.current = mql.matches ? 'desktop' : 'mobile';
    }

    const handleChange = (e: MediaQueryListEvent) => {
      const currentSide = e.matches ? 'desktop' : 'mobile';
      if (currentSide !== initialSide.current) {
        window.location.reload();
      }
    };

    mql.addEventListener('change', handleChange);
    return () => {
      mql.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);
}
