import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DesktopFloatingToolbar, type DesktopFloatingToolbarItem } from './DesktopFloatingToolbar';

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

const TestIcon = () => <span data-testid="icon">icon</span>;

const items: DesktopFloatingToolbarItem[] = [
  { icon: <TestIcon />, label: 'Chat', onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Orders', onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Cart', badge: 3, onClick: vi.fn() },
  { icon: <TestIcon />, label: 'Back to Top', showOnScroll: true, onClick: vi.fn() },
];

describe('DesktopFloatingToolbar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  it('renders toolbar with correct role', () => {
    render(<DesktopFloatingToolbar items={items} />);
    expect(screen.getByRole('toolbar', { name: 'Quick actions' })).toBeInTheDocument();
  });

  it('renders all non-scroll items as visible buttons', () => {
    render(<DesktopFloatingToolbar items={items} />);
    expect(screen.getByLabelText('Chat')).toBeInTheDocument();
    expect(screen.getByLabelText('Orders')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
  });

  it('renders badge count', () => {
    render(<DesktopFloatingToolbar items={items} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders 99+ for badge > 99', () => {
    const itemsHighBadge: DesktopFloatingToolbarItem[] = [
      { icon: <TestIcon />, label: 'Cart', badge: 150 },
    ];
    render(<DesktopFloatingToolbar items={itemsHighBadge} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not render badge when badge is 0', () => {
    const itemsZeroBadge: DesktopFloatingToolbarItem[] = [
      { icon: <TestIcon />, label: 'Cart', badge: 0 },
    ];
    render(<DesktopFloatingToolbar items={itemsZeroBadge} />);
    expect(screen.queryByLabelText(/items/)).not.toBeInTheDocument();
  });

  it('calls onClick when item is clicked', () => {
    const onClick = vi.fn();
    render(<DesktopFloatingToolbar items={[{ icon: <TestIcon />, label: 'Chat', onClick }]} />);
    fireEvent.click(screen.getByLabelText('Chat'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('hides showOnScroll items when not scrolled', () => {
    render(<DesktopFloatingToolbar items={items} />);
    const backToTop = screen.getByLabelText('Back to Top');
    expect(backToTop.className).toMatch(/itemHidden/);
    expect(backToTop).toHaveAttribute('tabIndex', '-1');
  });

  it('shows showOnScroll items after scroll threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    render(<DesktopFloatingToolbar items={items} scrollThreshold={300} />);
    fireEvent.scroll(window);
    const backToTop = screen.getByLabelText('Back to Top');
    expect(backToTop.className).not.toMatch(/itemHidden/);
  });

  it('renders label text for each item', () => {
    render(<DesktopFloatingToolbar items={items} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  it('applies right position class by default', () => {
    const { container } = render(<DesktopFloatingToolbar items={items} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/right/);
  });

  it('applies left position class', () => {
    const { container } = render(<DesktopFloatingToolbar items={items} position="left" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/left/);
  });

  it('applies custom className', () => {
    const { container } = render(<DesktopFloatingToolbar items={items} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('spreads rest props', () => {
    render(<DesktopFloatingToolbar items={items} data-testid="floating" />);
    expect(screen.getByTestId('floating')).toBeInTheDocument();
  });

  it('cleans up scroll listener on unmount', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<DesktopFloatingToolbar items={items} />);
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListener.mockRestore();
  });
});
