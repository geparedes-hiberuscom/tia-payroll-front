import React from 'react';
import { NominaresumengeneralResumengralnominadialog } from '../../../../domain/model/NominaresumengeneralResumengralnominadialog';

interface NominaresumengeneralResumengralnominadialogCardProps {
  item: NominaresumengeneralResumengralnominadialog;
  onSelect?: (item: NominaresumengeneralResumengralnominadialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: NominaresumengeneralResumengralnominadialog) => void;
}

/**
 * Componente Card: nominaresumenGeneral.zul / ResumenGralNominaDialog.zul
 * Muestra un resumen individual de un NominaresumengeneralResumengralnominadialog.
 *
 * TODO: Copilot — Agregar campos reales del domain model.
 */
export const NominaresumengeneralResumengralnominadialogCard: React.FC<NominaresumengeneralResumengralnominadialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`nominaresumengeneral-resumengralnominadialog-card-${item.id}`}
      style={{
        padding: '1rem',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onClick={() => onSelect?.(item)}
    >
      <div>
        <strong>{item.id}</strong>
        {/* TODO: Mostrar campos del dominio */}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && (
          <button onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
            style={{ color: 'red' }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
