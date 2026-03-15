import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SearchSuggestions } from './SearchSuggestions'
import type { SearchSuggestion } from './SearchSuggestions'

const suggestions: SearchSuggestion[] = [
  { id: '1', text: 'RTX 4090 videokarta' },
  { id: '2', text: 'RTX 4080 Super' },
  { id: '3', text: 'RTX 3060 Ti' },
]

describe('SearchSuggestions', () => {
  it('renders nothing when suggestions array is empty', () => {
    const { container } = render(<SearchSuggestions query="test" suggestions={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a listbox', () => {
    render(<SearchSuggestions query="RTX" suggestions={suggestions} />)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('renders all suggestion options', () => {
    render(<SearchSuggestions query="RTX" suggestions={suggestions} />)
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('renders suggestion text', () => {
    render(<SearchSuggestions query="" suggestions={suggestions} />)
    expect(screen.getByText('RTX 4090 videokarta')).toBeInTheDocument()
    expect(screen.getByText('RTX 4080 Super')).toBeInTheDocument()
    expect(screen.getByText('RTX 3060 Ti')).toBeInTheDocument()
  })

  it('sets aria-selected to false on all options', () => {
    render(<SearchSuggestions query="" suggestions={suggestions} />)
    screen.getAllByRole('option').forEach((option) => {
      expect(option).toHaveAttribute('aria-selected', 'false')
    })
  })

  it('calls onSelect with the suggestion when clicked', async () => {
    const onSelect = vi.fn()
    const user = userEvent.setup()

    render(<SearchSuggestions query="" suggestions={suggestions} onSelect={onSelect} />)
    await user.click(screen.getByText('RTX 4080 Super'))

    expect(onSelect).toHaveBeenCalledWith({ id: '2', text: 'RTX 4080 Super' })
  })

  // Highlight matching
  it('highlights the matching query portion in suggestion text', () => {
    const { container } = render(
      <SearchSuggestions
        query="RTX"
        suggestions={[{ id: '1', text: 'RTX 4090' }]}
      />,
    )
    const highlight = container.querySelector('[class*="highlight"]')
    expect(highlight).toBeInTheDocument()
    expect(highlight?.textContent).toBe('RTX')
  })

  it('highlights case-insensitively', () => {
    const { container } = render(
      <SearchSuggestions
        query="rtx"
        suggestions={[{ id: '1', text: 'RTX 4090' }]}
      />,
    )
    const highlight = container.querySelector('[class*="highlight"]')
    expect(highlight).toBeInTheDocument()
    expect(highlight?.textContent).toBe('RTX')
  })

  it('does not highlight when query is empty', () => {
    const { container } = render(
      <SearchSuggestions
        query=""
        suggestions={[{ id: '1', text: 'RTX 4090' }]}
      />,
    )
    const highlight = container.querySelector('[class*="highlight"]')
    expect(highlight).not.toBeInTheDocument()
  })

  it('does not highlight when query does not match', () => {
    const { container } = render(
      <SearchSuggestions
        query="AMD"
        suggestions={[{ id: '1', text: 'RTX 4090' }]}
      />,
    )
    const highlight = container.querySelector('[class*="highlight"]')
    expect(highlight).not.toBeInTheDocument()
  })
})
