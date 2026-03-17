import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopReviewCard } from './DesktopReviewCard';

const defaultProps = {
  user: { name: 'Dilshod Rahimov', avatar: '/img/user.jpg' },
  rating: 5,
  content: 'Great GPU performance!',
  date: '14 Mar 2026',
};

describe('DesktopReviewCard', () => {
  it('renders the user name', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.getByText('Dilshod Rahimov')).toBeInTheDocument();
  });

  it('renders stars with aria-label', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.getByLabelText('Rating: 5 out of 5')).toBeInTheDocument();
  });

  it('renders the review content', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.getByText('Great GPU performance!')).toBeInTheDocument();
  });

  it('renders the date', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.getByText('14 Mar 2026')).toBeInTheDocument();
  });

  it('renders avatar image when provided', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    const img = screen.getByAltText('Dilshod Rahimov');
    expect(img).toHaveAttribute('src', '/img/user.jpg');
  });

  it('renders avatar fallback initials when no avatar', () => {
    render(
      <DesktopReviewCard
        {...defaultProps}
        user={{ name: 'Dilshod Rahimov' }}
      />,
    );
    expect(screen.getByText('DR')).toBeInTheDocument();
  });

  it('renders variant when provided', () => {
    render(<DesktopReviewCard {...defaultProps} variant="12GB/Black" />);
    expect(screen.getByText('Variant: 12GB/Black')).toBeInTheDocument();
  });

  it('does not render variant when not provided', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.queryByText(/Variant:/)).not.toBeInTheDocument();
  });

  it('renders review images when provided', () => {
    render(
      <DesktopReviewCard
        {...defaultProps}
        images={['/img/r1.jpg', '/img/r2.jpg']}
      />,
    );
    expect(screen.getByAltText('Review image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Review image 2')).toBeInTheDocument();
  });

  it('does not render images section when no images', () => {
    render(<DesktopReviewCard {...defaultProps} />);
    expect(screen.queryByRole('group', { name: 'Review images' })).not.toBeInTheDocument();
  });

  it('calls onHelpful when helpful button is clicked', async () => {
    const onHelpful = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopReviewCard
        {...defaultProps}
        helpfulCount={12}
        onHelpful={onHelpful}
      />,
    );
    await user.click(screen.getByLabelText('Helpful (12)'));

    expect(onHelpful).toHaveBeenCalledOnce();
  });

  it('calls onNotHelpful when not-helpful button is clicked', async () => {
    const onNotHelpful = vi.fn();
    const user = userEvent.setup();

    render(
      <DesktopReviewCard
        {...defaultProps}
        notHelpfulCount={3}
        onNotHelpful={onNotHelpful}
      />,
    );
    await user.click(screen.getByLabelText('Not helpful (3)'));

    expect(onNotHelpful).toHaveBeenCalledOnce();
  });

  it('shows active state on helpful button', () => {
    const { container } = render(
      <DesktopReviewCard
        {...defaultProps}
        isHelpfulActive
        helpfulCount={5}
      />,
    );
    const helpfulBtn = screen.getByLabelText('Helpful (5)');
    expect(helpfulBtn).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('[class*="voteActive"]')).toBeInTheDocument();
  });

  it('shows active state on not-helpful button', () => {
    const { container } = render(
      <DesktopReviewCard
        {...defaultProps}
        isNotHelpfulActive
        notHelpfulCount={2}
      />,
    );
    const btn = screen.getByLabelText('Not helpful (2)');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(container.querySelector('[class*="voteActive"]')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopReviewCard {...defaultProps} className="my-review" />,
    );
    expect(container.firstElementChild?.className).toContain('my-review');
  });

  it('renders helpful/not-helpful counts', () => {
    render(
      <DesktopReviewCard
        {...defaultProps}
        helpfulCount={12}
        notHelpfulCount={1}
      />,
    );
    expect(screen.getByText('Helpful (12)')).toBeInTheDocument();
    expect(screen.getByText('Not helpful (1)')).toBeInTheDocument();
  });
});
