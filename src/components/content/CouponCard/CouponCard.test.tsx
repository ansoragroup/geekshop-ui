import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { CouponCard } from './CouponCard'

describe('CouponCard', () => {
  afterEach(cleanup)

  it('renders discount text', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />)
    expect(screen.getByText('-10%')).toBeInTheDocument()
  })

  it('renders coupon code', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />)
    expect(screen.getByText('SALE10')).toBeInTheDocument()
  })

  it('renders code label', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />)
    expect(screen.getByText('Kod:')).toBeInTheDocument()
  })

  it('renders expiry date', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />)
    expect(screen.getByText('Muddati: 2025-12-31')).toBeInTheDocument()
  })

  it('renders "Foydalanish" button', () => {
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" />)
    expect(screen.getByText('Foydalanish')).toBeInTheDocument()
  })

  it('calls onUse when "Foydalanish" button is clicked', async () => {
    const onUse = vi.fn()
    const user = userEvent.setup()
    render(<CouponCard discount="-10%" code="SALE10" expiryDate="2025-12-31" onUse={onUse} />)
    await user.click(screen.getByText('Foydalanish'))
    expect(onUse).toHaveBeenCalledOnce()
  })

  it('renders min amount when provided', () => {
    render(
      <CouponCard discount="-15%" code="MIN100" expiryDate="2025-06-30" minAmount={100000} />,
    )
    expect(screen.getByText(/100.*000 so'm dan/)).toBeInTheDocument()
  })

  it('does not render min amount when not provided', () => {
    render(<CouponCard discount="-15%" code="NO_MIN" expiryDate="2025-06-30" />)
    expect(screen.queryByText(/so'm dan/)).not.toBeInTheDocument()
  })

  it('applies custom background color to left part', () => {
    const { container } = render(
      <CouponCard discount="-20%" code="COLOR" expiryDate="2025-12-31" color="#00FF00" />,
    )
    const leftPart = container.querySelector('[class*="leftPart"]') as HTMLElement
    expect(leftPart.style.getPropertyValue('--gs-coupon-bg')).toBe('#00FF00')
  })

  it('applies default color #FF5000 to left part', () => {
    const { container } = render(
      <CouponCard discount="-20%" code="DEFAULT" expiryDate="2025-12-31" />,
    )
    const leftPart = container.querySelector('[class*="leftPart"]') as HTMLElement
    expect(leftPart.style.getPropertyValue('--gs-coupon-bg')).toBe('#FF5000')
  })

  it('renders large discount values', () => {
    render(<CouponCard discount="50 000" code="BIG" expiryDate="2025-12-31" />)
    expect(screen.getByText('50 000')).toBeInTheDocument()
  })
})
