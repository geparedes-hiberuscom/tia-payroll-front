import React from 'react';
import { Consultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';

interface ConsultarubrosidolistCardProps {
  item: Consultarubrosidolist;
  onSelect?: (item: Consultarubrosidolist) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Consultarubrosidolist) => void;
}

export const ConsultarubrosidolistCard: React.FC<ConsultarubrosidolistCardProps> = ({ item, onSelect, onDelete, onEdit }) => {
  return (
    <article data-testid={`consultarubrosidolist-card-${item.id}`} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', cursor: onSelect ? 'pointer' : 'default' }} onClick={() => onSelect?.(item)}>
      <strong>{item.nombreRubro ?? item.rubroId}</strong>
      <div>ID: {item.id}</div>
      <div>Colaborador: {item.colaboradorId}</div>
      <div>Valor: {item.valor01}</div>
      <div>Estado: {item.estado ?? 'N/A'}</div>
      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button type="button" data-testid={`consultarubrosidolist-edit-${item.id}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }}>Editar</button>}
        {onDelete && <button type="button" data-testid={`consultarubrosidolist-delete-${item.id}`} style={{ color: '#b91c1c' }} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Eliminar</button>}
      </div>
    </article>
  );
};
