import React from 'react';
import { ProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';

interface ProcesosProcesosdialogCardProps {
  item: ProcesosProcesosdialog;
  onSelect?: (item: ProcesosProcesosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ProcesosProcesosdialog) => void;
}

export const ProcesosProcesosdialogCard: React.FC<ProcesosProcesosdialogCardProps> = ({
  item,
  onSelect,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      data-testid={`procesos-procesosdialog-card-${item.id}`}
      className="card"
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
      onClick={() => onSelect?.(item)}
    >
      <div>
        <h4 style={{ margin: 0 }}>{item.nombre ?? `Proceso ${item.id}`}</h4>
        <p className="text-muted" style={{ margin: '0.5rem 0' }}>{item.procesoId ?? 'Sin descripcion'}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="badge badge-info">Empresa: {item.empresaId}</span>
          <span className="badge badge-primary">Tipo: {item.tipoProceso}</span>
          <span className="badge badge-secondary">Frecuencia: {item.frecuenciaId}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && (
          <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            Editar
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-danger"
            onClick={(e) => { e.stopPropagation(); onDelete(String(item.id)); }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
