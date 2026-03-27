import React from 'react';
import { Acumulados } from '../../../../domain/model/Acumulados';
import { AcumuladosCard } from './AcumuladosCard';

interface AcumuladosListProps {
  items: Acumulados[];
  loading?: boolean;
  onSelect?: (item: Acumulados) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: Acumulados) => void;
}

/**
 * Componente Lista: acumulados.zul
 * Renderiza una lista de elementos usando AcumuladosCard.
 * Pantallas fuente: acumulados.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const AcumuladosList: React.FC<AcumuladosListProps> = ({
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
    <div data-testid="acumulados-list">
      {items.map((item) => (
        <AcumuladosCard
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
