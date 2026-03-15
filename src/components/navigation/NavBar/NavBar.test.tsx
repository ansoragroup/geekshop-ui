import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  it('renders as a header element', () => {
    render(<NavBar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders the title text', () => {
    render(<NavBar title="Tafsilotlar" />)
    expect(screen.getByText('Tafsilotlar')).toBeInTheDocument()
  })

  it('renders the back button by default', () => {
    render(<NavBar />)
    expect(screen.getByLabelText('Orqaga')).toBeInTheDocument()
  })

  it('hides the back button when showBack is false', () => {
    render(<NavBar showBack={false} />)
    expect(screen.queryByLabelText('Orqaga')).not.toBeInTheDocument()
  })

  it('calls onBack when back button is clicked', async () => {
    const onBack = vi.fn()
    const user = userEvent.setup()

    render(<NavBar onBack={onBack} />)
    await user.click(screen.getByLabelText('Orqaga'))

    expect(onBack).toHaveBeenCalledOnce()
  })

  it('applies default variant class by default', () => {
    const { container } = render(<NavBar />)
    const header = container.querySelector('header')
    expect(header?.className).toMatch(/default/)
  })

  it('applies gradient variant class', () => {
    const { container } = render(<NavBar variant="gradient" />)
    const header = container.querySelector('header')
    expect(header?.className).toMatch(/gradient/)
  })

  // Right actions
  it('renders right action buttons', () => {
    const actions = [
      { key: 'share', icon: <span>Share</span>, onClick: vi.fn(), ariaLabel: 'Ulashish' },
      { key: 'fav', icon: <span>Fav</span>, onClick: vi.fn(), ariaLabel: 'Sevimli' },
    ]
    render(<NavBar rightActions={actions} />)

    expect(screen.getByLabelText('Ulashish')).toBeInTheDocument()
    expect(screen.getByLabelText('Sevimli')).toBeInTheDocument()
  })

  it('calls action onClick when action button is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const actions = [{ key: 'share', icon: <span>S</span>, onClick, ariaLabel: 'Ulashish' }]

    render(<NavBar rightActions={actions} />)
    await user.click(screen.getByLabelText('Ulashish'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('uses key as aria-label fallback when ariaLabel is not provided', () => {
    const actions = [{ key: 'share', icon: <span>S</span>, onClick: vi.fn() }]
    render(<NavBar rightActions={actions} />)

    expect(screen.getByLabelText('share')).toBeInTheDocument()
  })

  // Children override title
  it('renders children instead of title when children are provided', () => {
    render(
      <NavBar title="Should not appear">
        <input data-testid="search-input" />
      </NavBar>,
    )
    expect(screen.queryByText('Should not appear')).not.toBeInTheDocument()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
  })
})
