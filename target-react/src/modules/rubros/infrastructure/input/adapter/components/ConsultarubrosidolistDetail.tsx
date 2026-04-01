import React from 'react';
import { Consultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';

interface ConsultarubrosidolistDetailProps {
  item: Consultarubrosidolist;
  onEdit?: (item: Consultarubrosidolist) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export const ConsultarubrosidolistDetail: React.FC<ConsultarubrosidolistDetailProps> = ({ item, onEdit, onDelete, onBack }) => {
  return (
    <section data-testid="consultarubrosidolist-detail" style={{ maxWidth: 720 }}>
      <h2>Detalle consulta rubro IDO</h2>
      <dl>
        <dt>ID</dt><dd>{item.id}</dd>
        <dt>Rubro</dt><dd>{item.rubroId}</dd>
        <dt>Colaborador</dt><dd>{item.colaboradorId}</dd>
        <dt>Tipo Comportamiento</dt><dd>{item.tipoComportamiento}</dd>
        <dt>Valor</dt><dd>{item.valor01}</dd>
        <dt>Estado</dt><dd>{item.estado ?? 'N/A'}</dd>
        <dt>Periodo</dt><dd>{item.fechaDesde ?? 'N/A'} - {item.fechaHasta ?? 'N/A'}</dd>
      </dl>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {onEdit && <button type="button" data-testid="consultarubrosidolist-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
        {onDelete && <button type="button" data-testid="consultarubrosidolist-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.id)}>Eliminar</button>}
        {onBack && <button type="button" data-testid="consultarubrosidolist-detail-back" onClick={onBack}>Volver</button>}
      </div>
    </section>
  );
};
