import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Collapse, CollapsePanel } from './Collapse';

describe('Collapse', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders panel titles', () => {
    render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
        <CollapsePanel panelKey="2" title="Panel Two">Content 2</CollapsePanel>
      </Collapse>,
    );
    expect(screen.getByText('Panel One')).toBeInTheDocument();
    expect(screen.getByText('Panel Two')).toBeInTheDocument();
  });

  it('panels are collapsed by default', () => {
    const { container } = render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    const region = container.querySelector('[role="region"]');
    expect(region).toHaveAttribute('hidden');
  });

  it('expands panel with defaultActiveKey', () => {
    const { container } = render(
      <Collapse defaultActiveKey={['1']}>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
        <CollapsePanel panelKey="2" title="Panel Two">Content 2</CollapsePanel>
      </Collapse>,
    );
    const regions = container.querySelectorAll('[role="region"]');
    expect(regions[0]).not.toHaveAttribute('hidden');
    expect(regions[1]).toHaveAttribute('hidden');
  });

  it('toggles panel on click', () => {
    const { container } = render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    const header = screen.getByRole('button', { name: /Panel One/i });
    const region = container.querySelector('[role="region"]');
    fireEvent.click(header);
    expect(region).not.toHaveAttribute('hidden');

    fireEvent.click(header);
    expect(region).toHaveAttribute('hidden');
  });

  it('toggles panel with keyboard Enter', () => {
    render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    const header = screen.getByRole('button', { name: /Panel One/i });
    fireEvent.keyDown(header, { key: 'Enter' });
    expect(screen.getByRole('region')).not.toHaveAttribute('hidden');
  });

  it('toggles panel with keyboard Space', () => {
    render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    const header = screen.getByRole('button', { name: /Panel One/i });
    fireEvent.keyDown(header, { key: ' ' });
    expect(screen.getByRole('region')).not.toHaveAttribute('hidden');
  });

  it('only allows one panel open in accordion mode', () => {
    const { container } = render(
      <Collapse accordion defaultActiveKey="1">
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
        <CollapsePanel panelKey="2" title="Panel Two">Content 2</CollapsePanel>
      </Collapse>,
    );
    const regions = container.querySelectorAll('[role="region"]');
    expect(regions[0]).not.toHaveAttribute('hidden');
    expect(regions[1]).toHaveAttribute('hidden');

    // Click second panel
    fireEvent.click(screen.getByRole('button', { name: /Panel Two/i }));
    expect(regions[0]).toHaveAttribute('hidden');
    expect(regions[1]).not.toHaveAttribute('hidden');
  });

  it('allows multiple panels open in non-accordion mode', () => {
    render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
        <CollapsePanel panelKey="2" title="Panel Two">Content 2</CollapsePanel>
      </Collapse>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Panel One/i }));
    fireEvent.click(screen.getByRole('button', { name: /Panel Two/i }));
    const regions = screen.getAllByRole('region');
    expect(regions[0]).not.toHaveAttribute('hidden');
    expect(regions[1]).not.toHaveAttribute('hidden');
  });

  it('does not toggle disabled panel', () => {
    const { container } = render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Disabled" disabled>Content</CollapsePanel>
      </Collapse>,
    );
    const header = screen.getByRole('button', { name: /Disabled/i });
    expect(header).toHaveAttribute('aria-disabled', 'true');
    fireEvent.click(header);
    const region = container.querySelector('[role="region"]');
    expect(region).toHaveAttribute('hidden');
  });

  it('calls onChange callback', () => {
    const onChange = vi.fn();
    render(
      <Collapse onChange={onChange}>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    fireEvent.click(screen.getByRole('button', { name: /Panel One/i }));
    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('renders extra content in header', () => {
    render(
      <Collapse>
        <CollapsePanel panelKey="1" title="Panel" extra={<span data-testid="extra">128</span>}>Content</CollapsePanel>
      </Collapse>,
    );
    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });

  it('has proper aria attributes', () => {
    render(
      <Collapse defaultActiveKey={['1']}>
        <CollapsePanel panelKey="1" title="Panel One">Content 1</CollapsePanel>
      </Collapse>,
    );
    const header = screen.getByRole('button', { name: /Panel One/i });
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(header).toHaveAttribute('aria-controls');
    const region = screen.getByRole('region');
    expect(region).toHaveAttribute('aria-labelledby');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Collapse className="my-collapse">
        <CollapsePanel panelKey="1" title="Panel">Content</CollapsePanel>
      </Collapse>,
    );
    expect(container.firstElementChild?.className).toContain('my-collapse');
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(
      <Collapse ref={ref}>
        <CollapsePanel panelKey="1" title="Panel">Content</CollapsePanel>
      </Collapse>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
