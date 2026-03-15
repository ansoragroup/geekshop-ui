import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import SectionHeader from './SectionHeader'

describe('SectionHeader', () => {
  afterEach(cleanup)

  it('renders the title', () => {
    render(<SectionHeader title="Yangi mahsulotlar" />)
    expect(screen.getByText('Yangi mahsulotlar')).toBeInTheDocument()
  })

  it('renders the title as an h3', () => {
    render(<SectionHeader title="Yangi" />)
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Yangi')
  })

  it('renders icon when provided', () => {
    render(
      <SectionHeader title="Test" icon={<svg data-testid="section-icon" />} />,
    )
    expect(screen.getByTestId('section-icon')).toBeInTheDocument()
  })

  it('does not render icon area when not provided', () => {
    const { container } = render(<SectionHeader title="Test" />)
    expect(container.querySelector('[class*="icon"]')).not.toBeInTheDocument()
  })

  it('renders "view all" button when onViewAll is provided', () => {
    render(<SectionHeader title="Test" onViewAll={vi.fn()} />)
    // The button contains the arrow SVG
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
  })

  it('does not render "view all" button when onViewAll is not provided', () => {
    render(<SectionHeader title="Test" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders count text when count and onViewAll are provided', () => {
    render(<SectionHeader title="Test" count={20} onViewAll={vi.fn()} />)
    expect(screen.getByText('20 ta')).toBeInTheDocument()
  })

  it('does not render count when onViewAll is not provided even if count is set', () => {
    render(<SectionHeader title="Test" count={20} />)
    expect(screen.queryByText('20 ta')).not.toBeInTheDocument()
  })

  it('does not render count when count is undefined', () => {
    render(<SectionHeader title="Test" onViewAll={vi.fn()} />)
    expect(screen.queryByText(/ta$/)).not.toBeInTheDocument()
  })

  it('calls onViewAll when the button is clicked', async () => {
    const onViewAll = vi.fn()
    const user = userEvent.setup()
    render(<SectionHeader title="Test" onViewAll={onViewAll} />)
    await user.click(screen.getByRole('button'))
    expect(onViewAll).toHaveBeenCalledOnce()
  })

  it('renders count as 0 ta when count is 0', () => {
    render(<SectionHeader title="Test" count={0} onViewAll={vi.fn()} />)
    expect(screen.getByText('0 ta')).toBeInTheDocument()
  })

  it('renders arrow SVG in the view all button', () => {
    const { container } = render(<SectionHeader title="Test" onViewAll={vi.fn()} />)
    const arrow = container.querySelector('[class*="arrow"]')
    expect(arrow).toBeInTheDocument()
  })
})
