import React from 'react';
import { Gastospersonalesdialog } from '../../../../domain/model/Gastospersonalesdialog';
import { GastospersonalesdialogCard } from './GastospersonalesdialogCard';

interface GastospersonalesdialogListProps {
  items: Gastospersonalesdialog[];
  loading?: boolean;
  onSelect?: (item: Gastospersonalesdialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Gastospersonalesdialog) => void;
}

/**
 * Componente Lista: GastosPersonalesDialog.zul
 * Renderiza una lista de elementos usando GastospersonalesdialogCard.
 * Pantallas fuente: GastosPersonalesDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const GastospersonalesdialogList: React.FC<GastospersonalesdialogListProps> = ({
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
    <div data-testid="gastospersonalesdialog-list">
      {items.map((item) => (
        <GastospersonalesdialogCard
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
