import React from 'react';
import {
  Button,
  Table,
  formatDateLabel,
  formatNumberLabel,
  renderStatusBadge,
} from '@shared/index';

interface RubrosidomainListProps {
  items: any[];
  loading: boolean;
  page: number;
  totalElements: number;
  onPageChange: (nextPage: number) => void;
  onRowClick: (item: any) => void;
  onDelete: (itemId: number) => void;
}

export const RubrosidomainList: React.FC<
  RubrosidomainListProps
> = ({ items, loading, page, totalElements, onPageChange, onRowClick, onDelete }) => {
  return (
    <Table
      items={items}
      loading={loading}
      page={page}
      pageSize={10}
      totalItems={totalElements}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      getRowKey={(item) => item.id}
      columns={[
        {
          key: 'id',
          header: 'ID',
          render: (item) => <span className="font-medium text-slate-700">#{item.id}</span>,
        },
        {
          key: 'colaborador',
          header: 'Colaborador',
          render: (item) => item.nombreColaborador || String(item.colaboradorId),
        },
        {
          key: 'rubro',
          header: 'Rubro',
          render: (item) => item.nombreRubro || item.rubroId,
        },
        {
          key: 'tipo',
          header: 'Aplicación',
          align: 'right' as const,
          render: (item) => formatNumberLabel(item.tipoComportamiento),
        },
        {
          key: 'valor01',
          header: 'Valor 01',
          align: 'right' as const,
          render: (item) => formatNumberLabel(item.valor01),
        },
        {
          key: 'valor02',
          header: 'Valor 02',
          align: 'right' as const,
          render: (item) => formatNumberLabel(item.valor02),
        },
        {
          key: 'desde',
          header: 'Desde',
          render: (item) => formatDateLabel(item.fechaDesde),
        },
        {
          key: 'hasta',
          header: 'Hasta',
          render: (item) => formatDateLabel(item.fechaHasta),
        },
        {
          key: 'estado',
          header: 'Estado',
          render: (item) => renderStatusBadge(item.estado),
        },
        {
          key: 'acciones',
          header: 'Acciones',
          render: (item) => (
            <div
              className="flex justify-end gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <Button
                label="Eliminar"
                size="sm"
                variant="ghost"
                onClick={() => void onDelete(item.id)}
              />
            </div>
          ),
        },
      ]}
    />
  );
};
