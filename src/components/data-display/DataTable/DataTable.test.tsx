import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { DataTable, type DataTableColumn } from './DataTable';

interface Product {
  id: string;
  name: string;
  price: number;
}

const columns: DataTableColumn<Product>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'price', title: 'Price', sortable: true },
];

const data: Product[] = [
  { id: '1', name: 'iPhone 15', price: 12990000 },
  { id: '2', name: 'Samsung S24', price: 10490000 },
  { id: '3', name: 'Pixel 9', price: 8990000 },
];

describe('DataTable', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />);
    // Both card and table layouts render (container queries control visibility)
    expect(screen.getAllByText('iPhone 15').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Samsung S24').length).toBeGreaterThan(0);
  });

  it('renders table headers', () => {
    render(<DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders checkboxes with onSelectionChange', () => {
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSelectionChange={vi.fn()}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('toggles row selection', async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSelectionChange={onSelectionChange}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    // Click a row checkbox (not the select-all)
    await user.click(checkboxes[1]);
    expect(onSelectionChange).toHaveBeenCalled();
  });

  it('uses defaultSelectedKeys', () => {
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        defaultSelectedKeys={['1']}
        onSelectionChange={vi.fn()}
      />
    );
    const checked = screen
      .getAllByRole('checkbox')
      .filter((cb) => cb.getAttribute('aria-checked') === 'true');
    expect(checked.length).toBeGreaterThan(0);
  });

  it('renders sortable column headers with aria-sort', () => {
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        sortKey="name"
        sortDirection="asc"
      />
    );
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers.find((h) => h.textContent?.includes('Name'));
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
  });

  it('calls onSortChange on header click', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        onSortChange={onSortChange}
      />
    );
    const headers = screen.getAllByRole('columnheader');
    const nameHeader = headers.find((h) => h.textContent?.includes('Name'));
    if (nameHeader) {
      await user.click(nameHeader);
      expect(onSortChange).toHaveBeenCalledWith('name', 'asc');
    }
  });

  it('renders pagination when data exceeds pageSize', () => {
    render(
      <DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" pageSize={2} />
    );
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('navigates to next page', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        pageSize={2}
        onPageChange={onPageChange}
      />
    );
    await user.click(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables Prev button on first page', () => {
    render(
      <DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" pageSize={2} />
    );
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('shows loading state', () => {
    const { container } = render(
      <DataTable columns={columns as DataTableColumn[]} data={[]} rowKey="id" loading />
    );
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={[]}
        rowKey="id"
        empty="No data available"
      />
    );
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('uses custom render function', () => {
    const cols: DataTableColumn<Product>[] = [
      { key: 'name', title: 'Name' },
      { key: 'price', title: 'Price', render: (val) => `$${val}` },
    ];
    render(<DataTable columns={cols as DataTableColumn[]} data={[data[0]]} rowKey="id" />);
    // Both card and table layouts render
    expect(screen.getAllByText('$12990000').length).toBeGreaterThan(0);
  });

  it('spreads rest props onto root', () => {
    const { container } = render(
      <DataTable columns={columns as DataTableColumn[]} data={data} rowKey="id" data-testid="dt" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'dt');
  });

  it('supports controlled page', () => {
    render(
      <DataTable
        columns={columns as DataTableColumn[]}
        data={data}
        rowKey="id"
        page={2}
        pageSize={2}
        onPageChange={vi.fn()}
      />
    );
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
  });
});
