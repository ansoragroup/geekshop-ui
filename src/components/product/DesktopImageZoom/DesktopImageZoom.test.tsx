import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DesktopImageZoom } from './DesktopImageZoom';

const images = [
  'https://example.com/img1.jpg',
  'https://example.com/img2.jpg',
  'https://example.com/img3.jpg',
];

describe('DesktopImageZoom', () => {
  // ─── Render tests ───────────────────────────────────────────────────

  it('renders without crashing', () => {
    render(<DesktopImageZoom images={images} />);
    expect(screen.getByRole('button', { name: /Product image 1 of 3/ })).toBeInTheDocument();
  });

  it('renders main image with correct src', () => {
    render(<DesktopImageZoom images={images} />);
    const img = screen.getByAltText('Product image 1');
    expect(img).toHaveAttribute('src', images[0]);
  });

  it('renders thumbnail strip when multiple images', () => {
    render(<DesktopImageZoom images={images} />);
    const listbox = screen.getByRole('listbox', { name: 'Product image thumbnails' });
    expect(listbox).toBeInTheDocument();
    const thumbs = screen.getAllByRole('option');
    expect(thumbs).toHaveLength(3);
  });

  it('does not render thumbnails for single image', () => {
    render(<DesktopImageZoom images={[images[0]]} />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders with custom altPrefix', () => {
    render(<DesktopImageZoom images={images} altPrefix="Laptop photo" />);
    expect(screen.getByAltText('Laptop photo 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Laptop photo 1 of 3/ })).toBeInTheDocument();
  });

  // ─── Thumbnail selection ────────────────────────────────────────────

  it('first thumbnail is selected by default', () => {
    render(<DesktopImageZoom images={images} />);
    const thumbs = screen.getAllByRole('option');
    expect(thumbs[0]).toHaveAttribute('aria-selected', 'true');
    expect(thumbs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('selects thumbnail on click and calls onSelect', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.click(thumbs[1]);
    expect(handler).toHaveBeenCalledWith(1);
    expect(thumbs[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('selects thumbnail on hover (mouseEnter)', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.mouseEnter(thumbs[2]);
    expect(handler).toHaveBeenCalledWith(2);
  });

  it('respects controlled selectedIndex', () => {
    render(<DesktopImageZoom images={images} selectedIndex={2} />);
    const thumbs = screen.getAllByRole('option');
    expect(thumbs[2]).toHaveAttribute('aria-selected', 'true');
    const mainImg = screen.getByAltText('Product image 3');
    expect(mainImg).toHaveAttribute('src', images[2]);
  });

  // ─── Thumbnail keyboard navigation ─────────────────────────────────

  it('navigates thumbnails with ArrowRight', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[0], { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith(1);
  });

  it('navigates thumbnails with ArrowLeft', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} selectedIndex={2} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[2], { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith(1);
  });

  it('does not go below 0 with ArrowLeft on first thumb', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[0], { key: 'ArrowLeft' });
    expect(handler).toHaveBeenCalledWith(0);
  });

  it('does not go beyond last thumb with ArrowRight', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} selectedIndex={2} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[2], { key: 'ArrowRight' });
    expect(handler).toHaveBeenCalledWith(2);
  });

  it('selects thumbnail on Enter key', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[1], { key: 'Enter' });
    expect(handler).toHaveBeenCalledWith(1);
  });

  it('selects thumbnail on Space key', () => {
    const handler = vi.fn();
    render(<DesktopImageZoom images={images} onSelect={handler} />);
    const thumbs = screen.getAllByRole('option');
    fireEvent.keyDown(thumbs[1], { key: ' ' });
    expect(handler).toHaveBeenCalledWith(1);
  });

  it('only selected thumbnail has tabIndex 0', () => {
    render(<DesktopImageZoom images={images} />);
    const thumbs = screen.getAllByRole('option');
    expect(thumbs[0]).toHaveAttribute('tabIndex', '0');
    expect(thumbs[1]).toHaveAttribute('tabIndex', '-1');
    expect(thumbs[2]).toHaveAttribute('tabIndex', '-1');
  });

  // ─── Lightbox ───────────────────────────────────────────────────────

  it('opens lightbox on main image click', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByRole('dialog', { name: 'Fullscreen product image' })).toBeInTheDocument();
  });

  it('opens lightbox on Enter key', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.keyDown(mainButton, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('opens lightbox on Space key', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.keyDown(mainButton, { key: ' ' });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('lightbox has aria-modal attribute', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('lightbox renders close button', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByLabelText('Close fullscreen')).toBeInTheDocument();
  });

  it('closes lightbox on close button click', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close fullscreen'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes lightbox on Escape key', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes lightbox on overlay click', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('lightbox renders thumbnails for multi-image galleries', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    // Lightbox thumbnails are separate from the main thumbnails
    const lightboxThumbs = screen.getByRole('dialog').querySelectorAll('button[aria-label]');
    // Close button + 3 thumbnail buttons
    expect(lightboxThumbs.length).toBeGreaterThanOrEqual(3);
  });

  it('lightbox image has correct alt and fullscreen in alt', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    fireEvent.click(mainButton);
    expect(screen.getByAltText('Product image 1 fullscreen')).toBeInTheDocument();
  });

  // ─── Labels / i18n ──────────────────────────────────────────────────

  it('uses default labels', () => {
    render(<DesktopImageZoom images={images} />);
    expect(screen.getByRole('button', { name: /Click to open fullscreen/ })).toBeInTheDocument();
    expect(screen.getByRole('listbox', { name: 'Product image thumbnails' })).toBeInTheDocument();
  });

  it('applies custom labels', () => {
    render(
      <DesktopImageZoom
        images={images}
        labels={{
          mainImage: '{alt} {index}/{total}. Kattalashtirish uchun bosing.',
          thumbnails: 'Mahsulot rasmlari',
          lightbox: 'Toliqqaytarish',
          closeFullscreen: 'Yopish',
        }}
      />,
    );
    expect(
      screen.getByRole('button', { name: /Kattalashtirish uchun bosing/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('listbox', { name: 'Mahsulot rasmlari' })).toBeInTheDocument();
  });

  it('custom close label appears in lightbox', () => {
    render(
      <DesktopImageZoom
        images={images}
        labels={{ closeFullscreen: 'Yopish' }}
      />,
    );
    const mainButton = screen.getByRole('button', { name: /Product image/ });
    fireEvent.click(mainButton);
    expect(screen.getByLabelText('Yopish')).toBeInTheDocument();
  });

  // ─── Main image role/tabIndex ───────────────────────────────────────

  it('main image area has role="button" and tabIndex=0', () => {
    render(<DesktopImageZoom images={images} />);
    const mainButton = screen.getByRole('button', { name: /Product image 1 of 3/ });
    expect(mainButton).toHaveAttribute('tabIndex', '0');
  });

  // ─── Prop spreading & className ─────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(
      <DesktopImageZoom images={images} className="custom-zoom" />,
    );
    expect(container.firstElementChild?.className).toContain('custom-zoom');
  });

  it('spreads rest props', () => {
    render(<DesktopImageZoom images={images} data-testid="image-zoom" />);
    expect(screen.getByTestId('image-zoom')).toBeInTheDocument();
  });

  // ─── displayName ────────────────────────────────────────────────────

  it('has correct displayName', () => {
    expect(DesktopImageZoom.displayName).toBe('DesktopImageZoom');
  });

  // ─── Image draggable=false ──────────────────────────────────────────

  it('main image is not draggable', () => {
    render(<DesktopImageZoom images={images} />);
    const img = screen.getByAltText('Product image 1');
    expect(img).toHaveAttribute('draggable', 'false');
  });
});
