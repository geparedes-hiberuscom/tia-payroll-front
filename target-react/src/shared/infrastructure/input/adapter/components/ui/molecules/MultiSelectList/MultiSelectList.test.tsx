import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MultiSelectList } from './MultiSelectList';

const options = [
  { id: '1', label: 'Uno' },
  { id: '2', label: 'Dos' },
  { id: '3', label: 'Tres' },
];

describe('MultiSelectList', () => {
  it('renders label and options', () => {
    render(
      <MultiSelectList
        label="Categorias"
        options={options}
        selectedIds={[]}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Categorias')).toBeInTheDocument();
    expect(screen.getByText('Uno')).toBeInTheDocument();
  });

  it('renders empty text when there are no matches', () => {
    render(
      <MultiSelectList
        label="Categorias"
        options={[]}
        selectedIds={[]}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Sin coincidencias')).toBeInTheDocument();
  });
});
