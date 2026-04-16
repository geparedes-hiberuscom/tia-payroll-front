import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Button, Field, Form, SectionCard, inputClassName } from '@shared/index';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { RubroIDOFormState } from '../hooks/rubrosidomainPage.types';

interface Empresa {
  iidempresa: number;
  vempresanl: string;
}

interface RubrosidomainFormProps {
  methods: UseFormReturn<RubroIDOFormState>;
  empresas: Empresa[];
  rubros: CatalogOption[];
  loading: boolean;
  selectedItem: any | null;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onSave: SubmitHandler<RubroIDOFormState>;
  onCancel: () => void;
}

export const RubrosidomainForm: React.FC<
  RubrosidomainFormProps
> = ({ methods, empresas, rubros, loading, selectedItem, getError, hasError, onSave, onCancel }) => {
  return (
    <SectionCard
      title="Detalle Rubro IDO"
      description="Captura o edición directa de rubro IDO por colaborador, vigencia y tipo de aplicación."
    >
      <Form
        methods={methods}
        onSubmit={onSave}
        id="rubro-ido-detail-form"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-1"
      >
        <Field label="Empresa" error={getError('empresaId')}>
          <select
            className={inputClassName(hasError('empresaId'))}
            disabled={loading}
            {...methods.register('empresaId')}
          >
            <option value="">Seleccione empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.iidempresa} value={empresa.iidempresa}>
                {empresa.vempresanl}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Rubro" error={getError('rubroId')}>
          <select className={inputClassName(hasError('rubroId'))} disabled={loading} {...methods.register('rubroId')}>
            <option value="">Seleccione rubro</option>
            {rubros.map((rubro) => (
              <option key={rubro.value} value={rubro.value}>
                {rubro.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Colaborador ID" error={getError('colaboradorId')}>
          <input
            type="text"
            className={inputClassName(hasError('colaboradorId'))}
            disabled={loading}
            placeholder="Ej. 100245"
            {...methods.register('colaboradorId')}
          />
        </Field>

        <Field label="Tipo aplicación" error={getError('tipoComportamiento')}>
          <select
            className={inputClassName(hasError('tipoComportamiento'))}
            disabled={loading}
            {...methods.register('tipoComportamiento')}
          >
            <option value="1">Ingreso</option>
            <option value="2">Descuento</option>
            <option value="3">Informativo</option>
          </select>
        </Field>

        <Field label="Valor 01" error={getError('valor01')}>
          <input
            type="number"
            step="0.01"
            className={inputClassName(hasError('valor01'))}
            disabled={loading}
            placeholder="0.00"
            {...methods.register('valor01')}
          />
        </Field>

        <Field label="Valor 02">
          <input
            type="number"
            step="0.01"
            className={inputClassName()}
            disabled={loading}
            placeholder="Opcional"
            {...methods.register('valor02')}
          />
        </Field>

        <Field label="Fecha desde" error={getError('fechaDesde')}>
          <input
            type="date"
            className={inputClassName(hasError('fechaDesde'))}
            disabled={loading}
            {...methods.register('fechaDesde')}
          />
        </Field>

        <Field label="Fecha hasta" error={getError('fechaHasta')}>
          <input
            type="date"
            className={inputClassName(hasError('fechaHasta'))}
            disabled={loading}
            {...methods.register('fechaHasta')}
          />
        </Field>

        <Field label="Estado">
          <select
            className={inputClassName()}
            disabled={loading}
            {...methods.register('estado')}
          >
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
            <option value="ANULADO">Anulado</option>
          </select>
        </Field>

        <div className="mt-6 flex flex-wrap gap-3 md:col-span-2 xl:col-span-1">
          <Button
            type="submit"
            label={selectedItem ? 'Actualizar' : 'Guardar'}
            isLoading={loading}
          />
          <Button label="Cancelar" variant="ghost" onClick={onCancel} disabled={loading} />
        </div>
      </Form>
    </SectionCard>
  );
};
