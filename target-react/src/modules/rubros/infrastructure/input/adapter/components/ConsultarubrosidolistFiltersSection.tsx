import React from 'react';
import { Button, Field, SectionCard, inputClassName } from '@shared/index';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { ConsultaFilterState } from '../hooks/consultarubrosidolistPage.types';

interface EmpresaOption {
  iidempresa: number;
  vempresanl: string;
}

interface SelectedConsultaItem {
  id: number;
  nombreColaborador?: string;
  colaboradorId?: number;
  nombreRubro?: string;
  rubroId: string;
}

interface ConsultarubrosidolistFiltersSectionProps {
  filters: ConsultaFilterState;
  empresas: EmpresaOption[];
  rubros: CatalogOption[];
  nextEstado: string;
  estadoOptions: string[];
  selectedItem: SelectedConsultaItem | null;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onFilterChange: <K extends keyof ConsultaFilterState>(field: K, value: ConsultaFilterState[K]) => void;
  onSearch: () => void;
  onReset: () => void;
  onNextEstadoChange: (estado: string) => void;
  onApplyEstado: () => void;
}

export const ConsultarubrosidolistFiltersSection: React.FC<ConsultarubrosidolistFiltersSectionProps> = ({
  filters,
  empresas,
  rubros,
  nextEstado,
  estadoOptions,
  selectedItem,
  getError,
  hasError,
  onFilterChange,
  onSearch,
  onReset,
  onNextEstadoChange,
  onApplyEstado,
}) => {
  return (
    <SectionCard title="Filtros de negocio" description="Replica la búsqueda operativa del legado: empresa, localidad, colaborador, rubro y fecha efectiva.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        <Field label="Empresa" error={getError('empresaId')}>
          <select
            value={filters.empresaId}
            onChange={(event) => onFilterChange('empresaId', event.target.value)}
            className={inputClassName(hasError('empresaId'))}
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.iidempresa} value={empresa.iidempresa}>
                {empresa.vempresanl}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Localidad" hint="Ingrese el identificador cuando quiera acotar el alcance del usuario.">
          <input
            type="text"
            value={filters.localidadId}
            onChange={(event) => onFilterChange('localidadId', event.target.value)}
            className={inputClassName()}
            placeholder="Ej. 12"
          />
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

        <Field label="Colaborador" hint="Use el identificador interno si necesita una auditoría puntual.">
          <input
            type="text"
            value={filters.colaboradorId}
            onChange={(event) => onFilterChange('colaboradorId', event.target.value)}
            className={inputClassName()}
            placeholder="Ej. 100245"
          />
        </Field>

        <Field label="Fecha de consulta">
          <input
            type="date"
            value={filters.fecha}
            onChange={(event) => onFilterChange('fecha', event.target.value)}
            className={inputClassName()}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button label="Aplicar filtros" onClick={onSearch} />
        <Button label="Limpiar" variant="secondary" onClick={onReset} />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Acción rápida sobre el registro seleccionado</h3>
        <p className="mt-1 text-sm text-slate-500">Permite actualizar el estado operativo del rubro consultado.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <select value={nextEstado} onChange={(event) => onNextEstadoChange(event.target.value)} className={inputClassName()}>
            {estadoOptions.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <Button label="Actualizar estado" disabled={!selectedItem} onClick={onApplyEstado} />
        </div>
        {selectedItem ? (
          <p className="mt-3 text-xs text-slate-500">
            Registro activo: #{selectedItem.id} · {selectedItem.nombreColaborador || selectedItem.colaboradorId} · {selectedItem.nombreRubro || selectedItem.rubroId}
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
};
