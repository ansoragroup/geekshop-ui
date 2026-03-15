import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { Result } from './Result';

describe('Result', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders title', () => {
    render(<Result status="success" title="Buyurtma tasdiqlandi!" />);
    expect(screen.getByText('Buyurtma tasdiqlandi!')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Result status="success" title="OK" description="Xaridingiz uchun rahmat" />);
    expect(screen.getByText('Xaridingiz uchun rahmat')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<Result status="success" title="OK" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('renders actions when provided', () => {
    render(
      <Result
        status="success"
        title="OK"
        actions={<button data-testid="action-btn">Go</button>}
      />,
    );
    expect(screen.getByTestId('action-btn')).toBeInTheDocument();
  });

  it('does not render actions when not provided', () => {
    const { container } = render(<Result status="success" title="OK" />);
    const actionsDiv = container.querySelector('[class*="actions"]');
    expect(actionsDiv).toBeNull();
  });

  it('applies success status class', () => {
    const { container } = render(<Result status="success" title="OK" />);
    const iconCircle = container.querySelector('[class*="iconCircle"]') as HTMLElement;
    expect(iconCircle.className).toContain('status-success');
  });

  it('applies error status class', () => {
    const { container } = render(<Result status="error" title="Error" />);
    const iconCircle = container.querySelector('[class*="iconCircle"]') as HTMLElement;
    expect(iconCircle.className).toContain('status-error');
  });

  it('applies warning status class', () => {
    const { container } = render(<Result status="warning" title="Warning" />);
    const iconCircle = container.querySelector('[class*="iconCircle"]') as HTMLElement;
    expect(iconCircle.className).toContain('status-warning');
  });

  it('applies info status class', () => {
    const { container } = render(<Result status="info" title="Info" />);
    const iconCircle = container.querySelector('[class*="iconCircle"]') as HTMLElement;
    expect(iconCircle.className).toContain('status-info');
  });

  it('renders default icon SVG for each status', () => {
    const { container } = render(<Result status="success" title="OK" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    render(
      <Result
        status="success"
        title="OK"
        icon={<span data-testid="custom-icon">Star</span>}
      />,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('has role="status" on root', () => {
    render(<Result status="success" title="OK" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Result status="success" title="OK" className="my-result" />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-result');
  });

  it('renders all parts together', () => {
    render(
      <Result
        status="error"
        title="Xatolik"
        description="Qayta urinib ko'ring"
        actions={
          <button data-testid="retry">Qayta urinish</button>
        }
      />,
    );
    expect(screen.getByText('Xatolik')).toBeInTheDocument();
    expect(screen.getByText("Qayta urinib ko'ring")).toBeInTheDocument();
    expect(screen.getByTestId('retry')).toBeInTheDocument();
  });

  it('icon circle has aria-hidden', () => {
    const { container } = render(<Result status="success" title="OK" />);
    const iconCircle = container.querySelector('[class*="iconCircle"]') as HTMLElement;
    expect(iconCircle).toHaveAttribute('aria-hidden', 'true');
  });
});
