import React from 'react';
import { RubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';
import { Table } from '../../../../../../shared';

interface RubrosRubrosdialogListProps {
  items: RubrosRubrosdialog[];
  loading?: boolean;
  onSelect?: (item: RubrosRubrosdialog) => void;
  onDelete?: (id: string) => void;
  onView?: (item: RubrosRubrosdialog) => void;
  onEdit?: (item: RubrosRubrosdialog) => void;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (nextPage: number) => void;
}

export const RubrosRubrosdialogList: React.FC<RubrosRubrosdialogListProps> = ({
  items,
  loading,
  onSelect,
  onDelete,
  onView,
  onEdit,
  page = 0,
  pageSize = 10,
  totalItems,
  onPageChange,
}) => {
  const columns = [
    { key: 'idRubro', header: 'ID', accessor: 'idRubro' as const },
    { key: 'nombre', header: 'Nombre', render: (item: RubrosRubrosdialog) => item.nombre || '-' },
    { key: 'ambito', header: 'Ambito', render: (item: RubrosRubrosdialog) => item.ambito || '-' },
    { key: 'efecto', header: 'Efecto', render: (item: RubrosRubrosdialog) => item.efecto || '-' },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: RubrosRubrosdialog) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {onView && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(event) => {
                event.stopPropagation();
                onView(item);
              }}
            >
              Ver
            </button>
          )}
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
                onDelete(item.idRubro);
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
    <div data-testid="rubros-rubrosdialog-list" style={{ display: 'grid', gap: '0.75rem' }}>
      <Table<RubrosRubrosdialog>
        items={items}
        columns={columns}
        loading={loading}
        emptyMessage="No se encontraron rubros."
        getRowKey={(item: RubrosRubrosdialog) => item.idRubro}
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
