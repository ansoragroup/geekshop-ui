import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ProductCard } from './ProductCard'

describe('ProductCard — flat API', () => {
  const defaultProps = {
    image: '/img/gpu.jpg',
    title: 'RTX 4090',
    price: 15000000,
  }

  it('renders the product title', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText('RTX 4090')).toBeInTheDocument()
  })

  it('renders the product image with alt text', () => {
    render(<ProductCard {...defaultProps} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/img/gpu.jpg')
    expect(img).toHaveAttribute('alt', 'RTX 4090')
  })

  it('renders with role button and tabIndex 0', () => {
    render(<ProductCard {...defaultProps} />)
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabindex', '0')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<ProductCard {...defaultProps} onClick={onClick} />)
    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Enter key press', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<ProductCard {...defaultProps} onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('calls onClick on Space key press', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(<ProductCard {...defaultProps} onClick={onClick} />)
    screen.getByRole('button').focus()
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders discount badge', () => {
    render(<ProductCard {...defaultProps} discount="-15%" />)
    expect(screen.getByText('-15%')).toBeInTheDocument()
  })

  it('renders "new" status badge', () => {
    render(<ProductCard {...defaultProps} badge="new" />)
    expect(screen.getByText('Yangi')).toBeInTheDocument()
  })

  it('renders "top" status badge', () => {
    render(<ProductCard {...defaultProps} badge="top" />)
    expect(screen.getByText('TOP')).toBeInTheDocument()
  })

  it('renders "hot" status badge', () => {
    render(<ProductCard {...defaultProps} badge="hot" />)
    expect(screen.getByText('Xit')).toBeInTheDocument()
  })

  it('renders sold count', () => {
    render(<ProductCard {...defaultProps} soldCount="700+ sotilgan" />)
    expect(screen.getByText('700+ sotilgan')).toBeInTheDocument()
  })

  it('renders with sale variant when originalPrice is provided and > price', () => {
    const { container } = render(
      <ProductCard {...defaultProps} originalPrice={18000000} />,
    )
    // Check that original price is shown
    expect(container.querySelector('[class*="originalPrice"]')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<ProductCard {...defaultProps} className="my-card" />)
    expect(container.firstElementChild?.className).toContain('my-card')
  })

  it('applies custom imageAspectRatio style', () => {
    const { container } = render(<ProductCard {...defaultProps} imageAspectRatio="auto" />)
    const imageWrapper = container.querySelector('[class*="imageWrapper"]')
    expect(imageWrapper).toHaveStyle({ aspectRatio: 'auto' })
  })
})

describe('ProductCard — compound API', () => {
  it('renders children directly', () => {
    render(
      <ProductCard>
        <div data-testid="custom-content">Custom Content</div>
      </ProductCard>,
    )
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
  })

  it('renders with role button and tabIndex 0', () => {
    render(
      <ProductCard>
        <span>Content</span>
      </ProductCard>,
    )
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ProductCard onClick={onClick}>
        <span>Content</span>
      </ProductCard>,
    )
    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })
})

describe('ProductCard.Image', () => {
  it('renders an image with src and alt', () => {
    render(
      <ProductCard>
        <ProductCard.Image src="/img/test.jpg" alt="Test product" />
      </ProductCard>,
    )
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', '/img/test.jpg')
    expect(img).toHaveAttribute('alt', 'Test product')
  })

  it('renders discount badge', () => {
    render(
      <ProductCard>
        <ProductCard.Image src="/img/test.jpg" discount="-20%" />
      </ProductCard>,
    )
    expect(screen.getByText('-20%')).toBeInTheDocument()
  })

  it('renders multiple badges', () => {
    render(
      <ProductCard>
        <ProductCard.Image src="/img/test.jpg" badges={['new', 'hot']} />
      </ProductCard>,
    )
    expect(screen.getByText('Yangi')).toBeInTheDocument()
    expect(screen.getByText('Xit')).toBeInTheDocument()
  })
})

describe('ProductCard.Title', () => {
  it('renders the title text in an h3', () => {
    render(
      <ProductCard>
        <ProductCard.Body>
          <ProductCard.Title>GPU Name</ProductCard.Title>
        </ProductCard.Body>
      </ProductCard>,
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('GPU Name')
  })

  it('applies lineClamp style', () => {
    render(
      <ProductCard>
        <ProductCard.Body>
          <ProductCard.Title lineClamp={2}>Long Title</ProductCard.Title>
        </ProductCard.Body>
      </ProductCard>,
    )
    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading.style.webkitLineClamp).toBe('2')
  })
})

describe('ProductCard.Price', () => {
  it('renders current price', () => {
    render(
      <ProductCard>
        <ProductCard.Body>
          <ProductCard.Price current={5000000} />
        </ProductCard.Body>
      </ProductCard>,
    )
    expect(screen.getByText(/5\s000\s000/)).toBeInTheDocument()
  })

  it('renders original price as strikethrough when original > current', () => {
    const { container } = render(
      <ProductCard>
        <ProductCard.Body>
          <ProductCard.Price current={4000000} original={5000000} />
        </ProductCard.Body>
      </ProductCard>,
    )
    expect(container.querySelector('[class*="originalPrice"]')).toBeInTheDocument()
  })

  it('renders installment text', () => {
    render(
      <ProductCard>
        <ProductCard.Body>
          <ProductCard.Price current={5000000} installment={500000} />
        </ProductCard.Body>
      </ProductCard>,
    )
    expect(screen.getByText(/500\s000 so'm\/oy/)).toBeInTheDocument()
  })
})
