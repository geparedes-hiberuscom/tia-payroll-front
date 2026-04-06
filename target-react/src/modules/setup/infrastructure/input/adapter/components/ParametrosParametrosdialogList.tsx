import React from 'react';
import { ParametrosParametrosdialog } from '../../../../domain/model/ParametrosParametrosdialog';
import { ParametrosParametrosdialogCard } from './ParametrosParametrosdialogCard';

interface ParametrosParametrosdialogListProps {
  items: ParametrosParametrosdialog[];
  loading?: boolean;
  onSelect?: (item: ParametrosParametrosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ParametrosParametrosdialog) => void;
}

/**
 * Componente Lista: parametros.zul / parametrosDialog.zul
 * Renderiza una lista de elementos usando ParametrosParametrosdialogCard.
 * Pantallas fuente: parametros.zul, parametrosDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const ParametrosParametrosdialogList: React.FC<ParametrosParametrosdialogListProps> = ({
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
    <div data-testid="parametros-parametrosdialog-list">
      {items.map((item) => (
        <ParametrosParametrosdialogCard
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
