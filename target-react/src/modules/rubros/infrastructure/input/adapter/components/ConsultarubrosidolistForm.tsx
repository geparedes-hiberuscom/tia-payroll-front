import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@shared/index';
import { Consultarubrosidolist, CreateConsultarubrosidolist, UpdateConsultarubrosidolist } from '../../../../domain/model/Consultarubrosidolist';

interface ConsultarubrosidolistFormProps {
  initialData?: Consultarubrosidolist;
  onSubmit: (data: CreateConsultarubrosidolist | UpdateConsultarubrosidolist) => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface ConsultarubrosidolistFormValues {
  rubroId: string;
  colaboradorId: string;
  empresaId: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
}

export const ConsultarubrosidolistForm: React.FC<ConsultarubrosidolistFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const methods = useForm<ConsultarubrosidolistFormValues>({
    defaultValues: {
      rubroId: '',
      colaboradorId: '',
      empresaId: '',
      estado: '',
      fechaDesde: '',
      fechaHasta: '',
    },
  });

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        rubroId: '',
        colaboradorId: '',
        empresaId: '',
        estado: '',
        fechaDesde: '',
        fechaHasta: '',
      });
      return;
    }

    methods.reset({
      rubroId: initialData.rubroId,
      colaboradorId: String(initialData.colaboradorId),
      empresaId: initialData.empresaId ? String(initialData.empresaId) : '',
      estado: initialData.estado ?? '',
      fechaDesde: initialData.fechaDesde ?? '',
      fechaHasta: initialData.fechaHasta ?? '',
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: ConsultarubrosidolistFormValues) => {
    if (isEditMode) {
      onSubmit({ estado: formValues.estado.trim() || undefined });
      return;
    }

    onSubmit({
      rubroId: formValues.rubroId.trim() || undefined,
      colaboradorId: formValues.colaboradorId ? Number(formValues.colaboradorId) : undefined,
      empresaId: formValues.empresaId ? Number(formValues.empresaId) : undefined,
      estado: formValues.estado.trim() || undefined,
      fechaDesde: formValues.fechaDesde || undefined,
      fechaHasta: formValues.fechaHasta || undefined,
    });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} data-testid="consultarubrosidolist-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar consulta' : 'Nueva consulta'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro<input data-testid="consultarubrosidolist-field-rubroid" {...methods.register('rubroId')} disabled={loading} /></label>
          <label>Colaborador<input data-testid="consultarubrosidolist-field-colaboradorid" {...methods.register('colaboradorId')} disabled={loading} /></label>
          <label>Empresa<input data-testid="consultarubrosidolist-field-empresaid" {...methods.register('empresaId')} disabled={loading} /></label>
          <label>Fecha Desde<input data-testid="consultarubrosidolist-field-fechadesde" type="date" {...methods.register('fechaDesde')} disabled={loading} /></label>
          <label>Fecha Hasta<input data-testid="consultarubrosidolist-field-fechahasta" type="date" {...methods.register('fechaHasta')} disabled={loading} /></label>
        </>
      )}
      <label>Estado<input data-testid="consultarubrosidolist-field-estado" {...methods.register('estado')} disabled={loading} /></label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="consultarubrosidolist-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="consultarubrosidolist-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </Form>
  );
};
