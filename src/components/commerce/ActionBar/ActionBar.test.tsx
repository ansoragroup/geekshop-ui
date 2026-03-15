import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { ActionBar } from './ActionBar'

describe('ActionBar', () => {
  afterEach(cleanup)

  it('renders all five buttons', () => {
    render(<ActionBar />)
    expect(screen.getByLabelText('Aloqa')).toBeInTheDocument()
    expect(screen.getByLabelText('Savat')).toBeInTheDocument()
    expect(screen.getByText('Savatga')).toBeInTheDocument()
    expect(screen.getByText('Sotib olish')).toBeInTheDocument()
  })

  it('renders favorite button with "add" label when not favorite', () => {
    render(<ActionBar isFavorite={false} />)
    expect(screen.getByLabelText("Sevimlilarga qo'shish")).toBeInTheDocument()
  })

  it('renders favorite button with "remove" label when favorite', () => {
    render(<ActionBar isFavorite />)
    expect(screen.getByLabelText("Sevimlilardan o'chirish")).toBeInTheDocument()
  })

  it('does not show badge when cartCount is 0', () => {
    render(<ActionBar cartCount={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('shows badge with cart count when > 0', () => {
    render(<ActionBar cartCount={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('shows 99+ when cartCount exceeds 99', () => {
    render(<ActionBar cartCount={150} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('shows exact count at 99', () => {
    render(<ActionBar cartCount={99} />)
    expect(screen.getByText('99')).toBeInTheDocument()
  })

  it('calls onChat when chat button clicked', async () => {
    const onChat = vi.fn()
    const user = userEvent.setup()
    render(<ActionBar onChat={onChat} />)
    await user.click(screen.getByLabelText('Aloqa'))
    expect(onChat).toHaveBeenCalledOnce()
  })

  it('calls onCart when cart button clicked', async () => {
    const onCart = vi.fn()
    const user = userEvent.setup()
    render(<ActionBar onCart={onCart} />)
    await user.click(screen.getByLabelText('Savat'))
    expect(onCart).toHaveBeenCalledOnce()
  })

  it('calls onFavorite when favorite button clicked', async () => {
    const onFavorite = vi.fn()
    const user = userEvent.setup()
    render(<ActionBar onFavorite={onFavorite} />)
    await user.click(screen.getByLabelText("Sevimlilarga qo'shish"))
    expect(onFavorite).toHaveBeenCalledOnce()
  })

  it('calls onAddToCart when "Savatga" button clicked', async () => {
    const onAddToCart = vi.fn()
    const user = userEvent.setup()
    render(<ActionBar onAddToCart={onAddToCart} />)
    await user.click(screen.getByText('Savatga'))
    expect(onAddToCart).toHaveBeenCalledOnce()
  })

  it('calls onBuyNow when "Sotib olish" button clicked', async () => {
    const onBuyNow = vi.fn()
    const user = userEvent.setup()
    render(<ActionBar onBuyNow={onBuyNow} />)
    await user.click(screen.getByText('Sotib olish'))
    expect(onBuyNow).toHaveBeenCalledOnce()
  })

  it('fills heart SVG red when isFavorite is true', () => {
    const { container } = render(<ActionBar isFavorite />)
    const heartPath = container.querySelector(
      'button[aria-label="Sevimlilardan o\'chirish"] svg path',
    )
    expect(heartPath).toHaveAttribute('fill', '#FF0000')
  })

  it('does not fill heart when isFavorite is false', () => {
    const { container } = render(<ActionBar isFavorite={false} />)
    const heartPath = container.querySelector(
      'button[aria-label="Sevimlilarga qo\'shish"] svg path',
    )
    expect(heartPath).toHaveAttribute('fill', 'none')
  })

  it('renders icon labels for Aloqa, Savat, Sevimli', () => {
    render(<ActionBar />)
    expect(screen.getByText('Aloqa')).toBeInTheDocument()
    expect(screen.getByText('Savat')).toBeInTheDocument()
    expect(screen.getByText('Sevimli')).toBeInTheDocument()
  })
})
