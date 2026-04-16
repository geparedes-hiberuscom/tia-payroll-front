import React from 'react';
import { GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';
import { GeningproyectadosCard } from './GeningproyectadosCard';

interface GeningproyectadosListProps {
  items: GeningproyectadosResponse[];
  loading?: boolean;
  onSelect?: (item: GeningproyectadosResponse) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: GeningproyectadosResponse) => void;
}

/**
 * Componente Lista: genIngProyectados.zul
 * Renderiza una lista de elementos usando GeningproyectadosCard.
 * Pantallas fuente: genIngProyectados.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const GeningproyectadosList: React.FC<GeningproyectadosListProps> = ({
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
    <div data-testid="geningproyectados-list">
      {items.map((item) => (
        <GeningproyectadosCard
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
