import React from 'react';
import { RubrosRubrosdialog } from '../../../../domain/model/RubrosRubrosdialog';
import { Button, Table } from '@shared/index';

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
        <div className="flex flex-wrap gap-2">
          {onView && (
            <Button
              type="button"
              label="Ver"
              size="sm"
              variant="secondary"
              onClick={(event) => {
                event.stopPropagation();
                onView(item);
              }}
            />
          )}
          {onEdit && (
            <Button
              type="button"
              label="Editar"
              size="sm"
              onClick={(event) => {
                event.stopPropagation();
                onEdit(item);
              }}
            />
          )}
          {onDelete && (
            <Button
              type="button"
              label="Eliminar"
              size="sm"
              variant="outline"
              onClick={(event) => {
                event.stopPropagation();
                onDelete(item.idRubro);
              }}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div data-testid="rubros-rubrosdialog-list" className="grid gap-3">
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
        <div className="text-sm text-slate-500">
          Tip: haz click en una fila para ver el detalle.
        </div>
      )}
    </div>
  );
};
