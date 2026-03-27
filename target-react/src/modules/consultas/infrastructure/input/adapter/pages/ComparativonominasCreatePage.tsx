import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useComparativonominas } from '../hooks/useComparativonominas';
import { ComparativonominasForm } from '../components/ComparativonominasForm';
import { CreateComparativonominas, UpdateComparativonominas } from '../../../../domain/model/Comparativonominas';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

/**
 * Página de creación/edición: comparativoNominas.zul
 * Si tiene :id en la URL, modo edición. Si no, modo creación.
 *
 * TODO: Copilot — Completar con validaciones y navegación.
 */
export const ComparativonominasCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useComparativonominas();
  const isEditMode = !!id;

  useEffect(() => {
    if (id) {
      fetchById(id);
    }
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateComparativonominas | UpdateComparativonominas) => {
    if (isEditMode && id) {
      await update(id, data as UpdateComparativonominas);
    } else {
      await create(data as CreateComparativonominas);
    }
    navigate('/comparativonominas');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isEditMode && loading && !selectedItem) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} comparativoNominas.zul</h1>

      {error && <ErrorBanner message={error} onRetry={clearError} />}

      <ComparativonominasForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
};
