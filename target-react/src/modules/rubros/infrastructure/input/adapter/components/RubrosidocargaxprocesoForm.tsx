import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';
import { CreateRubrosidocargaxproceso, Rubrosidocargaxproceso, UpdateRubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';

interface RubrosidocargaxprocesoFormProps {
  initialData?: Rubrosidocargaxproceso;
  onSubmit: (data: CreateRubrosidocargaxproceso | UpdateRubrosidocargaxproceso) => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface RubrosidocargaxprocesoFormValues {
  empresaId: string;
  rubroId: string;
  procesoId: string;
  descripcion: string;
  accion: string;
  fechaAplica: string;
  estado: string;
}

export const RubrosidocargaxprocesoForm: React.FC<RubrosidocargaxprocesoFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const methods = useForm<RubrosidocargaxprocesoFormValues>({
    defaultValues: {
      empresaId: '',
      rubroId: '',
      procesoId: '',
      descripcion: '',
      accion: '',
      fechaAplica: '',
      estado: '',
    },
  });

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        empresaId: '',
        rubroId: '',
        procesoId: '',
        descripcion: '',
        accion: '',
        fechaAplica: '',
        estado: '',
      });
      return;
    }

    methods.reset({
      empresaId: String(initialData.empresaId),
      rubroId: '',
      procesoId: initialData.procesoId,
      descripcion: initialData.descripcion ?? '',
      accion: '',
      fechaAplica: '',
      estado: initialData.estado,
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: RubrosidocargaxprocesoFormValues) => {
    if (isEditMode) {
      onSubmit({ accion: formValues.accion.trim() || undefined, fechaAplica: formValues.fechaAplica || undefined, estado: formValues.estado.trim() || undefined });
      return;
    }
    onSubmit({ empresaId: Number(formValues.empresaId), rubroId: formValues.rubroId.trim(), procesoId: formValues.procesoId ? Number(formValues.procesoId) : undefined, descripcion: formValues.descripcion.trim() || undefined });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} data-testid="rubrosidocargaxproceso-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar ejecución' : 'Nueva ejecución'}</h3>
      {!isEditMode && (
        <>
          <label>Empresa ID<input data-testid="rubrosidocargaxproceso-field-empresaid" {...methods.register('empresaId')} disabled={loading} required /></label>
          <label>Rubro ID<input data-testid="rubrosidocargaxproceso-field-rubroid" {...methods.register('rubroId')} disabled={loading} required /></label>
          <label>Proceso ID<input data-testid="rubrosidocargaxproceso-field-procesoid" {...methods.register('procesoId')} disabled={loading} /></label>
          <label>Descripcion<input data-testid="rubrosidocargaxproceso-field-descripcion" {...methods.register('descripcion')} disabled={loading} /></label>
        </>
      )}
      {isEditMode && (
        <>
          <label>Accion<input data-testid="rubrosidocargaxproceso-field-accion" {...methods.register('accion')} disabled={loading} /></label>
          <label>Fecha Aplica<input data-testid="rubrosidocargaxproceso-field-fechaaplica" type="date" {...methods.register('fechaAplica')} disabled={loading} /></label>
          <label>Estado<input data-testid="rubrosidocargaxproceso-field-estado" {...methods.register('estado')} disabled={loading} /></label>
        </>
      )}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosidocargaxproceso-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosidocargaxproceso-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </Form>
  );
};
