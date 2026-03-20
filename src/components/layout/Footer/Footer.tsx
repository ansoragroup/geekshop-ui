import { forwardRef, useState, useCallback, type ReactNode, type HTMLAttributes } from 'react';
import styles from './Footer.module.scss';

export interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocial {
  icon: ReactNode;
  label: string;
  href?: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Link columns displayed in the footer grid */
  columns: FooterColumn[];
  /** Logo element rendered at the top of the footer */
  logo?: ReactNode;
  /** Social media links with icons */
  socialLinks?: FooterSocial[];
  /** Whether to show the newsletter subscription section */
  showNewsletter?: boolean;
  /** Callback when user subscribes to newsletter */
  onSubscribe?: (email: string) => void;
  /** Copyright text displayed in the bottom bar */
  copyrightText?: string;
  /** Additional links in the bottom bar (e.g. Terms, Privacy) */
  bottomLinks?: FooterLink[];
}

const DefaultLogo = () => (
  <span className={styles.defaultLogo}>GeekShop</span>
);

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      columns,
      logo,
      socialLinks,
      showNewsletter = true,
      onSubscribe,
      copyrightText = '\u00A9 2026 GeekShop. All rights reserved.',
      bottomLinks,
      className,
      ...rest
    },
    ref,
  ) => {
    const [email, setEmail] = useState('');

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
          onSubscribe?.(email.trim());
          setEmail('');
        }
      },
      [email, onSubscribe],
    );

    const rootClass = [styles.root, className].filter(Boolean).join(' ');

    const renderLink = (link: FooterLink, index: number) => {
      if (link.href) {
        return (
          <a
            key={index}
            href={link.href}
            className={styles.link}
          >
            {link.label}
          </a>
        );
      }
      return (
        <button
          key={index}
          type="button"
          className={styles.linkButton}
          onClick={link.onClick}
        >
          {link.label}
        </button>
      );
    };

    return (
      <footer ref={ref} className={rootClass} {...rest}>
        <div className={styles.content}>
          {/* Logo + Columns Grid */}
          <div className={styles.topSection}>
            <div className={styles.logoArea}>
              {logo || <DefaultLogo />}
            </div>
            <div className={styles.columnsGrid}>
              {columns.map((column, colIndex) => (
                <div key={colIndex} className={styles.column}>
                  <h3 className={styles.columnTitle}>{column.title}</h3>
                  <ul className={styles.columnLinks}>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className={styles.columnLinkItem}>
                        {renderLink(link, linkIndex)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {socialLinks && socialLinks.length > 0 && (
                <div className={styles.column}>
                  <h3 className={styles.columnTitle}>Social</h3>
                  <ul className={styles.columnLinks}>
                    {socialLinks.map((social, idx) => (
                      <li key={idx} className={styles.columnLinkItem}>
                        <a
                          href={social.href || '#'}
                          className={styles.socialLink}
                          aria-label={social.label}
                        >
                          <span className={styles.socialIcon}>{social.icon}</span>
                          <span>{social.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div className={styles.newsletter}>
              <div className={styles.newsletterInner}>
                <span className={styles.newsletterLabel}>
                  Subscribe to our newsletter
                </span>
                <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className={styles.newsletterInput}
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address for newsletter"
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Bottom bar */}
          <div className={styles.bottomBar}>
            <span className={styles.copyright}>{copyrightText}</span>
            {bottomLinks && bottomLinks.length > 0 && (
              <div className={styles.bottomLinks}>
                {bottomLinks.map((link, idx) => (
                  <span key={idx}>
                    {renderLink(link, idx)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
