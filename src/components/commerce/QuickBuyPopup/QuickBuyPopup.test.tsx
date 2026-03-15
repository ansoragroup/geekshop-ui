import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { QuickBuyPopup } from './QuickBuyPopup'

const product = {
  title: 'Test Phone',
  image: '/phone.jpg',
  price: 5000000,
  stock: 10,
}

const variants = [
  { id: 'v1', name: 'Qora' },
  { id: 'v2', name: 'Oq' },
  { id: 'v3', name: "Ko'k" },
]

describe('QuickBuyPopup', () => {
  afterEach(cleanup)

  it('renders nothing when open is false', () => {
    const { container } = render(<QuickBuyPopup product={product} open={false} />)
    expect(container.innerHTML).toBe('')
  })

  it('renders dialog when open', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders aria-modal and aria-label on dialog', () => {
    render(<QuickBuyPopup product={product} open />)
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label', 'Quick buy: Test Phone')
  })

  it('renders product title', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByText('Test Phone')).toBeInTheDocument()
  })

  it('renders product image', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByAltText('Test Phone')).toHaveAttribute('src', '/phone.jpg')
  })

  it('renders formatted price', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByText(/5.*000.*000 so'm/)).toBeInTheDocument()
  })

  it('renders stock info', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByText('(10 ta mavjud)')).toBeInTheDocument()
  })

  it('renders close button with aria-label', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByLabelText('Yopish')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<QuickBuyPopup product={product} onClose={onClose} open />)
    await user.click(screen.getByLabelText('Yopish'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not render variant section when no variants', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
  })

  it('renders variant chips as radio buttons', () => {
    render(<QuickBuyPopup product={product} variants={variants} open />)
    expect(screen.getByRole('radiogroup', { name: 'Variant' })).toBeInTheDocument()
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(3)
  })

  it('selects first variant by default', () => {
    render(<QuickBuyPopup product={product} variants={variants} open />)
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'true')
    expect(radios[1]).toHaveAttribute('aria-checked', 'false')
  })

  it('allows selecting a different variant', async () => {
    const user = userEvent.setup()
    render(<QuickBuyPopup product={product} variants={variants} open />)
    await user.click(screen.getByText('Oq'))
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toHaveAttribute('aria-checked', 'false')
    expect(radios[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('renders "Savatga qo\'shish" button', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByText("Savatga qo'shish")).toBeInTheDocument()
  })

  it('calls onAddToCart with null variantId and quantity 1 when no variants', async () => {
    const onAddToCart = vi.fn()
    const user = userEvent.setup()
    render(<QuickBuyPopup product={product} onAddToCart={onAddToCart} open />)
    await user.click(screen.getByText("Savatga qo'shish"))
    expect(onAddToCart).toHaveBeenCalledWith(null, 1)
  })

  it('calls onAddToCart with selected variant id and quantity', async () => {
    const onAddToCart = vi.fn()
    const user = userEvent.setup()
    render(
      <QuickBuyPopup product={product} variants={variants} onAddToCart={onAddToCart} open />,
    )
    await user.click(screen.getByText('Oq'))
    await user.click(screen.getByText("Savatga qo'shish"))
    expect(onAddToCart).toHaveBeenCalledWith('v2', 1)
  })

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    const { container } = render(<QuickBuyPopup product={product} onClose={onClose} open />)
    const overlay = container.firstChild as HTMLElement
    await user.click(overlay)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not close when sheet content is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<QuickBuyPopup product={product} onClose={onClose} open />)
    await user.click(screen.getByText('Test Phone'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders "Miqdor" label', () => {
    render(<QuickBuyPopup product={product} open />)
    expect(screen.getByText('Miqdor')).toBeInTheDocument()
  })
})
