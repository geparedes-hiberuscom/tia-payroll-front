import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';
import { CreateProcesosProcesosdialog, UpdateProcesosProcesosdialog, ProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';

interface ProcesosProcesosdialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ProcesosProcesosdialog;
  onSubmit: (data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog) => void;
  onCancel?: () => void;
  loading?: boolean;
  readOnly?: boolean;
}

interface ProcesosProcesosdialogFormValues {
  empresaId: string;
  tipoProceso: string;
  frecuencia: string;
  rolId: string;
  spEjecucion: string;
  spReversion: string;
  spContabilizacion: string;
  spSalvarHistoricos: string;
  busquedaCpr: string;
  procesoSecurityId: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export const ProcesosProcesosdialogForm: React.FC<ProcesosProcesosdialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  readOnly = false,
}) => {
  const isEditMode = !!initialData;
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(readOnly);
  const methods = useForm<ProcesosProcesosdialogFormValues>({
    defaultValues: {
      empresaId: '',
      tipoProceso: '',
      frecuencia: '',
      rolId: '',
      spEjecucion: '',
      spReversion: '',
      spContabilizacion: '',
      spSalvarHistoricos: '',
      busquedaCpr: '',
      procesoSecurityId: '',
      nombre: '',
      descripcion: '',
      activo: true,
    },
  });

  useEffect(() => {
    setIsReadOnlyMode(readOnly);
  }, [readOnly]);

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        empresaId: '',
        tipoProceso: '',
        frecuencia: '',
        rolId: '',
        spEjecucion: '',
        spReversion: '',
        spContabilizacion: '',
        spSalvarHistoricos: '',
        busquedaCpr: '',
        procesoSecurityId: '',
        nombre: '',
        descripcion: '',
        activo: true,
      });
      return;
    }

    methods.reset({
      empresaId: String(initialData.empresaId),
      tipoProceso: initialData.tipoProceso,
      frecuencia: initialData.frecuencia ?? '',
      rolId: initialData.rolId !== undefined ? String(initialData.rolId) : '',
      spEjecucion: initialData.spEjecucion ?? '',
      spReversion: initialData.spReversion ?? '',
      spContabilizacion: initialData.spContabilizacion ?? '',
      spSalvarHistoricos: initialData.spSalvarHistoricos ?? '',
      busquedaCpr: initialData.busquedaCpr ?? '',
      procesoSecurityId: initialData.procesoSecurityId !== undefined ? String(initialData.procesoSecurityId) : '',
      nombre: initialData.nombre ?? '',
      descripcion: initialData.descripcion ?? '',
      activo: initialData.activo ?? true,
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: ProcesosProcesosdialogFormValues) => {
    if (isReadOnlyMode) {
      return;
    }

    if (isEditMode) {
      onSubmit({
        empresaId: Number(formValues.empresaId),
        tipoProceso: formValues.tipoProceso.trim(),
        frecuencia: formValues.frecuencia.trim() || undefined,
        rolId: formValues.rolId ? Number(formValues.rolId) : undefined,
        spEjecucion: formValues.spEjecucion.trim() || undefined,
        spReversion: formValues.spReversion.trim() || undefined,
        spContabilizacion: formValues.spContabilizacion.trim() || undefined,
        spSalvarHistoricos: formValues.spSalvarHistoricos.trim() || undefined,
        busquedaCpr: formValues.busquedaCpr.trim() || undefined,
        procesoSecurityId: formValues.procesoSecurityId ? Number(formValues.procesoSecurityId) : undefined,
        nombre: formValues.nombre.trim() || undefined,
        descripcion: formValues.descripcion.trim() || undefined,
        activo: formValues.activo,
      } as UpdateProcesosProcesosdialog);
      return;
    }

    onSubmit({
      empresaId: Number(formValues.empresaId),
      tipoProceso: formValues.tipoProceso.trim(),
      frecuencia: formValues.frecuencia.trim() || undefined,
      rolId: formValues.rolId ? Number(formValues.rolId) : undefined,
      spEjecucion: formValues.spEjecucion.trim() || undefined,
      spReversion: formValues.spReversion.trim() || undefined,
      spContabilizacion: formValues.spContabilizacion.trim() || undefined,
      spSalvarHistoricos: formValues.spSalvarHistoricos.trim() || undefined,
      busquedaCpr: formValues.busquedaCpr.trim() || undefined,
      procesoSecurityId: formValues.procesoSecurityId ? Number(formValues.procesoSecurityId) : undefined,
      nombre: formValues.nombre.trim() || undefined,
      descripcion: formValues.descripcion.trim() || undefined,
    } as CreateProcesosProcesosdialog);
  };

  const readOnlyFormStyle = isReadOnlyMode
    ? {
        backgroundColor: '#f9fafb',
      }
    : {};

  return (
    <Form
      methods={methods}
      onSubmit={handleSubmit}
      data-testid="procesos-procesosdialog-form"
      style={{ display: 'grid', gap: '0.75rem', maxWidth: 640, marginBottom: '1rem', ...readOnlyFormStyle }}
    >
      <h3>{isEditMode ? 'Editar proceso' : 'Crear proceso'}</h3>
      {isReadOnlyMode && (
        <div
          data-testid="procesos-procesosdialog-readonly-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            width: 'fit-content',
            padding: '0.2rem 0.6rem',
            borderRadius: 999,
            backgroundColor: '#e5e7eb',
            color: '#374151',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          Solo lectura
        </div>
      )}

      <label className="form-field">
        Empresa ID
        <input
          data-testid="procesos-procesosdialog-empresaid"
          {...methods.register('empresaId', {
            required: 'Empresa ID es obligatorio',
            validate: (value) => !Number.isNaN(Number(value)) || 'Debe ser un número',
          })}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>
      {methods.formState.errors.empresaId && <p className="field-error">{methods.formState.errors.empresaId.message}</p>}

      <label className="form-field">
        Tipo de proceso
        <input
          data-testid="procesos-procesosdialog-tipoproceso"
          {...methods.register('tipoProceso', { required: 'Tipo de proceso es obligatorio' })}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>
      {methods.formState.errors.tipoProceso && <p className="field-error">{methods.formState.errors.tipoProceso.message}</p>}

      <label className="form-field">
        Frecuencia
        <input
          data-testid="procesos-procesosdialog-frecuencia"
          {...methods.register('frecuencia')}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>

      <label className="form-field">
        Rol ID
        <input
          data-testid="procesos-procesosdialog-rolid"
          {...methods.register('rolId', {
            validate: (value) => !value || !Number.isNaN(Number(value)) || 'Debe ser un número',
          })}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>
      {methods.formState.errors.rolId && <p className="field-error">{methods.formState.errors.rolId.message}</p>}

      <label className="form-field">
        SP Ejecución
        <input data-testid="procesos-procesosdialog-spejecucion" {...methods.register('spEjecucion')} disabled={Boolean(loading) || isReadOnlyMode} />
      </label>

      <label className="form-field">
        SP Reversión
        <input data-testid="procesos-procesosdialog-spreversion" {...methods.register('spReversion')} disabled={Boolean(loading) || isReadOnlyMode} />
      </label>

      <label className="form-field">
        SP Contabilización
        <input
          data-testid="procesos-procesosdialog-spcontabilizacion"
          {...methods.register('spContabilizacion')}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>

      <label className="form-field">
        SP Salvar Históricos
        <input
          data-testid="procesos-procesosdialog-spsalvarhistoricos"
          {...methods.register('spSalvarHistoricos')}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>

      <label className="form-field">
        Búsqueda CPR
        <input data-testid="procesos-procesosdialog-busquedacpr" {...methods.register('busquedaCpr')} disabled={Boolean(loading) || isReadOnlyMode} />
      </label>

      <label className="form-field">
        Proceso Security ID
        <input
          data-testid="procesos-procesosdialog-procesosecurityid"
          {...methods.register('procesoSecurityId', {
            validate: (value) => !value || !Number.isNaN(Number(value)) || 'Debe ser un número',
          })}
          disabled={Boolean(loading) || isReadOnlyMode}
        />
      </label>
      {methods.formState.errors.procesoSecurityId && <p className="field-error">{methods.formState.errors.procesoSecurityId.message}</p>}

      <label className="form-field">
        Nombre
        <input data-testid="procesos-procesosdialog-nombre" {...methods.register('nombre')} disabled={Boolean(loading) || isReadOnlyMode} />
      </label>

      <label className="form-field">
        Descripción
        <textarea data-testid="procesos-procesosdialog-descripcion" {...methods.register('descripcion')} disabled={Boolean(loading) || isReadOnlyMode} rows={3} />
      </label>

      <label className="form-field" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="checkbox"
          {...methods.register('activo')}
          disabled={Boolean(loading) || isReadOnlyMode}
          data-testid="procesos-procesosdialog-activo"
          style={{ width: 'auto' }}
        />
        Activo
      </label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {!isReadOnlyMode && (
          <button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </button>
        )}
        {isReadOnlyMode && isEditMode && (
          <button
            type="button"
            data-testid="procesos-procesosdialog-enable-edit"
            onClick={() => setIsReadOnlyMode(false)}
            disabled={loading}
          >
            Editar
          </button>
        )}
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </Form>
  );
};
