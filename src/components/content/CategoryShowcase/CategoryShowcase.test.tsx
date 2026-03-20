import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CategoryShowcase, type ShowcaseCategory } from './CategoryShowcase';

const categories: ShowcaseCategory[] = [
  { label: 'GPUs', image: '/img/gpu.jpg', count: 42 },
  { label: 'CPUs', image: '/img/cpu.jpg', count: 38 },
  { label: 'Monitors', image: '/img/monitor.jpg', count: 25 },
];

describe('CategoryShowcase', () => {
  it('renders all category labels', () => {
    render(<CategoryShowcase categories={categories} />);
    expect(screen.getByText('GPUs')).toBeInTheDocument();
    expect(screen.getByText('CPUs')).toBeInTheDocument();
    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });

  it('renders category images with alt text', () => {
    render(<CategoryShowcase categories={categories} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('alt', 'GPUs');
    expect(images[0]).toHaveAttribute('src', '/img/gpu.jpg');
  });

  it('renders item counts when provided', () => {
    render(<CategoryShowcase categories={categories} />);
    expect(screen.getByText('42 items')).toBeInTheDocument();
    expect(screen.getByText('38 items')).toBeInTheDocument();
  });

  it('does not render item count when not provided', () => {
    const noCounts: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg' },
    ];
    render(<CategoryShowcase categories={noCounts} />);
    expect(screen.queryByText(/items/)).not.toBeInTheDocument();
  }];

  it('renders section title when provided', () => {
    render(<CategoryShowcase categories={categories} title="Shop by Category" />);
    expect(screen.getByText('Shop by Category')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    render(<CategoryShowcase categories={categories} />);
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });

  it('renders as links when href is provided', () => {
    const withLinks: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', href: '/category/gpus' },
    ];
    render(<CategoryShowcase categories={withLinks} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/category/gpus');
  });

  it('calls onClick when category card is clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const clickable: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', count: 42, onClick },
    ];

    render(<CategoryShowcase categories={clickable} />);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('handles Enter key on clickable cards', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const clickable: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', onClick },
    ];

    render(<CategoryShowcase categories={clickable} />);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('handles Space key on clickable cards', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    const clickable: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', onClick },
    ];

    render(<CategoryShowcase categories={clickable} />);
    screen.getByRole('button').focus();
    await user.keyboard(' ');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('clickable cards have role=button and tabIndex=0', () => {
    const clickable: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', onClick: vi.fn() },
    ];
    render(<CategoryShowcase categories={clickable} />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('clickable cards have accessible labels with count', () => {
    const clickable: ShowcaseCategory[] = [
      { label: 'GPUs', image: '/img/gpu.jpg', count: 42, onClick: vi.fn() },
    ];
    render(<CategoryShowcase categories={clickable} />);
    expect(screen.getByLabelText('GPUs, 42 items')).toBeInTheDocument();
  }];

  it('sets grid columns from columns prop', () => {
    const { container } = render(<CategoryShowcase categories={categories} columns={4} />);
    const grid = container.querySelector('[class*="grid"]') as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  it('defaults to 5 columns', () => {
    const { container } = render(<CategoryShowcase categories={categories} />);
    const grid = container.querySelector('[class*="grid"]') as HTMLElement;
    expect(grid.style.gridTemplateColumns).toBe('repeat(5, 1fr)');
  });

  it('applies custom className', () => {
    const { container } = render(
      <CategoryShowcase categories={categories} className="my-showcase" />,
    );
    expect(container.firstElementChild?.className).toContain('my-showcase');
  });
});
