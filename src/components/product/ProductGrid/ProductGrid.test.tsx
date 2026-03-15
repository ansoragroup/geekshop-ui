import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ProductGrid } from './ProductGrid'
import type { ProductCardFlatProps } from '../ProductCard'

const products: ProductCardFlatProps[] = [
  { image: '/img/1.jpg', title: 'Product A', price: 1000000 },
  { image: '/img/2.jpg', title: 'Product B', price: 2000000 },
  { image: '/img/3.jpg', title: 'Product C', price: 3000000 },
  { image: '/img/4.jpg', title: 'Product D', price: 4000000 },
]

describe('ProductGrid', () => {
  // Default grid layout
  it('renders all product cards in grid layout', () => {
    render(<ProductGrid products={products} />)
    expect(screen.getByText('Product A')).toBeInTheDocument()
    expect(screen.getByText('Product B')).toBeInTheDocument()
    expect(screen.getByText('Product C')).toBeInTheDocument()
    expect(screen.getByText('Product D')).toBeInTheDocument()
  })

  it('renders with 2 columns by default', () => {
    const { container } = render(<ProductGrid products={products} />)
    const grid = container.firstElementChild as HTMLElement
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, 1fr)')
  })

  it('renders with custom columns', () => {
    const { container } = render(<ProductGrid products={products} columns={3} />)
    const grid = container.firstElementChild as HTMLElement
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)')
  })

  it('applies custom gap', () => {
    const { container } = render(<ProductGrid products={products} gap={16} />)
    const grid = container.firstElementChild as HTMLElement
    expect(grid.style.gap).toBe('16px')
  })

  it('applies default gap of 8px', () => {
    const { container } = render(<ProductGrid products={products} />)
    const grid = container.firstElementChild as HTMLElement
    expect(grid.style.gap).toBe('8px')
  })

  it('applies custom className', () => {
    const { container } = render(<ProductGrid products={products} className="my-grid" />)
    expect(container.firstElementChild?.className).toContain('my-grid')
  })

  it('calls onProductClick with the product index when a card is clicked', async () => {
    const onProductClick = vi.fn()
    const user = userEvent.setup()

    render(<ProductGrid products={products} onProductClick={onProductClick} />)
    await user.click(screen.getByText('Product B'))

    expect(onProductClick).toHaveBeenCalledWith(1)
  })

  it('calls product onClick and onProductClick together', async () => {
    const productOnClick = vi.fn()
    const onProductClick = vi.fn()
    const user = userEvent.setup()

    const productsWithClick: ProductCardFlatProps[] = [
      { image: '/img/1.jpg', title: 'Clickable', price: 1000, onClick: productOnClick },
    ]
    render(<ProductGrid products={productsWithClick} onProductClick={onProductClick} />)
    await user.click(screen.getByText('Clickable'))

    expect(productOnClick).toHaveBeenCalledOnce()
    expect(onProductClick).toHaveBeenCalledWith(0)
  })

  // Waterfall layout
  it('renders in waterfall layout', () => {
    const { container } = render(<ProductGrid products={products} layout="waterfall" />)
    expect(container.querySelector('[class*="waterfall"]')).toBeInTheDocument()
  })

  it('distributes products into columns in waterfall layout', () => {
    const { container } = render(
      <ProductGrid products={products} layout="waterfall" columns={2} />,
    )
    const columns = container.querySelectorAll('[class*="waterfallColumn"]')
    expect(columns).toHaveLength(2)
  })

  it('calls onProductClick with the correct original index in waterfall layout', async () => {
    const onProductClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ProductGrid products={products} layout="waterfall" columns={2} onProductClick={onProductClick} />,
    )
    // Product C is at original index 2, placed in column 0 (index 2 % 2 = 0)
    await user.click(screen.getByText('Product C'))

    expect(onProductClick).toHaveBeenCalledWith(2)
  })

  it('applies gap in waterfall layout', () => {
    const { container } = render(
      <ProductGrid products={products} layout="waterfall" gap={12} />,
    )
    const waterfall = container.firstElementChild as HTMLElement
    expect(waterfall.style.gap).toBe('12px')
  })
})
