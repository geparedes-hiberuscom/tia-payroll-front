import React from 'react';
import { NominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';
import { NominaresumengeneralResumengralnominadialogCard } from './NominaresumengeneralResumengralnominadialogCard';

interface NominaresumengeneralResumengralnominadialogListProps {
  items: NominaresumengeneralResumengralnominadialog[];
  loading?: boolean;
  onSelect?: (item: NominaresumengeneralResumengralnominadialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: NominaresumengeneralResumengralnominadialog) => void;
}

/**
 * Componente Lista: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Renderiza una lista de elementos usando NominaresumengeneralResumengralnominadialogCard.
 * Pantallas fuente: nominaresumenGeneral.zul, ResumenGralNominaDialog.zul
 *
 * TODO: Copilot — Completar la tabla/lista con las columnas reales del dominio.
 */
export const NominaresumengeneralResumengralnominadialogList: React.FC<NominaresumengeneralResumengralnominadialogListProps> = ({
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
    <div data-testid="nominaresumengeneral-resumengralnominadialog-list">
      {items.map((item) => (
        <NominaresumengeneralResumengralnominadialogCard
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
