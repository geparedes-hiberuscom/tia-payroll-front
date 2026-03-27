import React from 'react';
import { Dtoscompartidossubrecursos } from '../../../../domain/model/Dtoscompartidossubrecursos';
import { DtoscompartidossubrecursosCard } from './DtoscompartidossubrecursosCard';

interface DtoscompartidossubrecursosListProps {
  items: Dtoscompartidossubrecursos[];
  loading?: boolean;
  onSelect?: (item: Dtoscompartidossubrecursos) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Dtoscompartidossubrecursos) => void;
}

/**
 * Componente Lista: DTOs compartidos (subrecursos)
 * Renderiza una lista de elementos usando DtoscompartidossubrecursosCard.
 * Pantallas fuente: DTOs compartidos (subrecursos)
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const DtoscompartidossubrecursosList: React.FC<DtoscompartidossubrecursosListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
}) => {
  if (loading) {
    return <div>Cargando lista...</div>;
  }

  if (items.length === 0) {
    return <p>No se encontraron elementos.</p>;
  }

  return (
    <div data-testid="dtoscompartidossubrecursos-list">
      {items.map((item) => (
        <DtoscompartidossubrecursosCard
          key={item.id}
          item={item}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
