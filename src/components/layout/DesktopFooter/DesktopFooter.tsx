'use client';
import { cn } from '../../../utils/cn';
import { forwardRef, type ReactNode, type HTMLAttributes } from 'react';
import styles from './DesktopFooter.module.scss';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DesktopFooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DesktopFooterColumn {
  title: string;
  links: DesktopFooterLink[];
}

export interface DesktopFooterAppBadge {
  /** Badge image URL or ReactNode */
  image: string | ReactNode;
  /** App store name for aria-label */
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface DesktopFooterProps extends HTMLAttributes<HTMLElement> {
  /** Link columns (e.g. Customers, Partners, About, Social) */
  columns?: DesktopFooterColumn[];
  /** Copyright text (e.g. "© MyShop 2024") */
  copyright?: string;
  /** Legal/policy text or ReactNode */
  legalText?: ReactNode;
  /** Policy links (Privacy, Terms, etc.) */
  policyLinks?: DesktopFooterLink[];
  /** App store badges (Google Play, App Store, etc.) */
  appBadges?: DesktopFooterAppBadge[];
  /** Custom bottom bar content — replaces default copyright/legal/badges */
  bottomBar?: ReactNode;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const DesktopFooter = forwardRef<HTMLElement, DesktopFooterProps>(
  (
    {
      columns = [],
      copyright,
      legalText,
      policyLinks = [],
      appBadges = [],
      bottomBar,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <footer ref={ref} className={cn(styles.root, className)} {...rest}>
        {/* ─── Columns ─── */}
        {columns.length > 0 && (
          <div className={styles.columnsWrapper}>
            <div className={styles.columns}>
              {columns.map((col, i) => (
                <div key={i} className={styles.column}>
                  <h3 className={styles.columnTitle}>{col.title}</h3>
                  <ul className={styles.linkList}>
                    {col.links.map((link, j) => (
                      <li key={j}>
                        {link.href ? (
                          <a
                            href={link.href}
                            className={styles.linkPill}
                            onClick={link.onClick}
                          >
                            {link.label}
                          </a>
                        ) : (
                          <button
                            type="button"
                            className={styles.linkPill}
                            onClick={link.onClick}
                          >
                            {link.label}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Bottom Bar ─── */}
        {bottomBar ? (
          <div className={styles.bottomBar}>
            <div className={styles.bottomContent}>{bottomBar}</div>
          </div>
        ) : (copyright || legalText || policyLinks.length > 0 || appBadges.length > 0) ? (
          <div className={styles.bottomBar}>
            <div className={styles.bottomContent}>
              {copyright && (
                <span className={styles.copyright}>{copyright}</span>
              )}

              {legalText && (
                <span className={styles.legalText}>{legalText}</span>
              )}

              {policyLinks.length > 0 && (
                <div className={styles.policyLinks}>
                  {policyLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href || '#'}
                      className={styles.policyLink}
                      onClick={link.onClick ? (e) => { e.preventDefault(); link.onClick?.(); } : undefined}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {appBadges.length > 0 && (
                <div className={styles.appBadges}>
                  {appBadges.map((badge, i) => (
                    <a
                      key={i}
                      href={badge.href || '#'}
                      className={styles.appBadge}
                      aria-label={badge.label}
                      onClick={badge.onClick ? (e) => { e.preventDefault(); badge.onClick?.(); } : undefined}
                    >
                      {typeof badge.image === 'string' ? (
                        <img src={badge.image} alt={badge.label} className={styles.appBadgeImg} />
                      ) : (
                        badge.image
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </footer>
    );
  },
);

DesktopFooter.displayName = 'DesktopFooter';
