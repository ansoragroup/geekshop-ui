import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ProductCarousel } from './ProductCarousel'
import type { CarouselProduct, CarouselTab } from './ProductCarousel'

const products: CarouselProduct[] = [
  { image: '/img/p1.jpg', title: 'RTX 4090', price: 15000000 },
  { image: '/img/p2.jpg', title: 'RTX 4080', price: 12000000, originalPrice: 14000000 },
  { image: '/img/p3.jpg', title: 'RTX 4070', price: 9000000 },
]

const tabs: CarouselTab[] = [
  { key: 'new', label: 'Yangi' },
  { key: 'popular', label: 'Ommabop' },
]

describe('ProductCarousel', () => {
  it('renders the section title', () => {
    render(<ProductCarousel title="Tavsiya etilgan" products={products} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Tavsiya etilgan' })).toBeInTheDocument()
  })

  it('renders the "Barchasi" (see all) button', () => {
    render(<ProductCarousel title="Test" products={products} />)
    expect(screen.getByText('Barchasi')).toBeInTheDocument()
  })

  it('calls onSeeAll when see all button is clicked', async () => {
    const onSeeAll = vi.fn()
    const user = userEvent.setup()

    render(<ProductCarousel title="Test" products={products} onSeeAll={onSeeAll} />)
    await user.click(screen.getByText('Barchasi'))

    expect(onSeeAll).toHaveBeenCalledOnce()
  })

  // Products
  it('renders all product cards', () => {
    render(<ProductCarousel title="Test" products={products} />)
    expect(screen.getByText('RTX 4090')).toBeInTheDocument()
    expect(screen.getByText('RTX 4080')).toBeInTheDocument()
    expect(screen.getByText('RTX 4070')).toBeInTheDocument()
  })

  it('renders product images with correct alt text', () => {
    render(<ProductCarousel title="Test" products={products} />)
    const images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'RTX 4090')
    expect(images[1]).toHaveAttribute('alt', 'RTX 4080')
  })

  it('calls product onClick when a product card is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const productsWithClick = [{ ...products[0], onClick }]

    render(<ProductCarousel title="Test" products={productsWithClick} />)
    await user.click(screen.getByText('RTX 4090'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  // Tabs
  it('does not render tabs when tabs prop is not provided', () => {
    const { container } = render(<ProductCarousel title="Test" products={products} />)
    expect(container.querySelector('[class*="tabs"]')).toBeNull()
  })

  it('renders tab buttons when tabs are provided', () => {
    render(<ProductCarousel title="Test" products={products} tabs={tabs} />)
    expect(screen.getByText('Yangi')).toBeInTheDocument()
    expect(screen.getByText('Ommabop')).toBeInTheDocument()
  })

  it('calls onTabChange when a tab is clicked', async () => {
    const onTabChange = vi.fn()
    const user = userEvent.setup()

    render(
      <ProductCarousel title="Test" products={products} tabs={tabs} onTabChange={onTabChange} />,
    )
    await user.click(screen.getByText('Ommabop'))

    expect(onTabChange).toHaveBeenCalledWith('popular')
  })

  it('marks the first tab as active by default', () => {
    const { container } = render(
      <ProductCarousel title="Test" products={products} tabs={tabs} />,
    )
    const tabButtons = container.querySelectorAll('[class*="tab"]')
    const firstTab = Array.from(tabButtons).find((el) => el.textContent === 'Yangi')
    expect(firstTab?.className).toMatch(/tabActive/)
  })

  it('supports controlled activeTab', () => {
    const { container } = render(
      <ProductCarousel title="Test" products={products} tabs={tabs} activeTab="popular" />,
    )
    const tabButtons = container.querySelectorAll('button')
    const popularTab = Array.from(tabButtons).find((el) => el.textContent === 'Ommabop')
    expect(popularTab?.className).toMatch(/tabActive/)
  })

  // className
  it('applies custom className', () => {
    const { container } = render(
      <ProductCarousel title="Test" products={products} className="custom" />,
    )
    expect(container.firstElementChild?.className).toContain('custom')
  })
})
