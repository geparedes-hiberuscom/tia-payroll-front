import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../../../../routes';
import { useRubrosidocargaxproceso } from '../hooks/useRubrosidocargaxproceso';
import { RubrosidocargaxprocesoForm } from '../components/RubrosidocargaxprocesoForm';
import { CreateRubrosidocargaxproceso, UpdateRubrosidocargaxproceso } from '../../../../domain/model/Rubrosidocargaxproceso';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const RubrosidocargaxprocesoCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedItem, loading, error, fetchById, create, update, clearError } = useRubrosidocargaxproceso();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) fetchById(id);
  }, [id, fetchById]);

  const handleSubmit = async (data: CreateRubrosidocargaxproceso | UpdateRubrosidocargaxproceso) => {
    if (isEditMode && id) {
      await update(id, data as UpdateRubrosidocargaxproceso);
    } else {
      await create(data as CreateRubrosidocargaxproceso);
    }
    navigate(ROUTES.PATHS['rubrosidocargaxproceso']);
  };

  if (isEditMode && loading && !selectedItem) return <Loading message="Cargando datos..." />;

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem' }}>
      <h1>{isEditMode ? 'Editar' : 'Crear'} ejecución</h1>
      {error && <ErrorBanner message={error} onRetry={clearError} />}
      <RubrosidocargaxprocesoForm
        initialData={isEditMode ? selectedItem ?? undefined : undefined}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        loading={loading}
      />
    </div>
  );
};
