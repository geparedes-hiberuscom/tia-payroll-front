import React from 'react';
import { Logderegistrosdeprocesosubrecurso } from '../../../../domain/model/Logderegistrosdeprocesosubrecurso';
import { LogderegistrosdeprocesosubrecursoCard } from './LogderegistrosdeprocesosubrecursoCard';

interface LogderegistrosdeprocesosubrecursoListProps {
  items: Logderegistrosdeprocesosubrecurso[];
  loading?: boolean;
  onSelect?: (item: Logderegistrosdeprocesosubrecurso) => void;
  onEdit?: (item: Logderegistrosdeprocesosubrecurso) => void;
  onDelete?: (id: string) => void;
}

export const LogderegistrosdeprocesosubrecursoList: React.FC<LogderegistrosdeprocesosubrecursoListProps> = ({ items, loading = false, onSelect, onEdit, onDelete }) => {
  if (loading) {
    return <p data-testid="logderegistrosdeprocesosubrecurso-list-loading">Cargando...</p>;
  }

  if (items.length === 0) {
    return <p data-testid="logderegistrosdeprocesosubrecurso-list-empty" className="text-muted">No hay registros.</p>;
  }

  return (
    <section data-testid="logderegistrosdeprocesosubrecurso-list" className="layout-grid">
      {items.map((item) => (
        <LogderegistrosdeprocesosubrecursoCard
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
