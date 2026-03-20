import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DesktopSpecsTable } from './DesktopSpecsTable';

const defaultSpecs = [
  { label: 'Brand', value: 'MSI' },
  { label: 'GPU', value: 'RTX 4060' },
  { label: 'Memory', value: '8GB GDDR6' },
  { label: 'Clock', value: '2460 MHz' },
];

describe('DesktopSpecsTable', () => {
  it('renders the default title', () => {
    render(<DesktopSpecsTable specs={defaultSpecs} />);
    expect(screen.getByText('Specifications')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<DesktopSpecsTable specs={defaultSpecs} title="Key Specs" />);
    expect(screen.getByText('Key Specs')).toBeInTheDocument();
  });

  it('renders all spec labels', () => {
    render(<DesktopSpecsTable specs={defaultSpecs} />);
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('GPU')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('Clock')).toBeInTheDocument();
  });

  it('renders all spec values', () => {
    render(<DesktopSpecsTable specs={defaultSpecs} />);
    expect(screen.getByText('MSI')).toBeInTheDocument();
    expect(screen.getByText('RTX 4060')).toBeInTheDocument();
    expect(screen.getByText('8GB GDDR6')).toBeInTheDocument();
    expect(screen.getByText('2460 MHz')).toBeInTheDocument();
  });

  it('renders groups with titles', () => {
    render(
      <DesktopSpecsTable
        specs={[]}
        groups={[
          {
            title: 'General',
            specs: [{ label: 'Brand', value: 'MSI' }],
          },
          {
            title: 'Performance',
            specs: [{ label: 'Clock', value: '2460 MHz' }],
          },
        ]}
      />,
    );
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('MSI')).toBeInTheDocument();
    expect(screen.getByText('Clock')).toBeInTheDocument();
    expect(screen.getByText('2460 MHz')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopSpecsTable specs={defaultSpecs} className="my-specs" />,
    );
    expect(container.firstElementChild?.className).toContain('my-specs');
  });

  it('renders in single-column mode', () => {
    const { container } = render(
      <DesktopSpecsTable specs={defaultSpecs} columns={1} />,
    );
    expect(container.querySelector('[class*="singleColumn"]')).toBeInTheDocument();
  });

  it('renders in two-column mode by default', () => {
    const { container } = render(
      <DesktopSpecsTable specs={defaultSpecs} />,
    );
    expect(container.querySelector('[class*="twoColumns"]')).toBeInTheDocument();
  });

  it('renders alternating row backgrounds', () => {
    const { container } = render(
      <DesktopSpecsTable specs={defaultSpecs} />,
    );
    expect(container.querySelector('[class*="specRowEven"]')).toBeInTheDocument();
    expect(container.querySelector('[class*="specRowOdd"]')).toBeInTheDocument();
  });

  it('renders many specs without issues', () => {
    const manySpecs = Array.from({ length: 20 }, (_, i) => ({
      label: `Spec ${i + 1}`,
      value: `Value ${i + 1}`,
    }));
    render(<DesktopSpecsTable specs={manySpecs} />);
    expect(screen.getByText('Spec 1')).toBeInTheDocument();
    expect(screen.getByText('Spec 20')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Value 20')).toBeInTheDocument();
  });
});
