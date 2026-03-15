import { forwardRef, type HTMLAttributes } from 'react';
import styles from './Loading.module.scss';

export type LoadingType = 'spinner' | 'skeleton' | 'dots';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Loading display type */
  type?: LoadingType;
  /** Optional text shown below spinner/dots */
  text?: string;
  /** Whether to cover full screen */
  fullscreen?: boolean;
}

function Spinner({ text }: { text?: string }) {
  return (
    <div className={styles.spinnerWrap}>
      <svg className={styles.spinnerSvg} width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="#F0F0F0" strokeWidth="3" />
        <path d="M16 3a13 13 0 0 1 13 13" stroke="#FF5000" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

function Dots({ text }: { text?: string }) {
  return (
    <div className={styles.dotsWrap}>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className={styles.skeleton}>
      {/* Product card skeleton */}
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonBody}>
          <div className={styles.skeletonLine} style={{ width: '80%' }} />
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonLine} style={{ width: '40%', height: 16 }} />
        </div>
      </div>
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonImage} />
        <div className={styles.skeletonBody}>
          <div className={styles.skeletonLine} style={{ width: '70%' }} />
          <div className={styles.skeletonLine} style={{ width: '90%' }} />
          <div className={styles.skeletonLine} style={{ width: '35%', height: 16 }} />
        </div>
      </div>
    </div>
  );
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  ({ type = 'spinner', text, fullscreen = false, className = '', ...rest }, ref) => {
    const content = (() => {
      switch (type) {
        case 'spinner':
          return <Spinner text={text} />;
        case 'dots':
          return <Dots text={text} />;
        case 'skeleton':
          return <Skeleton />;
      }
    })();

    if (fullscreen && type !== 'skeleton') {
      return (
        <div ref={ref} className={`${styles.fullscreen} ${className}`} {...rest}>
          {content}
        </div>
      );
    }

    return (
      <div ref={ref} className={className || undefined} {...rest}>
        {content}
      </div>
    );
  }
);

Loading.displayName = 'Loading';
