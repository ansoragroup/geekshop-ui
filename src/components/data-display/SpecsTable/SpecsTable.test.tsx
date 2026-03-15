import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { SpecsTable } from './SpecsTable';
import type { SpecItem } from './SpecsTable';

describe('SpecsTable', () => {
  afterEach(() => {
    cleanup();
  });

  const specs: SpecItem[] = [
    { label: 'Brand', value: 'Apple' },
    { label: 'Model', value: 'iPhone 15 Pro' },
    { label: 'Storage', value: '256GB' },
  ];

  it('renders all spec rows', () => {
    render(<SpecsTable specs={specs} />);
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Model')).toBeInTheDocument();
    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('256GB')).toBeInTheDocument();
  });

  it('renders correct number of rows', () => {
    const { container } = render(<SpecsTable specs={specs} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.children.length).toBe(3);
  });

  it('renders empty table for empty specs', () => {
    const { container } = render(<SpecsTable specs={[]} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.children.length).toBe(0);
  });

  it('renders single spec row', () => {
    render(<SpecsTable specs={[{ label: 'Color', value: 'Black' }]} />);
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<SpecsTable specs={specs} className="my-specs" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('my-specs');
  });

  it('renders each row with label and value spans', () => {
    const { container } = render(<SpecsTable specs={specs} />);
    const root = container.firstElementChild as HTMLElement;
    const firstRow = root.children[0] as HTMLElement;
    expect(firstRow.children.length).toBe(2);
    expect(firstRow.children[0].textContent).toBe('Brand');
    expect(firstRow.children[1].textContent).toBe('Apple');
  });

  it('handles many spec items', () => {
    const manySpecs: SpecItem[] = Array.from({ length: 20 }, (_, i) => ({
      label: `Spec ${i}`,
      value: `Value ${i}`,
    }));
    const { container } = render(<SpecsTable specs={manySpecs} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.children.length).toBe(20);
  });
});
