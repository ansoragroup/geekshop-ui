import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { QuantityStepper } from './QuantityStepper'

describe('QuantityStepper', () => {
  afterEach(cleanup)

  it('renders decrement button, input, and increment button', () => {
    render(<QuantityStepper value={3} />)
    expect(screen.getByLabelText('Kamaytirish')).toBeInTheDocument()
    expect(screen.getByLabelText('Miqdor')).toBeInTheDocument()
    expect(screen.getByLabelText("Ko'paytirish")).toBeInTheDocument()
  })

  it('displays the current value in the input', () => {
    render(<QuantityStepper value={5} />)
    expect(screen.getByLabelText('Miqdor')).toHaveValue('5')
  })

  it('calls onChange with decremented value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={5} onChange={onChange} />)
    await user.click(screen.getByLabelText('Kamaytirish'))
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('calls onChange with incremented value', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={5} onChange={onChange} />)
    await user.click(screen.getByLabelText("Ko'paytirish"))
    expect(onChange).toHaveBeenCalledWith(6)
  })

  it('disables decrement button at min value', () => {
    render(<QuantityStepper value={1} min={1} />)
    expect(screen.getByLabelText('Kamaytirish')).toBeDisabled()
  })

  it('disables increment button at max value', () => {
    render(<QuantityStepper value={99} max={99} />)
    expect(screen.getByLabelText("Ko'paytirish")).toBeDisabled()
  })

  it('does not call onChange when decrementing at min', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={1} min={1} onChange={onChange} />)
    await user.click(screen.getByLabelText('Kamaytirish'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not call onChange when incrementing at max', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={10} max={10} onChange={onChange} />)
    await user.click(screen.getByLabelText("Ko'paytirish"))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('disables all controls when disabled', () => {
    render(<QuantityStepper value={5} disabled />)
    expect(screen.getByLabelText('Kamaytirish')).toBeDisabled()
    expect(screen.getByLabelText("Ko'paytirish")).toBeDisabled()
    expect(screen.getByLabelText('Miqdor')).toBeDisabled()
  })

  it('clamps input value on blur when below min', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={5} min={1} max={99} onChange={onChange} />)
    const input = screen.getByLabelText('Miqdor')
    await user.clear(input)
    await user.type(input, '0')
    await user.tab() // triggers blur
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('clamps input value on blur when above max', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<QuantityStepper value={5} min={1} max={10} onChange={onChange} />)
    const input = screen.getByLabelText('Miqdor')
    await user.clear(input)
    await user.type(input, '50')
    await user.tab()
    expect(onChange).toHaveBeenCalledWith(10)
  })

  it('strips non-numeric characters from input', async () => {
    const user = userEvent.setup()
    render(<QuantityStepper value={5} />)
    const input = screen.getByLabelText('Miqdor')
    await user.clear(input)
    await user.type(input, 'abc3')
    expect(input).toHaveValue('3')
  })

  it('applies size class for sm', () => {
    const { container } = render(<QuantityStepper value={1} size="sm" />)
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/)
  })

  it('applies size class for md', () => {
    const { container } = render(<QuantityStepper value={1} size="md" />)
    expect((container.firstChild as HTMLElement).className).toMatch(/md/)
  })

  it('applies disabled class when disabled', () => {
    const { container } = render(<QuantityStepper value={1} disabled />)
    expect((container.firstChild as HTMLElement).className).toMatch(/disabled/)
  })
})
