import React from 'react';
import { Cargarubrosido } from '../../../../domain/model/Cargarubrosido';

interface CargarubrosidoCardProps {
  item: Cargarubrosido;
  onSelect?: (item: Cargarubrosido) => void;
  onDelete?: (id: number) => void;
  onEdit?: (item: Cargarubrosido) => void;
}

export const CargarubrosidoCard: React.FC<CargarubrosidoCardProps> = ({ item, onSelect, onDelete, onEdit }) => {
  return (
    <article
      data-testid={`cargarubrosido-card-${item.id}`}
      style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem', cursor: onSelect ? 'pointer' : 'default' }}
      onClick={() => onSelect?.(item)}
    >
      <strong>{item.nombreArchivo}</strong>
      <div>ID: {item.id}</div>
      <div>Estado: {item.estado}</div>
      <div>Fecha Carga: {item.fechaCarga}</div>
      <div>Registros: {item.numeroRegistros}</div>
      <div>Errores: {item.numeroErrores}</div>
      <div>Exitosos: {item.numeroExitosos}</div>
      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        {onEdit && (
          <button type="button" data-testid={`cargarubrosido-edit-${item.id}`} onClick={(e) => { e.stopPropagation(); onEdit(item); }}>
            Editar
          </button>
        )}
        {onDelete && (
          <button type="button" data-testid={`cargarubrosido-delete-${item.id}`} style={{ color: '#b91c1c' }} onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}>
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
};
