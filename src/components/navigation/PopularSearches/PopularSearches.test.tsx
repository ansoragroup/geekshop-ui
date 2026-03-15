import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { PopularSearches } from './PopularSearches'
import type { PopularSearch } from './PopularSearches'

const searches: PopularSearch[] = [
  { rank: 1, text: 'RTX 4090' },
  { rank: 2, text: 'iPhone 15' },
  { rank: 3, text: 'MacBook Pro' },
  { rank: 4, text: 'Samsung S24' },
  { rank: 5, text: 'AirPods Pro' },
]

describe('PopularSearches', () => {
  it('renders nothing when searches array is empty', () => {
    const { container } = render(<PopularSearches searches={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the default title', () => {
    render(<PopularSearches searches={searches} />)
    expect(screen.getByText('Ommabop qidiruvlar')).toBeInTheDocument()
  })

  it('renders a custom title', () => {
    render(<PopularSearches searches={searches} title="Trendlar" />)
    expect(screen.getByText('Trendlar')).toBeInTheDocument()
  })

  it('renders all search tags', () => {
    render(<PopularSearches searches={searches} />)
    expect(screen.getByText('RTX 4090')).toBeInTheDocument()
    expect(screen.getByText('iPhone 15')).toBeInTheDocument()
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument()
    expect(screen.getByText('Samsung S24')).toBeInTheDocument()
    expect(screen.getByText('AirPods Pro')).toBeInTheDocument()
  })

  it('renders rank numbers with # prefix', () => {
    render(<PopularSearches searches={searches} />)
    expect(screen.getByText('#1')).toBeInTheDocument()
    expect(screen.getByText('#2')).toBeInTheDocument()
    expect(screen.getByText('#5')).toBeInTheDocument()
  })

  it('applies top class to ranks 1-3', () => {
    const { container } = render(<PopularSearches searches={searches} />)
    const buttons = container.querySelectorAll('button')
    // First 3 should have "top" class
    expect(buttons[0].className).toMatch(/top/)
    expect(buttons[1].className).toMatch(/top/)
    expect(buttons[2].className).toMatch(/top/)
    // 4th and 5th should not
    expect(buttons[3].className).not.toMatch(/top/)
    expect(buttons[4].className).not.toMatch(/top/)
  })

  it('calls onSelect with the search object when a tag is clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()

    render(<PopularSearches searches={searches} onSelect={onSelect} />)
    await user.click(screen.getByText('iPhone 15'))

    expect(onSelect).toHaveBeenCalledWith({ rank: 2, text: 'iPhone 15' })
  })

  it('does not throw when onSelect is not provided and a tag is clicked', async () => {
    const user = userEvent.setup()
    render(<PopularSearches searches={searches} />)
    await user.click(screen.getByText('RTX 4090'))
    // No error thrown
  })
})
