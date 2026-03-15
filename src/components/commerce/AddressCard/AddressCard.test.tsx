import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { AddressCard } from './AddressCard'
import type { Address } from './AddressCard'

const address: Address = {
  id: 'addr1',
  name: 'Ali Valiyev',
  phone: '+998 90 123 45 67',
  street: 'Amir Temur 10',
  city: 'Toshkent',
  region: 'Toshkent viloyati',
  postalCode: '100000',
  isDefault: false,
  label: 'Uy',
}

describe('AddressCard', () => {
  afterEach(cleanup)

  it('renders name, phone, and street', () => {
    render(<AddressCard address={address} />)
    expect(screen.getByText('Ali Valiyev')).toBeInTheDocument()
    expect(screen.getByText('+998 90 123 45 67')).toBeInTheDocument()
    expect(screen.getByText('Amir Temur 10')).toBeInTheDocument()
  })

  it('renders city with region and postal code', () => {
    render(<AddressCard address={address} />)
    expect(screen.getByText('Toshkent, Toshkent viloyati, 100000')).toBeInTheDocument()
  })

  it('renders city only when region and postalCode are absent', () => {
    const simple: Address = { ...address, region: undefined, postalCode: undefined }
    render(<AddressCard address={simple} />)
    expect(screen.getByText('Toshkent')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<AddressCard address={address} />)
    expect(screen.getByText('Uy')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    const noLabel: Address = { ...address, label: undefined }
    render(<AddressCard address={noLabel} />)
    expect(screen.queryByText('Uy')).not.toBeInTheDocument()
  })

  it('renders "Asosiy" badge when isDefault', () => {
    const defaultAddr: Address = { ...address, isDefault: true }
    render(<AddressCard address={defaultAddr} />)
    expect(screen.getByText('Asosiy')).toBeInTheDocument()
  })

  it('does not render "Asosiy" badge when not default', () => {
    render(<AddressCard address={address} />)
    expect(screen.queryByText('Asosiy')).not.toBeInTheDocument()
  })

  it('renders as option with radio when selectable', () => {
    render(<AddressCard address={address} selectable />)
    const el = screen.getByRole('option')
    expect(el).toBeInTheDocument()
    expect(el).toHaveAttribute('aria-selected', 'false')
    expect(el).toHaveAttribute('tabindex', '0')
  })

  it('sets aria-selected true when selected', () => {
    render(<AddressCard address={address} selectable selected />)
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true')
  })

  it('does not render role/aria-selected when not selectable', () => {
    const { container } = render(<AddressCard address={address} />)
    expect(container.querySelector('[role="option"]')).not.toBeInTheDocument()
  })

  it('calls onSelect when clicked (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<AddressCard address={address} selectable onSelect={onSelect} />)
    await user.click(screen.getByRole('option'))
    expect(onSelect).toHaveBeenCalledWith(address)
  })

  it('calls onSelect on Enter key (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<AddressCard address={address} selectable onSelect={onSelect} />)
    screen.getByRole('option').focus()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenCalledWith(address)
  })

  it('calls onSelect on Space key (selectable)', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()
    render(<AddressCard address={address} selectable onSelect={onSelect} />)
    screen.getByRole('option').focus()
    await user.keyboard(' ')
    expect(onSelect).toHaveBeenCalledWith(address)
  })

  it('renders edit button when editable', () => {
    render(<AddressCard address={address} editable />)
    expect(screen.getByLabelText('Tahrirlash')).toBeInTheDocument()
  })

  it('renders delete button when deletable', () => {
    render(<AddressCard address={address} deletable />)
    expect(screen.getByLabelText("O'chirish")).toBeInTheDocument()
  })

  it('does not render edit/delete when not editable/deletable', () => {
    render(<AddressCard address={address} />)
    expect(screen.queryByLabelText('Tahrirlash')).not.toBeInTheDocument()
    expect(screen.queryByLabelText("O'chirish")).not.toBeInTheDocument()
  })

  it('calls onEdit when edit button clicked', async () => {
    const onEdit = vi.fn()
    const user = userEvent.setup()
    render(<AddressCard address={address} editable onEdit={onEdit} />)
    await user.click(screen.getByLabelText('Tahrirlash'))
    expect(onEdit).toHaveBeenCalledWith(address)
  })

  it('calls onDelete when delete button clicked', async () => {
    const onDelete = vi.fn()
    const user = userEvent.setup()
    render(<AddressCard address={address} deletable onDelete={onDelete} />)
    await user.click(screen.getByLabelText("O'chirish"))
    expect(onDelete).toHaveBeenCalledWith(address)
  })

  it('edit/delete buttons do not trigger onSelect', async () => {
    const onSelect = vi.fn()
    const onEdit = vi.fn()
    const user = userEvent.setup()
    render(
      <AddressCard address={address} selectable editable onSelect={onSelect} onEdit={onEdit} />,
    )
    await user.click(screen.getByLabelText('Tahrirlash'))
    expect(onEdit).toHaveBeenCalled()
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(<AddressCard address={address} className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('applies selected class when selected', () => {
    const { container } = render(<AddressCard address={address} selectable selected />)
    expect((container.firstChild as HTMLElement).className).toMatch(/selected/)
  })
})
