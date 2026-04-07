import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';
import { CreateRubrosxprocesodialog, Rubrosxprocesodialog, UpdateRubrosxprocesodialog } from '../../../../domain/model/Rubrosxprocesodialog';

interface RubrosxprocesodialogFormProps {
  initialData?: Rubrosxprocesodialog;
  onSubmit: (data: CreateRubrosxprocesodialog | UpdateRubrosxprocesodialog) => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface RubrosxprocesodialogFormValues {
  rubroId: string;
  procesoId: string;
  secuencia: string;
  frecuenciaEjecucion: string;
  activo: boolean;
}

export const RubrosxprocesodialogForm: React.FC<RubrosxprocesodialogFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const methods = useForm<RubrosxprocesodialogFormValues>({
    defaultValues: {
      rubroId: '',
      procesoId: '',
      secuencia: '',
      frecuenciaEjecucion: '',
      activo: true,
    },
  });

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        rubroId: '',
        procesoId: '',
        secuencia: '',
        frecuenciaEjecucion: '',
        activo: true,
      });
      return;
    }

    methods.reset({
      rubroId: initialData.rubroId,
      procesoId: String(initialData.procesoId),
      secuencia: initialData.secuencia ? String(initialData.secuencia) : '',
      frecuenciaEjecucion: initialData.frecuenciaEjecucion ?? '',
      activo: Boolean(initialData.activo),
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: RubrosxprocesodialogFormValues) => {
    if (isEditMode) {
      onSubmit({
        secuencia: formValues.secuencia ? Number(formValues.secuencia) : undefined,
        frecuenciaEjecucion: formValues.frecuenciaEjecucion.trim() || undefined,
        activo: formValues.activo,
      });
      return;
    }
    onSubmit({
      rubroId: formValues.rubroId.trim(),
      procesoId: Number(formValues.procesoId),
      secuencia: formValues.secuencia ? Number(formValues.secuencia) : undefined,
      frecuenciaEjecucion: formValues.frecuenciaEjecucion.trim() || undefined,
      activo: formValues.activo,
    });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} data-testid="rubrosxprocesodialog-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar asignación' : 'Nueva asignación'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro ID<input data-testid="rubrosxprocesodialog-field-rubroid" {...methods.register('rubroId')} disabled={loading} required /></label>
          <label>Proceso ID<input data-testid="rubrosxprocesodialog-field-procesoid" {...methods.register('procesoId')} disabled={loading} required /></label>
        </>
      )}
      <label>Secuencia<input data-testid="rubrosxprocesodialog-field-secuencia" {...methods.register('secuencia')} disabled={loading} /></label>
      <label>Frecuencia<input data-testid="rubrosxprocesodialog-field-frecuencia" {...methods.register('frecuenciaEjecucion')} disabled={loading} /></label>
      <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input data-testid="rubrosxprocesodialog-field-activo" type="checkbox" {...methods.register('activo')} disabled={loading} />
        Activo
      </label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosxprocesodialog-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosxprocesodialog-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </Form>
  );
};
