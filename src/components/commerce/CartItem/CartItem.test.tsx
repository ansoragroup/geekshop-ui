import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { CartItem } from './CartItem'

const baseProps = {
  image: '/test.jpg',
  title: 'Test Product',
  price: 150000,
  quantity: 2,
}

describe('CartItem', () => {
  afterEach(cleanup)

  it('renders the product image with correct src and alt', () => {
    render(<CartItem {...baseProps} />)
    const img = screen.getByAltText('Test Product')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })

  it('renders the product title', () => {
    render(<CartItem {...baseProps} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('renders the formatted price with so\'m', () => {
    render(<CartItem {...baseProps} />)
    expect(screen.getByText(/150.*000 so'm/)).toBeInTheDocument()
  })

  it('renders variant text when provided', () => {
    render(<CartItem {...baseProps} variant="Qora, XL" />)
    expect(screen.getByText('Qora, XL')).toBeInTheDocument()
  })

  it('does not render variant when not provided', () => {
    const { container } = render(<CartItem {...baseProps} />)
    const variantEls = container.querySelectorAll('[class*="variant"]')
    // All variant elements should be absent or empty
    variantEls.forEach((el) => {
      expect(el.textContent).toBeFalsy()
    })
  })

  it('renders checkbox with "Tanlash" label when not selected', () => {
    render(<CartItem {...baseProps} selected={false} />)
    expect(screen.getByLabelText('Tanlash')).toBeInTheDocument()
  })

  it('renders checkbox with "Bekor qilish" label when selected', () => {
    render(<CartItem {...baseProps} selected />)
    expect(screen.getByLabelText('Bekor qilish')).toBeInTheDocument()
  })

  it('calls onSelect with true when clicking unselected checkbox', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<CartItem {...baseProps} selected={false} onSelect={onSelect} />)
    await user.click(screen.getByLabelText('Tanlash'))
    expect(onSelect).toHaveBeenCalledWith(true)
  })

  it('calls onSelect with false when clicking selected checkbox', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<CartItem {...baseProps} selected onSelect={onSelect} />)
    await user.click(screen.getByLabelText('Bekor qilish'))
    expect(onSelect).toHaveBeenCalledWith(false)
  })

  it('renders delete button behind the swipe area', () => {
    render(<CartItem {...baseProps} />)
    expect(screen.getByText("O'chirish")).toBeInTheDocument()
  })

  it('calls onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn()
    const user = userEvent.setup()
    render(<CartItem {...baseProps} onDelete={onDelete} />)
    await user.click(screen.getByText("O'chirish"))
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('renders QuantityStepper with the correct value', () => {
    render(<CartItem {...baseProps} quantity={3} />)
    expect(screen.getByLabelText('Miqdor')).toHaveValue('3')
  })

  it('renders with default selected=false', () => {
    render(<CartItem {...baseProps} />)
    expect(screen.getByLabelText('Tanlash')).toBeInTheDocument()
  })
})
