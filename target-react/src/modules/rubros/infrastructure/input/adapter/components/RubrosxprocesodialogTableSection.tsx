import React from 'react';
import {
  Button,
  Field,
  SectionCard,
  Table,
  formatDateLabel,
  formatNumberLabel,
  inputClassName,
  renderStatusBadge,
} from '@shared/index';
import { Rubrosxprocesodialog } from '@modules/rubros/domain/model/Rubrosxprocesodialog';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { AsignacionFilterState } from '../hooks/rubrosxprocesodialogPage.types';

interface RubrosxprocesodialogTableSectionProps {
  items: Rubrosxprocesodialog[];
  loading: boolean;
  page: number;
  totalElements: number;
  rubros: CatalogOption[];
  procesos: CatalogOption[];
  filters: AsignacionFilterState;
  fixedProcesoId?: number | null;
  onSelectItem: (itemId: number) => void;
  onEditItem: (item: Rubrosxprocesodialog) => void;
  onDeleteItem: (itemId: number) => void;
  onFilterChange: <K extends keyof AsignacionFilterState>(field: K, value: AsignacionFilterState[K]) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onPageChange: (nextPage: number) => void;
}

export const RubrosxprocesodialogTableSection: React.FC<RubrosxprocesodialogTableSectionProps> = ({
  items,
  loading,
  page,
  totalElements,
  rubros,
  procesos,
  filters,
  fixedProcesoId,
  onSelectItem,
  onEditItem,
  onDeleteItem,
  onFilterChange,
  onApplyFilters,
  onResetFilters,
  onPageChange,
}) => {
  const isProcesoLocked = Boolean(fixedProcesoId);

  const columns = [
    ...(!isProcesoLocked
      ? [{ key: 'proceso', header: 'Proceso', render: (item: Rubrosxprocesodialog) => item.procesoNombre || String(item.procesoId) }]
      : []),
    { key: 'rubro', header: 'Rubro', render: (item: Rubrosxprocesodialog) => item.rubroNombre || item.rubroId },
    {
      key: 'secuencia',
      header: 'Secuencia',
      align: 'right' as const,
      render: (item: Rubrosxprocesodialog) => formatNumberLabel(item.secuencia),
    },
    {
      key: 'frecuencia',
      header: 'Frecuencia',
      render: (item: Rubrosxprocesodialog) => item.frecuenciaEjecucion || 'No definida',
    },
    { key: 'ambito', header: 'Ámbito', render: (item: Rubrosxprocesodialog) => renderStatusBadge(item.ambitoEjecucion) },
    { key: 'estado', header: 'Estado', render: (item: Rubrosxprocesodialog) => renderStatusBadge(item.estado) },
    {
      key: 'contable',
      header: 'Plantilla contable',
      render: (item: Rubrosxprocesodialog) => (item.validaPlantillaContable === 'S' ? 'Sí' : 'No'),
    },
    {
      key: 'actualizacion',
      header: 'Actualización',
      render: (item: Rubrosxprocesodialog) => formatDateLabel(item.fechaActualizacion || item.fechaIngreso),
    },
    {
      key: 'acciones',
      header: 'Acciones',
      render: (item: Rubrosxprocesodialog) => (
        <div className="flex justify-end gap-2" onClick={(event) => event.stopPropagation()}>
          <Button
            label="Editar"
            size="sm"
            variant="secondary"
            onClick={() => onEditItem(item)}
          />
          <Button
            label="Eliminar"
            size="sm"
            variant="ghost"
            onClick={() => onDeleteItem(item.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <SectionCard
      title="Asignaciones actuales"
      description="Filtre por proceso o rubro y gestione el detalle operativo desde una tabla orientada a secuencia y control contable."
    >
      <div className="mb-5 grid gap-4 lg:grid-cols-3">
        {!isProcesoLocked ? (
          <Field label="Proceso">
            <select
              value={filters.procesoId}
              onChange={(event) => onFilterChange('procesoId', event.target.value)}
              className={inputClassName()}
            >
              <option value="">Todos</option>
              {procesos.map((proceso) => (
                <option key={proceso.value} value={proceso.value}>
                  {proceso.label}
                </option>
              ))}
            </select>
          </Field>
        ) : null}

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

        <div className="flex items-end gap-3">
          <Button label="Aplicar" onClick={onApplyFilters} className="w-full" />
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
        onRowClick={(item) => onSelectItem(item.id)}
        getRowKey={(item) => item.id}
        columns={columns}
      />
    </SectionCard>
  );
};
