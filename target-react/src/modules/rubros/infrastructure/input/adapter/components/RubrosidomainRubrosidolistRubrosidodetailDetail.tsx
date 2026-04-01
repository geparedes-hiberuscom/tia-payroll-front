import React from 'react';
import { RubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';

interface RubrosidomainRubrosidolistRubrosidodetailDetailProps {
  item: RubrosidomainRubrosidolistRubrosidodetail;
  onEdit?: (item: RubrosidomainRubrosidolistRubrosidodetail) => void;
  onDelete?: (id: number) => void;
  onBack?: () => void;
}

export const RubrosidomainRubrosidolistRubrosidodetailDetail: React.FC<RubrosidomainRubrosidolistRubrosidodetailDetailProps> = ({ item, onEdit, onDelete, onBack }) => (
  <section data-testid="rubrosidomain-detail" style={{ maxWidth: 720 }}>
    <h2>Detalle rubro IDO</h2>
    <dl>
      <dt>ID</dt><dd>{item.id}</dd>
      <dt>Rubro</dt><dd>{item.rubroId}</dd>
      <dt>Colaborador</dt><dd>{item.colaboradorId}</dd>
      <dt>Empresa</dt><dd>{item.empresaId}</dd>
      <dt>Tipo Comportamiento</dt><dd>{item.tipoComportamiento ?? 'N/A'}</dd>
      <dt>Valor 01</dt><dd>{item.valor01 ?? 'N/A'}</dd>
      <dt>Valor 02</dt><dd>{item.valor02 ?? 'N/A'}</dd>
      <dt>Valor 03</dt><dd>{item.valor03 ?? 'N/A'}</dd>
      <dt>Estado</dt><dd>{item.estado ?? 'N/A'}</dd>
      <dt>Periodo</dt><dd>{item.fechaDesde ?? 'N/A'} - {item.fechaHasta ?? 'N/A'}</dd>
    </dl>
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {onEdit && <button type="button" data-testid="rubrosidomain-detail-edit" onClick={() => onEdit(item)}>Editar</button>}
      {onDelete && <button type="button" data-testid="rubrosidomain-detail-delete" style={{ color: '#b91c1c' }} onClick={() => onDelete(item.id)}>Eliminar</button>}
      {onBack && <button type="button" data-testid="rubrosidomain-detail-back" onClick={onBack}>Volver</button>}
    </div>
  </section>
);
