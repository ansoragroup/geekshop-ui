import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DesktopRatingDistribution } from './DesktopRatingDistribution';
import type { DesktopRatingDistributionData } from './DesktopRatingDistribution';

const distribution: DesktopRatingDistributionData = {
  5: 1200,
  4: 800,
  3: 300,
  2: 100,
  1: 50,
};

const total = 2450;
const average = 4.2;

describe('DesktopRatingDistribution', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('renders average value', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={4.567} total={total} />,
    );
    // average.toFixed(1) = "4.6"
    expect(screen.getByText('4.6')).toBeInTheDocument();
  });

  it('renders total count with reviews label', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    // formatCount(2450) = "2.5K"
    expect(screen.getByText(/2\.5K/)).toBeInTheDocument();
    expect(screen.getByText(/reviews/)).toBeInTheDocument();
  });

  it('renders 5 star rows', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('renders star labels for each row', () => {
    const { container } = render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    // Each bar row has a label with the star number
    const barLabels = container.querySelectorAll('[class*="barLabel"]');
    expect(barLabels).toHaveLength(5);
  });

  it('renders formatted counts per star', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    // formatCount(1200) = "1.2K"
    expect(screen.getByText('1.2K')).toBeInTheDocument();
    // formatCount(800) = "800"
    expect(screen.getByText('800')).toBeInTheDocument();
    // formatCount(300) = "300"
    expect(screen.getByText('300')).toBeInTheDocument();
    // formatCount(100) = "100"
    expect(screen.getByText('100')).toBeInTheDocument();
    // formatCount(50) = "50"
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  // ─── Progress bars ──────────────────────────────────────────────────

  it('renders progress bars with correct roles', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(5);
  });

  it('progress bars have correct aria-valuenow (percentage of total)', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const progressBars = screen.getAllByRole('progressbar');
    // 5 star: (1200/2450)*100 = 48.9795...
    const fiveStarPct = parseFloat(progressBars[0].getAttribute('aria-valuenow')!);
    expect(fiveStarPct).toBeCloseTo(48.98, 0);
    // 4 star: (800/2450)*100 = 32.6530...
    const fourStarPct = parseFloat(progressBars[1].getAttribute('aria-valuenow')!);
    expect(fourStarPct).toBeCloseTo(32.65, 0);
  });

  it('progress bars have aria-valuemin and aria-valuemax', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const progressBars = screen.getAllByRole('progressbar');
    for (const bar of progressBars) {
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    }
  });

  // ─── Star visualization ────────────────────────────────────────────

  it('renders 5 star icons in the average section', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const starsSection = screen.getByLabelText(/out of 5 stars/);
    expect(starsSection).toBeInTheDocument();
  });

  it('average stars aria-label includes the rating', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    expect(screen.getByLabelText('4.2 out of 5 stars')).toBeInTheDocument();
  });

  // ─── Accessibility ──────────────────────────────────────────────────

  it('bar chart has list role with aria-label', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    expect(screen.getByRole('list', { name: 'Star distribution' })).toBeInTheDocument();
  });

  it('progress bars have descriptive aria-labels', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    const progressBars = screen.getAllByRole('progressbar');
    // First bar: "5 star: 49%"
    expect(progressBars[0]).toHaveAttribute('aria-label', expect.stringContaining('5 star'));
    // Last bar: "1 star: 2%"
    expect(progressBars[4]).toHaveAttribute('aria-label', expect.stringContaining('1 star'));
  });

  // ─── Labels / i18n ──────────────────────────────────────────────────

  it('uses default labels', () => {
    render(
      <DesktopRatingDistribution distribution={distribution} average={average} total={total} />,
    );
    expect(screen.getByText(/reviews/)).toBeInTheDocument();
    expect(screen.getByLabelText('4.2 out of 5 stars')).toBeInTheDocument();
  });

  it('applies custom labels', () => {
    render(
      <DesktopRatingDistribution
        distribution={distribution}
        average={average}
        total={total}
        labels={{
          reviewsLabel: 'sharhlar',
          averageStars: '{rating} / 5 yulduz',
          starDistribution: 'Yulduz taqsimoti',
          starBar: '{star} yulduz: {percent}%',
        }}
      />,
    );
    expect(screen.getByText(/sharhlar/)).toBeInTheDocument();
    expect(screen.getByLabelText('4.2 / 5 yulduz')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Yulduz taqsimoti' })).toBeInTheDocument();
  });

  // ─── Edge cases ─────────────────────────────────────────────────────

  it('handles zero total gracefully', () => {
    const emptyDist: DesktopRatingDistributionData = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    render(
      <DesktopRatingDistribution distribution={emptyDist} average={0} total={0} />,
    );
    expect(screen.getByText('0.0')).toBeInTheDocument();
    const progressBars = screen.getAllByRole('progressbar');
    for (const bar of progressBars) {
      expect(bar).toHaveAttribute('aria-valuenow', expect.stringContaining('0'));
    }
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(
      <DesktopRatingDistribution
        distribution={distribution}
        average={average}
        total={total}
        className="custom-cls"
      />,
    );
    expect(container.firstElementChild?.className).toContain('custom-cls');
  });

  it('spreads rest props', () => {
    render(
      <DesktopRatingDistribution
        distribution={distribution}
        average={average}
        total={total}
        data-testid="rating-dist"
      />,
    );
    expect(screen.getByTestId('rating-dist')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopRatingDistribution.displayName).toBe('DesktopRatingDistribution');
  });
});
