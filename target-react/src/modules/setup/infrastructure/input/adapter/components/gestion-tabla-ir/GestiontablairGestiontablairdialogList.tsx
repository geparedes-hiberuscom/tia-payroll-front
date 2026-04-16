import React from 'react';
import { GestiontablairGestiontablairdialog } from '../../../../../domain/model/GestiontablairGestiontablairdialog';
import { GestiontablairGestiontablairdialogCard } from './GestiontablairGestiontablairdialogCard';

interface GestiontablairGestiontablairdialogListProps {
  items: GestiontablairGestiontablairdialog[];
  loading?: boolean;
  onSelect?: (item: GestiontablairGestiontablairdialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: GestiontablairGestiontablairdialog) => void;
}

/**
 * Componente Lista: gestionTablaIR.zul / gestionTablaIRDialog.zul
 * Renderiza una lista de elementos usando GestiontablairGestiontablairdialogCard.
 * Pantallas fuente: gestionTablaIR.zul, gestionTablaIRDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const GestiontablairGestiontablairdialogList: React.FC<GestiontablairGestiontablairdialogListProps> = ({
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
    <div data-testid="gestiontablair-gestiontablairdialog-list">
      {items.map((item) => (
        <GestiontablairGestiontablairdialogCard
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
