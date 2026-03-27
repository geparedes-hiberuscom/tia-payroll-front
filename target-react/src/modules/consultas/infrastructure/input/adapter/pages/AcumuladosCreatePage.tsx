import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAcumulados } from '../hooks/useAcumulados';
import { AcumuladosForm } from '../components/AcumuladosForm';
import { CreateAcumulados, UpdateAcumulados } from '../../../../domain/model/Acumulados';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: acumulados.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const AcumuladosCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useAcumulados();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateAcumulados | UpdateAcumulados) => {
    if (isEditMode && id) {
      await update(id, data as UpdateAcumulados);
    } else {
      await create(data as CreateAcumulados);
    }
    navigate('/acumulados');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} acumulados.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <AcumuladosForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
