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
    <section data-testid="procesos-procesosdialog-detail" style={{ maxWidth: 720 }}>
      <h2>Detalle de Proceso</h2>

      <dl>
        <dt><strong>ID</strong></dt>
        <dd>{item.id}</dd>
        <dt><strong>Empresa ID</strong></dt>
        <dd>{item.empresaId}</dd>
        <dt><strong>Tipo de Proceso</strong></dt>
        <dd>{item.tipoProceso}</dd>
        <dt><strong>Frecuencia</strong></dt>
        <dd>{item.frecuenciaId}</dd>
        <dt><strong>Rol ID</strong></dt>
        <dd>{item.rolId ?? '-'}</dd>
        <dt><strong>Nombre</strong></dt>
        <dd>{item.nombre ?? '-'}</dd>
        <dt><strong>Descripción</strong></dt>
        <dd>{item.busquedaCpr ?? '-'}</dd>
        <dt><strong>Activo</strong></dt>
      </dl>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button type="button" data-testid="procesos-procesosdialog-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && (
          <button type="button" data-testid="procesos-procesosdialog-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(String(item.id))}>
            Eliminar
          </button>
        )}
        {onBack && <button type="button" data-testid="procesos-procesosdialog-detail-back" onClick={onBack}>Volver</button>}
      </div>
    </section>
  );
};
