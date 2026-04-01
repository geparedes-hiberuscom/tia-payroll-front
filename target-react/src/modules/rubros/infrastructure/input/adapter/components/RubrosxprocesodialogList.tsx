import React from 'react';
import { Rubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';
import { RubrosxprocesodialogCard } from './RubrosxprocesodialogCard';

interface RubrosxprocesodialogListProps {
  items: Rubrosxprocesodialog[];
  loading?: boolean;
  onSelect?: (item: Rubrosxprocesodialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Rubrosxprocesodialog) => void;
}

export const RubrosxprocesodialogList: React.FC<RubrosxprocesodialogListProps> = ({ items, loading, onSelect, onDelete, onEdit }) => {
  if (loading) return <div data-testid="rubrosxprocesodialog-list-loading">Cargando lista...</div>;
  if (items.length === 0) return <p data-testid="rubrosxprocesodialog-list-empty">No se encontraron asignaciones.</p>;
  return (
    <section data-testid="rubrosxprocesodialog-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => <RubrosxprocesodialogCard key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} onEdit={onEdit} />)}
    </section>
  );
};
