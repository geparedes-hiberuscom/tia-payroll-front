import React from 'react';
import { Consueldo } from '../../../../domain/model/Consueldo';
import { ConsueldoCard } from './ConsueldoCard';

interface ConsueldoListProps {
  items: Consueldo[];
  loading?: boolean;
  onSelect?: (item: Consueldo) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Consueldo) => void;
}

/**
 * Componente Lista: conSueldo.zul
 * Renderiza una lista de elementos usando ConsueldoCard.
 * Pantallas fuente: conSueldo.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const ConsueldoList: React.FC<ConsueldoListProps> = ({
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
    <div data-testid="consueldo-list">
      {items.map((item) => (
        <ConsueldoCard
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
