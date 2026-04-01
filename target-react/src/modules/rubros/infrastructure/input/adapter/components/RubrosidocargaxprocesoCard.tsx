import React from 'react';
import { Rubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoCardProps {
  item: Rubrosidocargaxproceso;
  onSelect?: (item: Rubrosidocargaxproceso) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Rubrosidocargaxproceso) => void;
}

export const RubrosidocargaxprocesoCard: React.FC<RubrosidocargaxprocesoCardProps> = ({ item, onSelect, onDelete, onEdit }) => (
  <article data-testid={`rubrosidocargaxproceso-card-${item.id}`} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', cursor: onSelect ? 'pointer' : 'default' }} onClick={() => onSelect?.(item)}>
    <strong>Proceso {item.procesoId}</strong>
    <div>ID: {item.id}</div>
    <div>Estado: {item.estado}</div>
    <div>Fecha Ejecucion: {item.fechaEjecucion}</div>
    <div>Cargados: {item.numeroRegistrosCargados}</div>
    <div>Errores: {item.numeroErrores}</div>
    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid={`rubrosidocargaxproceso-edit-${item.id}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }}>Editar</button>}
      {onDelete && <button type="button" data-testid={`rubrosidocargaxproceso-delete-${item.id}`} style={{ color: '#b91c1c' }} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Eliminar</button>}
    </div>
  </article>
);
