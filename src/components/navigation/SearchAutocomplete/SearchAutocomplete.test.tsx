import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SearchAutocomplete } from './SearchAutocomplete'

describe('SearchAutocomplete', () => {
  const defaultProps = {
    recentSearches: ['RTX 4060', 'Ryzen 7'],
    suggestions: ['RTX 4070 Super', 'RTX 4070 Ti'],
    products: [
      { id: '1', title: 'RTX 4070 Super', image: 'https://example.com/img.jpg', price: 8900000 },
    ],
  };

  // Rendering
  it('renders the search input', () => {
    render(<SearchAutocomplete />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchAutocomplete />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchAutocomplete placeholder="Find GPUs..." />);
    expect(screen.getByPlaceholderText('Find GPUs...')).toBeInTheDocument();
  });

  it('renders controlled value', () => {
    render(<SearchAutocomplete value="RTX" />);
    expect(screen.getByRole('combobox')).toHaveValue('RTX');
  });

  // Dropdown visibility
  it('does not show dropdown initially', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows dropdown on focus when there is content', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('does not show dropdown on focus when empty', () => {
    render(<SearchAutocomplete recentSearches={[]} suggestions={[]} products={[]} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // Sections
  it('shows recent searches section', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText('Recent Searches')).toBeInTheDocument();
    expect(screen.getByText('RTX 4060')).toBeInTheDocument();
    expect(screen.getByText('Ryzen 7')).toBeInTheDocument();
  });

  it('shows suggestions section', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText('Suggestions')).toBeInTheDocument();
    // 'RTX 4070 Super' appears in both suggestions and products
    expect(screen.getAllByText('RTX 4070 Super').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('RTX 4070 Ti')).toBeInTheDocument();
  });

  it('shows products section', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText('Products')).toBeInTheDocument();
    // Product title also appears in suggestions; verify at least 2 instances
    expect(screen.getAllByText('RTX 4070 Super').length).toBe(2);
  });

  // Clear recent
  it('shows clear all button when onClearRecent is provided', () => {
    render(<SearchAutocomplete {...defaultProps} onClearRecent={vi.fn()} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls onClearRecent when clear all is clicked', () => {
    const onClearRecent = vi.fn();
    render(<SearchAutocomplete {...defaultProps} onClearRecent={onClearRecent} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Clear all'));
    expect(onClearRecent).toHaveBeenCalledOnce();
  });

  // Suggestion click
  it('calls onSuggestionClick when a suggestion is clicked', () => {
    const onSuggestionClick = vi.fn();
    render(<SearchAutocomplete {...defaultProps} onSuggestionClick={onSuggestionClick} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('RTX 4070 Ti'));
    expect(onSuggestionClick).toHaveBeenCalledWith('RTX 4070 Ti');
  });

  // Product click
  it('calls onProductClick when a product is clicked', () => {
    const onProductClick = vi.fn();
    render(<SearchAutocomplete {...defaultProps} onProductClick={onProductClick} />);
    fireEvent.focus(screen.getByRole('combobox'));
    // Click the product item (img alt text)
    fireEvent.click(screen.getByAltText('RTX 4070 Super'));
    expect(onProductClick).toHaveBeenCalledWith(defaultProps.products[0]);
  });

  // Search
  it('calls onSearch on Enter', async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchAutocomplete value="RTX 4090" onSearch={onSearch} />);

    const input = screen.getByRole('combobox');
    input.focus();
    await user.keyboard('{Enter}');
    expect(onSearch).toHaveBeenCalledWith('RTX 4090');
  });

  // View all
  it('shows view all button when onViewAll is provided with products', () => {
    render(<SearchAutocomplete {...defaultProps} onViewAll={vi.fn()} />);
    fireEvent.focus(screen.getByRole('combobox'));
    expect(screen.getByText('View all results')).toBeInTheDocument();
  });

  it('calls onViewAll when view all is clicked', () => {
    const onViewAll = vi.fn();
    render(<SearchAutocomplete {...defaultProps} onViewAll={onViewAll} />);
    fireEvent.focus(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('View all results'));
    expect(onViewAll).toHaveBeenCalledOnce();
  });

  // Clear input
  it('shows clear button when value is not empty', () => {
    render(<SearchAutocomplete value="RTX" />);
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    render(<SearchAutocomplete value="" />);
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  // Aria attributes
  it('has aria-label on input', () => {
    render(<SearchAutocomplete />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-label', 'Search');
  });

  it('has aria-expanded attribute', () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'false');

    fireEvent.focus(input);
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  // Props spreading
  it('spreads rest props onto root element', () => {
    render(<SearchAutocomplete data-testid="search-autocomplete" />);
    expect(screen.getByTestId('search-autocomplete')).toBeInTheDocument();
  });
});
