import React, { useMemo } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Field,
  Form,
  SectionCard,
  inputClassName,
} from '@shared/index';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { CargaProcesoFormState } from '../hooks/rubrosidocargaxprocesoPage.types';

interface RubrosidocargaxprocesoFormProps {
  methods: UseFormReturn<CargaProcesoFormState>;
  procesos: CatalogOption[];
  loading: boolean;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onSearch: SubmitHandler<CargaProcesoFormState>;
  onReset: () => void;
}

export const RubrosidocargaxprocesoForm: React.FC<RubrosidocargaxprocesoFormProps> = ({
  methods,
  procesos,
  loading,
  getError,
  hasError,
  onSearch,
  onReset,
}) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = useMemo(
    () => Array.from({ length: 5 }, (_, i) => currentYear - i),
    [currentYear],
  );
  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: String(i + 1).padStart(2, '0'),
        label: new Date(2000, i, 1).toLocaleString('es-ES', { month: 'long' }),
      })),
    [],
  );

  return (
    <SectionCard
      title="Consultar rubros cargados por proceso"
      description="Ingrese los filtros para visualizar los rubros aplicados en el período especificado"
    >
      <Form
        methods={methods}
        onSubmit={onSearch}
        id="rubrosidocargaxproceso-form"
        data-testid="rubrosidocargaxproceso-form"
        className="grid gap-4 md:grid-cols-1"
      >
        <Field label="Proceso *" error={getError('procesoId')}>
          <select
            className={inputClassName(hasError('procesoId'))}
            disabled={loading}
            {...methods.register('procesoId')}
          >
            <option value="">Seleccione un proceso de nómina</option>
            {procesos.map((proceso) => (
              <option key={proceso.value} value={proceso.value}>
                {proceso.label}
                {proceso.subtitle && ` · ${proceso.subtitle}`}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Año *" error={getError('anio')}>
            <select
              className={inputClassName(hasError('anio'))}
              disabled={loading}
              {...methods.register('anio')}
            >
              <option value="">Seleccione año</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Mes *" error={getError('mes')}>
            <select
              className={inputClassName(hasError('mes'))}
              disabled={loading}
              {...methods.register('mes')}
            >
              <option value="">Seleccione mes</option>
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label} ({month.value})
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            label="Buscar"
            form="rubrosidocargaxproceso-form"
            isLoading={loading}
            className="flex-1"
          />
          <Button
            type="button"
            label="Limpiar"
            variant="secondary"
            onClick={onReset}
            className="flex-1"
          />
        </div>
      </Form>
    </SectionCard>
  );
};
