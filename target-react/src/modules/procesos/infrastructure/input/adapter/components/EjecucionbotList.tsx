import React from 'react';
import { Ejecucionbot } from '../../../../domain/model/Ejecucionbot';
import { EjecucionbotCard } from './EjecucionbotCard';

interface EjecucionbotListProps {
  items: Ejecucionbot[];
  loading?: boolean;
  onSelect?: (item: Ejecucionbot) => void;
  onEdit?: (item: Ejecucionbot) => void;
  onDelete?: (id: string) => void;
}

export const EjecucionbotList: React.FC<EjecucionbotListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="ejecucionbot-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="ejecucionbot-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="ejecucionbot-list" className="layout-grid">
      {items.map((item) => (
        <EjecucionbotCard
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
