import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Footer } from './Footer';
import type { FooterColumn } from './Footer';

const mockColumns: FooterColumn[] = [
  {
    title: 'About Us',
    links: [
      { label: 'About GeekShop', href: '/about' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

describe('Footer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders as a footer element', () => {
    const { container } = render(<Footer columns={mockColumns} />);
    const footer = container.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('renders column titles', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders column links', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByText('About GeekShop')).toBeInTheDocument();
    expect(screen.getByText('Careers')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<Footer columns={mockColumns} />);
    const aboutLink = screen.getByText('About GeekShop');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('renders onClick links as buttons', () => {
    const onClick = vi.fn();
    const columns: FooterColumn[] = [
      {
        title: 'Test',
        links: [{ label: 'Click me', onClick }],
      },
    ];
    render(<Footer columns={columns} />);
    const button = screen.getByText('Click me');
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders default copyright text', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByText('\u00A9 2026 GeekShop. All rights reserved.')).toBeInTheDocument();
  });

  it('renders custom copyright text', () => {
    render(<Footer columns={mockColumns} copyrightText="Custom Copyright" />);
    expect(screen.getByText('Custom Copyright')).toBeInTheDocument();
  });

  it('renders default logo when no logo prop', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByText('GeekShop')).toBeInTheDocument();
  });

  it('renders custom logo', () => {
    render(<Footer columns={mockColumns} logo={<div data-testid="custom-logo">Logo</div>} />);
    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
  });

  it('renders newsletter section by default', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByPlaceholderText('Your email address')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('hides newsletter when showNewsletter is false', () => {
    render(<Footer columns={mockColumns} showNewsletter={false} />);
    expect(screen.queryByPlaceholderText('Your email address')).toBeNull();
  });

  it('calls onSubscribe with email when form is submitted', async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();
    render(<Footer columns={mockColumns} onSubscribe={onSubscribe} />);

    const input = screen.getByPlaceholderText('Your email address');
    await user.type(input, 'test@geekshop.uz');
    await user.click(screen.getByText('Subscribe'));

    expect(onSubscribe).toHaveBeenCalledWith('test@geekshop.uz');
  });

  it('clears email input after subscription', async () => {
    const user = userEvent.setup();
    render(<Footer columns={mockColumns} onSubscribe={vi.fn()} />);

    const input = screen.getByPlaceholderText('Your email address') as HTMLInputElement;
    await user.type(input, 'test@geekshop.uz');
    await user.click(screen.getByText('Subscribe'));

    expect(input.value).toBe('');
  });

  it('does not call onSubscribe with empty email', async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();
    render(<Footer columns={mockColumns} onSubscribe={onSubscribe} />);

    await user.click(screen.getByText('Subscribe'));
    expect(onSubscribe).not.toHaveBeenCalled();
  });

  it('renders bottom links', () => {
    render(
      <Footer
        columns={mockColumns}
        bottomLinks={[
          { label: 'Terms', href: '/terms' },
          { label: 'Privacy', href: '/privacy' },
        ]}
      />,
    );
    expect(screen.getByText('Terms')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(
      <Footer
        columns={mockColumns}
        socialLinks={[
          { icon: <span>TG</span>, label: 'Telegram', href: 'https://t.me/test' },
        ]}
      />,
    );
    expect(screen.getByLabelText('Telegram')).toBeInTheDocument();
  });

  it('forwards ref', () => {
    const ref = { current: null as HTMLElement | null };
    render(<Footer ref={ref} columns={mockColumns} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('FOOTER');
  });

  it('spreads rest props onto root element', () => {
    const { container } = render(
      <Footer columns={mockColumns} data-testid="footer" aria-label="site footer" />,
    );
    const footer = container.querySelector('footer') as HTMLElement;
    expect(footer.getAttribute('data-testid')).toBe('footer');
    expect(footer.getAttribute('aria-label')).toBe('site footer');
  });

  it('merges custom className', () => {
    const { container } = render(
      <Footer columns={mockColumns} className="custom-footer" />,
    );
    const footer = container.querySelector('footer') as HTMLElement;
    expect(footer.className).toContain('custom-footer');
  });

  it('newsletter input has proper aria-label', () => {
    render(<Footer columns={mockColumns} />);
    expect(screen.getByLabelText('Email address for newsletter')).toBeInTheDocument();
  });
});
