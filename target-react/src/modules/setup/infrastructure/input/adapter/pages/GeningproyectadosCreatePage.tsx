import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGeningproyectados } from '../hooks/useGeningproyectados';
import { GeningproyectadosForm } from '../components/GeningproyectadosForm';
import { GenerarGeningproyectadosRequest, UpdateGeningproyectadosRequest } from '../dto/GeningproyectadosDto';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: genIngProyectados.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const GeningproyectadosCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, generar, update, clearError } = useGeningproyectados();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: GenerarGeningproyectadosRequest | UpdateGeningproyectadosRequest) => {
    if (isEditMode && id) {
      await update(Number(id), data as UpdateGeningproyectadosRequest);
    } else {
      await generar(data as GenerarGeningproyectadosRequest);
    }
    navigate('/geningproyectados');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} genIngProyectados.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <GeningproyectadosForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
