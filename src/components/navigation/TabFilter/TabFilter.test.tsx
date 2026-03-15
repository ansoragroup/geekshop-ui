import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TabFilter } from './TabFilter'
import type { TabFilterItem } from './TabFilter'

const tabs: TabFilterItem[] = [
  { key: 'all', label: 'Barchasi' },
  { key: 'popular', label: 'Ommabop', badge: 12 },
  { key: 'new', label: 'Yangi', badge: 0 },
  { key: 'sale', label: 'Chegirmalar', badge: 150 },
]

describe('TabFilter', () => {
  it('renders a tablist', () => {
    render(<TabFilter tabs={tabs} activeTab="all" />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders all tab buttons', () => {
    render(<TabFilter tabs={tabs} activeTab="all" />)
    const tabButtons = screen.getAllByRole('tab')
    expect(tabButtons).toHaveLength(4)
  })

  it('renders tab labels', () => {
    render(<TabFilter tabs={tabs} activeTab="all" />)
    expect(screen.getByText('Barchasi')).toBeInTheDocument()
    expect(screen.getByText('Ommabop')).toBeInTheDocument()
    expect(screen.getByText('Yangi')).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected true', () => {
    render(<TabFilter tabs={tabs} activeTab="popular" />)
    const tabButtons = screen.getAllByRole('tab')
    expect(tabButtons[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabButtons[1]).toHaveAttribute('aria-selected', 'true')
  })

  it('calls onChange with the tab key when clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<TabFilter tabs={tabs} activeTab="all" onChange={onChange} />)
    await user.click(screen.getByText('Ommabop'))

    expect(onChange).toHaveBeenCalledWith('popular')
  })

  // Variants
  it('applies pill variant class by default', () => {
    const { container } = render(<TabFilter tabs={tabs} activeTab="all" />)
    expect(container.firstElementChild?.className).toMatch(/pill/)
  })

  it('applies underline variant class', () => {
    const { container } = render(<TabFilter tabs={tabs} activeTab="all" variant="underline" />)
    expect(container.firstElementChild?.className).toMatch(/underline/)
  })

  // Badge
  it('renders badge count when badge > 0', () => {
    render(<TabFilter tabs={tabs} activeTab="all" />)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('does not render badge when badge is 0', () => {
    render(<TabFilter tabs={[{ key: 'x', label: 'X', badge: 0 }]} activeTab="x" />)
    const tab = screen.getByRole('tab')
    expect(tab.textContent).toBe('X')
  })

  it('renders 99+ when badge exceeds 99', () => {
    render(<TabFilter tabs={tabs} activeTab="all" />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  // Underline indicator
  it('renders underline span for active tab in underline variant', () => {
    const { container } = render(
      <TabFilter tabs={[{ key: 'a', label: 'A' }]} activeTab="a" variant="underline" />,
    )
    expect(container.querySelector('[class*="underline"]')).toBeInTheDocument()
  })
})
