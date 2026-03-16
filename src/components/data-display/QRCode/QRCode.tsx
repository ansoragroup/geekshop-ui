import { forwardRef, useMemo, type HTMLAttributes } from 'react';
import { generateQRMatrix } from './qr-encoder';
import styles from './QRCode.module.scss';

export type QRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRCodeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** URL or text to encode */
  value: string;
  /** Size in pixels (default: 200) */
  size?: number;
  /** Foreground color (default: #1A1A1A) */
  color?: string;
  /** Background color (default: #FFFFFF) */
  bgColor?: string;
  /** Center logo image URL */
  logo?: string;
  /** Logo size in pixels (default: size/4) */
  logoSize?: number;
  /** Error correction level (default: M) */
  errorLevel?: QRCodeErrorLevel;
}

export const QRCode = forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value,
      size = 200,
      color = '#1A1A1A',
      bgColor = '#FFFFFF',
      logo,
      logoSize,
      errorLevel = 'M',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const matrix = useMemo(() => {
      if (!value) return [];
      try {
        return generateQRMatrix(value, logo ? 'H' : errorLevel);
      } catch {
        return [];
      }
    }, [value, errorLevel, logo]);

    const computedLogoSize = logoSize ?? Math.floor(size / 4);

    if (matrix.length === 0) {
      return (
        <div
          ref={ref}
          className={`${styles.root} ${className}`}
          style={{ width: size, height: size, background: bgColor }}
          {...rest}
        />
      );
    }

    const moduleCount = matrix.length;
    const quietZone = 4; // quiet zone modules
    const totalModules = moduleCount + quietZone * 2;
    const moduleSize = size / totalModules;

    // Determine which modules are in the logo area (to clear them)
    const logoModules = logo
      ? (() => {
          const logoCenter = moduleCount / 2;
          const logoModuleRadius = computedLogoSize / moduleSize / 2;
          return { center: logoCenter, radius: logoModuleRadius };
        })()
      : null;

    const rects: Array<{ x: number; y: number; width: number; height: number }> = [];

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!matrix[row][col]) continue;

        // Skip modules under logo
        if (logoModules) {
          const distR = Math.abs(row - logoModules.center);
          const distC = Math.abs(col - logoModules.center);
          if (distR < logoModules.radius + 1 && distC < logoModules.radius + 1) {
            continue;
          }
        }

        rects.push({
          x: (col + quietZone) * moduleSize,
          y: (row + quietZone) * moduleSize,
          width: moduleSize,
          height: moduleSize,
        });
      }
    }

    return (
      <div
        ref={ref}
        className={`${styles.root} ${className}`}
        style={{ width: size, height: size }}
        role="img"
        aria-label={`QR code: ${value}`}
        {...rest}
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
              width={rect.width + 0.5}
              height={rect.height + 0.5}
              fill={color}
            />
          ))}
        </svg>

        {logo && (
          <img
            className={styles.logo}
            src={logo}
            alt=""
            width={computedLogoSize}
            height={computedLogoSize}
            style={{
              width: computedLogoSize,
              height: computedLogoSize,
              top: (size - computedLogoSize) / 2,
              left: (size - computedLogoSize) / 2,
            }}
          />
        )}
      </div>
    );
  }
);

QRCode.displayName = 'QRCode';
