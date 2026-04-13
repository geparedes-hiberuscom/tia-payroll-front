import React from 'react';
import { Procesosejeccolaboradores } from '../../../../domain/model/Procesosejeccolaboradores';
import { ProcesosejeccolaboradoresCard } from './ProcesosejeccolaboradoresCard';

interface ProcesosejeccolaboradoresListProps {
  items: Procesosejeccolaboradores[];
  loading?: boolean;
  onSelect?: (item: Procesosejeccolaboradores) => void;
  onEdit?: (item: Procesosejeccolaboradores) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejeccolaboradoresList: React.FC<ProcesosejeccolaboradoresListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="procesosejeccolaboradores-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="procesosejeccolaboradores-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="procesosejeccolaboradores-list" className="layout-grid">
      {items.map((item) => (
        <ProcesosejeccolaboradoresCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};
