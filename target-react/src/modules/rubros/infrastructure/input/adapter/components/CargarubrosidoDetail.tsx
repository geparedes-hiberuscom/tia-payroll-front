import React from 'react';
import { Cargarubrosido } from '../../../../domain/model/Cargarubrosido';

interface CargarubrosidoDetailProps {
  item: Cargarubrosido;
  onEdit?: (item: Cargarubrosido) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export const CargarubrosidoDetail: React.FC<CargarubrosidoDetailProps> = ({ item, onEdit, onDelete, onBack }) => {
  return (
    <section data-testid="cargarubrosido-detail" style={{ maxWidth: 720 }}>
      <h2>Detalle de carga masiva</h2>
      <dl>
        <dt>ID</dt><dd>{item.id}</dd>
        <dt>Archivo</dt><dd>{item.nombreArchivo}</dd>
        <dt>Estado</dt><dd>{item.estado}</dd>
        <dt>Fecha Carga</dt><dd>{item.fechaCarga}</dd>
        <dt>Usuario</dt><dd>{item.usuarioCarga}</dd>
        <dt>Registros</dt><dd>{item.numeroRegistros}</dd>
        <dt>Errores</dt><dd>{item.numeroErrores}</dd>
        <dt>Exitosos</dt><dd>{item.numeroExitosos}</dd>
        <dt>Descripcion</dt><dd>{item.descripcion ?? 'N/A'}</dd>
      </dl>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button type="button" data-testid="cargarubrosido-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && <button type="button" data-testid="cargarubrosido-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.id)}>Eliminar</button>}
        {onBack && <button type="button" data-testid="cargarubrosido-detail-back" onClick={onBack}>Volver</button>}
      </div>
    </section>
  );
};
