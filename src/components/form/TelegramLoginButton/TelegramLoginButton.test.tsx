import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TelegramLoginButton } from './TelegramLoginButton';

// Mock useGeekShop
vi.mock('../../../i18n', () => ({
  useGeekShop: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.loginViaTelegram': 'Login via Telegram',
      };
      return translations[key] ?? key;
    },
  }),
}));

describe('TelegramLoginButton', () => {
  it('renders with default label', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" />);
    expect(screen.getByText('Login via Telegram')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });

  it('opens Telegram auth in new window on click', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<TelegramLoginButton botUsername="GeekShopBot" />);

    fireEvent.click(screen.getByRole('button'));
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://t.me/GeekShopBot?start=auth_'),
      '_blank',
      'noopener,noreferrer'
    );

    openSpy.mockRestore();
  });

  it('opens callback URL when callbackUrl is provided', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(
      <TelegramLoginButton
        botUsername="GeekShopBot"
        callbackUrl="https://geekshop.uz/auth/telegram"
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://oauth.telegram.org/auth'),
      '_blank',
      'noopener,noreferrer'
    );

    openSpy.mockRestore();
  });

  it('does not open window when disabled', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<TelegramLoginButton botUsername="GeekShopBot" disabled />);

    fireEvent.click(screen.getByRole('button'));
    expect(openSpy).not.toHaveBeenCalled();

    openSpy.mockRestore();
  });

  it('applies correct size class', () => {
    const { container } = render(<TelegramLoginButton botUsername="GeekShopBot" size="lg" />);
    const button = container.querySelector('button');
    expect(button?.className).toContain('size-lg');
  });

  it('renders disabled state correctly', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has proper a11y label', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Login via Telegram');
  });

  it('renders widget variant container', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" variant="widget" />);
    expect(screen.getByTestId('telegram-widget')).toBeInTheDocument();
  });

  it('renders nothing for invalid botUsername (script injection)', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<TelegramLoginButton botUsername="<script>" />);
    expect(container.innerHTML).toBe('');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid botUsername'));
    errorSpy.mockRestore();
  });

  it('renders normally for valid botUsername', () => {
    render(<TelegramLoginButton botUsername="GeekShopBot" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Login via Telegram')).toBeInTheDocument();
  });

  it('renders Telegram icon svg', () => {
    const { container } = render(<TelegramLoginButton botUsername="GeekShopBot" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });
});
