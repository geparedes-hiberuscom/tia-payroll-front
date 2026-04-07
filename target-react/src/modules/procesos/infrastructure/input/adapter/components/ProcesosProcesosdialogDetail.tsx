import React from 'react';
import { ProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';

interface ProcesosProcesosdialogDetailProps {
  item: ProcesosProcesosdialog;
  onEdit?: (item: ProcesosProcesosdialog) => void;
  onDelete?: (id: string) => void;
  onBack?: () => void;
}

export const ProcesosProcesosdialogDetail: React.FC<ProcesosProcesosdialogDetailProps> = ({
  item,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div data-testid="procesos-procesosdialog-detail" className="card" style={{ maxWidth: 760 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Detalle de Proceso</h3>
        {onBack && <button onClick={onBack}>← Volver</button>}
      </div>

      <dl>
        <dt><strong>ID</strong></dt>
        <dd>{item.id}</dd>
        <dt><strong>Empresa ID</strong></dt>
        <dd>{item.empresaId}</dd>
        <dt><strong>Tipo de Proceso</strong></dt>
        <dd>{item.tipoProceso}</dd>
        <dt><strong>Frecuencia</strong></dt>
        <dd>{item.frecuencia}</dd>
        <dt><strong>Rol ID</strong></dt>
        <dd>{item.rolId ?? '-'}</dd>
        <dt><strong>Nombre</strong></dt>
        <dd>{item.nombre ?? '-'}</dd>
        <dt><strong>Descripción</strong></dt>
        <dd>{item.descripcion ?? '-'}</dd>
        <dt><strong>Activo</strong></dt>
        <dd>{item.activo === false ? 'No' : 'Si'}</dd>
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        {onEdit && <button className="btn btn-secondary" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && (
          <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
