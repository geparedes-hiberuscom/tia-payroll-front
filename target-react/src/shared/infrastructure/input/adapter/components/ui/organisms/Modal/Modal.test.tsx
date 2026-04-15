import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders title when open', () => {
    render(
      <Modal open setIsOpen={vi.fn()} title="Titulo modal">
        <p>Contenido</p>
      </Modal>,
    );

    expect(screen.getByText('Titulo modal')).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });

  it('renders close button with default aria label', () => {
    render(
      <Modal open setIsOpen={vi.fn()} title="Titulo">
        <p>Contenido</p>
      </Modal>,
    );

    expect(screen.getByLabelText('Cerrar')).toBeInTheDocument();
  });
});
