import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TabBar } from './TabBar'
import type { TabBarItem } from './TabBar'

const customItems: TabBarItem[] = [
  { key: 'home', label: 'Home', icon: <span>H</span>, activeIcon: <span>H-active</span> },
  { key: 'search', label: 'Search', icon: <span>S</span>, activeIcon: <span>S-active</span> },
  { key: 'cart', label: 'Cart', icon: <span>C</span>, activeIcon: <span>C-active</span>, badge: 5 },
]

describe('TabBar', () => {
  it('renders a nav with tablist role', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('renders all tab items', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} items={customItems} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
  })

  it('renders tab labels', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('marks the active tab with aria-selected true', () => {
    render(<TabBar activeKey="search" onChange={vi.fn()} items={customItems} />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[2]).toHaveAttribute('aria-selected', 'false')
  })

  it('renders active icon for active tab and regular icon for others', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByText('H-active')).toBeInTheDocument()
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('calls onChange with the tab key when clicked', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<TabBar activeKey="home" onChange={onChange} items={customItems} />)
    await user.click(screen.getByText('Search'))

    expect(onChange).toHaveBeenCalledWith('search')
  })

  // Badge
  it('renders badge when badge count is > 0', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} items={customItems} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('does not render badge when badge is 0', () => {
    const items: TabBarItem[] = [
      { key: 'cart', label: 'Cart', icon: <span>C</span>, activeIcon: <span>CA</span>, badge: 0 },
    ]
    render(<TabBar activeKey="cart" onChange={vi.fn()} items={items} />)
    // Badge should not appear for 0
    const tab = screen.getByRole('tab')
    expect(tab.textContent).not.toMatch(/^0$/)
  })

  it('renders 99+ when badge exceeds 99', () => {
    const items: TabBarItem[] = [
      { key: 'cart', label: 'Cart', icon: <span>C</span>, activeIcon: <span>CA</span>, badge: 150 },
    ]
    render(<TabBar activeKey="cart" onChange={vi.fn()} items={items} />)
    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  // Default items
  it('renders default GeekShop items when no items prop is provided', () => {
    render(<TabBar activeKey="home" onChange={vi.fn()} />)
    expect(screen.getByText('Bosh sahifa')).toBeInTheDocument()
    expect(screen.getByText('Kategoriyalar')).toBeInTheDocument()
    expect(screen.getByText('Savat')).toBeInTheDocument()
    expect(screen.getByText('Profil')).toBeInTheDocument()
  })
})
