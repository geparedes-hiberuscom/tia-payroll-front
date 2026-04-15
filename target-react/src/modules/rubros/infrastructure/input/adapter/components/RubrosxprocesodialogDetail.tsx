import React from 'react';
import { Rubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';

interface RubrosxprocesodialogDetailProps {
  item: Rubrosxprocesodialog;
  onEdit?: (item: Rubrosxprocesodialog) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export const RubrosxprocesodialogDetail: React.FC<RubrosxprocesodialogDetailProps> = ({ item, onEdit, onDelete, onBack }) => (
  <section data-testid="rubrosxprocesodialog-detail" style={{ maxWidth: 720 }}>
    <h2>Detalle rubro por proceso</h2>
    <dl>
      <dt>ID</dt><dd>{item.id}</dd>
      <dt>Rubro</dt><dd>{item.rubroNombre ?? item.rubroId}</dd>
      <dt>Proceso</dt><dd>{item.procesoNombre ?? item.procesoId}</dd>
      <dt>Secuencia</dt><dd>{item.secuencia ?? 'N/A'}</dd>
      <dt>Frecuencia</dt><dd>{item.frecuenciaEjecucion ?? 'N/A'}</dd>
      <dt>Estado</dt><dd>{item.estado ?? 'N/A'}</dd>
      <dt>Activo</dt><dd>{item.activo ? 'Si' : 'No'}</dd>
    </dl>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid="rubrosxprocesodialog-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
      {onDelete && <button type="button" data-testid="rubrosxprocesodialog-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.id)}>Eliminar</button>}
      {onBack && <button type="button" data-testid="rubrosxprocesodialog-detail-back" onClick={onBack}>Volver</button>}
    </div>
  </section>
);
