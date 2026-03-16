import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    viewport: { defaultViewport: 'desktop' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 3,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 12,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 5,
    onPageChange: () => {},
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    siblingCount: 2,
    onPageChange: () => {},
  },
};

export const NoPrevNext: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
    onPageChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div>
        <p style={{ marginBottom: 16, color: '#666', fontSize: 14 }}>
          Showing page {page} of 20 results for &ldquo;RTX 5090&rdquo;
        </p>
        <Pagination
          currentPage={page}
          totalPages={20}
          onPageChange={setPage}
        />
      </div>
    );
  },
};
