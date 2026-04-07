import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';
import { Cargarubrosido, CreateCargarubrosido, UpdateCargarubrosido } from '../../../../domain/model/Cargarubrosido';

interface CargarubrosidoFormProps {
  initialData?: Cargarubrosido;
  onSubmit: (data: CreateCargarubrosido | UpdateCargarubrosido) => void;
  onCancel?: () => void;
  loading?: boolean;
}

interface CargarubrosidoFormValues {
  archivo: File | null;
  empresaId: string;
  rubroId: string;
  descripcion: string;
  estado: string;
}

export const CargarubrosidoForm: React.FC<CargarubrosidoFormProps> = ({ initialData, onSubmit, onCancel, loading }) => {
  const isEditMode = Boolean(initialData);
  const [errors, setErrors] = useState<string[]>([]);
  const methods = useForm<CargarubrosidoFormValues>({
    defaultValues: {
      archivo: null,
      empresaId: '',
      rubroId: '',
      descripcion: '',
      estado: '',
    },
  });

  useEffect(() => {
    if (!initialData) {
      methods.reset({
        archivo: null,
        empresaId: '',
        rubroId: '',
        descripcion: '',
        estado: '',
      });
      return;
    }

    methods.reset({
      archivo: null,
      empresaId: initialData.empresaId ? String(initialData.empresaId) : '',
      rubroId: '',
      descripcion: initialData.descripcion ?? '',
      estado: initialData.estado ?? '',
    });
  }, [initialData, methods]);

  const validate = (formValues: CargarubrosidoFormValues): string[] => {
    const next: string[] = [];
    if (!isEditMode && !formValues.archivo) next.push('Debe seleccionar un archivo.');
    if (!isEditMode && (!formValues.empresaId || Number.isNaN(Number(formValues.empresaId)))) next.push('Empresa ID es obligatorio y numérico.');
    return next;
  };

  const handleSubmit = (formValues: CargarubrosidoFormValues) => {
    const nextErrors = validate(formValues);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;

    if (isEditMode) {
      onSubmit({
        estado: formValues.estado.trim() || undefined,
        descripcion: formValues.descripcion.trim() || undefined,
      });
      return;
    }

    onSubmit({
      archivo: formValues.archivo as File,
      empresaId: Number(formValues.empresaId),
      rubroId: formValues.rubroId.trim() || undefined,
      descripcion: formValues.descripcion.trim() || undefined,
    });
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} data-testid="cargarubrosido-form" style={{ display: 'grid', gap: '0.75rem', maxWidth: 640 }}>
      <h3>{isEditMode ? 'Editar carga masiva' : 'Nueva carga masiva'}</h3>
      {errors.length > 0 && (
        <ul data-testid="cargarubrosido-form-errors" style={{ color: '#b91c1c', margin: 0 }}>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
      )}

      {!isEditMode && (
        <label>
          Archivo
          <input
            data-testid="cargarubrosido-field-archivo"
            type="file"
            onChange={(e) => methods.setValue('archivo', e.target.files?.[0] ?? null)}
            disabled={loading}
          />
        </label>
      )}

      {!isEditMode && (
        <label>
          Empresa ID
          <input data-testid="cargarubrosido-field-empresaid" {...methods.register('empresaId')} disabled={loading} required />
        </label>
      )}

      {!isEditMode && (
        <label>
          Rubro ID
          <input data-testid="cargarubrosido-field-rubroid" {...methods.register('rubroId')} disabled={loading} />
        </label>
      )}

      <label>
        Descripcion
        <input data-testid="cargarubrosido-field-descripcion" {...methods.register('descripcion')} disabled={loading} />
      </label>

      {isEditMode && (
        <label>
          Estado
          <input data-testid="cargarubrosido-field-estado" {...methods.register('estado')} disabled={loading} />
        </label>
      )}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" data-testid="cargarubrosido-submit" disabled={loading}>{loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}</button>
        {onCancel && <button type="button" data-testid="cargarubrosido-cancel" onClick={onCancel} disabled={loading}>Cancelar</button>}
      </div>
    </Form>
  );
};
