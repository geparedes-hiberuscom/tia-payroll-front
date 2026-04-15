import React from 'react';
import {
  Button,
  SectionCard,
  Table,
  formatDateLabel,
  formatNumberLabel,
  renderStatusBadge,
} from '@shared/index';
import { Consultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';

interface ConsultarubrosidolistListProps {
  items: Consultarubrosidolist[];
  loading: boolean;
  page: number;
  totalElements: number;
  onPageChange: (nextPage: number) => void;
  onSelectItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

export const ConsultarubrosidolistList: React.FC<ConsultarubrosidolistListProps> = ({
  items,
  loading,
  page,
  totalElements,
  onPageChange,
  onSelectItem,
  onDeleteItem,
}) => {
  return (
    <SectionCard title="Resultados" description="Consulta consolidada con indicadores de origen, estado y envío para control operativo.">
      <Table
        items={items}
        loading={loading}
        page={page}
        pageSize={10}
        totalItems={totalElements}
        onPageChange={onPageChange}
        onRowClick={(item) => onSelectItem(item.id)}
        getRowKey={(item) => item.id}
        columns={[
          { key: 'codigo', header: 'Código', render: (item) => <span className="font-medium text-slate-700">#{item.id}</span> },
          { key: 'empleado', header: 'Empleado', render: (item) => item.nombreColaborador || String(item.colaboradorId) },
          { key: 'rubro', header: 'Rubro', render: (item) => item.nombreRubro || item.rubroId },
          { key: 'fecha', header: 'Fecha', render: (item) => formatDateLabel(item.fechaDesde) },
          { key: 'valor', header: 'Valor', align: 'right' as const, render: (item) => formatNumberLabel(item.valor01) },
          { key: 'origen', header: 'Origen', render: (item) => item.origen || 'No informado' },
          { key: 'envio', header: 'Envío', render: (item) => renderStatusBadge(item.flagEnvio === 1 ? 'ENVIADO' : 'PENDIENTE') },
          { key: 'estado', header: 'Estado', render: (item) => renderStatusBadge(item.estado || item.vstts) },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (item) => (
              <div className="flex justify-end gap-2" onClick={(event) => event.stopPropagation()}>
                <Button label="Eliminar" size="sm" variant="ghost" onClick={() => onDeleteItem(item.id)} />
              </div>
            ),
          },
        ]}
      />
    </SectionCard>
  );
};
