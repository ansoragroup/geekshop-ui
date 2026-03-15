import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { SkuSelector } from './SkuSelector'

const product = {
  title: 'Test Shirt',
  image: '/shirt.jpg',
  priceRange: [50000, 120000] as [number, number],
}

const variants = [
  { id: 's1', name: 'Qora S', image: '/s1.jpg', price: 50000, stock: 10 },
  { id: 's2', name: 'Qora M', image: '/s2.jpg', price: 70000, stock: 5, hotRank: 1 },
  { id: 's3', name: 'Oq L', image: '/s3.jpg', price: 120000, stock: 0 },
]

describe('SkuSelector', () => {
  afterEach(cleanup)

  it('renders nothing when open is false', () => {
    const { container } = render(
      <SkuSelector product={product} variants={variants} open={false} />,
    )
    expect(container.innerHTML).toBe('')
  })

  it('renders when open', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText('Test Shirt')).toBeInTheDocument()
  })

  it('renders product image', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByAltText('Test Shirt')).toHaveAttribute('src', '/shirt.jpg')
  })

  it('renders price range', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText(/50.*000.*-.*120.*000 so'm/)).toBeInTheDocument()
  })

  it('renders close button', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByLabelText('Yopish')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<SkuSelector product={product} variants={variants} onClose={onClose} open />)
    await user.click(screen.getByLabelText('Yopish'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('renders list view by default', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText("Ro'yxat")).toBeInTheDocument()
    expect(screen.getByText('Rasmli')).toBeInTheDocument()
    // Variant names visible in list
    expect(screen.getByText('Qora S')).toBeInTheDocument()
    expect(screen.getByText('Qora M')).toBeInTheDocument()
    expect(screen.getByText('Oq L')).toBeInTheDocument()
  })

  it('shows stock info for each variant in list mode', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText('10 ta mavjud')).toBeInTheDocument()
    expect(screen.getByText('5 ta mavjud')).toBeInTheDocument()
    expect(screen.getByText('0 ta mavjud')).toBeInTheDocument()
  })

  it('shows "Tanlangan: 0 ta" initially', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText('Tanlangan: 0 ta')).toBeInTheDocument()
  })

  it('disables add-to-cart button when no selection', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText("Savatga qo'shish")).toBeDisabled()
  })

  it('switches to imageGrid view when "Rasmli" clicked', async () => {
    const user = userEvent.setup()
    render(<SkuSelector product={product} variants={variants} open />)
    await user.click(screen.getByText('Rasmli'))
    // Image grid should show variant images
    const images = screen.getAllByRole('img')
    // Product image + variant images
    expect(images.length).toBeGreaterThanOrEqual(4) // 1 product + 3 variants
  })

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    const { container } = render(
      <SkuSelector product={product} variants={variants} onClose={onClose} open />,
    )
    const overlay = container.firstChild as HTMLElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not close when sheet content is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<SkuSelector product={product} variants={variants} onClose={onClose} open />)
    await user.click(screen.getByText('Test Shirt'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onAddToCart with empty array when button is enabled and clicked', async () => {
    // We need to select something first to enable the button
    const onAddToCart = vi.fn()
    const user = userEvent.setup()
    render(
      <SkuSelector product={product} variants={variants} onAddToCart={onAddToCart} open />,
    )

    // In list mode, find the increment button for the first variant
    const incrementButtons = screen.getAllByLabelText("Ko'paytirish")
    await user.click(incrementButtons[0])

    await user.click(screen.getByText("Savatga qo'shish"))
    expect(onAddToCart).toHaveBeenCalledWith([
      { variantId: 's1', quantity: 1 },
    ])
  })

  it('selects a variant in imageGrid mode', async () => {
    const user = userEvent.setup()
    render(<SkuSelector product={product} variants={variants} open />)
    await user.click(screen.getByText('Rasmli'))

    // Click on the first variant card
    await user.click(screen.getByAltText('Qora S'))
    // Info panel should show variant name and stock
    expect(screen.getByText('10 ta mavjud')).toBeInTheDocument()
  })

  it('renders view mode toggle buttons', () => {
    render(<SkuSelector product={product} variants={variants} open />)
    expect(screen.getByText("Ro'yxat")).toBeInTheDocument()
    expect(screen.getByText('Rasmli')).toBeInTheDocument()
  })
})
