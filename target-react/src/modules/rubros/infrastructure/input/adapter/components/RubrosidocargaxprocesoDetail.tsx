import React from 'react';
import { Rubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoDetailProps {
  item: Rubrosidocargaxproceso;
  onEdit?: (item: Rubrosidocargaxproceso) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export const RubrosidocargaxprocesoDetail: React.FC<RubrosidocargaxprocesoDetailProps> = ({ item, onEdit, onDelete, onBack }) => (
  <section data-testid="rubrosidocargaxproceso-detail" style={{ maxWidth: 720 }}>
    <h2>Detalle de ejecución</h2>
    <dl>
      <dt>ID</dt><dd>{item.id}</dd>
      <dt>Proceso</dt><dd>{item.procesoId}</dd>
      <dt>Estado</dt><dd>{item.estado}</dd>
      <dt>Fecha Ejecucion</dt><dd>{item.fechaEjecucion}</dd>
      <dt>Registros</dt><dd>{item.numeroRegistrosCargados}</dd>
      <dt>Errores</dt><dd>{item.numeroErrores}</dd>
      <dt>Usuario</dt><dd>{item.usuarioEjecucion}</dd>
      <dt>Descripcion</dt><dd>{item.descripcion ?? 'N/A'}</dd>
    </dl>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid="rubrosidocargaxproceso-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
      {onDelete && <button type="button" data-testid="rubrosidocargaxproceso-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.id)}>Eliminar</button>}
      {onBack && <button type="button" data-testid="rubrosidocargaxproceso-detail-back" onClick={onBack}>Volver</button>}
    </div>
  </section>
);
