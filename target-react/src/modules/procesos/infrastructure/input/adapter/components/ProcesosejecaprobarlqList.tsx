import React from 'react';
import { Procesosejecaprobarlq } from '../../../../domain/model/Procesosejecaprobarlq';
import { ProcesosejecaprobarlqCard } from './ProcesosejecaprobarlqCard';

interface ProcesosejecaprobarlqListProps {
  items: Procesosejecaprobarlq[];
  loading?: boolean;
  onSelect?: (item: Procesosejecaprobarlq) => void;
  onEdit?: (item: Procesosejecaprobarlq) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejecaprobarlqList: React.FC<ProcesosejecaprobarlqListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="procesosejecaprobarlq-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="procesosejecaprobarlq-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="procesosejecaprobarlq-list" className="layout-grid">
      {items.map((item) => (
        <ProcesosejecaprobarlqCard
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
