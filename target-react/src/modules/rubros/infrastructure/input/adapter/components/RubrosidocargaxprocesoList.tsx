import React from 'react';
import { Rubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';
import { RubrosidocargaxprocesoCard } from './RubrosidocargaxprocesoCard';

interface RubrosidocargaxprocesoListProps {
  items: Rubrosidocargaxproceso[];
  loading?: boolean;
  onSelect?: (item: Rubrosidocargaxproceso) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Rubrosidocargaxproceso) => void;
}

export const RubrosidocargaxprocesoList: React.FC<RubrosidocargaxprocesoListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div data-testid="rubrosidocargaxproceso-list-loading">Cargando lista...</div>;
  }

  if (items.length === 0) {
    return <p data-testid="rubrosidocargaxproceso-list-empty">No se encontraron ejecuciones.</p>;
  }

  return (
    <section data-testid="rubrosidocargaxproceso-list" style={{ display: 'grid', gap: '0.75rem' }}>
      {items.map((item) => (
        <RubrosidocargaxprocesoCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};
