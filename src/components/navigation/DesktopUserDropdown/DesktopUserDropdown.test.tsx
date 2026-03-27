import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopUserDropdown } from './DesktopUserDropdown';

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

describe('DesktopUserDropdown', () => {
  const defaultItems = [
    { label: 'My Profile', onClick: vi.fn() },
    { label: 'My Orders', onClick: vi.fn() },
  ];

  // Rendering
  it('renders the trigger button', () => {
    render(<DesktopUserDropdown />);
    expect(screen.getByRole('button', { name: 'User menu' })).toBeInTheDocument();
  });

  it('renders avatar image when userAvatar is provided', () => {
    render(<DesktopUserDropdown userAvatar="https://example.com/avatar.jpg" userName="John" />);
    expect(screen.getByAltText('John')).toBeInTheDocument();
  });

  it('renders placeholder icon when no avatar', () => {
    const { container } = render(<DesktopUserDropdown />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  // Toggle
  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(
      <DesktopUserDropdown isLoggedIn items={defaultItems} userName="John" onSignOut={vi.fn()} />
    );

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('closes dropdown on second click', async () => {
    const user = userEvent.setup();
    render(
      <DesktopUserDropdown isLoggedIn items={defaultItems} userName="John" onSignOut={vi.fn()} />
    );

    const trigger = screen.getByRole('button', { name: 'User menu' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Logged-in state
  it('shows user name and email when logged in', async () => {
    const user = userEvent.setup();
    render(
      <DesktopUserDropdown
        isLoggedIn
        userName="John Doe"
        userEmail="john@example.com"
        items={defaultItems}
        onSignOut={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('shows menu items when logged in', async () => {
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={defaultItems} onSignOut={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText('My Orders')).toBeInTheDocument();
  });

  it('shows Sign Out button when logged in', async () => {
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={defaultItems} onSignOut={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls onSignOut when sign out is clicked', async () => {
    const onSignOut = vi.fn();
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={[]} onSignOut={onSignOut} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    await user.click(screen.getByText('Sign Out'));
    expect(onSignOut).toHaveBeenCalledOnce();
  });

  it('calls item onClick when menu item is clicked', async () => {
    const itemClick = vi.fn();
    const items = [{ label: 'My Profile', onClick: itemClick }];
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={items} onSignOut={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    await user.click(screen.getByText('My Profile'));
    expect(itemClick).toHaveBeenCalledOnce();
  });

  // Logged-out state
  it('shows Sign In and Register buttons when logged out', async () => {
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn={false} onSignIn={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('calls onSignIn when sign in is clicked', async () => {
    const onSignIn = vi.fn();
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn={false} onSignIn={onSignIn} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    await user.click(screen.getByText('Sign In'));
    expect(onSignIn).toHaveBeenCalledOnce();
  });

  // Close behaviors
  it('closes dropdown on Escape key', async () => {
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={defaultItems} onSignOut={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes dropdown on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">outside</div>
        <DesktopUserDropdown isLoggedIn items={defaultItems} onSignOut={vi.fn()} />
      </div>
    );

    await user.click(screen.getByRole('button', { name: 'User menu' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  // Aria attributes
  it('has aria-haspopup on trigger', () => {
    render(<DesktopUserDropdown />);
    expect(screen.getByRole('button', { name: 'User menu' })).toHaveAttribute(
      'aria-haspopup',
      'true'
    );
  });

  it('sets aria-expanded to true when open', async () => {
    const user = userEvent.setup();
    render(<DesktopUserDropdown isLoggedIn items={[]} onSignOut={vi.fn()} />);

    const trigger = screen.getByRole('button', { name: 'User menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  // Props spreading
  it('spreads rest props onto root element', () => {
    render(<DesktopUserDropdown data-testid="user-dropdown" />);
    expect(screen.getByTestId('user-dropdown')).toBeInTheDocument();
  });
});
