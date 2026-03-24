'use client';
import { cn } from '../../../utils/cn';
import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import styles from './Skeleton.module.scss'

export interface SkeletonProps {
  /** Skeleton variant */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** Width (CSS value) */
  width?: string | number
  /** Height (CSS value) */
  height?: string | number
  /** Number of text lines to show */
  lines?: number
  /** Animation type */
  animation?: 'pulse' | 'wave' | 'none'
  /** Additional class name */
  className?: string
  /** Additional styles */
  style?: CSSProperties
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      animation = 'pulse',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const getStyle = (): CSSProperties => {
      const s: CSSProperties = { ...style }
      if (width) s.width = typeof width === 'number' ? `${width}px` : width
      if (height) s.height = typeof height === 'number' ? `${height}px` : height
      return s
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn(styles.textGroup, className)} {...rest}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(styles.skeleton, styles.text, styles[animation])}
              style={i === lines - 1 ? { width: '60%' } : undefined}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(styles.skeleton, styles[variant], styles[animation], className)}
        style={getStyle()}
        {...rest}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'

export const ProductCardSkeleton = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = '', ...rest }, ref) => (
    <div ref={ref} className={cn(styles.productCard, className)} {...rest}>
      <Skeleton variant="rectangular" height={180} animation="wave" />
      <div className={styles.productCardBody}>
        <Skeleton variant="text" width="40%" height={12} />
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="text" width="50%" height={18} />
      </div>
    </div>
  ),
)

ProductCardSkeleton.displayName = 'ProductCardSkeleton'
