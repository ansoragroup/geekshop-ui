import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MegaMenu } from './MegaMenu';
import type { MegaMenuCategory } from './MegaMenu';

const categories: MegaMenuCategory[] = [
  {
    label: 'Graphics Cards',
    subcategories: [
      { label: 'RTX 5090' },
      { label: 'RTX 4090' },
    ],
  },
  {
    label: 'Processors',
    subcategories: [
      { label: 'Ryzen 9' },
      { label: 'Core i9' },
    ],
  },
  {
    label: 'Monitors',
  },
];

const navItems = [
  { label: 'Deals', href: '#' },
  { label: 'New Arrivals' },
];

describe('MegaMenu', () => {
  it('renders as a nav element with correct aria-label', () => {
    render(<MegaMenu categories={categories} />);
    expect(screen.getByRole('navigation', { name: 'Category navigation' })).toBeInTheDocument();
  });

  it('renders the All Categories trigger button', () => {
    render(<MegaMenu categories={categories} />);
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    render(<MegaMenu categories={categories} navItems={navItems} />);
    expect(screen.getByText('Deals')).toBeInTheDocument();
    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
  });

  it('shows dropdown on mouse enter', () => {
    render(<MegaMenu categories={categories} />);
    const trigger = screen.getByText('All Categories').closest('div')!;
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('menu', { name: 'Categories' })).toBeInTheDocument();
    // 'Graphics Cards' appears in both category list and subcategory title (active by default)
    expect(screen.getAllByText('Graphics Cards').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Processors')).toBeInTheDocument();
    expect(screen.getByText('Monitors')).toBeInTheDocument();
  });

  it('shows subcategories for the active category', () => {
    render(<MegaMenu categories={categories} />);
    const trigger = screen.getByText('All Categories').closest('div')!;
    fireEvent.mouseEnter(trigger);
    // First category is active by default
    expect(screen.getByText('RTX 5090')).toBeInTheDocument();
    expect(screen.getByText('RTX 4090')).toBeInTheDocument();
  });

  it('changes active category on hover', () => {
    render(<MegaMenu categories={categories} />);
    const trigger = screen.getByText('All Categories').closest('div')!;
    fireEvent.mouseEnter(trigger);

    // Hover over Processors
    const processorsItem = screen.getByText('Processors').closest('li')!;
    fireEvent.mouseEnter(processorsItem);

    expect(screen.getByText('Ryzen 9')).toBeInTheDocument();
    expect(screen.getByText('Core i9')).toBeInTheDocument();
  });

  it('calls onCategoryClick when category is clicked', () => {
    const onCategoryClick = vi.fn();
    render(<MegaMenu categories={categories} onCategoryClick={onCategoryClick} />);

    const trigger = screen.getByText('All Categories').closest('div')!;
    fireEvent.mouseEnter(trigger);

    // 'Graphics Cards' appears in both category list and subcategory title; click the category link
    fireEvent.click(screen.getAllByText('Graphics Cards')[0]);
    expect(onCategoryClick).toHaveBeenCalledWith(categories[0]);
  });

  it('trigger has correct aria attributes', () => {
    render(<MegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    expect(button).toHaveAttribute('aria-haspopup', 'true');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true when dropdown is open', () => {
    render(<MegaMenu categories={categories} />);
    const trigger = screen.getByText('All Categories').closest('div')!;
    fireEvent.mouseEnter(trigger);
    const button = screen.getByRole('button', { name: /All Categories/ });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens dropdown with Enter key', () => {
    render(<MegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('menu', { name: 'Categories' })).toBeInTheDocument();
  });

  it('closes dropdown with Escape key', () => {
    render(<MegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(button, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('navigates categories with ArrowDown/ArrowUp', () => {
    render(<MegaMenu categories={categories} />);
    const button = screen.getByRole('button', { name: /All Categories/ });
    fireEvent.keyDown(button, { key: 'Enter' });

    // Default is index 0, press down to go to index 1
    fireEvent.keyDown(button, { key: 'ArrowDown' });
    expect(screen.getByText('Ryzen 9')).toBeInTheDocument();

    // Press up to go back to index 0
    fireEvent.keyDown(button, { key: 'ArrowUp' });
    expect(screen.getByText('RTX 5090')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<MegaMenu categories={categories} className="custom" />);
    expect(container.querySelector('nav')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<MegaMenu categories={categories} data-testid="mega-menu" />);
    expect(screen.getByTestId('mega-menu')).toBeInTheDocument();
  });

  it('renders nav item as link when href is provided', () => {
    render(<MegaMenu categories={categories} navItems={[{ label: 'Deals', href: '/deals' }]} />);
    const link = screen.getByText('Deals');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/deals');
  });

  it('renders nav item as button when no href and onClick provided', () => {
    const onClick = vi.fn();
    render(<MegaMenu categories={categories} navItems={[{ label: 'Custom', onClick }]} />);
    const btn = screen.getByText('Custom');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
