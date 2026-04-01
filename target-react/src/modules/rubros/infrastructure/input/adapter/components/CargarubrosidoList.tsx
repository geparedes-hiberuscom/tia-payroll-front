import React from 'react';
import { Cargarubrosido } from '../../../../domain/model/Cargarubrosido';
import { CargarubrosidoCard } from './CargarubrosidoCard';

interface CargarubrosidoListProps {
  items: Cargarubrosido[];
  loading?: boolean;
  onSelect?: (item: Cargarubrosido) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Cargarubrosido) => void;
}

export const CargarubrosidoList: React.FC<CargarubrosidoListProps> = ({ items, loading, onSelect, onDelete, onEdit }) => {
  if (loading) return <div data-testid="cargarubrosido-list-loading">Cargando lista...</div>;
  if (items.length === 0) return <p data-testid="cargarubrosido-list-empty">No se encontraron registros.</p>;

  return (
    <section data-testid="cargarubrosido-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => (
        <CargarubrosidoCard key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </section>
  );
};
