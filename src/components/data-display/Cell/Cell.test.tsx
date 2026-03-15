import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Cell } from './Cell';

describe('Cell', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders title', () => {
    render(<Cell title="Buyurtmalarim" />);
    expect(screen.getByText('Buyurtmalarim')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Cell title="Manzil" description="Toshkent sh." />);
    expect(screen.getByText('Toshkent sh.')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<Cell title="Manzil" />);
    const desc = container.querySelector('[class*="description"]');
    expect(desc).toBeNull();
  });

  it('renders string value', () => {
    render(<Cell title="Til" value="O'zbek" />);
    expect(screen.getByText("O'zbek")).toBeInTheDocument();
  });

  it('renders ReactNode value', () => {
    render(<Cell title="Status" value={<span data-testid="custom-value">Active</span>} />);
    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Cell title="Test" icon={<span data-testid="cell-icon">I</span>} />);
    expect(screen.getByTestId('cell-icon')).toBeInTheDocument();
  });

  it('renders chevron arrow when arrow is true', () => {
    const { container } = render(<Cell title="Test" arrow />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not render arrow by default', () => {
    const { container } = render(<Cell title="Test" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeNull();
  });

  it('has role="button" when clickable', () => {
    render(<Cell title="Test" clickable />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has role="button" when onClick is provided', () => {
    render(<Cell title="Test" onClick={() => {}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not have role="button" when not interactive', () => {
    render(<Cell title="Test" />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('has tabIndex=0 when interactive', () => {
    render(<Cell title="Test" clickable />);
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Cell title="Test" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Cell title="Test" onClick={onClick} />);
    const cell = screen.getByRole('button');
    cell.focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('calls onClick when Space key is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Cell title="Test" onClick={onClick} />);
    const cell = screen.getByRole('button');
    cell.focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('applies divider class when divider is true', () => {
    const { container } = render(<Cell title="Test" divider />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('divider');
  });

  it('does not apply divider class by default', () => {
    const { container } = render(<Cell title="Test" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).not.toContain('divider');
  });

  it('applies custom className', () => {
    const { container } = render(<Cell title="Test" className="my-cell" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-cell');
  });

  it('renders all parts together', () => {
    render(
      <Cell
        title="Profil"
        description="Shaxsiy ma'lumotlar"
        value="To'liq"
        icon={<span data-testid="icon">I</span>}
        arrow
        clickable
        divider
      />,
    );
    expect(screen.getByText('Profil')).toBeInTheDocument();
    expect(screen.getByText("Shaxsiy ma'lumotlar")).toBeInTheDocument();
    expect(screen.getByText("To'liq")).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
