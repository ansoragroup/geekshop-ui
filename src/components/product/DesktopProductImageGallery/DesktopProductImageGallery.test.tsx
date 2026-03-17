import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DesktopProductImageGallery } from './DesktopProductImageGallery';

const defaultProps = {
  images: ['/img/product1.jpg', '/img/product2.jpg', '/img/product3.jpg', '/img/product4.jpg'],
};

describe('DesktopProductImageGallery', () => {
  it('renders all thumbnails', () => {
    render(<DesktopProductImageGallery {...defaultProps} />);
    const thumbnails = screen.getAllByRole('tab');
    expect(thumbnails).toHaveLength(4);
  });

  it('renders main image with first image by default', () => {
    render(<DesktopProductImageGallery {...defaultProps} />);
    const mainImage = screen.getByAltText('Product image 1 of 4');
    expect(mainImage).toHaveAttribute('src', '/img/product1.jpg');
  });

  it('changes main image when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<DesktopProductImageGallery {...defaultProps} />);

    const secondThumbnail = screen.getByLabelText('View image 2 of 4');
    await user.click(secondThumbnail);

    const mainImage = screen.getByAltText('Product image 2 of 4');
    expect(mainImage).toHaveAttribute('src', '/img/product2.jpg');
  });

  it('calls onIndexChange when thumbnail is clicked', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductImageGallery {...defaultProps} onIndexChange={onIndexChange} />);

    const thirdThumbnail = screen.getByLabelText('View image 3 of 4');
    await user.click(thirdThumbnail);

    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('navigates to next thumbnail with ArrowDown', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductImageGallery {...defaultProps} onIndexChange={onIndexChange} />);

    const firstThumbnail = screen.getByLabelText('View image 1 of 4');
    firstThumbnail.focus();
    await user.keyboard('{ArrowDown}');

    expect(onIndexChange).toHaveBeenCalledWith(1);
  });

  it('navigates to previous thumbnail with ArrowUp', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(<DesktopProductImageGallery {...defaultProps} onIndexChange={onIndexChange} />);

    const firstThumbnail = screen.getByLabelText('View image 1 of 4');
    firstThumbnail.focus();
    await user.keyboard('{ArrowUp}');

    // Should wrap to last image
    expect(onIndexChange).toHaveBeenCalledWith(3);
  });

  it('wraps around when pressing ArrowDown on last thumbnail', async () => {
    const onIndexChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DesktopProductImageGallery
        {...defaultProps}
        currentIndex={3}
        onIndexChange={onIndexChange}
      />,
    );

    const lastThumbnail = screen.getByLabelText('View image 4 of 4');
    lastThumbnail.focus();
    await user.keyboard('{ArrowDown}');

    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <DesktopProductImageGallery {...defaultProps} className="my-gallery" />,
    );
    expect(container.firstElementChild?.className).toContain('my-gallery');
  });

  it('has correct aria labels on thumbnails', () => {
    render(<DesktopProductImageGallery {...defaultProps} />);

    expect(screen.getByLabelText('View image 1 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('View image 2 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('View image 3 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('View image 4 of 4')).toBeInTheDocument();
  });

  it('marks active thumbnail with aria-selected', () => {
    render(<DesktopProductImageGallery {...defaultProps} />);

    const firstThumbnail = screen.getByLabelText('View image 1 of 4');
    expect(firstThumbnail).toHaveAttribute('aria-selected', 'true');

    const secondThumbnail = screen.getByLabelText('View image 2 of 4');
    expect(secondThumbnail).toHaveAttribute('aria-selected', 'false');
  });

  it('renders tablist with accessible label', () => {
    render(<DesktopProductImageGallery {...defaultProps} />);
    expect(screen.getByRole('tablist', { name: 'Product image thumbnails' })).toBeInTheDocument();
  });

  it('renders single image without issues', () => {
    render(<DesktopProductImageGallery images={['/img/single.jpg']} />);
    const thumbnails = screen.getAllByRole('tab');
    expect(thumbnails).toHaveLength(1);
    expect(screen.getByAltText('Product image 1 of 1')).toHaveAttribute('src', '/img/single.jpg');
  });

  it('supports controlled currentIndex', () => {
    render(<DesktopProductImageGallery {...defaultProps} currentIndex={2} />);
    const mainImage = screen.getByAltText('Product image 3 of 4');
    expect(mainImage).toHaveAttribute('src', '/img/product3.jpg');
  });
});
