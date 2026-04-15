import React from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
  Button,
  Field,
  Form,
  SectionCard,
  inputClassName,
  textAreaClassName,
} from '@shared/index';
import { CatalogOption } from '../hooks/useRubrosCatalogs';
import { UploadFormState } from '../hooks/cargarubrosidoPage.types';

const tipoAPOptions = [
  { value: '1', label: 'Actualizacion de Datos de Rol' },
  { value: '2', label: 'Salario Variable' },
];

const bancoOptions = [
  { value: '1', label: 'Banco A' },
  { value: '2', label: 'Banco B' },
  { value: '100', label: 'EFE (Efectivo)' },
];

const tipoCuentaOptions = [
  { value: '1', label: 'Cuenta Corriente' },
  { value: '2', label: 'Cuenta Ahorros' },
  { value: '3', label: 'Efectivo' },
];

const tipoColaboradorOptions = [
  { value: '1', label: 'Activo' },
  { value: '2', label: 'Ex-empleado' },
];

interface EmpresaOption {
  iidempresa: number;
  vempresanl: string;
}

interface CargarubrosidoFormProps {
  methods: UseFormReturn<UploadFormState>;
  empresas: EmpresaOption[];
  rubros: CatalogOption[];
  loading: boolean;
  loadingEmpresas: boolean;
  loadingCatalogs: boolean;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  onFieldChange: <K extends keyof UploadFormState>(field: K, value: UploadFormState[K]) => void;
  onSubmit: SubmitHandler<UploadFormState>;
  onReset: () => void;
}

export const CargarubrosidoForm: React.FC<CargarubrosidoFormProps> = ({
  methods,
  empresas,
  rubros,
  loading,
  loadingEmpresas,
  loadingCatalogs,
  getError,
  hasError,
  onFieldChange,
  onSubmit,
  onReset,
}) => {
  const ambito = methods.watch('ambito');
  const tipoAP = methods.watch('tipoAP');
  const bancoId = methods.watch('bancoId');
  const showAPFields = ambito === 'AP';
  const showBancoFields = showAPFields && tipoAP === '1';

  return (
    <SectionCard
      title="Preparar archivo"
      description="Replica el flujo operativo de carga: empresa, ámbito, rubro, fecha de aplicación y archivo CSV."
      action={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">CSV delimitado por ;</span>}
    >
      <Form
        methods={methods}
        onSubmit={onSubmit}
        id="cargarubrosido-form"
        data-testid="cargarubrosido-form"
        className="grid gap-4 md:grid-cols-2"
      >
        <Field label="Empresa" error={getError('empresaId')}>
          <select
            className={inputClassName(hasError('empresaId'))}
            disabled={loadingEmpresas || loading}
            {...methods.register('empresaId')}
            onChange={(e) => onFieldChange('empresaId', e.target.value)}
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.iidempresa} value={empresa.iidempresa}>
                {empresa.vempresanl}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Ámbito" hint="IDO, PTM o AP condicionan el archivo recibido.">
          <select
            className={inputClassName()}
            disabled={loading}
            {...methods.register('ambito')}
            onChange={(e) => onFieldChange('ambito', e.target.value)}
          >
            <option value="IDO">IDO</option>
            <option value="PTM">PTM</option>
            <option value="AP">AP</option>
          </select>
        </Field>

        {showAPFields && (
          <Field label="Tipo AP" hint="Visible solo cuando el ámbito es AP.">
            <select
              className={inputClassName()}
              disabled={loading}
              {...methods.register('tipoAP')}
              onChange={(e) => onFieldChange('tipoAP', e.target.value)}
            >
              <option value="">Seleccione</option>
              {tipoAPOptions.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        {showBancoFields && (
          <Field label="Banco" hint="Opcional para Actualización de Datos de Rol.">
            <select
              className={inputClassName()}
              disabled={loading}
              {...methods.register('bancoId')}
              onChange={(e) => onFieldChange('bancoId', e.target.value)}
            >
              <option value="">Seleccione</option>
              {bancoOptions.map((banco) => (
                <option key={banco.value} value={banco.value}>
                  {banco.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        {showBancoFields && bancoId !== '100' && (
          <Field label="Tipo de Cuenta">
            <select
              className={inputClassName()}
              disabled={loading}
              {...methods.register('tipoCuenta')}
            >
              <option value="">Seleccione</option>
              {tipoCuentaOptions.map((tipoCuenta) => (
                <option key={tipoCuenta.value} value={tipoCuenta.value}>
                  {tipoCuenta.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        {showBancoFields && (
          <Field label="Tipo Colaborador">
            <select
              className={inputClassName()}
              disabled={loading}
              {...methods.register('tipoColaborador')}
            >
              <option value="">Seleccione</option>
              {tipoColaboradorOptions.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Rubro" hint="Opcional según el formato de carga configurado.">
          <select
            className={inputClassName()}
            disabled={loadingCatalogs || loading}
            {...methods.register('rubroId')}
          >
            <option value="">Todos o no aplica</option>
            {rubros.map((rubro) => (
              <option key={rubro.value} value={rubro.value}>
                {rubro.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Fecha de aplicación" error={getError('fechaAplica')}>
          <input
            type="date"
            className={inputClassName(hasError('fechaAplica'))}
            disabled={loading}
            {...methods.register('fechaAplica')}
          />
        </Field>

        <Field label="Período Filtro (Inicio)">
          <input
            type="date"
            className={inputClassName()}
            disabled={loading}
            {...methods.register('periodoInicio')}
          />
        </Field>

        <Field label="Período Filtro (Fin)">
          <input
            type="date"
            className={inputClassName()}
            disabled={loading}
            {...methods.register('periodoFin')}
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Archivo CSV" error={getError('archivo')} hint={methods.watch('archivo')?.name ?? 'Seleccione el archivo fuente'}>
            <input
              type="file"
              accept=".csv,text/csv"
              className={inputClassName(hasError('archivo'))}
              disabled={loading}
              {...methods.register('archivo')}
              onChange={(e) => onFieldChange('archivo', e.target.files?.[0] ?? null)}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Descripción" hint="Se persistirá junto al encabezado de la carga.">
            <input
              type="text"
              className={inputClassName()}
              placeholder="Carga quincenal abril"
              disabled={loading}
              {...methods.register('descripcion')}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Observaciones">
            <textarea
              className={textAreaClassName()}
              placeholder="Notas operativas, validaciones previas o referencias de la carga"
              disabled={loading}
              {...methods.register('observaciones')}
            />
          </Field>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit" label="Guardar carga" isLoading={loading} />
          <Button label="Limpiar" variant="secondary" onClick={onReset} disabled={loading} />
        </div>
      </Form>
    </SectionCard>
  );
}