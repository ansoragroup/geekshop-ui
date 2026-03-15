import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { FilterPanel } from './FilterPanel'
import type { FilterGroup } from './FilterPanel'

const checkboxGroup: FilterGroup = {
  key: 'brand',
  title: 'Brend',
  type: 'checkbox',
  options: [
    { value: 'nvidia', label: 'NVIDIA', count: 42 },
    { value: 'amd', label: 'AMD', count: 18 },
    { value: 'intel', label: 'Intel' },
  ],
}

const priceGroup: FilterGroup = {
  key: 'price',
  title: 'Narx',
  type: 'priceRange',
}

describe('FilterPanel', () => {
  it('renders when visible is true (default)', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('Filtr')).toBeInTheDocument()
  })

  it('does not render when visible is false', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} visible={false} />)
    expect(screen.queryByText('Filtr')).not.toBeInTheDocument()
  })

  it('renders the header title', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('Filtr')).toBeInTheDocument()
  })

  it('renders the close button with aria-label', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByLabelText('Yopish')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<FilterPanel filterGroups={[checkboxGroup]} onClose={onClose} />)
    await user.click(screen.getByLabelText('Yopish'))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when overlay is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    const { container: _c } = render(<FilterPanel filterGroups={[checkboxGroup]} onClose={onClose} />)
    const overlay = container.firstElementChild!
    await user.click(overlay)

    expect(onClose).toHaveBeenCalled()
  })

  // Checkbox group
  it('renders checkbox group title', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('Brend')).toBeInTheDocument()
  })

  it('renders checkbox options', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('NVIDIA')).toBeInTheDocument()
    expect(screen.getByText('AMD')).toBeInTheDocument()
    expect(screen.getByText('Intel')).toBeInTheDocument()
  })

  it('renders option count when provided', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('(42)')).toBeInTheDocument()
    expect(screen.getByText('(18)')).toBeInTheDocument()
  })

  it('toggles checkbox on click', async () => {
    const user = userEvent.setup()
    const { container: _c } = render(<FilterPanel filterGroups={[checkboxGroup]} />)

    await user.click(screen.getByText('NVIDIA'))

    // Should add "checked" class
    const nvidiaBtn = screen.getByText('NVIDIA').closest('button')
    expect(nvidiaBtn?.className).toMatch(/checked/)
  })

  it('untogles checkbox on second click', async () => {
    const user = userEvent.setup()
    render(<FilterPanel filterGroups={[checkboxGroup]} />)

    const nvidiaBtn = screen.getByText('NVIDIA').closest('button')!
    await user.click(nvidiaBtn)
    await user.click(nvidiaBtn)

    expect(nvidiaBtn.className).not.toMatch(/checked/)
  })

  // Price range group
  it('renders price range inputs', () => {
    render(<FilterPanel filterGroups={[priceGroup]} />)
    expect(screen.getByPlaceholderText('Minimal')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Maksimal')).toBeInTheDocument()
  })

  it('renders currency labels', () => {
    render(<FilterPanel filterGroups={[priceGroup]} />)
    const currencyLabels = screen.getAllByText("so'm")
    expect(currencyLabels).toHaveLength(2)
  })

  it('allows typing in price range inputs', async () => {
    const user = userEvent.setup()
    render(<FilterPanel filterGroups={[priceGroup]} />)

    const minInput = screen.getByPlaceholderText('Minimal')
    await user.type(minInput, '100000')
    expect(minInput).toHaveValue('100000')

    const maxInput = screen.getByPlaceholderText('Maksimal')
    await user.type(maxInput, '500000')
    expect(maxInput).toHaveValue('500000')
  })

  // Apply / Reset
  it('renders apply and reset buttons', () => {
    render(<FilterPanel filterGroups={[checkboxGroup]} />)
    expect(screen.getByText('Tozalash')).toBeInTheDocument()
    expect(screen.getByText("Ko'rsatish")).toBeInTheDocument()
  })

  it('calls onApply with current filter values when apply button is clicked', async () => {
    const onApply = vi.fn()
    const user = userEvent.setup()

    render(<FilterPanel filterGroups={[checkboxGroup]} onApply={onApply} />)

    // Select a checkbox
    await user.click(screen.getByText('AMD'))

    // Click apply
    await user.click(screen.getByText("Ko'rsatish"))

    expect(onApply).toHaveBeenCalledWith({ brand: ['amd'] })
  })

  it('calls onReset and clears values when reset button is clicked', async () => {
    const onReset = vi.fn()
    const onApply = vi.fn()
    const user = userEvent.setup()

    render(<FilterPanel filterGroups={[checkboxGroup]} onReset={onReset} onApply={onApply} />)

    // Select a checkbox
    await user.click(screen.getByText('AMD'))

    // Click reset
    await user.click(screen.getByText('Tozalash'))

    expect(onReset).toHaveBeenCalledOnce()

    // Click apply to verify values are cleared
    await user.click(screen.getByText("Ko'rsatish"))
    expect(onApply).toHaveBeenCalledWith({})
  })

  // Pre-filled values
  it('renders with pre-filled checkbox values', () => {
    const { container: _c } = render(
      <FilterPanel
        filterGroups={[checkboxGroup]}
        values={{ brand: ['nvidia'] }}
      />,
    )
    const nvidiaBtn = screen.getByText('NVIDIA').closest('button')
    expect(nvidiaBtn?.className).toMatch(/checked/)
  })
})
