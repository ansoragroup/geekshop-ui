import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ImageUploader } from './ImageUploader';

describe('ImageUploader', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders add button when no images', () => {
    render(<ImageUploader />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders images when value is provided', () => {
    render(<ImageUploader value={['https://img1.jpg', 'https://img2.jpg']} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
  });

  it('shows count text on add button', () => {
    render(<ImageUploader value={['https://img1.jpg']} maxCount={5} />);
    expect(screen.getByText('1/5')).toBeInTheDocument();
  });

  it('hides add button when maxCount reached', () => {
    render(
      <ImageUploader
        value={['https://img1.jpg', 'https://img2.jpg', 'https://img3.jpg']}
        maxCount={3}
      />,
    );
    // No add button should be rendered
    expect(screen.queryByText('3/3')).not.toBeInTheDocument();
    // Only delete buttons should be present
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('aria-label');
    });
  });

  it('renders delete buttons on each image', () => {
    render(<ImageUploader value={['https://img1.jpg', 'https://img2.jpg']} />);
    // Delete buttons have aria-label from translations. The add button also exists.
    // Total buttons = 2 delete + 1 add = 3
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.length).toBe(3);
  });

  it('calls onChange when an image is deleted', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ImageUploader
        value={['https://img1.jpg', 'https://img2.jpg']}
        onChange={onChange}
      />,
    );

    // All buttons: 2 delete + 1 add. Delete buttons come first in DOM order.
    const allButtons = screen.getAllByRole('button');
    // Click the first delete button (not the add button which is last)
    await user.click(allButtons[0]);

    expect(onChange).toHaveBeenCalledWith(['https://img2.jpg']);
  });

  it('does not render delete buttons when deletable is false', () => {
    render(
      <ImageUploader
        value={['https://img1.jpg']}
        deletable={false}
      />,
    );
    // Only the add button should exist, no delete buttons on images
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1); // just the add button
  });

  it('does not render add button when disabled', () => {
    render(<ImageUploader disabled />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has accessible add button with aria-label', () => {
    render(<ImageUploader />);
    const addBtn = screen.getByRole('button');
    expect(addBtn).toHaveAttribute('aria-label');
  });

  it('add button is keyboard accessible', async () => {
    render(<ImageUploader />);
    const addBtn = screen.getByRole('button');
    expect(addBtn).toHaveAttribute('tabindex', '0');
  });

  it('renders hidden file input', () => {
    const { container } = render(<ImageUploader />);
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('aria-hidden', 'true');
  });

  it('file input accepts images by default', () => {
    const { container } = render(<ImageUploader />);
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  it('file input accepts custom accept type', () => {
    const { container } = render(<ImageUploader accept="image/png,image/jpeg" />);
    const fileInput = container.querySelector('input[type="file"]');
    expect(fileInput).toHaveAttribute('accept', 'image/png,image/jpeg');
  });

  it('sets custom columns via CSS variable', () => {
    const { container } = render(<ImageUploader columns={4} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--image-columns')).toBe('4');
  });

  it('applies custom className', () => {
    const { container } = render(<ImageUploader className="my-uploader" />);
    expect(container.firstChild).toHaveClass('my-uploader');
  });
});
