import React from 'react';
import { Comparativonominas } from '../../../../domain/model/Comparativonominas';
import { ComparativonominasCard } from './ComparativonominasCard';

interface ComparativonominasListProps {
  items: Comparativonominas[];
  loading?: boolean;
  onSelect?: (item: Comparativonominas) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Comparativonominas) => void;
}

/**
 * Componente Lista: comparativoNominas.zul
 * Renderiza una lista de elementos usando ComparativonominasCard.
 * Pantallas fuente: comparativoNominas.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const ComparativonominasList: React.FC<ComparativonominasListProps> = ({
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
    <div data-testid="comparativonominas-list">
      {items.map((item) => (
        <ComparativonominasCard
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
