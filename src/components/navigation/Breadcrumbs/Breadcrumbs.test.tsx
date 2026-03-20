import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs';

const defaultItems = [
  { label: 'Home', href: '/' },
  { label: 'Category', href: '/category' },
  { label: 'Current Page' },
];

describe('Breadcrumbs', () => {
  it('renders as a nav element with correct aria-label', () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders an ordered list', () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders all items', () => {
    render(<Breadcrumbs items={defaultItems} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const homeLink = screen.getByText('Home');
    expect(homeLink.tagName).toBe('A');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('marks last item as aria-current="page"', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const current = screen.getByText('Current Page');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('does not render last item as a link', () => {
    render(<Breadcrumbs items={defaultItems} />);
    const current = screen.getByText('Current Page');
    expect(current.tagName).not.toBe('A');
  });

  it('renders separators between items', () => {
    const { container } = render(<Breadcrumbs items={defaultItems} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators).toHaveLength(defaultItems.length - 1);
  });

  it('renders default separator as "/"', () => {
    const { container } = render(<Breadcrumbs items={defaultItems} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators[0].textContent).toBe('/');
  });

  it('renders custom separator', () => {
    const { container } = render(<Breadcrumbs items={defaultItems} separator=">" />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators[0].textContent).toBe('>');
  });

  it('collapses items when maxItems is set', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'A', href: '/a' },
      { label: 'B', href: '/b' },
      { label: 'C', href: '/c' },
      { label: 'D' },
    ];
    render(<Breadcrumbs items={items} maxItems={3} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    // Middle items should be hidden
    expect(screen.queryByText('A')).not.toBeInTheDocument();
    expect(screen.queryByText('B')).not.toBeInTheDocument();
  });

  it('does not collapse when items count <= maxItems', () => {
    render(<Breadcrumbs items={defaultItems} maxItems={5} />);
    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
  });

  it('calls onClick on items with click handler', () => {
    const onClick = vi.fn();
    const items = [
      { label: 'Home', onClick },
      { label: 'Current' },
    ];
    render(<Breadcrumbs items={items} />);
    fireEvent.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledOnce();
  }];

  it('applies custom className', () => {
    const { container } = render(<Breadcrumbs items={defaultItems} className="custom" />);
    expect(container.querySelector('nav')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<Breadcrumbs items={defaultItems} data-testid="breadcrumbs" />);
    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
