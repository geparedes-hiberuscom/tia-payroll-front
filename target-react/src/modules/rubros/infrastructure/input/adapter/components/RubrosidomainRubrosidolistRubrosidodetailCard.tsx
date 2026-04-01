import React from 'react';
import { RubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';

interface RubrosidomainRubrosidolistRubrosidodetailCardProps {
  item: RubrosidomainRubrosidolistRubrosidodetail;
  onSelect?: (item: RubrosidomainRubrosidolistRubrosidodetail) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: RubrosidomainRubrosidolistRubrosidodetail) => void;
}

export const RubrosidomainRubrosidolistRubrosidodetailCard: React.FC<RubrosidomainRubrosidolistRubrosidodetailCardProps> = ({ item, onSelect, onDelete, onEdit }) => (
  <article data-testid={`rubrosidomain-card-${item.id}`} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', cursor: onSelect ? 'pointer' : 'default' }} onClick={() => onSelect?.(item)}>
    <strong>{item.nombreRubro ?? item.rubroId}</strong>
    <div>ID: {item.id}</div>
    <div>Colaborador: {item.colaboradorId}</div>
    <div>Empresa: {item.empresaId}</div>
    <div>Estado: {item.estado ?? 'N/A'}</div>
    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid={`rubrosidomain-edit-${item.id}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }}>Editar</button>}
      {onDelete && <button type="button" data-testid={`rubrosidomain-delete-${item.id}`} style={{ color: '#b91c1c' }} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>Eliminar</button>}
    </div>
  </article>
);
