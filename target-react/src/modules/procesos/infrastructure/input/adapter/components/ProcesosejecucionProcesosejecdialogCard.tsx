import React from 'react';
import { ProcesosejecucionProcesosejecdialog } from '../../../../domain/model/ProcesosejecucionProcesosejecdialog';

interface ProcesosejecucionProcesosejecdialogCardProps {
  item: ProcesosejecucionProcesosejecdialog;
  onSelect?: (item: ProcesosejecucionProcesosejecdialog) => void;
  onEdit?: (item: ProcesosejecucionProcesosejecdialog) => void;
  onDelete?: (id: string) => void;
}

export const ProcesosejecucionProcesosejecdialogCard: React.FC<ProcesosejecucionProcesosejecdialogCardProps> = ({ item, onSelect, onEdit, onDelete }) => {
  const fields = Object.entries(item).filter(([key]) => key !== 'id');

  return (
    <article className="card" data-testid="procesosejecucion-procesosejecdialog-card">
      <h3 style={{ marginTop: 0 }}>ProcesosejecucionProcesosejecdialog</h3>
      <p><strong>ID:</strong> {item.id}</p>
      {fields.length > 0 ? (
        <dl>
          {fields.map(([key, value]) => (
            <div key={key}>
              <dt><strong>{key}</strong></dt>
              <dd>{String(value ?? '')}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-muted">Sin campos adicionales definidos en el modelo.</p>
      )}
      <div className="form-actions">
        {onSelect && <button type="button" className="btn btn-secondary" onClick={() => onSelect(item)}>Ver detalle</button>}
        {onEdit && <button type="button" className="btn btn-primary" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && <button type="button" className="btn btn-danger" onClick={() => onDelete(item.id)}>Eliminar</button>}
      </div>
    </article>
  );
};
