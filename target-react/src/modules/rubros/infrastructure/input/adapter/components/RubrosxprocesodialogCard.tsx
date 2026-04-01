import React from 'react';
import { Rubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';

interface RubrosxprocesodialogCardProps {
  item: Rubrosxprocesodialog;
  onSelect?: (item: Rubrosxprocesodialog) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Rubrosxprocesodialog) => void;
}

export const RubrosxprocesodialogCard: React.FC<RubrosxprocesodialogCardProps> = ({ item, onSelect, onDelete, onEdit }) => (
  <article data-testid={`rubrosxprocesodialog-card-${item.id}`} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', cursor: onSelect ? 'pointer' : 'default' }} onClick={() => onSelect?.(item)}>
    <strong>Rubro {item.rubroId}</strong>
    <div>ID: {item.id}</div>
    <div>Proceso: {item.procesoId}</div>
    <div>Secuencia: {item.secuencia ?? 'N/A'}</div>
    <div>Frecuencia: {item.frecuenciaEjecucion ?? 'N/A'}</div>
    <div>Activo: {item.activo ? 'Si' : 'No'}</div>
    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid={`rubrosxprocesodialog-edit-${item.id}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }}>Editar</button>}
      {onDelete && <button type="button" data-testid={`rubrosxprocesodialog-delete-${item.id}`} style={{ color: '#b91c1c' }} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Eliminar</button>}
    </div>
  </article>
);
