import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { FilterBar } from './FilterBar'
import type { FilterBarItem } from './FilterBar'

const filters: FilterBarItem[] = [
  { key: 'popular', label: 'Ommabop' },
  { key: 'price', label: 'Narx', hasDropdown: true },
  { key: 'new', label: 'Yangi' },
]

describe('FilterBar', () => {
  it('renders a tablist', () => {
    render(<FilterBar filters={filters} activeFilter="popular" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders all filter buttons', () => {
    render(<FilterBar filters={filters} activeFilter="popular" />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('renders filter labels', () => {
    render(<FilterBar filters={filters} activeFilter="popular" />)
    expect(screen.getByText('Ommabop')).toBeInTheDocument()
    expect(screen.getByText('Narx')).toBeInTheDocument()
    expect(screen.getByText('Yangi')).toBeInTheDocument()
  })

  it('marks the active filter with aria-selected true', () => {
    render(<FilterBar filters={filters} activeFilter="price" />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onFilterChange with the filter key when clicked', async () => {
    const onFilterChange = vi.fn()
    const user = userEvent.setup()

    render(<FilterBar filters={filters} activeFilter="popular" onFilterChange={onFilterChange} />)
    await user.click(screen.getByText('Narx'))

    expect(onFilterChange).toHaveBeenCalledWith('price')
  })

  it('renders dropdown arrow icon for items with hasDropdown', () => {
    const { container } = render(<FilterBar filters={filters} activeFilter="popular" />)
    const arrows = container.querySelectorAll('svg')
    // Only the "price" filter has a dropdown arrow
    expect(arrows.length).toBe(1)
  })

  it('renders indicator for the active filter', () => {
    const { container } = render(<FilterBar filters={filters} activeFilter="popular" />)
    expect(container.querySelector('[class*="indicator"]')).toBeInTheDocument()
  })
})
