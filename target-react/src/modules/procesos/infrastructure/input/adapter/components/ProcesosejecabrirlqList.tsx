import React from 'react';
import { Procesosejecabrirlq } from '../../../../domain/model/Procesosejecabrirlq';
import { ProcesosejecabrirlqCard } from './ProcesosejecabrirlqCard';

interface ProcesosejecabrirlqListProps {
  items: Procesosejecabrirlq[];
  loading?: boolean;
  onSelect?: (item: Procesosejecabrirlq) => void;
  onEdit?: (item: Procesosejecabrirlq) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejecabrirlqList: React.FC<ProcesosejecabrirlqListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="procesosejecabrirlq-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="procesosejecabrirlq-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="procesosejecabrirlq-list" className="layout-grid">
      {items.map((item) => (
        <ProcesosejecabrirlqCard
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
