import React from 'react';
import { ContratoplantillaContratoplantilladialog } from '../../../../domain/model/ContratoplantillaContratoplantilladialog';
import { ContratoplantillaContratoplantilladialogCard } from './ContratoplantillaContratoplantilladialogCard';

interface ContratoplantillaContratoplantilladialogListProps {
  items: ContratoplantillaContratoplantilladialog[];
  loading?: boolean;
  onSelect?: (item: ContratoplantillaContratoplantilladialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ContratoplantillaContratoplantilladialog) => void;
}

/**
 * Componente Lista: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Renderiza una lista de elementos usando ContratoplantillaContratoplantilladialogCard.
 * Pantallas fuente: contratoPlantilla.zul, contratoPlantillaDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const ContratoplantillaContratoplantilladialogList: React.FC<ContratoplantillaContratoplantilladialogListProps> = ({
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
    <div data-testid="contratoplantilla-contratoplantilladialog-list">
      {items.map((item) => (
        <ContratoplantillaContratoplantilladialogCard
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
