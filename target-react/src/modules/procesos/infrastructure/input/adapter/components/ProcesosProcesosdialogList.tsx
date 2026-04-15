import React from 'react';
import { ProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';
import { Table } from '@shared/index';

type ProcesosProcesosdialogListProps = {
  items: ProcesosProcesosdialog[];
  loading?: boolean;
  onSelect?: (item: ProcesosProcesosdialog) => void;
  onDelete?: (id: string) => void;
  onEdit?: (item: ProcesosProcesosdialog) => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (nextPage: number) => void;
};

export const ProcesosProcesosdialogList: React.FC<ProcesosProcesosdialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onEdit,
  page = 0,
  pageSize = 10,
  totalItems,
  onPageChange,
}) => {
  const columns = [
    { key: 'id', header: 'ID', accessor: 'id' as const },
    { key: 'nombre', header: 'Nombre', render: (item: ProcesosProcesosdialog) => item.nombre ?? '-' },
    { key: 'tipoProceso', header: 'Tipo', accessor: 'tipoProceso' as const },
    { key: 'frecuencia', header: 'Frecuencia', accessor: 'frecuenciaId' as const },
    { key: 'empresaId', header: 'Empresa', accessor: 'empresaId' as const },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: ProcesosProcesosdialog) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onEdit && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={(event) => {
                event.stopPropagation();
                onEdit(item);
              }}
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(String(item.id));
              }}
            >
              Eliminar
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div data-testid="procesos-procesosdialog-list" style={{ display: 'grid', gap: '0.75rem' }}>
      <Table<ProcesosProcesosdialog>
        items={items}
        columns={columns}
        loading={loading}
        emptyMessage="No se encontraron elementos."
        getRowKey={(item: ProcesosProcesosdialog) => item.id}
        onRowClick={onSelect ? (item) => onSelect(item) : undefined}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={onPageChange}
        className="card"
      />
      {onSelect && (
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Tip: haz click en una fila para ver el detalle.
        </div>
      )}
    </div>
  );
};
