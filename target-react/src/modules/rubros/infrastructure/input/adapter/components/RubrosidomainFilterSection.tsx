import React from 'react';
import { Button, Field, inputClassName } from '@shared/index';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { RubroIDOFilterState } from '../hooks/rubrosidomainPage.types';

interface Empresa {
  iidempresa: number;
  vempresanl: string;
}

interface RubrosidomainFilterSectionProps {
  filters: RubroIDOFilterState;
  empresas: Empresa[];
  rubros: CatalogOption[];
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onFilterChange: <K extends keyof RubroIDOFilterState>(field: K, value: RubroIDOFilterState[K]) => void;
  onSearch: () => void;
  onReset: () => void;
}

export const RubrosidomainFilterSection: React.FC<
  RubrosidomainFilterSectionProps
> = ({ filters, empresas, rubros, getError, hasError, onFilterChange, onSearch, onReset }) => {
  return (
    <div className="mb-5 grid gap-4 lg:grid-cols-3">
      <Field label="Empresa" error={getError('empresaId')}>
        <select
          value={filters.empresaId}
          onChange={(event) => onFilterChange('empresaId', event.target.value)}
          className={inputClassName(hasError('empresaId'))}
        >
          <option value="">Seleccione empresa</option>
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

      <Field label="Colaborador ID">
        <input
          type="text"
          value={filters.colaboradorId}
          onChange={(event) => onFilterChange('colaboradorId', event.target.value)}
          className={inputClassName()}
          placeholder="Ej. 100245"
        />
      </Field>

      <Field label="Estado">
        <select
          value={filters.estado}
          onChange={(event) => onFilterChange('estado', event.target.value)}
          className={inputClassName()}
        >
          <option value="">Todos</option>
          <option value="ACTIVO">Activo</option>
          <option value="INACTIVO">Inactivo</option>
          <option value="ANULADO">Anulado</option>
        </select>
      </Field>

      <Field label="Desde">
        <input
          type="date"
          value={filters.fechaDesde}
          onChange={(event) => onFilterChange('fechaDesde', event.target.value)}
          className={inputClassName()}
        />
      </Field>

      <Field label="Hasta">
        <input
          type="date"
          value={filters.fechaHasta}
          onChange={(event) => onFilterChange('fechaHasta', event.target.value)}
          className={inputClassName()}
        />
      </Field>

      <div className="lg:col-span-3 flex flex-wrap gap-3">
        <Button label="Buscar" onClick={onSearch} />
        <Button label="Reset" variant="secondary" onClick={onReset} />
      </div>
    </div>
  );
};
