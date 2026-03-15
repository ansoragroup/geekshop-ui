import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { GroupBuyCard } from './GroupBuyCard';
import type { GroupBuyProduct } from './GroupBuyCard';

const product: GroupBuyProduct = {
  name: 'RTX 4060 Ti',
  image: 'https://example.com/gpu.jpg',
  price: 4_199_000,
  originalPrice: 5_999_000,
};

describe('GroupBuyCard', () => {
  afterEach(cleanup);

  it('renders product name and image', () => {
    render(<GroupBuyCard product={product} groupSize={3} currentMembers={1} timeLeft={3600} />);
    expect(screen.getByText('RTX 4060 Ti')).toBeInTheDocument();
    expect(screen.getByAltText('RTX 4060 Ti')).toBeInTheDocument();
  });

  it('renders group and solo prices', () => {
    render(<GroupBuyCard product={product} groupSize={3} currentMembers={1} timeLeft={3600} />);
    // Both prices should be displayed
    const texts = screen.getAllByText(/so'm/i);
    expect(texts.length).toBeGreaterThanOrEqual(2);
  });

  it('shows correct member count in status', () => {
    render(<GroupBuyCard product={product} groupSize={3} currentMembers={2} timeLeft={3600} />);
    expect(screen.getByText("2/3 qo'shildi")).toBeInTheDocument();
  });

  it('renders correct number of dot indicators', () => {
    const { container } = render(
      <GroupBuyCard product={product} groupSize={5} currentMembers={2} timeLeft={3600} />,
    );
    const dotsRow = container.querySelector('[class*="dotsRow"]')!;
    const dots = dotsRow.children;
    // 5 dots total (dotFilled or dotEmpty class)
    expect(dots.length).toBe(5);
  });

  it('renders avatar images when provided', () => {
    const { container } = render(
      <GroupBuyCard
        product={product}
        groupSize={3}
        currentMembers={2}
        memberAvatars={['https://example.com/a.jpg', 'https://example.com/b.jpg']}
        timeLeft={3600}
      />,
    );
    const avatarImgs = container.querySelectorAll('[class*="avatarImg"]');
    expect(avatarImgs.length).toBe(2);
  });

  it('renders empty avatar slots for unfilled positions', () => {
    const { container } = render(
      <GroupBuyCard product={product} groupSize={3} currentMembers={1} timeLeft={3600} />,
    );
    const emptySlots = container.querySelectorAll('[class*="avatarEmpty"]');
    expect(emptySlots.length).toBe(2);
  });

  it('calls onJoinGroup when join button is clicked', async () => {
    const onJoinGroup = vi.fn();
    const user = userEvent.setup();
    render(
      <GroupBuyCard
        product={product}
        groupSize={3}
        currentMembers={1}
        timeLeft={3600}
        onJoinGroup={onJoinGroup}
      />,
    );
    await user.click(screen.getByRole('button', { name: /qo'shilish/i }));
    expect(onJoinGroup).toHaveBeenCalledTimes(1);
  });

  it('calls onBuyAlone when solo button is clicked', async () => {
    const onBuyAlone = vi.fn();
    const user = userEvent.setup();
    render(
      <GroupBuyCard
        product={product}
        groupSize={3}
        currentMembers={1}
        timeLeft={3600}
        onBuyAlone={onBuyAlone}
      />,
    );
    await user.click(screen.getByRole('button', { name: /sotib olish/i }));
    expect(onBuyAlone).toHaveBeenCalledTimes(1);
  });

  it('disables join button when group is full', () => {
    render(
      <GroupBuyCard
        product={product}
        groupSize={3}
        currentMembers={3}
        timeLeft={3600}
      />,
    );
    // When full, the join button label becomes "Guruh to'ldi" but the aria-label stays "Guruhga qo'shilish"
    const joinBtn = screen.getByRole('button', { name: /qo'shilish/i });
    expect(joinBtn).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GroupBuyCard
        product={product}
        groupSize={3}
        currentMembers={1}
        timeLeft={3600}
        className="custom"
      />,
    );
    expect(container.firstChild).toHaveClass('custom');
  });

  it('renders group avatar group with aria-label', () => {
    render(
      <GroupBuyCard product={product} groupSize={3} currentMembers={2} timeLeft={3600} />,
    );
    const group = screen.getByRole('group');
    expect(group).toHaveAttribute('aria-label', "2/3 qo'shildi");
  });

  it('shows remaining count text', () => {
    const { container } = render(
      <GroupBuyCard product={product} groupSize={5} currentMembers={2} timeLeft={3600} />,
    );
    const remaining = container.querySelector('[class*="remainingLabel"]');
    expect(remaining).toHaveTextContent('+3');
  });
});
