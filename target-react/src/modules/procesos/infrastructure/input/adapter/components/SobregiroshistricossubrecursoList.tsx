import React from 'react';
import { Sobregiroshistricossubrecurso } from '../../../../domain/model/Sobregiroshistricossubrecurso';
import { SobregiroshistricossubrecursoCard } from './SobregiroshistricossubrecursoCard';

interface SobregiroshistricossubrecursoListProps {
  items: Sobregiroshistricossubrecurso[];
  loading?: boolean;
  onSelect?: (item: Sobregiroshistricossubrecurso) => void;
  onEdit?: (item: Sobregiroshistricossubrecurso) => void;
  onDelete?: (id: string) => void;
}

export const SobregiroshistricossubrecursoList: React.FC<SobregiroshistricossubrecursoListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="sobregiroshistricossubrecurso-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="sobregiroshistricossubrecurso-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="sobregiroshistricossubrecurso-list" className="layout-grid">
      {items.map((item) => (
        <SobregiroshistricossubrecursoCard
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
