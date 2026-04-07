import React from 'react';
import { Rubrospreliquidadossubrecurso } from '../../../../domain/model/Rubrospreliquidadossubrecurso';
import { RubrospreliquidadossubrecursoCard } from './RubrospreliquidadossubrecursoCard';

interface RubrospreliquidadossubrecursoListProps {
  items: Rubrospreliquidadossubrecurso[];
  loading?: boolean;
  onSelect?: (item: Rubrospreliquidadossubrecurso) => void;
  onEdit?: (item: Rubrospreliquidadossubrecurso) => void;
  onDelete?: (id: string) => void;
}

export const RubrospreliquidadossubrecursoList: React.FC<RubrospreliquidadossubrecursoListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="rubrospreliquidadossubrecurso-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="rubrospreliquidadossubrecurso-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="rubrospreliquidadossubrecurso-list" className="layout-grid">
      {items.map((item) => (
        <RubrospreliquidadossubrecursoCard
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
