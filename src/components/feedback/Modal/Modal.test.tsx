import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Modal } from './Modal';

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

describe('Modal', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <Modal open={false} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders when open is true', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Modal content
      </Modal>
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders with role="dialog" and aria-modal="true"', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has aria-labelledby when title is provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="Test Title">
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    const titleId = dialog.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();
    const titleEl = document.getElementById(titleId!);
    expect(titleEl?.textContent).toBe('Test Title');
  });

  it('has aria-label="Modal" when no title is provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', 'Modal');
  });

  it('renders title in the header', () => {
    render(
      <Modal open={true} onClose={vi.fn()} title="My Title">
        Content
      </Modal>
    );
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('renders children in the body', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        <div data-testid="child">Child content</div>
      </Modal>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()} footer={<button>OK</button>}>
        Content
      </Modal>
    );
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('does not render footer when not provided', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    // There should be no footer border-top section with buttons
    expect(screen.queryByText('OK')).toBeNull();
  });

  it('renders close button', () => {
    render(
      <Modal open={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Test">
        Content
      </Modal>
    );
    await user.click(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={true} onClose={onClose}>
        Content
      </Modal>
    );
    const backdrop = container.firstElementChild as HTMLElement;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose on backdrop click when closeOnBackdrop is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Modal open={true} onClose={onClose} closeOnBackdrop={false}>
        Content
      </Modal>
    );
    const backdrop = container.firstElementChild as HTMLElement;
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when content area is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        Click me
      </Modal>
    );
    await user.click(screen.getByText('Click me'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies custom width as number', () => {
    render(
      <Modal open={true} onClose={vi.fn()} width={600}>
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.width).toBe('600px');
  });

  it('applies custom width as string', () => {
    render(
      <Modal open={true} onClose={vi.fn()} width="50%">
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.width).toBe('50%');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Modal ref={ref} open={true} onClose={vi.fn()}>
        Content
      </Modal>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('spreads rest props onto dialog element', () => {
    render(
      <Modal open={true} onClose={vi.fn()} data-testid="modal">
        Content
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('data-testid')).toBe('modal');
  });

  it('merges custom className onto backdrop', () => {
    const { container } = render(
      <Modal open={true} onClose={vi.fn()} className="custom-modal">
        Content
      </Modal>
    );
    const backdrop = container.firstElementChild as HTMLElement;
    expect(backdrop.className).toContain('custom-modal');
  });
});
