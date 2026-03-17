import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DesktopBannerCarousel, type BannerSlide } from './DesktopBannerCarousel';

const slides: BannerSlide[] = [
  { title: 'Slide One', subtitle: 'First subtitle', ctaText: 'Buy Now', ctaHref: '#' },
  { title: 'Slide Two', subtitle: 'Second subtitle' },
  { title: 'Slide Three' },
];

describe('DesktopBannerCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders carousel with correct aria attributes', () => {
    render(<DesktopBannerCarousel slides={slides} />);
    expect(screen.getByRole('region', { name: 'Banner carousel' })).toBeInTheDocument();
  });

  it('renders all slides', () => {
    render(<DesktopBannerCarousel slides={slides} />);
    expect(screen.getByText('Slide One')).toBeInTheDocument();
    expect(screen.getByText('Slide Two')).toBeInTheDocument();
    expect(screen.getByText('Slide Three')).toBeInTheDocument();
  });

  it('renders first slide as active by default', () => {
    const { container } = render(<DesktopBannerCarousel slides={slides} />);
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[0]).toHaveAttribute('aria-hidden', 'false');
    expect(slideGroups[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders CTA button when provided', () => {
    render(<DesktopBannerCarousel slides={slides} />);
    expect(screen.getByText('Buy Now')).toBeInTheDocument();
    expect(screen.getByText('Buy Now').closest('a')).toHaveAttribute('href', '#');
  });

  it('renders dot indicators for multiple slides', () => {
    render(<DesktopBannerCarousel slides={slides} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('does not render dots or arrows for single slide', () => {
    render(<DesktopBannerCarousel slides={[slides[0]]} />);
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument();
  });

  it('navigates to next slide via dot click', () => {
    const { container } = render(<DesktopBannerCarousel slides={slides} />);
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[1]);
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('navigates via arrow buttons', () => {
    const { container } = render(<DesktopBannerCarousel slides={slides} />);
    const nextBtn = screen.getByLabelText('Next slide');
    fireEvent.click(nextBtn);
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('navigates via keyboard arrows', () => {
    const { container } = render(<DesktopBannerCarousel slides={slides} />);
    const carousel = screen.getByRole('region', { name: 'Banner carousel' });
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('wraps around from last to first slide', () => {
    const { container } = render(<DesktopBannerCarousel slides={slides} />);
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[2]); // go to last
    const nextBtn = screen.getByLabelText('Next slide');
    fireEvent.click(nextBtn); // should wrap to first
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[0]).toHaveAttribute('aria-hidden', 'false');
  });

  it('auto-rotates slides', () => {
    const { container } = render(
      <DesktopBannerCarousel slides={slides} interval={3000} />,
    );
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[1]).toHaveAttribute('aria-hidden', 'false');
  });

  it('pauses auto-rotation on hover', () => {
    const { container } = render(
      <DesktopBannerCarousel slides={slides} interval={3000} />,
    );
    const carousel = container.querySelector('[aria-roledescription="carousel"]')!;
    fireEvent.mouseEnter(carousel);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    const slideGroups = container.querySelectorAll('[role="group"]');
    expect(slideGroups[0]).toHaveAttribute('aria-hidden', 'false');
  });

  it('renders side panels when provided', () => {
    render(
      <DesktopBannerCarousel
        slides={slides}
        sidePanel={<div data-testid="panel-1">Panel 1</div>}
        sidePanel2={<div data-testid="panel-2">Panel 2</div>}
      />,
    );
    expect(screen.getByTestId('panel-1')).toBeInTheDocument();
    expect(screen.getByTestId('panel-2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopBannerCarousel slides={slides} className="custom" />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('spreads rest props', () => {
    render(
      <DesktopBannerCarousel slides={slides} data-testid="carousel" />,
    );
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
  });
});
