import React, { useEffect } from 'react';
import { UIButton } from '../../components/ui-kit';
import { GenerarGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosResponse } from '../../dto/GeningproyectadosDto';

interface GeningproyectadosFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: GeningproyectadosResponse;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSubmit?: (data: GenerarGeningproyectadosRequest | UpdateGeningproyectadosRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
}

/**
 * Componente Formulario: genIngProyectados.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: genIngProyectados.zul
 * Renderers fuente: N/A
 */
export const GeningproyectadosForm: React.FC<GeningproyectadosFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
}) => {
  const isEditMode = !!initialData;

  const getButtonLabel = (): string => {
    if (loading) return 'Guardando...';
    return isEditMode ? 'Actualizar' : 'Crear';
  };

  useEffect(() => {
    // Initialize form with initialData if available
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      // Call onSubmit with form data
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="geningproyectados-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600 }}
    >
      <h3>{isEditMode ? 'Editar' : 'Crear'} genIngProyectados.zul</h3>

      {/* Campos del formulario irían aquí */}

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <UIButton variant="primary" type="submit" disabled={loading}>
          {getButtonLabel()}
        </UIButton>
        {onCancel && (
          <UIButton variant="outline" type="button" onClick={onCancel} disabled={loading}>
            Cancelar
          </UIButton>
        )}
      </div>
    </form>
  );
};
