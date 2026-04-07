import React from 'react';
import { Ejecucionproccierre } from '../../../../domain/model/Ejecucionproccierre';
import { EjecucionproccierreCard } from './EjecucionproccierreCard';

interface EjecucionproccierreListProps {
  items: Ejecucionproccierre[];
  loading?: boolean;
  onSelect?: (item: Ejecucionproccierre) => void;
  onEdit?: (item: Ejecucionproccierre) => void;
  onDelete?: (id: string) => void;
}

export const EjecucionproccierreList: React.FC<EjecucionproccierreListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="ejecucionproccierre-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="ejecucionproccierre-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="ejecucionproccierre-list" className="layout-grid">
      {items.map((item) => (
        <EjecucionproccierreCard
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
