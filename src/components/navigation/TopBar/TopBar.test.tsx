import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('renders as a nav element with correct aria-label', () => {
    render(<TopBar />);
    expect(screen.getByRole('navigation', { name: 'Utility navigation' })).toBeInTheDocument();
  });

  it('renders left items', () => {
    render(
      <TopBar leftItems={[<span key="1">Welcome!</span>, <a key="2" href="/help">Help</a>]} />,
    );
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('renders right items', () => {
    render(
      <TopBar rightItems={[<button key="1">EN</button>, <button key="2">$ USD</button>]} />,
    );
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('$ USD')).toBeInTheDocument();
  });

  it('renders both left and right items', () => {
    render(
      <TopBar
        leftItems={[<span key="l">Left</span>]}
        rightItems={[<span key="r">Right</span>]}
      />,
    );
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<TopBar className="custom" />);
    expect(container.querySelector('nav')?.className).toContain('custom');
  });

  it('spreads rest props onto root element', () => {
    render(<TopBar data-testid="topbar" />);
    expect(screen.getByTestId('topbar')).toBeInTheDocument();
  });

  it('renders nothing in left/right when arrays are empty', () => {
    const { container } = render(<TopBar leftItems={[]} rightItems={[]} />);
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    // Content div should exist but no left/right children
    expect(nav?.querySelectorAll('[class*="left"]')).toHaveLength(0);
    expect(nav?.querySelectorAll('[class*="right"]')).toHaveLength(0);
  });
});
