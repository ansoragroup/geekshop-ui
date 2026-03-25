import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CategorySidebarLegacy } from './CategorySidebarLegacy';
import type { CategoryItemLegacy } from './CategorySidebarLegacy';

const customItems: CategoryItemLegacy[] = [
  { key: 'gpu', label: 'Videokartalar', icon: <span>GPU</span> },
  { key: 'cpu', label: 'Protsessorlar', icon: <span>CPU</span> },
  { key: 'ram', label: 'Operativ xotira', icon: <span>RAM</span> },
];

describe('CategorySidebarLegacy', () => {
  it('renders a tablist', () => {
    render(<CategorySidebarLegacy activeKey="gpu" onChange={vi.fn()} items={customItems} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('has aria-orientation vertical', () => {
    render(<CategorySidebarLegacy activeKey="gpu" onChange={vi.fn()} items={customItems} />);
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders all category items as tabs', () => {
    render(<CategorySidebarLegacy activeKey="gpu" onChange={vi.fn()} items={customItems} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('renders category labels', () => {
    render(<CategorySidebarLegacy activeKey="gpu" onChange={vi.fn()} items={customItems} />);
    expect(screen.getByText('Videokartalar')).toBeInTheDocument();
    expect(screen.getByText('Protsessorlar')).toBeInTheDocument();
    expect(screen.getByText('Operativ xotira')).toBeInTheDocument();
  });

  it('marks active category with aria-selected', () => {
    render(<CategorySidebarLegacy activeKey="cpu" onChange={vi.fn()} items={customItems} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with category key on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<CategorySidebarLegacy activeKey="gpu" onChange={onChange} items={customItems} />);
    await user.click(screen.getByText('Operativ xotira'));
    expect(onChange).toHaveBeenCalledWith('ram');
  });

  it('renders default categories when no items prop', () => {
    render(<CategorySidebarLegacy activeKey="gpu" onChange={vi.fn()} />);
    expect(screen.getByText('Videokartalar')).toBeInTheDocument();
    expect(screen.getByText('Periferiya')).toBeInTheDocument();
  });
});
