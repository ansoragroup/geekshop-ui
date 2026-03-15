import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import PromoBanner from './PromoBanner'
import type { PromoBannerItem } from './PromoBanner'

const items: PromoBannerItem[] = [
  {
    title: 'Flash Sale',
    subtitle: 'Up to 50% off',
    tag: '-50%',
    gradient: 'linear-gradient(135deg, #FF5000, #FF7A33)',
  },
  {
    title: 'New Arrivals',
    gradient: 'linear-gradient(135deg, #0066FF, #33AAFF)',
  },
]

describe('PromoBanner', () => {
  afterEach(cleanup)

  it('renders all items', () => {
    render(<PromoBanner items={items} />)
    expect(screen.getByText('Flash Sale')).toBeInTheDocument()
    expect(screen.getByText('New Arrivals')).toBeInTheDocument()
  })

  it('renders titles as h3 elements', () => {
    render(<PromoBanner items={items} />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(2)
    expect(headings[0]).toHaveTextContent('Flash Sale')
    expect(headings[1]).toHaveTextContent('New Arrivals')
  })

  it('renders subtitle when provided', () => {
    render(<PromoBanner items={items} />)
    expect(screen.getByText('Up to 50% off')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<PromoBanner items={[items[1]]} />)
    expect(screen.queryByText('Up to 50% off')).not.toBeInTheDocument()
  })

  it('renders tag when provided', () => {
    render(<PromoBanner items={items} />)
    expect(screen.getByText('-50%')).toBeInTheDocument()
  })

  it('does not render tag when not provided', () => {
    render(<PromoBanner items={[items[1]]} />)
    const tags = screen.queryByText('-50%')
    expect(tags).not.toBeInTheDocument()
  })

  it('applies gradient background to each card', () => {
    const { container } = render(<PromoBanner items={items} />)
    // Get direct children of the promo banner wrapper (the card divs)
    const wrapper = container.firstChild as HTMLElement
    const cards = wrapper.children
    expect(cards).toHaveLength(2)
    // jsdom converts hex to rgb in computed styles, so check via getAttribute
    expect(cards[0].getAttribute('style')).toContain('linear-gradient')
    expect(cards[1].getAttribute('style')).toContain('linear-gradient')
  })

  it('renders icon when provided', () => {
    const itemsWithIcon: PromoBannerItem[] = [
      {
        title: 'With Icon',
        gradient: 'linear-gradient(0deg, #000, #FFF)',
        icon: <svg data-testid="promo-icon" />,
      },
    ]
    render(<PromoBanner items={itemsWithIcon} />)
    expect(screen.getByTestId('promo-icon')).toBeInTheDocument()
  })

  it('does not render icon area when icon not provided', () => {
    const { container } = render(<PromoBanner items={[items[0]]} />)
    expect(container.querySelector('[class*="iconArea"]')).not.toBeInTheDocument()
  })

  it('has role="button" on items with onClick', () => {
    const clickableItems: PromoBannerItem[] = [
      { ...items[0], onClick: vi.fn() },
    ]
    render(<PromoBanner items={clickableItems} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not have role="button" on items without onClick', () => {
    render(<PromoBanner items={[items[1]]} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has tabIndex=0 on clickable items', () => {
    const clickableItems: PromoBannerItem[] = [
      { ...items[0], onClick: vi.fn() },
    ]
    render(<PromoBanner items={clickableItems} />)
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('calls onClick when a clickable item is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const clickableItems: PromoBannerItem[] = [
      { ...items[0], onClick },
    ]
    render(<PromoBanner items={clickableItems} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders empty when items array is empty', () => {
    const { container } = render(<PromoBanner items={[]} />)
    const bannerDiv = container.querySelector('[class*="promoBanner"]')
    expect(bannerDiv).toBeInTheDocument()
    expect(bannerDiv?.children).toHaveLength(0)
  })
})
