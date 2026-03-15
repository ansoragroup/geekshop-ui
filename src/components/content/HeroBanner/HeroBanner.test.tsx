import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import HeroBanner from './HeroBanner'

describe('HeroBanner', () => {
  afterEach(cleanup)

  it('renders the title', () => {
    render(<HeroBanner title="Mega Sale" />)
    expect(screen.getByText('Mega Sale')).toBeInTheDocument()
  })

  it('renders the title as an h2', () => {
    render(<HeroBanner title="Mega Sale" />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Mega Sale')
  })

  it('renders subtitle when provided', () => {
    render(<HeroBanner title="Sale" subtitle="50% off everything" />)
    expect(screen.getByText('50% off everything')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />)
    expect(container.querySelector('p')).not.toBeInTheDocument()
  })

  it('renders badge when provided', () => {
    render(<HeroBanner title="Sale" badge="HOT" />)
    expect(screen.getByText('HOT')).toBeInTheDocument()
  })

  it('does not render badge when not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />)
    expect(container.querySelector('[class*="badge"]')).not.toBeInTheDocument()
  })

  it('applies default gradient background', () => {
    const { container } = render(<HeroBanner title="Sale" />)
    expect(container.firstChild).toHaveStyle({
      background: 'linear-gradient(135deg, #FF5000 0%, #FF7A33 100%)',
    })
  })

  it('applies custom gradient background', () => {
    const gradient = 'linear-gradient(90deg, #000 0%, #FFF 100%)'
    const { container } = render(<HeroBanner title="Sale" bgGradient={gradient} />)
    expect(container.firstChild).toHaveStyle({ background: gradient })
  })

  it('renders background image when provided', () => {
    const { container } = render(<HeroBanner title="Sale" image="/banner.jpg" />)
    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/banner.jpg')
    expect(img).toHaveAttribute('aria-hidden', 'true')
    expect(img).toHaveAttribute('alt', '')
  })

  it('does not render img when image is not provided', () => {
    const { container } = render(<HeroBanner title="Sale" />)
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })

  it('has role="button" when onClick is provided', () => {
    render(<HeroBanner title="Sale" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not have role="button" when onClick is not provided', () => {
    render(<HeroBanner title="Sale" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('has tabIndex=0 when onClick is provided', () => {
    render(<HeroBanner title="Sale" onClick={vi.fn()} />)
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<HeroBanner title="Sale" onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<HeroBanner title="Sale" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalled()
  })

  it('calls onClick on Space key', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<HeroBanner title="Sale" onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalled()
  })
})
