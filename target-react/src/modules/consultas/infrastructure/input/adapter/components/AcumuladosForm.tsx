import React, { useState, useEffect } from 'react';
import { CreateAcumulados, UpdateAcumulados, Acumulados } from '../../../../domain/model/Acumulados';

interface AcumuladosFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: Acumulados;
  onSubmit: (data: CreateAcumulados | UpdateAcumulados) => void;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * Componente Formulario: acumulados.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: acumulados.zul
 * Renderers fuente: N/A
 *
 * TODO: Copilot — Completar con los campos reales del formulario (basarse en el domain model).
 */
export const AcumuladosForm: React.FC<AcumuladosFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditMode = !!initialData;

  // TODO: Agregar estado para cada campo del formulario
  // Ejemplo:
  // const [nombre, setNombre] = useState(initialData?.nombre || '');

  useEffect(() => {
    if (initialData) {
      // TODO: Precargar campos del formulario con initialData
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Construir el objeto Create/Update y llamar onSubmit
    // onSubmit({ nombre });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="acumulados-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}
    >
      <h3>{isEditMode ? 'Editar' : 'Crear'} acumulados.zul</h3>

      {/* TODO: Agregar inputs del formulario */}
      {/* Ejemplo:
      <label>
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          disabled={loading}
        />
      </label>
      */}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
