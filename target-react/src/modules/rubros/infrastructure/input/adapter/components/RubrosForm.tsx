import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '../../../../../../shared';

interface RubrosFormProps {
  onSubmit: (data: { nombre: string }) => void;
  loading?: boolean;
}

interface RubrosFormValues {
  nombre: string;
}

export const RubrosForm: React.FC<RubrosFormProps> = ({ onSubmit, loading }) => {
  const methods = useForm<RubrosFormValues>({
    defaultValues: {
      nombre: '',
    },
  });

  const nombre = methods.watch('nombre');

  const handleSubmit = (data: RubrosFormValues) => {
    const nombreTrimmed = data.nombre.trim();
    if (nombreTrimmed) {
      onSubmit({ nombre: nombreTrimmed });
      methods.reset({ nombre: '' });
    }
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        {...methods.register('nombre')}
        placeholder="Nombre..."
        required
        disabled={loading}
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <button type="submit" disabled={loading || !nombre.trim()}>
        {loading ? 'Guardando...' : 'Crear'}
      </button>
    </Form>
  );
};
