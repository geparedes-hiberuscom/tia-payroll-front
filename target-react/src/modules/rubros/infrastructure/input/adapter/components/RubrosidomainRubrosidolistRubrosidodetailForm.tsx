import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';
import { CreateRubrosidomainRubrosidolistRubrosidodetail, RubrosidomainRubrosidolistRubrosidodetail, UpdateRubrosidomainRubrosidolistRubrosidodetail } from '../../../../domain/model/RubrosidomainRubrosidolistRubrosidodetail';

interface RubrosidomainRubrosidolistRubrosidodetailFormProps {
  initialData?: RubrosidomainRubrosidolistRubrosidodetail;
  onSubmit: (data: CreateRubrosidomainRubrosidolistRubrosidodetail | UpdateRubrosidomainRubrosidolistRubrosidodetail) => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface RubrosidomainFormValues {
  rubroId: string;
  colaboradorId: string;
  empresaId: string;
  tipoComportamiento: string;
  valor01: string;
  valor02: string;
  valor03: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
}

export const RubrosidomainRubrosidolistRubrosidodetailForm: React.FC<RubrosidomainRubrosidolistRubrosidodetailFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const methods = useForm<RubrosidomainFormValues>({
    defaultValues: {
      rubroId: '',
      colaboradorId: '',
      empresaId: '',
      tipoComportamiento: '',
      valor01: '',
      valor02: '',
      valor03: '',
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
        tipoComportamiento: '',
        valor01: '',
        valor02: '',
        valor03: '',
        estado: '',
        fechaDesde: '',
        fechaHasta: '',
      });
      return;
    }

    methods.reset({
      rubroId: initialData.rubroId,
      colaboradorId: String(initialData.colaboradorId),
      empresaId: String(initialData.empresaId),
      tipoComportamiento: initialData.tipoComportamiento ? String(initialData.tipoComportamiento) : '',
      valor01: initialData.valor01 ? String(initialData.valor01) : '',
      valor02: initialData.valor02 ? String(initialData.valor02) : '',
      valor03: initialData.valor03 ? String(initialData.valor03) : '',
      estado: initialData.estado ?? '',
      fechaDesde: initialData.fechaDesde ?? '',
      fechaHasta: initialData.fechaHasta ?? '',
    });
  }, [initialData, methods]);

  const handleSubmit = (formValues: RubrosidomainFormValues) => {
    if (isEditMode) {
      onSubmit({
        tipoComportamiento: formValues.tipoComportamiento ? Number(formValues.tipoComportamiento) : undefined,
        valor01: formValues.valor01 ? Number(formValues.valor01) : undefined,
        valor02: formValues.valor02 ? Number(formValues.valor02) : undefined,
        valor03: formValues.valor03 ? Number(formValues.valor03) : undefined,
        estado: formValues.estado.trim() || undefined,
        fechaHasta: formValues.fechaHasta || undefined,
      });
      return;
    }

    onSubmit({
      rubroId: formValues.rubroId.trim(),
      colaboradorId: Number(formValues.colaboradorId),
      empresaId: Number(formValues.empresaId),
      tipoComportamiento: formValues.tipoComportamiento ? Number(formValues.tipoComportamiento) : undefined,
      valor01: formValues.valor01 ? Number(formValues.valor01) : undefined,
      valor02: formValues.valor02 ? Number(formValues.valor02) : undefined,
      valor03: formValues.valor03 ? Number(formValues.valor03) : undefined,
      estado: formValues.estado.trim() || undefined,
      fechaDesde: formValues.fechaDesde || undefined,
      fechaHasta: formValues.fechaHasta || undefined,
    });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} data-testid="rubrosidomain-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar rubro IDO' : 'Nuevo rubro IDO'}</h3>
      {!isEditMode && (
        <>
          <label>Rubro ID<input data-testid="rubrosidomain-field-rubroid" {...methods.register('rubroId')} disabled={loading} required /></label>
          <label>Colaborador ID<input data-testid="rubrosidomain-field-colaboradorid" {...methods.register('colaboradorId')} disabled={loading} required /></label>
          <label>Empresa ID<input data-testid="rubrosidomain-field-empresaid" {...methods.register('empresaId')} disabled={loading} required /></label>
          <label>Fecha Desde<input data-testid="rubrosidomain-field-fechadesde" type="date" {...methods.register('fechaDesde')} disabled={loading} /></label>
        </>
      )}
      <label>Tipo Comportamiento<input data-testid="rubrosidomain-field-tipocomportamiento" {...methods.register('tipoComportamiento')} disabled={loading} /></label>
      <label>Valor 01<input data-testid="rubrosidomain-field-valor01" {...methods.register('valor01')} disabled={loading} /></label>
      <label>Valor 02<input data-testid="rubrosidomain-field-valor02" {...methods.register('valor02')} disabled={loading} /></label>
      <label>Valor 03<input data-testid="rubrosidomain-field-valor03" {...methods.register('valor03')} disabled={loading} /></label>
      <label>Estado<input data-testid="rubrosidomain-field-estado" {...methods.register('estado')} disabled={loading} /></label>
      <label>Fecha Hasta<input data-testid="rubrosidomain-field-fechahasta" type="date" {...methods.register('fechaHasta')} disabled={loading} /></label>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="rubrosidomain-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="rubrosidomain-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </Form>
  );
};
