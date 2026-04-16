import React from 'react';
import {
  Button,
  Field,
  SectionCard,
  Table,
  formatDateLabel,
  inputClassName,
  renderStatusBadge,
} from '@shared/index';
import { Cargarubrosido } from '../../../../domain/model/Cargarubrosido';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { CargaFilterState } from '../hooks/cargarubrosidoPage.types';

interface EmpresaOption {
  iidempresa: number;
  vempresanl: string;
}

interface CargarubrosidoListProps {
  items: Cargarubrosido[];
  loading: boolean;
  page: number;
  totalElements: number;
  empresas: EmpresaOption[];
  rubros: CatalogOption[];
  filters: CargaFilterState;
  onFilterChange: <K extends keyof CargaFilterState>(field: K, value: CargaFilterState[K]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onPageChange: (nextPage: number) => void;
  onSelectCarga: (item: Cargarubrosido) => void;
  onApprove: (itemId: number) => void;
  onDelete: (itemId: number) => void;
}

export const CargarubrosidoList: React.FC<CargarubrosidoListProps> = ({
  items,
  loading,
  page,
  totalElements,
  empresas,
  rubros,
  filters,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onPageChange,
  onSelectCarga,
  onApprove,
  onDelete,
}) => {
  return (
    <SectionCard
      title="Histórico operativo"
      description="Filtre, apruebe y elimine cargas desde la misma vista. Al seleccionar una fila se habilita el detalle de líneas procesadas."
    >
      <div className="mb-5 grid gap-4 lg:grid-cols-4">
        <Field label="Empresa">
          <select
            value={filters.empresaId}
            onChange={(event) => onFilterChange('empresaId', event.target.value)}
            className={inputClassName()}
          >
            <option value="">Todas</option>
            {empresas.map((empresa) => (
              <option key={empresa.iidempresa} value={empresa.iidempresa}>
                {empresa.vempresanl}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Rubro">
          <select
            value={filters.rubroId}
            onChange={(event) => onFilterChange('rubroId', event.target.value)}
            className={inputClassName()}
          >
            <option value="">Todos</option>
            {rubros.map((rubro) => (
              <option key={rubro.value} value={rubro.value}>
                {rubro.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estado">
          <select
            value={filters.estado}
            onChange={(event) => onFilterChange('estado', event.target.value)}
            className={inputClassName()}
          >
            <option value="">Todos</option>
            <option value="P">Por aprobar</option>
            <option value="A">Aprobado</option>
            <option value="E">Error</option>
          </select>
        </Field>

        <div className="flex items-end gap-3">
          <Button label="Buscar" onClick={onApplyFilters} className="w-full" />
          <Button label="Reset" variant="secondary" onClick={onResetFilters} className="w-full" />
        </div>
      </div>

      <Table
        items={items}
        loading={loading}
        page={page}
        pageSize={10}
        totalItems={totalElements}
        onPageChange={onPageChange}
        onRowClick={onSelectCarga}
        getRowKey={(item) => item.id}
        columns={[
          { key: 'id', header: 'ID', render: (item) => <span className="font-medium text-slate-700">#{item.id}</span> },
          { key: 'archivo', header: 'Archivo', render: (item) => item.nombreArchivo || 'Sin nombre' },
          { key: 'rubro', header: 'Rubro', render: (item) => item.rubroId || item.vidrubro || 'No asociado' },
          { key: 'ambito', header: 'Ámbito', render: (item) => renderStatusBadge(item.ambito || item.vidambito) },
          { key: 'estado', header: 'Estado', render: (item) => renderStatusBadge(item.estado) },
          { key: 'fecha', header: 'Fecha', render: (item) => formatDateLabel(item.fechaCarga || item.fechaAplica) },
          {
            key: 'acciones',
            header: 'Acciones',
            render: (item) => (
              <div className="flex flex-wrap justify-end gap-2" onClick={(event) => event.stopPropagation()}>
                <Button
                  label="Aprobar"
                  size="sm"
                  variant="secondary"
                  disabled={item.estado?.toUpperCase() === 'APROBADO'}
                  onClick={() => onApprove(item.id)}
                />
                <Button label="Eliminar" size="sm" variant="ghost" onClick={() => onDelete(item.id)} />
              </div>
            ),
          },
        ]}
      />
    </SectionCard>
  );
};
