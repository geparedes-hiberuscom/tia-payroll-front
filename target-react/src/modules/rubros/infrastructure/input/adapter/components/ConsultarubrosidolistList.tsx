import React from 'react';
import { Consultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';
import { ConsultarubrosidolistCard } from './ConsultarubrosidolistCard';

interface ConsultarubrosidolistListProps {
  items: Consultarubrosidolist[];
  loading?: boolean;
  onSelect?: (item: Consultarubrosidolist) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Consultarubrosidolist) => void;
}

export const ConsultarubrosidolistList: React.FC<ConsultarubrosidolistListProps> = ({ items, loading, onSelect, onDelete, onEdit }) => {
  if (loading) return <div data-testid="consultarubrosidolist-list-loading">Cargando lista...</div>;
  if (items.length === 0) return <p data-testid="consultarubrosidolist-list-empty">No se encontraron registros.</p>;

  return (
    <section data-testid="consultarubrosidolist-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => (
        <ConsultarubrosidolistCard key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </section>
  );
};
