'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, useMemo, useCallback, type HTMLAttributes } from 'react';
import styles from './DesktopQRCode.module.scss';

export interface DesktopQRCodeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** URL or text to encode */
  value: string;
  /** QR code size in pixels (default: 200) */
  size?: number;
  /** Error correction level */
  level?: 'L' | 'M' | 'Q' | 'H';
  /** Label text below the QR code */
  label?: string;
  /** Show a download button below */
  downloadable?: boolean;
  /** Callback when download is clicked */
  onDownload?: () => void;
  /** Foreground color (default: #1A1A1A) */
  color?: string;
  /** Background color (default: #FFFFFF) */
  bgColor?: string;
}

/**
 * Generate a simple deterministic visual QR-like pattern grid from a string.
 * This is a visual demo pattern, not a real QR encoder.
 */
function generateDemoMatrix(value: string, gridSize: number): boolean[][] {
  // Simple hash from string
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }

  const matrix: boolean[][] = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => false),
  );

  // Finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        matrix[startR + r][startC + c] = isOuter || isInner;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, gridSize - 7);
  drawFinder(gridSize - 7, 0);

  // Timing patterns
  for (let i = 7; i < gridSize - 7; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Fill data area with deterministic pattern from hash
  let seed = Math.abs(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder patterns + timing
      if (
        (r < 8 && c < 8) ||
        (r < 8 && c >= gridSize - 8) ||
        (r >= gridSize - 8 && c < 8) ||
        r === 6 ||
        c === 6
      ) {
        continue;
      }
      seed = ((seed * 1103515245 + 12345) >>> 0) % 2147483648;
      matrix[r][c] = seed % 3 !== 0;
    }
  }

  return matrix;
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v8.5M4.5 7.5L8 11l3.5-3.5M3 13h10" />
  </svg>
);

export const DesktopQRCode = forwardRef<HTMLDivElement, DesktopQRCodeProps>(
  (
    {
      value,
      size = 200,
      level = 'M',
      label,
      downloadable = false,
      onDownload,
      color = '#1A1A1A',
      bgColor = '#FFFFFF',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const gridSize = level === 'L' ? 21 : level === 'M' ? 25 : level === 'Q' ? 29 : 33;

    const matrix = useMemo(() => {
      if (!value) return [];
      return generateDemoMatrix(value, gridSize);
    }, [value, gridSize]);

    const handleDownload = useCallback(() => {
      onDownload?.();
    }, [onDownload]);

    if (matrix.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(styles.root, className)}
          style={{ width: size }}
          {...rest}
        >
          <div className={styles.placeholder} style={{ width: size, height: size, background: bgColor }} />
        </div>
      );
    }

    const quietZone = 2;
    const totalModules = gridSize + quietZone * 2;
    const moduleSize = size / totalModules;

    const rects: Array<{ x: number; y: number; w: number; h: number }> = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!matrix[r][c]) continue;
        rects.push({
          x: (c + quietZone) * moduleSize,
          y: (r + quietZone) * moduleSize,
          w: moduleSize,
          h: moduleSize,
        });
      }
    }

    return (
      <div
        ref={ref}
        className={cn(styles.root, className)}
        {...rest}
      >
        <div
          className={styles.codeWrapper}
          role="img"
          aria-label={`QR code: ${value}`}
        >
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width={size} height={size} fill={bgColor} />
            {rects.map((rect, i) => (
              <rect
                key={i}
                x={rect.x}
                y={rect.y}
                width={rect.w + 0.5}
                height={rect.h + 0.5}
                fill={color}
              />
            ))}
          </svg>
        </div>

        {label && <span className={styles.label}>{label}</span>}

        {downloadable && (
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={handleDownload}
            aria-label={`Download QR code for ${value}`}
          >
            <DownloadIcon />
            <span>Download QR</span>
          </button>
        )}
      </div>
    );
  },
);

DesktopQRCode.displayName = 'DesktopQRCode';
