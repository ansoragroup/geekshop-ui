import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { FloatingBubble } from './FloatingBubble';

vi.mock('../../../i18n/GeekShopProvider', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../i18n/GeekShopProvider')>();
  const { TRANSLATIONS } = await import('../../../i18n/translations');
  const { CURRENCY_CONFIGS } = await import('../../../i18n/currencies');
  const { formatWithConfig } = await import('../../../utils/formatPrice');
  const en = (TRANSLATIONS.en ?? {}) as Record<string, string>;
  return {
    ...actual,
    useGeekShop: () => ({
      locale: 'en' as const,
      currency: 'UZS' as const,
      platform: 'desktop' as const,
      t: (key, params) => {
        const tmpl = en[key];
        if (tmpl === undefined) return key;
        if (!params) return tmpl;
        return tmpl.replace(/\{(\w+)\}/g, (_, k) => (k in params ? String(params[k]) : `{${k}}`));
      },
      formatPrice: (amount, options) => {
        const config = CURRENCY_CONFIGS[options?.currency ?? 'UZS'] ?? CURRENCY_CONFIGS.UZS;
        return formatWithConfig(amount, config, 'en', { showCurrency: options?.showCurrency });
      },
    }),
  };
});

describe('FloatingBubble', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default chat icon', () => {
    const { container } = render(<FloatingBubble />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('has role="button"', () => {
    render(<FloatingBubble />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has aria-label', () => {
    render(<FloatingBubble />);
    expect(screen.getByLabelText('Customer support')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<FloatingBubble badge={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows 99+ for badge over 99', () => {
    render(<FloatingBubble badge={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render badge when 0', () => {
    const { container } = render(<FloatingBubble badge={0} />);
    expect(container.querySelector('[class*="badge"]')).toBeNull();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.mouseDown(screen.getByRole('button'), { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(window);
    expect(onClick).toHaveBeenCalled();
  });

  it('responds to Enter key', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(onClick).toHaveBeenCalled();
  });

  it('responds to Space key', () => {
    const onClick = vi.fn();
    render(<FloatingBubble onClick={onClick} />);
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(onClick).toHaveBeenCalled();
  });

  it('renders custom icon', () => {
    render(<FloatingBubble icon={<span data-testid="custom-icon">X</span>} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('applies custom position', () => {
    render(<FloatingBubble position={{ right: 24, bottom: 100 }} />);
    const bubble = screen.getByRole('button');
    expect(bubble.style.right).toBe('24px');
    expect(bubble.style.bottom).toBe('100px');
  });

  it('applies custom className', () => {
    render(<FloatingBubble className="my-bubble" />);
    expect(screen.getByRole('button').className).toContain('my-bubble');
  });

  it('has tabIndex for keyboard focus', () => {
    render(<FloatingBubble />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<FloatingBubble ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
