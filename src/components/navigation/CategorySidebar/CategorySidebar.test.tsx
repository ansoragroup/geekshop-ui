import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CategorySidebar } from './CategorySidebar'
import type { CategoryItem } from './CategorySidebar'

const customItems: CategoryItem[] = [
  { key: 'gpu', label: 'Videokartalar', icon: <span>GPU</span> },
  { key: 'cpu', label: 'Protsessorlar', icon: <span>CPU</span> },
  { key: 'ram', label: 'Operativ xotira', icon: <span>RAM</span> },
]

describe('CategorySidebar', () => {
  it('renders a nav element with tablist role', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('has aria-orientation vertical', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders all category items as tabs', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} items={customItems} />)
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })

  it('renders category labels', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByText('Videokartalar')).toBeInTheDocument()
    expect(screen.getByText('Protsessorlar')).toBeInTheDocument()
    expect(screen.getByText('Operativ xotira')).toBeInTheDocument()
  })

  it('renders category icons', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByText('GPU')).toBeInTheDocument()
    expect(screen.getByText('CPU')).toBeInTheDocument()
  })

  it('marks the active category with aria-selected true', () => {
    render(<CategorySidebar activeKey="cpu" onChange={vi.fn()} items={customItems} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange with the category key when clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<CategorySidebar activeKey="gpu" onChange={onChange} items={customItems} />)
    await user.click(screen.getByText('Operativ xotira'))

    expect(onChange).toHaveBeenCalledWith('ram')
  })

  // Default items
  it('renders default GeekShop categories when no items prop is given', () => {
    render(<CategorySidebar activeKey="gpu" onChange={vi.fn()} />)
    expect(screen.getByText('Videokartalar')).toBeInTheDocument()
    expect(screen.getByText('Protsessorlar')).toBeInTheDocument()
    expect(screen.getByText('Monitorlar')).toBeInTheDocument()
    expect(screen.getByText('Noutbuklar')).toBeInTheDocument()
    expect(screen.getByText('Operativ xotira')).toBeInTheDocument()
    expect(screen.getByText('SSD/HDD')).toBeInTheDocument()
    expect(screen.getByText('Ona platalar')).toBeInTheDocument()
    expect(screen.getByText('Periferiya')).toBeInTheDocument()
  })
})
