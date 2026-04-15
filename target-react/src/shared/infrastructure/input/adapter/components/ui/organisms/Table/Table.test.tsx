import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Table } from './Table';

interface TestItem {
  id: number;
  name: string;
}

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Nombre', accessor: 'name' as const },
  ];

  it('renders rows', () => {
    render(<Table<TestItem> items={[{ id: 1, name: 'Item 1' }]} columns={columns} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('renders empty message', () => {
    render(<Table<TestItem> items={[]} columns={columns} />);
    expect(screen.getByTestId('shared-table-empty')).toBeInTheDocument();
  });

  it('calls onPageChange', () => {
    const onPageChange = vi.fn();
    render(
      <Table<TestItem>
        items={[{ id: 1, name: 'Item 1' }]}
        columns={columns}
        totalItems={20}
        pageSize={10}
        page={0}
        onPageChange={onPageChange}
      />,
    );

    screen.getByTestId('shared-table-next').click();
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
