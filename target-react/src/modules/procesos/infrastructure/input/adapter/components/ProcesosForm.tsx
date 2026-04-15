import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@shared/index';

interface ProcesosFormProps {
  onSubmit: (data: { nombre: string }) => void;
  loading?: boolean;
}

interface ProcesosFormValues {
  nombre: string;
}

export const ProcesosForm: React.FC<ProcesosFormProps> = ({ onSubmit, loading }) => {
  const methods = useForm<ProcesosFormValues>({
    defaultValues: {
      nombre: '',
    },
  });

  const nombre = methods.watch('nombre');

  const handleSubmit = (data: ProcesosFormValues) => {
    const nombreTrimmed = data.nombre.trim();
    if (nombreTrimmed && nombreTrimmed.length >= 2) {
      onSubmit({ nombre: nombreTrimmed });
      methods.reset({ nombre: '' });
    }
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="card" data-testid="procesos-form">
      <label className="form-field">
        <span>Nombre</span>
        <input
          type="text"
          {...methods.register('nombre', {
            required: 'El nombre es obligatorio',
            minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' },
          })}
          placeholder="Nombre..."
          disabled={loading}
        />
      </label>
      {methods.formState.errors.nombre && <p className="field-error">{methods.formState.errors.nombre.message}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading || !nombre.trim() || nombre.trim().length < 2}>
          {loading ? 'Guardando...' : 'Crear'}
        </button>
      </div>
    </Form>
  );
};
