import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { PaymentMethodCard } from './PaymentMethodCard'
import type { PaymentMethod } from './PaymentMethodCard'

const visaMethod: PaymentMethod = {
  id: 'pm1',
  type: 'visa',
  label: 'Visa karta',
  lastFour: '4242',
  expiryDate: '12/25',
  isDefault: false,
}

const cashMethod: PaymentMethod = {
  id: 'pm2',
  type: 'cash',
  label: 'Naqd pul',
}

describe('PaymentMethodCard', () => {
  afterEach(cleanup)

  it('renders payment method label', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    expect(screen.getByText('Visa karta')).toBeInTheDocument()
  })

  it('renders masked card number when lastFour provided', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    expect(screen.getByText('•••• 4242')).toBeInTheDocument()
  })

  it('does not render masked number when lastFour absent', () => {
    render(<PaymentMethodCard method={cashMethod} />)
    expect(screen.queryByText(/••••/)).not.toBeInTheDocument()
  })

  it('renders expiry date when provided', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    expect(screen.getByText('12/25')).toBeInTheDocument()
  })

  it('does not render expiry when absent', () => {
    render(<PaymentMethodCard method={cashMethod} />)
    expect(screen.queryByText(/\d{2}\/\d{2}/)).not.toBeInTheDocument()
  })

  it('renders "Asosiy" badge when isDefault', () => {
    const defaultMethod: PaymentMethod = { ...visaMethod, isDefault: true }
    render(<PaymentMethodCard method={defaultMethod} />)
    expect(screen.getByText('Asosiy')).toBeInTheDocument()
  })

  it('does not render "Asosiy" badge when not default', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    expect(screen.queryByText('Asosiy')).not.toBeInTheDocument()
  })

  it('renders payment icon SVG with correct type text', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    // The PaymentIcon renders a text element with "VISA"
    const svgText = screen.getByText('VISA')
    expect(svgText).toBeInTheDocument()
  })

  it('renders cash icon with "Naqd" text', () => {
    render(<PaymentMethodCard method={cashMethod} />)
    expect(screen.getByText('Naqd')).toBeInTheDocument()
  })

  it('renders as option with aria-selected when selectable', () => {
    render(<PaymentMethodCard method={visaMethod} selectable />)
    const option = screen.getByRole('option')
    expect(option).toBeInTheDocument()
    expect(option).toHaveAttribute('aria-selected', 'false')
  })

  it('sets aria-selected true when selected', () => {
    render(<PaymentMethodCard method={visaMethod} selectable selected />)
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  it('does not render role/aria when not selectable', () => {
    const { container } = render(<PaymentMethodCard method={visaMethod} />)
    expect(container.querySelector('[role="option"]')).not.toBeInTheDocument()
  })

  it('calls onSelect when clicked (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<PaymentMethodCard method={visaMethod} selectable onSelect={onSelect} />)
    await user.click(screen.getByRole('option'))
    expect(onSelect).toHaveBeenCalledWith(visaMethod)
  })

  it('calls onSelect on Enter key (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<PaymentMethodCard method={visaMethod} selectable onSelect={onSelect} />)
    screen.getByRole('option').focus()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith(visaMethod)
  })

  it('calls onSelect on Space key (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<PaymentMethodCard method={visaMethod} selectable onSelect={onSelect} />)
    screen.getByRole('option').focus()
    await user.keyboard(' ')
    expect(onSelect).toHaveBeenCalledWith(visaMethod)
  })

  it('renders delete button when onDelete provided', () => {
    render(<PaymentMethodCard method={visaMethod} onDelete={vi.fn()} />)
    expect(screen.getByLabelText("O'chirish")).toBeInTheDocument()
  })

  it('does not render delete button when onDelete not provided', () => {
    render(<PaymentMethodCard method={visaMethod} />)
    expect(screen.queryByLabelText("O'chirish")).not.toBeInTheDocument()
  })

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn()
    const user = userEvent.setup()
    render(<PaymentMethodCard method={visaMethod} onDelete={onDelete} />)
    await user.click(screen.getByLabelText("O'chirish"))
    expect(onDelete).toHaveBeenCalledWith(visaMethod)
  })

  it('delete button does not trigger onSelect', async () => {
    const onSelect = vi.fn()
    const onDelete = vi.fn()
    const user = userEvent.setup()
    render(
      <PaymentMethodCard method={visaMethod} selectable onSelect={onSelect} onDelete={onDelete} />,
    )
    await user.click(screen.getByLabelText("O'chirish"))
    expect(onDelete).toHaveBeenCalled()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<PaymentMethodCard method={visaMethod} className="my-class" />)
    expect(container.firstChild).toHaveClass('my-class')
  })

  it('applies selected class when selected', () => {
    const { container } = render(<PaymentMethodCard method={visaMethod} selectable selected />)
    expect((container.firstChild as HTMLElement).className).toMatch(/selected/)
  })

  it('has tabIndex 0 when selectable', () => {
    render(<PaymentMethodCard method={visaMethod} selectable />)
    expect(screen.getByRole('option')).toHaveAttribute('tabindex', '0')
  })

  it('does not have tabIndex when not selectable', () => {
    const { container } = render(<PaymentMethodCard method={visaMethod} />)
    expect(container.firstChild).not.toHaveAttribute('tabindex')
  })
})
