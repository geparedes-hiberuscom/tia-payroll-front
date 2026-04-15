import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Button, Field, Form, SectionCard, inputClassName } from '@shared/index';
import { CatalogOption, useRubrosCatalogs } from '../hooks/useRubrosCatalogs';
import { AsignacionFormState } from '../hooks/rubrosxprocesodialogPage.types';

interface RubrosxprocesodialogFormProps {
  methods: UseFormReturn<AsignacionFormState>;
  rubros: CatalogOption[];
  procesos: CatalogOption[];
  loading: boolean;
  fixedProcesoId?: number | null;
  fixedProcesoNombre?: string;
  isEditMode: boolean;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onSubmit: SubmitHandler<AsignacionFormState>;
  onLoadSelected: () => void;
  onReset: () => void;
}

export const RubrosxprocesodialogForm: React.FC<RubrosxprocesodialogFormProps> = ({
  methods,
  rubros,
  procesos,
  loading,
  fixedProcesoId,
  fixedProcesoNombre,
  isEditMode,
  getError,
  hasError,
  onSubmit,
  onLoadSelected,
  onReset,
}) => {
  const isProcesoLocked = Boolean(fixedProcesoId);
  const { procedimientos, loading: loadingProcedimientos } = useRubrosCatalogs({
    loadRubros: false,
    loadProcedimientos: true,
  });

  return (
    <SectionCard
      title="Definir rubro en proceso"
      description="Reemplaza la configuración tabular del legado por una captura directa con los mismos atributos operativos principales."
    >
      <Form
        methods={methods}
        onSubmit={onSubmit}
        id="rubrosxprocesodialog-form"
        data-testid="rubrosxprocesodialog-form"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-1"
      >
        {isProcesoLocked ? (
          <>
            <input type="hidden" {...methods.register('procesoId')} />
            <Field label="Proceso">
              <input
                type="text"
                className={inputClassName()}
                value={fixedProcesoNombre || 'Proceso seleccionado'}
                disabled
                readOnly
              />
            </Field>
          </>
        ) : (
          <Field label="Proceso" error={getError('procesoId')}>
            <select
              className={inputClassName(hasError('procesoId'))}
              disabled={loading}
              {...methods.register('procesoId')}
            >
              <option value="">Seleccione un proceso</option>
              {procesos.map((proceso) => (
                <option key={proceso.value} value={proceso.value}>
                  {proceso.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Rubro" error={getError('rubroId')}>
          <select
            className={inputClassName(hasError('rubroId'))}
            disabled={loading}
            {...methods.register('rubroId')}
          >
            <option value="">Seleccione un rubro</option>
            {rubros.map((rubro) => (
              <option key={rubro.value} value={rubro.value}>
                {rubro.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Secuencia">
          <input
            type="number"
            min={1}
            className={inputClassName()}
            disabled={loading}
            {...methods.register('secuencia')}
          />
        </Field>

        <Field label="Frecuencia de ejecución">
          <select
            className={inputClassName()}
            disabled={loading}
            {...methods.register('frecuenciaEjecucion')}
          >
            <option value="MENSUAL">Mensual</option>
            <option value="QUINCENAL">Quincenal</option>
            <option value="SEMANAL">Semanal</option>
            <option value="EVENTUAL">Eventual</option>
          </select>
        </Field>

        <Field label="Procedimiento cálculo">
          <select
            className={inputClassName()}
            disabled={loading || loadingProcedimientos}
            {...methods.register('procedimientoCalculo')}
          >
            <option value="">Seleccione un procedimiento</option>
            {procedimientos.map((procedimiento) => (
              <option key={procedimiento.value} value={procedimiento.value}>
                {procedimiento.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Ámbito ejecución">
          <select
            className={inputClassName()}
            disabled={loading}
            {...methods.register('ambitoEjecucion')}
          >
            <option value="NA">NA</option>
            <option value="IDO">IDO</option>
            <option value="PTM">PTM</option>
            <option value="AP">AP</option>
          </select>
        </Field>

        <Field label="Estado">
          <select
            className={inputClassName()}
            disabled={loading}
            {...methods.register('estado')}
          >
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
            <option value="BORRADOR">Borrador</option>
          </select>
        </Field>

        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
              disabled={loading}
              {...methods.register('activo')}
            />
            Registro activo
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
              disabled={loading}
              {...methods.register('insertaEnLote')}
            />
            Inserta en lote
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-sky-600"
              disabled={loading}
              {...methods.register('validaPlantillaContable')}
            />
            Valida plantilla contable
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit" label={isEditMode ? 'Actualizar' : 'Guardar'} isLoading={loading} />
          <Button label="Cargar selección" variant="secondary" disabled={!isEditMode || loading} onClick={onLoadSelected} />
          <Button label="Cancelar" variant="ghost" onClick={onReset} disabled={loading} />
        </div>
      </Form>
    </SectionCard>
  );
};
