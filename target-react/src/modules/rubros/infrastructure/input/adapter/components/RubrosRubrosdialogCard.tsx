import React from 'react';
import { RubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';

interface RubrosRubrosdialogCardProps {
  item: RubrosRubrosdialog;
  onSelect?: (item: RubrosRubrosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: RubrosRubrosdialog) => void;
}

const EFFECT_LABELS: Record<'ING' | 'EGR' | 'NA', string> = {
  ING: 'Ingreso',
  EGR: 'Egreso',
  NA: 'Ninguno',
};

const AMBITO_LABELS: Record<'NA' | 'IDO' | 'PTM', string> = {
  NA: 'No Aplica',
  IDO: 'Ingreso Deduccion Otros',
  PTM: 'Prestamos',
};

export const RubrosRubrosdialogCard: React.FC<RubrosRubrosdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  const efectoLabel = item.efecto ? EFFECT_LABELS[item.efecto] : 'N/A';
  const ambitoLabel = item.ambito ? AMBITO_LABELS[item.ambito] : 'N/A';

  return (
    <article
      data-testid={`rubros-rubrosdialog-card-${item.idRubro}`}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        cursor: onSelect ? 'pointer' : 'default',
      }}
      onClick={() => onSelect?.(item)}
    >
      <div>
        <strong>{item.nombre}</strong>
        <div>ID Rubro: {item.idRubro}</div>
        <div>Ambito: {ambitoLabel}</div>
        <div>Efecto: {efectoLabel}</div>
        <div>Observaciones: {item.observaciones}</div>
        <div>Estado: {item.estado ?? 'N/A'}</div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        {onEdit && (
          <button
            type="button"
            data-testid={`rubros-rubrosdialog-edit-${item.idRubro}`}
            onClick={(event) => {
              event.stopPropagation();
              onEdit(item);
            }}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            data-testid={`rubros-rubrosdialog-delete-${item.idRubro}`}
            style={{ color: '#b91c1c' }}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(item.idRubro);
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
};
