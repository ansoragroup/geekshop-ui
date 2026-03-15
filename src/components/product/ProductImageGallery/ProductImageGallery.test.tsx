import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ProductImageGallery } from './ProductImageGallery'

const images = ['/img/1.jpg', '/img/2.jpg', '/img/3.jpg']

beforeEach(() => {
  // jsdom does not support scrollTo, so we mock it
  Element.prototype.scrollTo = vi.fn()
})

describe('ProductImageGallery', () => {
  // Image rendering
  it('renders all product images', () => {
    render(<ProductImageGallery images={images} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('renders images with correct alt text', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByAltText('Product 1')).toBeInTheDocument()
    expect(screen.getByAltText('Product 2')).toBeInTheDocument()
    expect(screen.getByAltText('Product 3')).toBeInTheDocument()
  })

  it('renders images with correct src', () => {
    render(<ProductImageGallery images={images} />)
    const imgs = screen.getAllByRole('img')
    expect(imgs[0]).toHaveAttribute('src', '/img/1.jpg')
    expect(imgs[1]).toHaveAttribute('src', '/img/2.jpg')
  })

  // Counter
  it('renders counter badge showing current position', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByText('1/3')).toBeInTheDocument()
  })

  it('does not render counter for a single image', () => {
    render(<ProductImageGallery images={['/img/1.jpg']} />)
    expect(screen.queryByText('1/1')).not.toBeInTheDocument()
  })

  // Dot indicators
  it('renders dot indicators for multiple images', () => {
    render(<ProductImageGallery images={images} />)
    const dots = screen.getAllByLabelText(/Image \d+/)
    expect(dots).toHaveLength(3)
  })

  it('does not render dots for a single image', () => {
    render(<ProductImageGallery images={['/img/1.jpg']} />)
    expect(screen.queryByLabelText('Image 1')).not.toBeInTheDocument()
  })

  it('renders dot buttons with aria labels', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByLabelText('Image 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Image 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Image 3')).toBeInTheDocument()
  })

  // Top bar buttons
  it('renders back button with aria-label', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByLabelText('Orqaga')).toBeInTheDocument()
  })

  it('renders share button with aria-label', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByLabelText('Ulashish')).toBeInTheDocument()
  })

  it('renders favorite button with aria-label', () => {
    render(<ProductImageGallery images={images} />)
    expect(screen.getByLabelText('Sevimli')).toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', async () => {
    const onBack = vi.fn()
    const user = userEvent.setup()

    render(<ProductImageGallery images={images} onBack={onBack} />)
    await user.click(screen.getByLabelText('Orqaga'))

    expect(onBack).toHaveBeenCalledOnce()
  })

  it('calls onShare when share button is clicked', async () => {
    const onShare = vi.fn()
    const user = userEvent.setup()

    render(<ProductImageGallery images={images} onShare={onShare} />)
    await user.click(screen.getByLabelText('Ulashish'))

    expect(onShare).toHaveBeenCalledOnce()
  })

  it('calls onFavorite when favorite button is clicked', async () => {
    const onFavorite = vi.fn()
    const user = userEvent.setup()

    render(<ProductImageGallery images={images} onFavorite={onFavorite} />)
    await user.click(screen.getByLabelText('Sevimli'))

    expect(onFavorite).toHaveBeenCalledOnce()
  })

  // Favorite state
  it('applies favorited class when isFavorited is true', () => {
    render(<ProductImageGallery images={images} isFavorited />)
    const favBtn = screen.getByLabelText('Sevimli')
    expect(favBtn.className).toMatch(/favorited/)
  })

  it('does not apply favorited class when isFavorited is false', () => {
    render(<ProductImageGallery images={images} isFavorited={false} />)
    const favBtn = screen.getByLabelText('Sevimli')
    expect(favBtn.className).not.toMatch(/favorited/)
  })

  // className
  it('applies custom className', () => {
    const { container } = render(<ProductImageGallery images={images} className="custom" />)
    expect(container.firstElementChild?.className).toContain('custom')
  })

  // Dot click calls goToIndex -> onIndexChange
  it('calls onIndexChange when a dot is clicked', async () => {
    const onIndexChange = vi.fn()
    const user = userEvent.setup()

    render(<ProductImageGallery images={images} onIndexChange={onIndexChange} />)
    await user.click(screen.getByLabelText('Image 3'))

    expect(onIndexChange).toHaveBeenCalledWith(2)
  })
})
